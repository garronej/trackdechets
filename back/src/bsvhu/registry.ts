import { Bsvhu } from "@prisma/client";
import { BsdElastic } from "../common/elastic";
import {
  AllWaste,
  IncomingWaste,
  ManagedWaste,
  OutgoingWaste,
  TransportedWaste
} from "../generated/graphql/types";
import {
  GenericWaste,
  RegistryFields,
  emptyAllWaste,
  emptyIncomingWaste,
  emptyManagedWaste,
  emptyOutgoingWaste,
  emptyTransportedWaste
} from "../registry/types";
import { getWasteDescription } from "./utils";
import Decimal from "decimal.js";

const getOperationData = (bsvhu: Bsvhu) => ({
  destinationPlannedOperationCode: bsvhu.destinationPlannedOperationCode,
  destinationOperationCode: bsvhu.destinationOperationCode,
  destinationOperationMode: bsvhu.destinationOperationMode
});

const getTransporterData = (bsvhu: Bsvhu, includePlates = false) => {
  const data = {
    transporterTakenOverAt: bsvhu.transporterTransportTakenOverAt,
    transporterRecepisseIsExempted: bsvhu.transporterRecepisseIsExempted,
    transporterCompanyName: bsvhu.transporterCompanyName,
    transporterCompanySiret: bsvhu.transporterCompanySiret,
    transporterRecepisseNumber: bsvhu.transporterRecepisseNumber,
    transporterCompanyMail: bsvhu.transporterCompanyMail,
    transporterCustomInfo: bsvhu.transporterCustomInfo,
    transporterCompanyAddress: bsvhu.transporterCompanyAddress
  };

  if (includePlates) {
    return {
      ...data,
      transporterNumberPlates: bsvhu.transporterTransportPlates
    };
  }

  return data;
};

export function getRegistryFields(
  bsvhu: Bsvhu
): Pick<BsdElastic, RegistryFields> {
  const registryFields: Record<RegistryFields, string[]> = {
    isIncomingWasteFor: [],
    isOutgoingWasteFor: [],
    isTransportedWasteFor: [],
    isManagedWasteFor: [],
    isAllWasteFor: []
  };

  if (
    bsvhu.emitterEmissionSignatureDate &&
    bsvhu.transporterTransportSignatureDate
  ) {
    if (bsvhu.destinationCompanySiret) {
      registryFields.isAllWasteFor.push(bsvhu.destinationCompanySiret);
    }
    if (bsvhu.emitterCompanySiret) {
      registryFields.isOutgoingWasteFor.push(bsvhu.emitterCompanySiret);
      registryFields.isAllWasteFor.push(bsvhu.emitterCompanySiret);
    }
    if (bsvhu.transporterCompanySiret) {
      registryFields.isTransportedWasteFor.push(bsvhu.transporterCompanySiret);
      registryFields.isAllWasteFor.push(bsvhu.transporterCompanySiret);
    }
  }

  if (
    bsvhu.destinationOperationSignatureDate &&
    bsvhu.destinationCompanySiret
  ) {
    registryFields.isIncomingWasteFor.push(bsvhu.destinationCompanySiret);
  }

  return registryFields;
}

export function toGenericWaste(bsvhu: Bsvhu): GenericWaste {
  return {
    wasteDescription: getWasteDescription(bsvhu.wasteCode),
    wasteCode: bsvhu.wasteCode,
    wasteIsDangerous: true,
    pop: false,
    id: bsvhu.id,
    createdAt: bsvhu.createdAt,
    updatedAt: bsvhu.createdAt,
    ecoOrganismeName: null,
    ecoOrganismeSiren: null,
    bsdType: "BSVHU",
    bsdSubType: "INITIAL",
    status: bsvhu.status,
    customId: null,
    destinationCap: null,
    destinationOperationNoTraceability: false,
    destinationReceptionAcceptationStatus:
      bsvhu.destinationReceptionAcceptationStatus,
    destinationOperationDate: bsvhu.destinationOperationDate,
    destinationReceptionWeight: bsvhu.destinationReceptionWeight
      ? new Decimal(bsvhu.destinationReceptionWeight)
          .dividedBy(1000)
          .toDecimalPlaces(6)
          .toNumber()
      : bsvhu.destinationReceptionWeight,
    wasteAdr: null,
    workerCompanyName: null,
    workerCompanySiret: null,
    workerCompanyAddress: null,
    weight: bsvhu.weightValue
      ? new Decimal(bsvhu.weightValue)
          .dividedBy(1000)
          .toDecimalPlaces(6)
          .toNumber()
      : bsvhu.weightValue,
    ...getTransporterData(bsvhu),
    destinationCompanyMail: bsvhu.destinationCompanyMail
  };
}

export function toIncomingWaste(bsvhu: Bsvhu): Required<IncomingWaste> {
  const { __typename, ...genericWaste } = toGenericWaste(bsvhu);

  return {
    // Make sure all possible keys are in the exported sheet so that no column is missing
    ...emptyIncomingWaste,
    ...genericWaste,
    destinationCompanyName: bsvhu.destinationCompanyName,
    destinationCompanySiret: bsvhu.destinationCompanySiret,
    destinationCompanyAddress: bsvhu.destinationCompanyAddress,
    destinationReceptionDate: bsvhu.destinationReceptionDate,
    emitterCompanyName: bsvhu.emitterCompanyName,
    emitterCompanySiret: bsvhu.emitterCompanySiret,
    emitterCompanyAddress: bsvhu.emitterCompanyAddress,
    emitterPickupsiteAddress: null,
    initialEmitterCompanyName: null,
    initialEmitterCompanySiret: null,
    initialEmitterCompanyAddress: null,
    traderCompanyName: null,
    traderCompanySiret: null,
    traderRecepisseNumber: null,
    brokerCompanyName: null,
    brokerCompanySiret: null,
    brokerRecepisseNumber: null,
    emitterCompanyMail: bsvhu.emitterCompanyMail,
    ...getOperationData(bsvhu),
    ...getTransporterData(bsvhu)
  };
}

