import { MutationResolvers } from "../../../generated/graphql/types";
import { checkIsAuthenticated } from "../../../common/permissions";
import {
  flattenBsffPackagingInput,
  expandBsffPackagingFromDB
} from "../../converter";
import { getBsffPackagingOrNotFound } from "../../database";
import { getCachedUserSiretOrVat } from "../../../common/redis/users";
import { UserInputError } from "apollo-server-core";
import { getBsffPackagingRepository } from "../../repository";
import { checkEditionRules } from "../../edition/bsffPackagingEdition";
import { sirenifyBsffPackagingInput } from "../../sirenify";

const updateBsffPackaging: MutationResolvers["updateBsffPackaging"] = async (
  _,
  { id, input },
  context
) => {
  const user = checkIsAuthenticated(context);
  const existingBsffPackaging = await getBsffPackagingOrNotFound({ id });

  const userCompaniesSiretOrVat = await getCachedUserSiretOrVat(user.id);

  if (
    !userCompaniesSiretOrVat.includes(
      existingBsffPackaging.bsff.destinationCompanySiret
    )
  ) {
    throw new UserInputError(
      "Seul le destinataire du BSFF peut modifier les informations d'acceptation et d'opération sur un contenant"
    );
  }

  if (input.numero === null || input.numero === "") {
    throw new UserInputError(
      "Le numéro de contenant ne peut pas être nul ou vide"
    );
  }

  const sirenifiedInput = await sirenifyBsffPackagingInput(input, user);
  const flatInput = flattenBsffPackagingInput(sirenifiedInput);

  await checkEditionRules(existingBsffPackaging, input);

  const { update: updateBsffPackaging } = getBsffPackagingRepository(
    context.user
  );

  const updatedBsffPackaging = await updateBsffPackaging({
    where: { id },
    data: flatInput
  });

  return expandBsffPackagingFromDB(updatedBsffPackaging);
};

export default updateBsffPackaging;
