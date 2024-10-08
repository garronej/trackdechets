/**
 * PRISMA HELPER FUNCTIONS
 */

import { prisma } from "@td/prisma";
import {
  User,
  Prisma,
  Company,
  CompanyAssociation,
  UserAccountHash,
  UserNotification,
  UserRole
} from "@prisma/client";
import {
  CompanyNotFound,
  TraderReceiptNotFound,
  BrokerReceiptNotFound,
  TransporterReceiptNotFound,
  VhuAgrementNotFound,
  WorkerCertificationNotFound
} from "./errors";
import { CompanyMember } from "../generated/graphql/types";
import { AppDataloaders } from "../types";
import { differenceInDays } from "date-fns";
import { UserInputError } from "../common/errors";
import { allFavoriteTypes } from "./types";
import { favoritesCompanyQueue } from "../queue/producers/company";
import { searchTDSireneFailFast } from "./sirenify";
import { ALL_NOTIFICATIONS, isSiret, isVat } from "@td/constants";
import {
  PartialCompanyVatSearchResult,
  searchVatFrOnlyOrNotFoundFailFast
} from "./search";
import { SireneSearchResult } from "./sirene/types";

/**
 * Retrieves a company by any unique identifier or throw a CompanyNotFound error
 */
export async function getCompanyOrCompanyNotFound(
  { id, orgId, siret }: Prisma.CompanyWhereUniqueInput,
  select?: Prisma.CompanySelect
): Promise<Company> {
  if (!id && !siret && !orgId) {
    throw new UserInputError("You should specify an id or a siret or an orgId");
  }
  let where: Prisma.CompanyWhereUniqueInput;
  if (id) {
    where = { id };
  } else if (siret) {
    where = { siret };
  } else {
    where = { orgId };
  }
  const company = await prisma.company.findUnique({
    where,
    ...(select ? { select } : {})
  });
  if (company == null) {
    throw new CompanyNotFound();
  }
  return company;
}

/**
 * Returns the ICPE associated with this company if any
 * or null otherwise
 * The table installation is generated by the `etl`
 * container where we are consolidating data
 * (join and fuzzy join) from s3ic, irep, gerep
 * and sirene to associate a siret with an ICPE
 * @param siret
 */
export function getInstallation(siret: string) {
  return prisma.installation
    .findFirst({
      where: {
        OR: [
          { s3icNumeroSiret: siret },
          { irepNumeroSiret: siret },
          { gerepNumeroSiret: siret },
          { sireneNumeroSiret: siret }
        ]
      }
    })
    .then(installation => {
      return installation ?? null;
    });
}

/**
 * Returns list of rubriques of an ICPE
 * @param codeS3ic
 */
export function getRubriques(codeS3ic: string | null | undefined) {
  if (codeS3ic) {
    return prisma.rubrique.findMany({ where: { codeS3ic } });
  }
  return Promise.resolve([]);
}

/**
 * Returns list of GEREP declarations of an ICPE
 * @param codeS3ic
 */
export function getDeclarations(codeS3ic: string | null | undefined) {
  if (codeS3ic) {
    return prisma.declaration.findMany({ where: { codeS3ic } });
  }
  return Promise.resolve([]);
}

/**
 * Returns true if user belongs to company with either
 * MEMBER or ADMIN role, false otherwise
 * @param user
 */
export async function isCompanyMember(user: User, company: Company) {
  const count = await prisma.companyAssociation.count({
    where: {
      userId: user.id,
      companyId: company.id
    }
  });

  return count >= 1;
}

/**
 * Concat active company users and invited company users
 * @param orgId
 */
export async function getCompanyUsers(
  orgId: string,
  dataloaders: AppDataloaders,
  requestingUserid: string,
  isTDAdmin?: boolean
): Promise<CompanyMember[]> {
  const activeUsers = await getCompanyActiveUsers(
    orgId,
    requestingUserid,
    isTDAdmin
  );
  const invitedUsers = await getCompanyInvitedUsers(orgId, dataloaders);

  return [...activeUsers, ...invitedUsers];
}

const DISPLAY_USER_NAME_AFTER = 7; // days
const OBFUSCATED_USER_NAME = "Temporairement masqué";
/**
 * Display user name if association is older than DISPLAY_USER_NAME_AFTER days or not automatically accepted
 * @param association
 * @returns
 */
