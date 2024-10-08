import {
  CompanyInput,
  BsdasriRecepisseInput
} from "../generated/graphql/types";
import { prisma } from "@td/prisma";
import {
  Bsdasri,
  Bsvhu,
  BspaohTransporter,
  BsdaTransporter,
  BsffTransporter
} from "@prisma/client";
import { getTransporterCompanyOrgId } from "@td/constants";
import { CompanyRole } from "../common/validation/zod/schema";

type RecipifyOutput = {
  number: string | null;
  validityLimit: Date | null;
  department: string | null;
};

type RecipifyFn<T> = (input: T) => Promise<T>;

type RecepisseInputAccessor<T> = {
  getter: () => CompanyInput | null | undefined;
  setter: (input: T, recepisseInput: BsdasriRecepisseInput) => T;
};

/**
 * Search a Company.transporterReceiptId within 1 sec or throw an error
 */
export async function findCompanyFailFast(orgId: string) {
  const where = {
    where: { orgId }
  };
  // make sure we do not wait more thant 1s here to avoid bottlenecks
  const raceWith = new Promise<null>(resolve =>
    setTimeout(resolve, 1000, null)
  );

  try {
    return Promise.race([findCompany(where), raceWith]);
  } catch (e) {
    return null;
  }
}

function findCompany(where: { where: { orgId: string } }) {
  return prisma.company.findUnique({
    ...where,
    select: {
      transporterReceiptId: true
    }
  });
}

export function recipifyGeneric<T>(
  recepisseInputAccessors: (input: T) => RecepisseInputAccessor<T>[]
): RecipifyFn<T> {
  return async input => {
    const accessors = recepisseInputAccessors(input);
    const companyInputs = accessors.map(({ getter }) => getter());

    const companies = await Promise.all(
      companyInputs.map(companyInput =>
        companyInput && (companyInput.siret || companyInput.vatNumber)
          ? findCompanyFailFast(companyInput.siret ?? companyInput.vatNumber!)
          : null
      )
    );

    let completedInput = { ...input };
    for (const [idx, company] of companies.entries()) {
      const { setter } = accessors[idx];
      // if company exists, we auto-complete
      if (company) {
        let receipt: RecipifyOutput;
        if (!!company?.transporterReceiptId) {
          const dbReceipt = await prisma.transporterReceipt.findFirst({
            where: { id: company.transporterReceiptId },
            select: {
              receiptNumber: true,
              validityLimit: true,
              department: true
            }
          });
          receipt = {
            number: dbReceipt?.receiptNumber ?? null,
            validityLimit: dbReceipt?.validityLimit ?? null,
            department: dbReceipt?.department ?? null
          };
        } else {
          receipt = {
            number: null,
            validityLimit: null,
            department: null
          };
        }

        completedInput = setter(completedInput, receipt);
      }
    }

    return completedInput;
  };
}

export interface BsdTransporterReceiptPart {
  transporterRecepisseNumber: string | null;
  transporterRecepisseDepartment: string | null;
  transporterRecepisseValidityLimit: Date | null;
}

export async function getTransporterReceipt(
  existingBsd:
    | Bsdasri
    | Bsvhu
    | BsdaTransporter
    | BsffTransporter
    | BspaohTransporter
): Promise<BsdTransporterReceiptPart> {
  // fetch TransporterReceipt
  const orgId = getTransporterCompanyOrgId(existingBsd);
  let transporterReceipt;
  if (orgId) {
    transporterReceipt = await prisma.company
      .findUnique({
        where: { orgId }
      })
      .transporterReceipt();
  }
  return {
    transporterRecepisseNumber: transporterReceipt?.receiptNumber ?? null,
    transporterRecepisseDepartment: transporterReceipt?.department ?? null,
    transporterRecepisseValidityLimit: transporterReceipt?.validityLimit ?? null
  };
}

type Receipt = {
  receiptNumber: string;
  validityLimit: Date;
  department: string;
};

export type RecipifyInputAccessor<T> = {
  role: CompanyRole.Transporter | CompanyRole.Broker | CompanyRole.Trader;
  skip: boolean;
  orgIdGetter: () => string | null;
  setter: (input: T, receipt: Receipt | null) => Promise<void>;
};

export const buildRecipify = async <T>(
  accessors: RecipifyInputAccessor<T>[],
  bsd: T
): Promise<T> => {
  const recipifiedBsd = { ...bsd };
  for (const { role, skip, setter, orgIdGetter } of accessors) {
    if (skip) {
      continue;
    }
    let receipt: Receipt | null = null;
    const orgId = orgIdGetter();
    if (!orgId) {
      continue;
    }
    if (role === CompanyRole.Transporter) {
      try {
        receipt = await prisma.company
          .findUnique({
            where: {
              orgId
            }
          })
          .transporterReceipt();
      } catch (error) {
        // do nothing
      }
    } else if (role === CompanyRole.Broker) {
      try {
        receipt = await prisma.company
          .findUnique({
            where: {
              orgId
            }
          })
          .brokerReceipt();
      } catch (error) {
        // do nothing
      }
    } else if (role === CompanyRole.Trader) {
      try {
        receipt = await prisma.company
          .findUnique({
            where: {
              orgId
            }
          })
          .traderReceipt();
      } catch (error) {
        // do nothing
      }
    }
    setter(recipifiedBsd, receipt);
  }

  return recipifiedBsd;
};
