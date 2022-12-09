import { Form, Prisma, Status, User } from "@prisma/client";
import { checkIsAuthenticated } from "../../../common/permissions";
import { MutationResolvers } from "../../../generated/graphql/types";
import { getFormOrFormNotFound } from "../../database";
import { expandFormFromDb } from "../../converter";
import { checkCanDuplicate } from "../../permissions";
import getReadableId from "../../readableId";
import { getFormRepository } from "../../repository";

/**
 * Get the input to duplicate a form by stripping the properties that should not be copied.
 *
 * @param {User} user user that should own the duplicated form
 * @param {Form} form the form to duplicate
 */
function getDuplicateFormInput(user: User, form: Form): Prisma.FormCreateInput {
  return {
    readableId: getReadableId(),
    status: Status.DRAFT,
    owner: { connect: { id: user.id } },
    emitterType: form.emitterType,
    emitterPickupSite: form.emitterPickupSite,
    emitterIsPrivateIndividual: form.emitterIsPrivateIndividual,
    emitterIsForeignShip: form.emitterIsForeignShip,
    emitterCompanyName: form.emitterCompanyName,
    emitterCompanySiret: form.emitterCompanySiret,
    emitterCompanyAddress: form.emitterCompanyAddress,
    emitterCompanyContact: form.emitterCompanyContact,
    emitterCompanyPhone: form.emitterCompanyPhone,
    emitterCompanyMail: form.emitterCompanyMail,
    emitterCompanyOmiNumber: form.emitterCompanyOmiNumber,
    emitterWorkSiteName: form.emitterWorkSiteName,
    emitterWorkSiteAddress: form.emitterWorkSiteAddress,
    emitterWorkSiteCity: form.emitterWorkSiteCity,
    emitterWorkSitePostalCode: form.emitterWorkSitePostalCode,
    emitterWorkSiteInfos: form.emitterWorkSiteInfos,
    recipientCap: form.recipientCap,
    recipientProcessingOperation: form.recipientProcessingOperation,
    recipientCompanyName: form.recipientCompanyName,
    recipientCompanySiret: form.recipientCompanySiret,
    recipientCompanyAddress: form.recipientCompanyAddress,
    recipientCompanyContact: form.recipientCompanyContact,
    recipientCompanyPhone: form.recipientCompanyPhone,
    recipientCompanyMail: form.recipientCompanyMail,
    recipientIsTempStorage: form.recipientIsTempStorage,
    transporterCompanyName: form.transporterCompanyName,
    transporterCompanySiret: form.transporterCompanySiret,
    transporterCompanyAddress: form.transporterCompanyAddress,
    transporterCompanyContact: form.transporterCompanyContact,
    transporterCompanyPhone: form.transporterCompanyPhone,
    transporterCompanyMail: form.transporterCompanyMail,
    transporterCompanyVatNumber: form.transporterCompanyVatNumber,
    transporterReceipt: form.transporterReceipt,
    transporterDepartment: form.transporterDepartment,
    transporterValidityLimit: form.transporterValidityLimit,
    transporterTransportMode: form.transporterTransportMode,
    transporterIsExemptedOfReceipt: form.transporterIsExemptedOfReceipt,
    wasteDetailsCode: form.wasteDetailsCode,
    wasteDetailsOnuCode: form.wasteDetailsOnuCode,
    wasteDetailsPackagingInfos: form.wasteDetailsPackagingInfos,
    wasteDetailsQuantity: form.wasteDetailsQuantity,
    wasteDetailsQuantityType: form.wasteDetailsQuantityType,
    wasteDetailsPop: form.wasteDetailsPop,
    wasteDetailsIsDangerous: form.wasteDetailsIsDangerous,
    wasteDetailsParcelNumbers: form.wasteDetailsParcelNumbers,
    wasteDetailsAnalysisReferences: form.wasteDetailsAnalysisReferences,
    wasteDetailsLandIdentifiers: form.wasteDetailsLandIdentifiers,
    wasteDetailsName: form.wasteDetailsName,
    wasteDetailsConsistence: form.wasteDetailsConsistence,
    traderCompanyName: form.traderCompanyName,
    traderCompanySiret: form.traderCompanySiret,
    traderCompanyAddress: form.traderCompanyAddress,
    traderCompanyContact: form.traderCompanyContact,
    traderCompanyPhone: form.traderCompanyPhone,
    traderCompanyMail: form.traderCompanyMail,
    traderReceipt: form.traderReceipt,
    traderDepartment: form.traderDepartment,
    traderValidityLimit: form.traderValidityLimit,
    brokerCompanyName: form.brokerCompanyName,
    brokerCompanySiret: form.brokerCompanySiret,
    brokerCompanyAddress: form.brokerCompanyAddress,
    brokerCompanyContact: form.brokerCompanyContact,
    brokerCompanyPhone: form.brokerCompanyPhone,
    brokerCompanyMail: form.brokerCompanyMail,
    brokerReceipt: form.brokerReceipt,
    brokerDepartment: form.brokerDepartment,
    brokerValidityLimit: form.brokerValidityLimit,
    ecoOrganismeName: form.ecoOrganismeName,
    ecoOrganismeSiret: form.ecoOrganismeSiret
  };
}

/**
 * Duplicate the content of a form into a new DRAFT form
 * A new readable ID is generated and some fields which
 * are not duplicable are omitted
 */
const duplicateFormResolver: MutationResolvers["duplicateForm"] = async (
  parent,
  { id },
  context
) => {
  const user = checkIsAuthenticated(context);

  const existingForm = await getFormOrFormNotFound({ id });

  await checkCanDuplicate(user, existingForm);

  const formRepository = getFormRepository(user);

  const newFormInput = getDuplicateFormInput(user, existingForm);

  const fullForm = await formRepository.findFullFormById(existingForm.id);
  if (fullForm.forwardedIn) {
    newFormInput.forwardedIn = {
      create: {
        ...getDuplicateFormInput(user, fullForm.forwardedIn),
        readableId: `${newFormInput.readableId}-suite`
      }
    };
  }

  if (fullForm.intermediaries) {
    newFormInput.intermediaries = {
      createMany: {
        data: fullForm.intermediaries.map(int => ({
          siret: int.siret,
          address: int.address,
          vatNumber: int.vatNumber,
          name: int.name,
          contact: int.contact,
          phone: int.phone,
          mail: int.mail
        })),
        skipDuplicates: true
      }
    };
  }

  const newForm = await formRepository.create(newFormInput, {
    duplicate: { id: existingForm.id }
  });

  return expandFormFromDb(newForm);
};

export default duplicateFormResolver;