export const userNameDisplay = (
  association: CompanyAssociation & {
    user: User;
  },
  requestingUserid?: string,
  isTDAdmin?: boolean
): string => {
  const today = new Date();
  // In the following cases, we return clear user name:
  // - default createdAt was added afterwards, we have a lot of null values in db, let's ignore them
  // - association was either manually accepted or initated by user themselves
  // - user is the requesting user calling this function
  // - requestingUserid is not provided, meaning calling function is used for non-web context (email)
  if (
    !association.createdAt ||
    !association.automaticallyAccepted ||
    association.userId === requestingUserid ||
    !requestingUserid ||
    isTDAdmin
  ) {
    return association.user.name;
  }

  // association automatically accepted, must be older than DISPLAY_USER_NAME_AFTER days
  const canDisplayUserName =
    differenceInDays(today, association.createdAt) > DISPLAY_USER_NAME_AFTER;
  if (canDisplayUserName) {
    return association.user.name;
  }
  return OBFUSCATED_USER_NAME;
};

/**
 * map a user's company association to a CompanyMember
 * @param companyAssociation
 * @param company
 * @param isTDAdmin
 */
export const userAssociationToCompanyMember = (
  companyAssociation: CompanyAssociation & { user: User },
  orgId: string,
  requestingUserId?: string,
  isTDAdmin = false
): CompanyMember => {
  return {
    ...companyAssociation.user,
    orgId: orgId,
    name: userNameDisplay(companyAssociation, requestingUserId, isTDAdmin),
    role: companyAssociation.role,
    isPendingInvitation: false,
    emailNotifications: companyAssociation.emailNotifications
  };
};

/**
 * map a user's company association to a CompanyMember
 * @param userAccountHash
 * @param company
 * @param isTDAdmin
 */
export const userAccountHashToCompanyMember = (
  userAccountHash: UserAccountHash,
  orgId: string
): CompanyMember => {
  return {
    id: userAccountHash.id,
    orgId: orgId,
    name: "Invité",
    email: userAccountHash.email,
    role: userAccountHash.role,
    isActive: false,
    isPendingInvitation: true,
    emailNotifications:
      userAccountHash.role === UserRole.ADMIN ? ALL_NOTIFICATIONS : []
  };
};

/**
 * Returns company members that already have an account in TD
 * @param siret
 */
export async function getCompanyActiveUsers(
  orgId: string,
  requestingUserId?: string,
  isTDAdmin?: boolean
): Promise<CompanyMember[]> {
  const associations = await prisma.company
    .findUniqueOrThrow({ where: { orgId } })
    .companyAssociations({ include: { user: true } });

  return associations.map(a => {
    return userAssociationToCompanyMember(
      a,
      orgId,
      requestingUserId,
      isTDAdmin
    );
  });
}

/**
 * Returns users who have been invited to join the company
 * but whose account haven't been created yet
 * @param siret
 */
export async function getCompanyInvitedUsers(
  orgId: string,
  dataloaders: AppDataloaders
): Promise<CompanyMember[]> {
  const hashes = await dataloaders.activeUserAccountHashesBySiret.load(orgId);
  return hashes.map(h => {
    return userAccountHashToCompanyMember(h, orgId);
  });
}

/**
 * Returns active company members who are admin
 * of the company
 * @param siret
 */
export async function getCompanyAdminUsers(orgId: string) {
  const users = await getCompanyActiveUsers(orgId);
  return users.filter(c => c.role === "ADMIN");
}

/**
 * Get all the admins from companies, by companyIds
 */
export async function getActiveAdminsByCompanyIds(
  companyIds: string[]
): Promise<Record<string, User[]>> {
  const users = await prisma.companyAssociation
    .findMany({
      where: {
        companyId: { in: companyIds },
        role: "ADMIN",
        user: { isActive: true }
      },
      include: { user: true }
    })
    .then(associations =>
      associations.map(a => {
        return {
          ...a.user,
          companyId: a.companyId
        };
      })
    );

  const res: Record<string, User[]> = {};

  users.forEach(user => {
    if (res[user.companyId]) res[user.companyId].push(user);
    else res[user.companyId] = [user];
  });

  return res;
}

