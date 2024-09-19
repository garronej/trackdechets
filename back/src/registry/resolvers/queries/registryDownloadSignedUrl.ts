import { prisma } from "@td/prisma";
import { getSignedUrlForDownload } from "@td/registry";
import { ForbiddenError } from "../../../common/errors";
import { checkIsAuthenticated } from "../../../common/permissions";
import { QueryRegistryDownloadSignedUrlArgs } from "../../../generated/graphql/types";
import { GraphQLContext } from "../../../types";
import { getUserCompanies } from "../../../users/database";

export async function registryDownloadSignedUrl(
  _,
  { importId, target }: QueryRegistryDownloadSignedUrlArgs,
  context: GraphQLContext
) {
  const user = checkIsAuthenticated(context);
  const userCompanies = await getUserCompanies(user.id);

  const canReportForAssociations = [
    ...userCompanies.map(c => [c.orgId, c.orgId])
    // TODO add delegations combinations
  ];

  const registryImport = await prisma.registryImport.findUniqueOrThrow({
    where: { id: importId },
    include: { associations: true }
  });

  if (
    !registryImport.associations.some(a =>
      canReportForAssociations.some(
        can => can[0] === a.reportedFor && can[1] === a.reportedAs
      )
    )
  ) {
    throw new ForbiddenError(
      "Vous n'avez pas les droits pour consulter cet import."
    );
  }

  const key =
    target === "ERROR_FILE" ? `${importId}.csv` : registryImport.s3FileKey;
  const bucketName =
    target === "ERROR_FILE"
      ? process.env.S3_REGISTRY_ERRORS_BUCKET!
      : process.env.S3_REGISTRY_IMPORTS_BUCKET!;

  const signedUrl = await getSignedUrlForDownload({
    bucketName,
    key
  });

  return { fileKey: key, signedUrl };
}
