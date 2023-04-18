import { checkIsAuthenticated } from "../../../common/permissions";
import { getBsdasriOrNotFound } from "../../database";
import { expandBsdasriFromDB } from "../../converter";
import { UserInputError, ForbiddenError } from "apollo-server-express";
import { InvalidTransition } from "../../../forms/errors";
import dasriTransition from "../../workflow/dasriTransition";
import {
  BsdasriType,
  BsdasriStatus,
  WasteAcceptationStatus,
  User
} from "@prisma/client";
import { checkCanEditBsdasri } from "../../permissions";
import { getBsdasriRepository } from "../../repository";
import {
  dasriSignatureMapping,
  checkDirectakeOverIsAllowed,
  checkEmissionSignedWithSecretCode,
  checkIsSignedByEcoOrganisme,
  getFieldsUpdate
} from "./signatureUtils";
import { runInTransaction } from "../../../common/repository/helper";
import {
  Permission,
  can,
  checkUserPermissions,
  getUserRoles
} from "../../../permissions";
import {
  BsdasriSignatureType,
  SignatureAuthor
} from "../../../generated/graphql/types";
import { GraphQLContext } from "../../../types";

/**
 * When synthesized dasri is received or processed, associated dasris are updated
 *
 */
const cascadeOnSynthesized = async ({ dasri, bsdasriRepository }) => {
  if (dasri.status === BsdasriStatus.RECEIVED) {
    const {
      destinationCompanyName,
      destinationCompanySiret,
      destinationCompanyAddress,
      destinationCompanyContact,
      destinationCompanyPhone,
      destinationCompanyMail,
      destinationReceptionDate,
      receptionSignatoryId,
      destinationReceptionSignatureAuthor,
      destinationReceptionSignatureDate
    } = dasri;
    await bsdasriRepository.updateMany(
      { synthesizedInId: dasri.id },
      {
        status: BsdasriStatus.RECEIVED,
        destinationCompanyName,
        destinationCompanySiret,
        destinationCompanyAddress,
        destinationCompanyContact,
        destinationCompanyPhone,
        destinationCompanyMail,
        destinationReceptionDate,
        receptionSignatoryId,
        destinationReceptionSignatureAuthor,
        destinationReceptionSignatureDate,
        destinationReceptionAcceptationStatus: WasteAcceptationStatus.ACCEPTED
      }
    );
  }

  if (dasri.status === BsdasriStatus.PROCESSED) {
    const {
      destinationOperationCode,
      destinationOperationDate,
      operationSignatoryId,
      destinationOperationSignatureDate,
      destinationOperationSignatureAuthor
    } = dasri;

    await bsdasriRepository.updateMany(
      { synthesizedInId: dasri.id },
      {
        status: BsdasriStatus.PROCESSED,
        destinationOperationCode,
        destinationOperationDate,
        operationSignatoryId,
        destinationOperationSignatureDate,
        destinationOperationSignatureAuthor
      }
    );
  }
};

