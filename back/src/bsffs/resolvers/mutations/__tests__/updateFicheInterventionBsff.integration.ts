import { UserRole } from ".prisma/client";
import getReadableId, { ReadableIdPrefix } from "../../../../forms/readableId";
import {
  createBsffFicheInterventionInputMock,
  Mutation,
  MutationUpdateFicheInterventionBsffArgs
} from "../../../../generated/graphql/types";
import prisma from "../../../../prisma";
import { userWithCompanyFactory } from "../../../../__tests__/factories";
import makeClient from "../../../../__tests__/testClient";
import {
  flattenFicheInterventionBsffInput,
  getFicheInterventionId
} from "../../../converter";

const UPDATE_FICHE_INTERVENTION = `
  mutation UpdateFicheIntervention($id: ID!, $numero: String!, $input: BsffFicheInterventionInput!) {
    updateFicheInterventionBsff(id: $id, numero: $numero, input: $input) {
      numero
    }
  }
`;

describe("Mutation.updateFicheInterventionBsff", () => {
  it("should allow user to update a fiche d'intervention", async () => {
    const { user, company } = await userWithCompanyFactory(UserRole.ADMIN);

    const bsffId = getReadableId(ReadableIdPrefix.FF);
    const ficheInterventionNumero = "ABCDEFGHIJK";
    const ficheInterventionId = getFicheInterventionId(
      bsffId,
      ficheInterventionNumero
    );
    await prisma.bsff.create({
      data: {
        id: bsffId,
        emitterCompanySiret: company.siret,
        ficheInterventions: {
          create: {
            id: ficheInterventionId,
            numero: ficheInterventionNumero,
            ...flattenFicheInterventionBsffInput(
              createBsffFicheInterventionInputMock({})
            )
          }
        }
      }
    });

    const { mutate } = makeClient(user);
    const { data } = await mutate<
      Pick<Mutation, "updateFicheInterventionBsff">,
      MutationUpdateFicheInterventionBsffArgs
    >(UPDATE_FICHE_INTERVENTION, {
      variables: {
        id: bsffId,
        numero: ficheInterventionNumero,
        input: createBsffFicheInterventionInputMock({})
      }
    });

    expect(data.updateFicheInterventionBsff.numero).toBeTruthy();
  });

  it("should disallow unauthenticated user to update a fiche d'intervention", async () => {
    const bsffId = getReadableId(ReadableIdPrefix.FF);
    const ficheInterventionNumero = "ABCDEFGHIJK";
    const ficheInterventionId = getFicheInterventionId(
      bsffId,
      ficheInterventionNumero
    );
    await prisma.bsff.create({
      data: {
        id: bsffId,
        ficheInterventions: {
          create: {
            id: ficheInterventionId,
            numero: ficheInterventionNumero,
            ...flattenFicheInterventionBsffInput(
              createBsffFicheInterventionInputMock({})
            )
          }
        }
      }
    });

    const { mutate } = makeClient();
    const { errors } = await mutate<
      Pick<Mutation, "updateFicheInterventionBsff">,
      MutationUpdateFicheInterventionBsffArgs
    >(UPDATE_FICHE_INTERVENTION, {
      variables: {
        id: bsffId,
        numero: ficheInterventionNumero,
        input: createBsffFicheInterventionInputMock({})
      }
    });

    expect(errors).toEqual([
      expect.objectContaining({
        extensions: {
          code: "UNAUTHENTICATED"
        }
      })
    ]);
  });

  it("should disallow user to update a fiche d'intervention on a bsff they are not part of", async () => {
    const { user } = await userWithCompanyFactory(UserRole.ADMIN);

    const bsffId = getReadableId(ReadableIdPrefix.FF);
    const ficheInterventionNumero = "ABCDEFGHIJK";
    const ficheInterventionId = getFicheInterventionId(
      bsffId,
      ficheInterventionNumero
    );
    await prisma.bsff.create({
      data: {
        id: bsffId,
        ficheInterventions: {
          create: {
            id: ficheInterventionId,
            numero: ficheInterventionNumero,
            ...flattenFicheInterventionBsffInput(
              createBsffFicheInterventionInputMock({})
            )
          }
        }
      }
    });

    const { mutate } = makeClient(user);
    const { errors } = await mutate<
      Pick<Mutation, "updateFicheInterventionBsff">,
      MutationUpdateFicheInterventionBsffArgs
    >(UPDATE_FICHE_INTERVENTION, {
      variables: {
        id: bsffId,
        numero: ficheInterventionNumero,
        input: createBsffFicheInterventionInputMock({})
      }
    });

    expect(errors).toEqual([
      expect.objectContaining({
        message:
          "Vous ne pouvez pas éditer un bordereau sur lequel le SIRET de votre entreprise n'apparaît pas."
      })
    ]);
  });

  it("should throw an error if the bsff doesn't exist", async () => {
    const { user } = await userWithCompanyFactory(UserRole.ADMIN);

    const bsffId = getReadableId(ReadableIdPrefix.FF);
    const ficheInterventionNumero = "ABCDEFGHIJK";
    const ficheInterventionId = getFicheInterventionId(
      bsffId,
      ficheInterventionNumero
    );
    await prisma.bsffFicheIntervention.create({
      data: {
        id: ficheInterventionId,
        numero: ficheInterventionNumero,
        ...flattenFicheInterventionBsffInput(
          createBsffFicheInterventionInputMock({})
        )
      }
    });

    const { mutate } = makeClient(user);
    const { errors } = await mutate<
      Pick<Mutation, "updateFicheInterventionBsff">,
      MutationUpdateFicheInterventionBsffArgs
    >(UPDATE_FICHE_INTERVENTION, {
      variables: {
        id: bsffId,
        numero: ficheInterventionNumero,
        input: createBsffFicheInterventionInputMock({})
      }
    });

    expect(errors).toEqual([
      expect.objectContaining({
        message: `Le bordereau de fluides frigorigènes n°${bsffId} n'existe pas.`
      })
    ]);
  });

  it("should throw an error if the fiche d'intervention doesn't exist", async () => {
    const { user, company } = await userWithCompanyFactory(UserRole.ADMIN);

    const bsffId = getReadableId(ReadableIdPrefix.FF);
    const ficheInterventionNumero = "ABCDEFGHIJK";
    await prisma.bsff.create({
      data: {
        id: bsffId,
        emitterCompanySiret: company.siret
      }
    });

    const { mutate } = makeClient(user);
    const { errors } = await mutate<
      Pick<Mutation, "updateFicheInterventionBsff">,
      MutationUpdateFicheInterventionBsffArgs
    >(UPDATE_FICHE_INTERVENTION, {
      variables: {
        id: bsffId,
        numero: ficheInterventionNumero,
        input: createBsffFicheInterventionInputMock({})
      }
    });

    expect(errors).toEqual([
      expect.objectContaining({
        message: `La fiche d'intervention n°${ficheInterventionNumero} n'existe pas pour le bordereau n°${bsffId}.`
      })
    ]);
  });
});
