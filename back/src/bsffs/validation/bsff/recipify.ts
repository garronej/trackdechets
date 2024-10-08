import { getTransporterCompanyOrgId } from "@td/constants";
import { ParsedZodBsff } from "./schema";
import { BsffValidationContext, ZodBsffTransformer } from "./types";
import { CompanyRole } from "../../../common/validation/zod/schema";
import {
  buildRecipify,
  RecipifyInputAccessor
} from "../../../companies/recipify";

const recipifyBsffAccessors = (
  bsd: ParsedZodBsff
): RecipifyInputAccessor<ParsedZodBsff>[] => [
  ...(bsd.transporters ?? []).map(
    (_, idx) =>
      ({
        role: CompanyRole.Transporter,
        skip: !!bsd.transporters![idx].transporterTransportSignatureDate,
        orgIdGetter: () => {
          const orgId = getTransporterCompanyOrgId({
            transporterCompanySiret:
              bsd.transporters![idx].transporterCompanySiret ?? null,
            transporterCompanyVatNumber:
              bsd.transporters![idx].transporterCompanyVatNumber ?? null
          });
          return orgId ?? null;
        },
        setter: async (bsff: ParsedZodBsff, receipt) => {
          const transporter = bsff.transporters![idx];
          if (transporter.transporterRecepisseIsExempted) {
            transporter.transporterRecepisseNumber = null;
            transporter.transporterRecepisseValidityLimit = null;
            transporter.transporterRecepisseDepartment = null;
          } else {
            transporter.transporterRecepisseNumber =
              receipt?.receiptNumber ?? null;
            transporter.transporterRecepisseValidityLimit =
              receipt?.validityLimit ?? null;
            transporter.transporterRecepisseDepartment =
              receipt?.department ?? null;
          }
        }
      } as RecipifyInputAccessor<ParsedZodBsff>)
  )
];

export const recipifyBsff: (
  context: BsffValidationContext
) => ZodBsffTransformer = () => {
  return async bsff => {
    // const sealedFields = await getSealedFields(bsda, context);
    const accessors = recipifyBsffAccessors(bsff);
    return buildRecipify(accessors, bsff);
  };
};
