import { applyAuthStrategies, AuthType } from "../../../auth";
import { removeEmptyKeys } from "../../../common/converter";
import { checkIsAuthenticated } from "../../../common/permissions";
import {
  MutationUpdateWorkerCertificationArgs,
  UpdateWorkerCertificationInput
} from "../../../generated/graphql/types";
import { prisma } from "@td/prisma";
import { GraphQLContext } from "../../../types";
import { getWorkerCertificationOrNotFound } from "../../database";
import { checkCanReadUpdateDeleteWorkerCertification } from "../../permissions";
import { workerCertificationSchema } from "./createWorkerCertification";

const cleanupCertificate = (
  input: Omit<UpdateWorkerCertificationInput, "id">
) => {
  return {
    ...removeEmptyKeys(input),
    certificationNumber: null,
    organisation: null,
    validityLimit: null
  };
};

export async function updateWorkerCertification(
  _,
  { input }: MutationUpdateWorkerCertificationArgs,
  context: GraphQLContext
) {
  applyAuthStrategies(context, [AuthType.Session]);
  const user = checkIsAuthenticated(context);
  const { id, ...data } = input;

  const hasNoSubSectionThree = input.hasSubSectionThree === false;

  const certification = await getWorkerCertificationOrNotFound({ id });
  await checkCanReadUpdateDeleteWorkerCertification(user, certification);
  await workerCertificationSchema.validate(input);

  // when SubSectionThree is explictily removed, we have to reset certificate data otherwise
  // bsda mutations will be forbidden
  return prisma.workerCertification.update({
    data: hasNoSubSectionThree
      ? cleanupCertificate(data)
      : removeEmptyKeys(data),
    where: { id: certification.id }
  });
}