/**
 * Get all the companies and subscribers to notification from companies, by companyOrgIds
 * Will return an object like:
 * {
 *   [ordId]: { ...company, subscribers: user[] }
 * }
 */
export const getCompaniesAndSubscribersByCompanyOrgIds = async (
  orgIds: string[],
  notification: UserNotification
): Promise<Record<string, Company & { subscribers: User[] }>> => {
  const companies = await prisma.company.findMany({
    where: { orgId: { in: orgIds } },
    include: {
      companyAssociations: {
        where: {
          emailNotifications: { has: notification },
          user: {
            isActive: true
          }
        },
        include: { user: true, company: true }
      }
    }
  });

  return companies.reduce<Record<string, Company & { subscribers: User[] }>>(
    (companiesAndAdminsByOrgId, { companyAssociations, ...company }) => ({
      ...companiesAndAdminsByOrgId,
      [company.orgId]: {
        ...company,
        subscribers: companyAssociations.map(({ user }) => user)
      }
    }),
    {}
  );
};

export async function getTraderReceiptOrNotFound({
  id
}: Prisma.TraderReceiptWhereUniqueInput) {
  const receipt = await prisma.traderReceipt.findUnique({ where: { id } });
  if (receipt == null) {
    throw new TraderReceiptNotFound();
  }
  return receipt;
}

export async function getBrokerReceiptOrNotFound({
  id
}: Prisma.BrokerReceiptWhereUniqueInput) {
  const receipt = await prisma.brokerReceipt.findUnique({ where: { id } });
  if (receipt == null) {
    throw new BrokerReceiptNotFound();
  }
  return receipt;
}

export async function getTransporterReceiptOrNotFound({
  id
}: Prisma.TransporterReceiptWhereUniqueInput) {
  const receipt = await prisma.transporterReceipt.findUnique({ where: { id } });
  if (receipt == null) {
    throw new TransporterReceiptNotFound();
  }
  return receipt;
}

export async function getVhuAgrementOrNotFound({
  id
}: Prisma.VhuAgrementWhereUniqueInput) {
  const agrement = await prisma.vhuAgrement.findUnique({ where: { id } });
  if (agrement == null) {
    throw new VhuAgrementNotFound();
  }
  return agrement;
}

export async function getWorkerCertificationOrNotFound({
  id
}: Prisma.WorkerCertificationWhereUniqueInput) {
  const agrement = await prisma.workerCertification.findUnique({
    where: { id }
  });
  if (agrement == null) {
    throw new WorkerCertificationNotFound();
  }
  return agrement;
}

export async function updateFavorites(orgIds: string[]) {
  for (const favoriteType of allFavoriteTypes) {
    await favoritesCompanyQueue.addBulk(
      orgIds.map(orgId => ({
        data: {
          orgId,
          type: favoriteType
        }
      }))
    );
  }
}

export async function getUpdatedCompanyNameAndAddress(
  company: Pick<Company, "name" | "address" | "orgId">
): Promise<Pick<Company, "name" | "address" | "codeNaf"> | null> {
  let searchResult: null | SireneSearchResult | PartialCompanyVatSearchResult =
    null;
  if (isSiret(company.orgId)) {
    searchResult = await searchTDSireneFailFast(company.orgId);
  } else if (isVat(company.orgId)) {
    searchResult = await searchVatFrOnlyOrNotFoundFailFast(company.orgId);
  }
  if (searchResult) {
    return {
      name:
        searchResult.name && searchResult.name !== company.name
          ? searchResult.name
          : company.name,
      address:
        searchResult.address && searchResult.address !== company.address
          ? searchResult.address
          : company.address,
      codeNaf: (searchResult as SireneSearchResult).naf ?? null
    };
  }
  // return existing and unchanged values
  return null;
}

/**
 * get a CompanyAssociation by orgId + userId
 * @param orgId
 * @param userId
 */
export async function getCompanyAssociation({
  orgId,
  userId
}: {
  orgId: string;
  userId: string;
}) {
  const association = await prisma.companyAssociation.findFirstOrThrow({
    where: {
      company: {
        orgId
      },
      userId
    }
  });
  return association;
}
