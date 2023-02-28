import { EmitterType, Prisma } from "@prisma/client";
import { isDangerous, BSDD_WASTE_CODES } from "../../../common/constants";
import { checkIsAuthenticated } from "../../../common/permissions";
import {
  MutationUpdateFormArgs,
  ResolversParentTypes
} from "../../../generated/graphql/types";
import { InvalidWasteCode, MissingTempStorageFlag } from "../../errors";
import {
  checkCanUpdate,
  checkIsFormContributor,
  formToCompanies
} from "../../permissions";
import { GraphQLContext } from "../../../types";
import { getFormOrFormNotFound } from "../../database";
import {
  expandFormFromDb,
  flattenFormInput,
  flattenTemporaryStorageDetailInput
} from "../../converter";
import { getFormRepository } from "../../repository";
import { FormCompanies } from "../../types";
import {
  draftFormSchema,
  sealedFormSchema,
  validateGroupement
} from "../../validation";
import prisma from "../../../prisma";
import { UserInputError } from "apollo-server-core";
import { appendix2toFormFractions } from "../../compat";
import { runInTransaction } from "../../../common/repository/helper";
import sirenify from "../../sirenify";
import { validateIntermediariesInput } from "../../../common/validation";

function validateArgs(args: MutationUpdateFormArgs) {
  const wasteDetailsCode = args.updateFormInput.wasteDetails?.code;
  if (wasteDetailsCode && !BSDD_WASTE_CODES.includes(wasteDetailsCode)) {
    throw new InvalidWasteCode(wasteDetailsCode);
  }
  return args;
}