export function toOutgoingWaste(bsvhu: Bsvhu): Required<OutgoingWaste> {
  const { __typename, ...genericWaste } = toGenericWaste(bsvhu);

  return {
    // Make sure all possible keys are in the exported sheet so that no column is missing
    ...emptyOutgoingWaste,
    ...genericWaste,
    brokerCompanyName: null,
    brokerCompanySiret: null,
    brokerRecepisseNumber: null,
    destinationCompanyAddress: bsvhu.destinationCompanyAddress,
    destinationCompanyName: bsvhu.destinationCompanyName,
    destinationCompanySiret: bsvhu.destinationCompanySiret,
    destinationPlannedOperationMode: null,
    emitterCompanyName: bsvhu.emitterCompanyName,
    emitterCompanySiret: bsvhu.emitterCompanySiret,
    emitterCompanyAddress: bsvhu.emitterCompanyAddress,
    emitterPickupsiteAddress: null,
    initialEmitterCompanyName: null,
    initialEmitterCompanySiret: null,
    initialEmitterCompanyAddress: null,
    traderCompanyName: null,
    traderCompanySiret: null,
    traderRecepisseNumber: null,
    ...getOperationData(bsvhu),
    weight: bsvhu.weightValue ? bsvhu.weightValue / 1000 : bsvhu.weightValue,
    ...getOperationData(bsvhu),
    ...getTransporterData(bsvhu)
  };
}

export function toTransportedWaste(bsvhu: Bsvhu): Required<TransportedWaste> {
  const { __typename, ...genericWaste } = toGenericWaste(bsvhu);

  return {
    // Make sure all possible keys are in the exported sheet so that no column is missing
    ...emptyTransportedWaste,
    ...genericWaste,
    destinationReceptionDate: bsvhu.destinationReceptionDate,
    weight: bsvhu.weightValue ? bsvhu.weightValue / 1000 : bsvhu.weightValue,
    emitterCompanyAddress: bsvhu.emitterCompanyAddress,
    emitterCompanyName: bsvhu.emitterCompanyName,
    emitterCompanySiret: bsvhu.emitterCompanySiret,
    emitterPickupsiteAddress: null,
    traderCompanyName: null,
    traderCompanySiret: null,
    traderRecepisseNumber: null,
    brokerCompanyName: null,
    brokerCompanySiret: null,
    brokerRecepisseNumber: null,
    destinationCompanyName: bsvhu.destinationCompanyName,
    destinationCompanySiret: bsvhu.destinationCompanySiret,
    destinationCompanyAddress: bsvhu.destinationCompanyAddress,
    emitterCompanyMail: bsvhu.emitterCompanyMail,
    ...getTransporterData(bsvhu, true)
  };
}

/**
 * BSVHU has no trader or broker so this function should not
 * be called. We implement it anyway in case it is added later on
 */
export function toManagedWaste(bsvhu: Bsvhu): Required<ManagedWaste> {
  const { __typename, ...genericWaste } = toGenericWaste(bsvhu);

  return {
    // Make sure all possible keys are in the exported sheet so that no column is missing
    ...emptyManagedWaste,
    ...genericWaste,
    traderCompanyName: null,
    traderCompanySiret: null,
    brokerCompanyName: null,
    brokerCompanySiret: null,
    destinationCompanyAddress: bsvhu.destinationCompanyAddress,
    destinationCompanyName: bsvhu.destinationCompanyName,
    destinationCompanySiret: bsvhu.destinationCompanySiret,
    destinationPlannedOperationMode: null,
    emitterCompanyAddress: bsvhu.emitterCompanyAddress,
    emitterCompanyName: bsvhu.emitterCompanyName,
    emitterCompanySiret: bsvhu.emitterCompanySiret,
    emitterPickupsiteAddress: null,
    emitterCompanyMail: bsvhu.emitterCompanyMail,
    ...getTransporterData(bsvhu)
  };
}

export function toAllWaste(bsvhu: Bsvhu): Required<AllWaste> {
  const { __typename, ...genericWaste } = toGenericWaste(bsvhu);

  return {
    // Make sure all possible keys are in the exported sheet so that no column is missing
    ...emptyAllWaste,
    ...genericWaste,
    createdAt: bsvhu.createdAt,
    destinationReceptionDate: bsvhu.destinationReceptionDate,
    brokerCompanyName: null,
    brokerCompanySiret: null,
    brokerRecepisseNumber: null,
    destinationCompanyAddress: bsvhu.destinationCompanyAddress,
    destinationCompanyName: bsvhu.destinationCompanyName,
    destinationCompanySiret: bsvhu.destinationCompanySiret,
    destinationPlannedOperationMode: null,
    emitterCompanyAddress: bsvhu.emitterCompanyAddress,
    emitterCompanyName: bsvhu.emitterCompanyName,
    emitterCompanySiret: bsvhu.emitterCompanySiret,
    emitterPickupsiteAddress: null,
    initialEmitterCompanyName: null,
    initialEmitterCompanySiret: null,
    initialEmitterCompanyAddress: null,
    weight: bsvhu.weightValue ? bsvhu.weightValue / 1000 : bsvhu.weightValue,
    traderCompanyName: null,
    traderCompanySiret: null,
    traderRecepisseNumber: null,
    emitterCompanyMail: bsvhu.emitterCompanyMail,
    ...getOperationData(bsvhu),
    ...getTransporterData(bsvhu, true)
  };
}