const getSiretWhoSigns = async ({
  authorizedSirets,
  user
}: {
  authorizedSirets: string[];
  user: User;
}): Promise<string> => {
  let siretWhoSigns;
  if (authorizedSirets.length === 1) {
    // One allowed siret ? let's use it
    [siretWhoSigns] = authorizedSirets;
    // Is this siret belonging to a current user ?
    await checkUserPermissions(
      user,
      [siretWhoSigns].filter(Boolean),
      Permission.BsdCanSign,
      `Vous n'êtes pas membre de l'entreprise portant le siret "${siretWhoSigns}".`
    );
  } else {
    // several allowed sirets ? take the first belonging to current user
    const roles = await getUserRoles(user.id);
    const userAuthorizedSirets = authorizedSirets.filter(
      siret => roles[siret] && can(roles[siret], Permission.BsdCanSign)
    );
    if (!userAuthorizedSirets.length) {
      throw new ForbiddenError(
        "Vous nêtes pas membre d'une entreprise autorisée"
      );
    }
    siretWhoSigns = userAuthorizedSirets[0];
  }
  return siretWhoSigns;
};
const sign = async ({
  id,
  author,
  type = null,
  securityCode = null,
  emissionSignatureAuthor = null,
  context
}: {
  id: string;
  author: string;
  type?: BsdasriSignatureType | null;
  securityCode?: number | null;
  emissionSignatureAuthor?: SignatureAuthor | null;
  context: GraphQLContext;
}) => {
  const user = checkIsAuthenticated(context);
  const bsdasri = await getBsdasriOrNotFound({ id, includeAssociated: true });

  checkCanEditBsdasri(bsdasri);

  if (bsdasri.isDraft) {
    throw new InvalidTransition();
  }

  const signatureType: BsdasriSignatureType | "EMISSION_WITH_SECRET_CODE" =
    type ?? "EMISSION_WITH_SECRET_CODE";

  const signatureParams = dasriSignatureMapping[signatureType];

  // Which siret is involved in current signature process ?
  const authorizedSirets = signatureParams.authorizedSirets(bsdasri);

  const siretWhoSigns = await getSiretWhoSigns({
    authorizedSirets,
    user
  });

  const isSignedByEcoOrganisme = checkIsSignedByEcoOrganisme({
    signatureParams,
    siretWhoSigns,
    bsdasri
  });

  const isEmissionDirectTakenOver = await checkDirectakeOverIsAllowed({
    signatureParams,
    bsdasri
  });

  const isEmissionSignedWithSecretCode =
    await checkEmissionSignedWithSecretCode({
      signatureParams,
      bsdasri,
      securityCode,
      emissionSignatureAuthor
    });

  // handle synthesis special cases
  if (bsdasri.type === BsdasriType.SYNTHESIS) {
    if (!bsdasri.synthesizing?.length) {
      throw new UserInputError(
        "Un dasri de synthèse doit avoir des bordereaux associés"
      );
    }
    if (signatureType === "EMISSION")
      // we keep this code here i.o the state machine to return a customized error message
      throw new UserInputError(
        "Un dasri de synthèse INITIAL attend une signature transporteur, la signature producteur n'est pas acceptée."
      );
  }

  const data = {
    [signatureParams.author]: author,
    [signatureParams.date]: new Date(),
    [signatureParams.signatoryField]: { connect: { id: user.id } },
    ...getFieldsUpdate({ bsdasri, type })
  };

  const { where, updateData } = await dasriTransition(
    {
      ...bsdasri
    },
    {
      type: signatureParams.eventType,
      dasriUpdateInput: data as any
    },
    signatureParams.validationContext,
    {
      ...(isEmissionDirectTakenOver !== undefined
        ? { isEmissionDirectTakenOver }
        : {}),
      ...(isEmissionSignedWithSecretCode !== undefined
        ? {
            isEmissionTakenOverWithSecretCode: isEmissionSignedWithSecretCode,
            emittedByEcoOrganisme: emissionSignatureAuthor === "ECO_ORGANISME"
          }
        : {}),
      ...(isSignedByEcoOrganisme !== undefined
        ? { emittedByEcoOrganisme: isSignedByEcoOrganisme }
        : {})
    }
  );

  const signedDasri = await runInTransaction(async transaction => {
    const bsdasriRepository = getBsdasriRepository(user, transaction);

    const signedDasri = await bsdasriRepository.update(where, updateData);
    if (signedDasri.type === BsdasriType.SYNTHESIS) {
      await cascadeOnSynthesized({ dasri: signedDasri, bsdasriRepository });
    }
    if (signedDasri.type === BsdasriType.GROUPING) {
      if (signedDasri.status === BsdasriStatus.PROCESSED) {
        await bsdasriRepository.updateMany(
          { groupedInId: signedDasri.id },
          { status: BsdasriStatus.PROCESSED }
        );
      }
      if (signedDasri.status === BsdasriStatus.REFUSED) {
        await bsdasriRepository.updateMany(
          { groupedInId: signedDasri.id },
          { groupedInId: null }
        );
      }
    }

    return signedDasri;
  });

  return expandBsdasriFromDB(signedDasri);
};

export default sign;