const updateFormResolver = async (
  parent: ResolversParentTypes["Mutation"],
  args: MutationUpdateFormArgs,
  context: GraphQLContext
) => {
  const user = checkIsAuthenticated(context);

  const { updateFormInput } = validateArgs(args);

  const id = updateFormInput.id;

  const {
    appendix2Forms,
    grouping,
    temporaryStorageDetail,
    intermediaries,
    ...formContent
  } = await sirenify(updateFormInput, user);

  if (appendix2Forms && grouping) {
    throw new UserInputError(
      "Vous devez renseigner soit `appendix2Forms` soit `grouping` mais pas les deux"
    );
  }

  if (
    formContent.wasteDetails?.code &&
    isDangerous(formContent.wasteDetails?.code) &&
    formContent.wasteDetails.isDangerous === undefined
  ) {
    formContent.wasteDetails.isDangerous = true;
  }

  const existingForm = await getFormOrFormNotFound({ id });

  await checkCanUpdate(user, existingForm);

  const form = flattenFormInput(formContent);
  const futureForm = { ...existingForm, ...form };

  // Construct form update payload
  // This bit is a bit confusing. We are NOT in strict mode, so Yup doesnt complain if we pass unknown values.
  // To remove those unknown values, we cast the object. This makes sure our input has a shape that fits our validator
  // But upon casting, somes keys might "appear": a yup.string() will be casted to an empty string even if it was undefined in the first place.
  // To remediate this, after casting we remove the keys that were not present initially.
  // So this is a 2 way constraint:
  // - casting remove keys in the input but unknown to the validator
  // - then we remove keys present in the casting result but not present in the input
  const formUpdateInput: Prisma.FormUpdateInput = draftFormSchema.cast(form);
  for (const key of Object.keys(formUpdateInput)) {
    if (!(key in form)) {
      delete formUpdateInput[key];
    }
  }

  // Validate form input
  if (existingForm.status === "DRAFT") {
    await draftFormSchema.validate(futureForm);
  } else {
    await sealedFormSchema.validate(futureForm);
  }

  const isOrWillBeTempStorage =
    (existingForm.recipientIsTempStorage &&
      formContent.recipient?.isTempStorage !== false) ||
    formContent.recipient?.isTempStorage === true;

  const forwardedIn = await prisma.form
    .findUnique({
      where: { id: existingForm.id }
    })
    .forwardedIn();

  const formCompanies = await formToCompanies(existingForm);
  const nextFormCompanies: FormCompanies = {
    emitterCompanySiret:
      form.emitterCompanySiret ?? formCompanies.emitterCompanySiret,
    recipientCompanySiret:
      form.recipientCompanySiret ?? formCompanies.recipientCompanySiret,
    transporterCompanySiret:
      form.transporterCompanySiret ?? formCompanies.transporterCompanySiret,
    transporterCompanyVatNumber:
      form.transporterCompanyVatNumber ??
      formCompanies.transporterCompanyVatNumber,
    traderCompanySiret:
      form.traderCompanySiret ?? formCompanies.traderCompanySiret,
    brokerCompanySiret:
      form.brokerCompanySiret ?? formCompanies.brokerCompanySiret,
    ecoOrganismeSiret:
      form.ecoOrganismeSiret ?? formCompanies.ecoOrganismeSiret,
    ...(intermediaries?.length
      ? {
          intermediariesVatNumbers: intermediaries?.map(
            intermediary => intermediary.vatNumber ?? null
          ),
          intermediariesSirets: intermediaries?.map(
            intermediary => intermediary.siret ?? null
          )
        }
      : {
          intermediariesVatNumbers: formCompanies.intermediariesVatNumbers,
          intermediariesSirets: formCompanies.intermediariesSirets
        })
  };

  if (temporaryStorageDetail || forwardedIn) {
    nextFormCompanies.forwardedIn = {
      recipientCompanySiret:
        temporaryStorageDetail?.destination?.company?.siret ??
        forwardedIn?.recipientCompanySiret,
      transporterCompanySiret: forwardedIn?.transporterCompanySiret,
      transporterCompanyVatNumber: forwardedIn?.transporterCompanyVatNumber
    };
  }

  if (isOrWillBeTempStorage && !(forwardedIn || temporaryStorageDetail)) {
    formUpdateInput.forwardedIn = {
      create: {
        owner: { connect: { id: user.id } },
        readableId: `${existingForm.readableId}-suite`
      }
    };
  }
  await checkIsFormContributor(
    user,
    nextFormCompanies,
    "Vous ne pouvez pas enlever votre établissement du bordereau"
  );

  // Delete temporaryStorageDetail
  if (
    forwardedIn &&
    (!isOrWillBeTempStorage || temporaryStorageDetail === null)
  ) {
    formUpdateInput.forwardedIn = { delete: true };
  }

  if (temporaryStorageDetail) {
    if (!isOrWillBeTempStorage) {
      // The user is trying to add a temporary storage detail
      // but recipient is not set as temp storage on existing form
      // or input
      throw new MissingTempStorageFlag();
    }

    if (forwardedIn) {
      formUpdateInput.forwardedIn = {
        update: flattenTemporaryStorageDetailInput(temporaryStorageDetail)
      };
    } else {
      formUpdateInput.forwardedIn = {
        create: {
          owner: { connect: { id: user.id } },
          readableId: `${existingForm.readableId}-suite`,
          ...flattenTemporaryStorageDetailInput(temporaryStorageDetail)
        }
      };
    }
  }

  // Delete intermediaries
  if (
    (!!intermediaries && intermediaries?.length === 0) ||
    intermediaries === null
  ) {
    formUpdateInput.intermediaries = {
      deleteMany: {}
    };
  } else if (intermediaries?.length) {
    await validateIntermediariesInput(intermediaries);
    // Update the intermediaties
    const existingIntermediaries =
      await prisma.intermediaryFormAssociation.findMany({
        where: { formId: existingForm.id }
      });
    // combine existing info with update info
    const intermediariesInput = intermediaries.map(companyInput => {
      const match = existingIntermediaries.find(
        ({ siret }) => siret === companyInput.siret
      );
      return {
        ...(match
          ? {
              ...match,
              siret: companyInput.siret ?? "",
              name: match.name ?? ""
            }
          : {}),
        ...{
          ...companyInput,
          siret: companyInput.siret ?? "",
          name: companyInput.name ?? ""
        }
      };
    });

    formUpdateInput.intermediaries = {
      deleteMany: {},
      createMany: {
        data: intermediariesInput.map(i => ({
          name: i.name!, // enforced through validation schema
          siret: i.siret!, // enforced through validation schema
          contact: i.contact!, // enforced through validation schema
          address: i.address,
          vatNumber: i.vatNumber,
          phone: i.phone,
          mail: i.mail
        })),
        skipDuplicates: true
      }
    };
  }

  const existingFormFractions = await prisma.form
    .findUnique({ where: { id: existingForm.id } })
    .grouping({ include: { initialForm: true } });

  const existingAppendixForms = existingFormFractions.map(
    ({ initialForm }) => initialForm
  );

  if (existingAppendixForms?.length) {
    const updatedSiret = formUpdateInput?.emitterCompanySiret;
    if (!!updatedSiret && updatedSiret !== existingForm?.emitterCompanySiret) {
      throw new UserInputError(
        "Des bordereaux figurent dans l'annexe, le siret de l'émetteur ne peut pas être modifié."
      );
    }
  }

  const isGroupementUpdated =
    !!grouping ||
    !!appendix2Forms ||
    futureForm.emitterType !== existingForm.emitterType;

  const existingFormFractionsInput = existingFormFractions.map(
    ({ quantity, initialFormId }) => ({
      form: { id: initialFormId },
      quantity
    })
  );

  const formFractionsInput = grouping
    ? grouping
    : appendix2Forms
    ? appendix2toFormFractions(appendix2Forms)
    : existingFormFractionsInput;
  const formFractions = isGroupementUpdated
    ? await validateGroupement(futureForm, formFractionsInput)
    : null;

  const updatedForm = await runInTransaction(async transaction => {
    const { update, setAppendix1, setAppendix2 } = getFormRepository(
      user,
      transaction
    );
    const updatedForm = await update({ id }, formUpdateInput);
    if (isGroupementUpdated) {
      updatedForm.emitterType === EmitterType.APPENDIX1
        ? await setAppendix1({
            form: updatedForm,
            appendix1: formFractions,
            currentAppendix1Forms: existingAppendixForms
          })
        : await setAppendix2({
            form: updatedForm,
            appendix2: formFractions,
            currentAppendix2Forms: existingAppendixForms
          });
    }
    return updatedForm;
  });

  return expandFormFromDb(updatedForm);
};

export default updateFormResolver;
