import { Prisma, BsvhuStatus, User } from "@prisma/client";
import { checkIsAuthenticated } from "../../../common/permissions";
import getReadableId, { ReadableIdPrefix } from "../../../forms/readableId";
import { MutationDuplicateBsvhuArgs } from "../../../generated/graphql/types";
import { expandVhuFormFromDb } from "../../converter";
import { getBsvhuOrNotFound } from "../../database";
import { getBsvhuRepository } from "../../repository";
import { checkCanDuplicate } from "../../permissions";
import { prisma } from "@td/prisma";
import { prismaToZodBsvhu } from "../../validation/helpers";
import { parseBsvhuAsync } from "../../validation";
import {
  BsvhuForParsingInclude,
  PrismaBsvhuForParsing
} from "../../validation/types";

export default async function duplicate(
  _,
  { id }: MutationDuplicateBsvhuArgs,
  context
) {
  const user = checkIsAuthenticated(context);

  const prismaBsvhu = await getBsvhuOrNotFound(id, {
    include: BsvhuForParsingInclude
  });

  await checkCanDuplicate(user, prismaBsvhu);
  const bsvhuRepository = getBsvhuRepository(user);

  const duplicateData = await getDuplicateData(prismaBsvhu, user);

  const newBsvhu = await bsvhuRepository.create(duplicateData);

  return expandVhuFormFromDb(newBsvhu);
}

async function getDuplicateData(
  bsvhu: PrismaBsvhuForParsing,
  user: User
): Promise<Prisma.BsvhuCreateInput> {
  const {
    id,
    emitterEmissionSignatureAuthor,
    emitterEmissionSignatureDate,
    transporterTransportSignatureAuthor,
    transporterTransportSignatureDate,
    destinationReceptionQuantity,
    destinationReceptionWeight,
    destinationReceptionAcceptationStatus,
    destinationReceptionRefusalReason,
    destinationReceptionIdentificationNumbers,
    destinationReceptionIdentificationType,
    destinationReceptionDate,
    destinationOperationDate,
    destinationOperationCode,
    destinationOperationMode,
    destinationOperationSignatureAuthor,
    destinationOperationSignatureDate,
    intermediariesOrgIds,
    ...zodBsvhu
  } = prismaToZodBsvhu(bsvhu);

  const { intermediaries, ...parsedBsvhu } = await parseBsvhuAsync(zodBsvhu, {
    user
  });

  const { emitter, transporter, destination, broker, trader } =
    await getBsvhuCompanies(bsvhu);

  let data: Prisma.BsvhuCreateInput = {
    ...parsedBsvhu,
    id: getReadableId(ReadableIdPrefix.VHU),
    status: BsvhuStatus.INITIAL,
    isDraft: true,
    createdAt: new Date(),
    emitterCompanyContact:
      emitter?.contact ?? parsedBsvhu.emitterCompanyContact,
    emitterCompanyPhone:
      emitter?.contactPhone ?? parsedBsvhu.emitterCompanyPhone,
    emitterCompanyMail: emitter?.contactEmail ?? parsedBsvhu.emitterCompanyMail,
    destinationCompanyContact:
      destination?.contact ?? parsedBsvhu.destinationCompanyContact,
    destinationCompanyPhone:
      destination?.contactPhone ?? parsedBsvhu.destinationCompanyPhone,
    destinationCompanyMail:
      destination?.contactEmail ?? parsedBsvhu.destinationCompanyMail,
    transporterCompanyContact:
      transporter?.contact ?? parsedBsvhu.transporterCompanyContact,
    transporterCompanyPhone:
      transporter?.contactPhone ?? parsedBsvhu.transporterCompanyPhone,
    transporterCompanyMail:
      transporter?.contactEmail ?? parsedBsvhu.transporterCompanyMail,
    transporterCompanyVatNumber: parsedBsvhu.transporterCompanyVatNumber,
    // Broker company info
    brokerCompanyMail: broker?.contactEmail ?? bsvhu.brokerCompanyMail,
    brokerCompanyPhone: broker?.contactPhone ?? bsvhu.brokerCompanyPhone,
    brokerCompanyContact: broker?.contact ?? bsvhu.brokerCompanyContact,
    // Broker recepisse
    brokerRecepisseNumber:
      broker?.brokerReceipt?.receiptNumber ?? bsvhu.brokerRecepisseNumber,
    brokerRecepisseValidityLimit:
      broker?.brokerReceipt?.validityLimit ??
      bsvhu.brokerRecepisseValidityLimit,
    brokerRecepisseDepartment:
      broker?.brokerReceipt?.department ?? bsvhu.brokerRecepisseDepartment,
    // Trader company info
    traderCompanyMail: trader?.contactEmail ?? bsvhu.traderCompanyMail,
    traderCompanyPhone: trader?.contactPhone ?? bsvhu.traderCompanyPhone,
    traderCompanyContact: trader?.contact ?? bsvhu.traderCompanyContact,
    // Trader recepisse
    traderRecepisseNumber:
      trader?.traderReceipt?.receiptNumber ?? bsvhu.traderRecepisseNumber,
    traderRecepisseValidityLimit:
      trader?.traderReceipt?.validityLimit ??
      bsvhu.traderRecepisseValidityLimit,
    traderRecepisseDepartment:
      trader?.traderReceipt?.department ?? bsvhu.traderRecepisseDepartment
  };
  if (intermediaries) {
    data = {
      ...data,
      intermediaries: {
        createMany: {
          data: intermediaries.map(intermediary => ({
            siret: intermediary.siret!,
            address: intermediary.address,
            vatNumber: intermediary.vatNumber,
            name: intermediary.name!,
            contact: intermediary.contact!,
            phone: intermediary.phone,
            mail: intermediary.mail
          }))
        }
      },
      intermediariesOrgIds
    };
  }
  return data;
}

async function getBsvhuCompanies(bsvhu: PrismaBsvhuForParsing) {
  const companiesOrgIds = [
    bsvhu.emitterCompanySiret,
    bsvhu.transporterCompanySiret,
    bsvhu.transporterCompanyVatNumber,
    bsvhu.destinationCompanySiret,
    bsvhu.brokerCompanySiret,
    bsvhu.traderCompanySiret
  ].filter(Boolean);

  // Batch fetch all companies involved in the BSVHU
  const companies = await prisma.company.findMany({
    where: { orgId: { in: companiesOrgIds } },
    include: {
      transporterReceipt: true,
      brokerReceipt: true,
      traderReceipt: true
    }
  });

  const emitter = companies.find(
    company => company.orgId === bsvhu.emitterCompanySiret
  );

  const destination = companies.find(
    company => company.orgId === bsvhu.destinationCompanySiret
  );

  const transporter = companies.find(
    company =>
      company.orgId === bsvhu.transporterCompanySiret ||
      company.orgId === bsvhu.transporterCompanyVatNumber
  );

  const broker = companies.find(
    company => company.orgId === bsvhu.brokerCompanySiret
  );

  const trader = companies.find(
    company => company.orgId === bsvhu.traderCompanySiret
  );

  return { emitter, destination, transporter, broker, trader };
}
