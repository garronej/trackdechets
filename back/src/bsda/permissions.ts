import { User, Bsda, BsdaStatus } from "@prisma/client";
import { ForbiddenError, UserInputError } from "apollo-server-express";
import { NotFormContributor } from "../forms/errors";
import { getUserSirets } from "../common/cache";

import prisma from "../prisma";

type BsdaContributors = Pick<
  Bsda,
  | "emitterCompanySiret"
  | "destinationCompanySiret"
  | "transporterCompanySiret"
  | "workerCompanySiret"
  | "brokerCompanySiret"
>;

export const BSDA_CONTRIBUTORS_FIELDS: Record<string, keyof BsdaContributors> =
  {
    emitter: "emitterCompanySiret",
    destination: "destinationCompanySiret",
    transporter: "transporterCompanySiret",
    worker: "workerCompanySiret",
    broker: "brokerCompanySiret"
  };

export async function checkIsBsdaContributor(
  user: User,
  form: Partial<BsdaContributors>,
  errorMsg: string
) {
  const isContributor = await isBsdaContributor(user, form);

  if (!isContributor) {
    throw new NotFormContributor(errorMsg);
  }

  return true;
}

export async function isBsdaContributor(user: User, form: Partial<Bsda>) {
  const userSirets = await getUserSirets(user.id);

  const formSirets = Object.values(BSDA_CONTRIBUTORS_FIELDS).map(
    field => form[field]
  );

  const siretsInCommon = userSirets.filter(siret => formSirets.includes(siret));

  return siretsInCommon.length;
}

export async function checkCanDeleteBsda(user: User, form: Bsda) {
  await checkIsBsdaContributor(
    user,
    form,
    "Vous n'êtes pas autorisé à supprimer ce bordereau."
  );

  if (form.status !== BsdaStatus.INITIAL) {
    throw new ForbiddenError(
      "Seuls les bordereaux en brouillon ou n'ayant pas encore été signés peuvent être supprimés"
    );
  }

  return true;
}

export async function checkCanAssociateBsdas(ids: string[]) {
  if (!ids || ids.length === 0) {
    return;
  }

  const bsdas = await prisma.bsda.findMany({
    where: {
      id: {
        in: ids
      }
    }
  });

  if (bsdas.some(bsda => bsda.status !== "AWAITING_CHILD")) {
    throw new UserInputError(
      `Les bordereaux ne peuvent pas être associés à un bordereau enfant.`
    );
  }
}
