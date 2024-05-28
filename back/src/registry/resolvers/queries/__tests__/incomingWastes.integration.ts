import {
  Form,
  Bsda,
  Bsdasri,
  BsdaStatus,
  BsdasriStatus,
  Bsff,
  Bsvhu,
  Bspaoh,
  BspaohStatus,
  BsvhuStatus,
  Company,
  Status,
  User,
  UserRole,
  GovernmentPermission
} from "@prisma/client";
import {
  refreshElasticSearch,
  resetDatabase
} from "../../../../../integration-tests/helper";
import { getBsdaForElastic, indexBsda } from "../../../../bsda/elastic";
import { bsdaFactory } from "../../../../bsda/__tests__/factories";
import {
  getBsdasriForElastic,
  indexBsdasri
} from "../../../../bsdasris/elastic";

import { bsdasriFactory } from "../../../../bsdasris/__tests__/factories";
import { getBsffForElastic, indexBsff } from "../../../../bsffs/elastic";
import { createBsffAfterOperation } from "../../../../bsffs/__tests__/factories";
import { indexBsvhu } from "../../../../bsvhu/elastic";
import { bsvhuFactory } from "../../../../bsvhu/__tests__/factories.vhu";
import { getFormForElastic, indexForm } from "../../../../forms/elastic";
import { bspaohFactory } from "../../../../bspaoh/__tests__/factories";
import { getBspaohForElastic, indexBspaoh } from "../../../../bspaoh/elastic";
import { Query } from "../../../../generated/graphql/types";
import {
  companyFactory,
  formFactory,
  formWithTempStorageFactory,
  siretify,
  userWithAccessTokenFactory,
  userWithCompanyFactory
} from "../../../../__tests__/factories";
import makeClient from "../../../../__tests__/testClient";
import { INCOMING_WASTES } from "./queries";
import supertest from "supertest";
import { app } from "../../../../server";
import { faker } from "@faker-js/faker";

describe("Incoming wastes registry", () => {
  let emitter: { user: User; company: Company };
  let transporter: { user: User; company: Company };
  let destination: { user: User; company: Company };
  let destination2: { user: User; company: Company };

  let bsd1: Form;
  let bsd2: Bsda;
  let bsd3: Bsdasri;
  let bsd4: Bsvhu;
  let bsd5: Bsff;
  let bsd6: Bspaoh;

  const OLD_ENV = process.env;

  beforeAll(async () => {
    emitter = await userWithCompanyFactory(UserRole.ADMIN, {
      companyTypes: {
        set: ["PRODUCER"]
      }
    });

    transporter = await userWithCompanyFactory(UserRole.ADMIN, {
      companyTypes: {
        set: ["TRANSPORTER"]
      }
    });

    destination = await userWithCompanyFactory(UserRole.ADMIN, {
      companyTypes: {
        set: ["WASTEPROCESSOR"]
      }
    });

    destination2 = await userWithCompanyFactory(UserRole.ADMIN, {
      companyTypes: {
        set: ["WASTEPROCESSOR"]
      }
    });

    bsd1 = await formFactory({
      ownerId: emitter.user.id,
      opt: {
        emitterCompanySiret: emitter.company.siret,
        recipientCompanySiret: destination.company.siret,
        wasteDetailsCode: "05 01 02*",
        status: Status.PROCESSED,
        quantityReceived: 1000,
        createdAt: new Date("2021-04-01"),
        sentAt: new Date("2021-04-01"),
        takenOverAt: new Date("2021-04-01"),
        receivedAt: new Date("2021-04-01"),
        processedAt: new Date("2021-04-01"),
        processingOperationDone: "R 1",
        transporters: {
          create: {
            transporterCompanySiret: transporter.company.siret,
            number: 1
          }
        }
      }
    });
    bsd2 = await bsdaFactory({
      opt: {
        emitterCompanySiret: emitter.company.siret,
        destinationCompanySiret: destination.company.siret,
        wasteCode: "08 01 17*",
        status: BsdaStatus.PROCESSED,
        createdAt: new Date("2021-05-01"),
        destinationReceptionWeight: 500,
        emitterEmissionSignatureDate: new Date("2021-05-01"),
        transporterTransportSignatureDate: new Date("2021-05-01"),
        destinationReceptionDate: new Date("2021-05-01"),
        destinationOperationSignatureDate: new Date("2021-05-01"),
        destinationOperationDate: new Date("2021-05-01"),
        destinationOperationCode: "D 5"
      },
      transporterOpt: {
        transporterCompanySiret: transporter.company.siret,
        transporterTransportSignatureDate: new Date("2021-05-01"),
        transporterTransportTakenOverAt: new Date("2021-05-01")
      }
    });
    bsd3 = await bsdasriFactory({
      opt: {
        emitterCompanySiret: emitter.company.siret,
        transporterCompanySiret: transporter.company.siret,
        destinationCompanySiret: destination.company.siret,
        wasteCode: "18 01 03*",
        status: BsdasriStatus.PROCESSED,
        createdAt: new Date("2021-06-01"),
        destinationReceptionWasteWeightValue: 10,
        emitterEmissionSignatureDate: new Date("2021-06-01"),
        transporterTakenOverAt: new Date("2021-06-01"),
        transporterTransportSignatureDate: new Date("2021-06-01"),
        destinationReceptionDate: new Date("2021-06-01"),
        destinationReceptionSignatureDate: new Date("2021-06-01"),
        destinationOperationDate: new Date("2021-06-01"),
        destinationOperationCode: "R 13"
      }
    });
    bsd4 = await bsvhuFactory({
      opt: {
        emitterCompanySiret: emitter.company.siret,
        transporterCompanySiret: transporter.company.siret,
        destinationCompanySiret: destination.company.siret,
        wasteCode: "16 01 04*",
        status: BsvhuStatus.PROCESSED,
        createdAt: new Date("2021-07-01"),
        destinationReceptionWeight: 3000,
        emitterEmissionSignatureDate: new Date("2021-07-01"),
        transporterTransportSignatureDate: new Date("2021-07-01"),
        transporterTransportTakenOverAt: new Date("2021-07-01"),
        destinationReceptionDate: new Date("2021-07-01"),
        destinationOperationSignatureDate: new Date("2021-07-01"),
        destinationOperationDate: new Date("2021-07-01"),
        destinationOperationCode: "R 8"
      }
    });
    bsd5 = await createBsffAfterOperation(
      {
        emitter,
        transporter,
        destination
      },
      {
        data: {
          wasteCode: "14 06 01*",
          createdAt: new Date("2021-08-01"),
          emitterEmissionSignatureDate: new Date("2021-08-01"),
          transporterTransportSignatureDate: new Date("2021-08-01"),
          destinationReceptionDate: new Date("2021-08-01")
        },
        packagingData: {
          acceptationWeight: 200,
          acceptationDate: new Date("2021-08-01"),
          operationCode: "R2",
          operationSignatureDate: new Date("2021-08-01")
        },
        transporterData: {
          transporterTransportTakenOverAt: new Date("2021-08-01")
        }
      }
    );
    bsd6 = await bspaohFactory({
      opt: {
        status: BspaohStatus.PROCESSED,
        emitterCompanySiret: emitter.company.siret,

        destinationCompanySiret: destination.company.siret,

        destinationReceptionDate: new Date("2021-09-01"),
        destinationReceptionSignatureDate: new Date("2021-09-01"),
        destinationOperationDate: new Date("2021-09-01"),
        destinationOperationCode: "D 10",
        transporterTransportTakenOverAt: new Date("2021-09-02"),
        transporters: {
          create: {
            number: 1,
            transporterCompanySiret: transporter.company.siret
          }
        }
      }
    });
    await Promise.all([
      indexForm(await getFormForElastic(bsd1)),
      indexBsda(await getBsdaForElastic(bsd2)),
      indexBsdasri(await getBsdasriForElastic(bsd3)),
      indexBsvhu(bsd4),
      indexBsff(await getBsffForElastic(bsd5)),
      indexBspaoh(await getBspaohForElastic(bsd6))
    ]);
    await refreshElasticSearch();
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  afterAll(resetDatabase);

  it("should return an error if the user is not authenticated", async () => {
    const { query } = makeClient();
    const { errors } = await query<Pick<Query, "incomingWastes">>(
      INCOMING_WASTES,
      {
        variables: {
          sirets: [destination.company.siret]
        }
      }
    );
    expect(errors).toHaveLength(1);
    expect(errors[0]).toEqual(
      expect.objectContaining({
        message: "Vous n'êtes pas connecté."
      })
    );
  });

  it("should return an error when querying a SIRET the user is not member of", async () => {
    const { query } = makeClient(destination.user);
    const { errors } = await query<Pick<Query, "incomingWastes">>(
      INCOMING_WASTES,
      {
        variables: {
          sirets: [destination2.company.siret]
        }
      }
    );
    expect(errors).toHaveLength(1);
    expect(errors[0]).toEqual(
      expect.objectContaining({
        message: `Vous n'êtes pas autorisé à accéder au registre de l'établissement portant le n°SIRET ${destination2.company.siret}`
      })
    );
  });

  it("should paginate forward with first and after", async () => {
    const { query } = makeClient(destination.user);
    const { data: page1 } = await query<Pick<Query, "incomingWastes">>(
      INCOMING_WASTES,
      {
        variables: { sirets: [destination.company.siret], first: 2 }
      }
    );
    let ids = page1.incomingWastes.edges.map(edge => edge.node.id);
    expect(ids).toEqual([bsd1.readableId, bsd2.id]);
    expect(page1.incomingWastes.totalCount).toEqual(6);
    expect(page1.incomingWastes.pageInfo.endCursor).toEqual(bsd2.id);
    expect(page1.incomingWastes.pageInfo.hasNextPage).toEqual(true);

    const { data: page2 } = await query<Pick<Query, "incomingWastes">>(
      INCOMING_WASTES,
      {
        variables: {
          sirets: [destination.company.siret],
          first: 2,
          after: page1.incomingWastes.pageInfo.endCursor
        }
      }
    );

    ids = page2.incomingWastes.edges.map(edge => edge.node.id);
    expect(ids).toEqual([bsd3.id, bsd4.id]);
    expect(page2.incomingWastes.totalCount).toEqual(6);
    expect(page2.incomingWastes.pageInfo.endCursor).toEqual(bsd4.id);
    expect(page2.incomingWastes.pageInfo.hasNextPage).toEqual(true);

    const { data: page3 } = await query<Pick<Query, "incomingWastes">>(
      INCOMING_WASTES,
      {
        variables: {
          sirets: [destination.company.siret],
          first: 2,
          after: page2.incomingWastes.pageInfo.endCursor
        }
      }
    );
    ids = page3.incomingWastes.edges.map(edge => edge.node.id);
    expect(ids).toEqual([bsd5.id, bsd6.id]);

    expect(page3.incomingWastes.totalCount).toEqual(6);
    expect(page3.incomingWastes.pageInfo.endCursor).toEqual(bsd6.id);
    expect(page3.incomingWastes.pageInfo.hasNextPage).toEqual(false);
  });

  it("should paginate backward with last and before", async () => {
    const { query } = makeClient(destination.user);
    const { data: page1 } = await query<Pick<Query, "incomingWastes">>(
      INCOMING_WASTES,
      {
        variables: { sirets: [destination.company.siret], last: 2 }
      }
    );
    let ids = page1.incomingWastes.edges.map(edge => edge.node.id);
    expect(ids).toEqual([bsd5.id, bsd6.id]);
    expect(page1.incomingWastes.totalCount).toEqual(6);
    expect(page1.incomingWastes.pageInfo.startCursor).toEqual(bsd5.id);
    expect(page1.incomingWastes.pageInfo.hasPreviousPage).toEqual(true);

    const { data: page2 } = await query<Pick<Query, "incomingWastes">>(
      INCOMING_WASTES,
      {
        variables: {
          sirets: [destination.company.siret],
          last: 2,
          before: page1.incomingWastes.pageInfo.startCursor
        }
      }
    );
    ids = page2.incomingWastes.edges.map(edge => edge.node.id);
    expect(ids).toEqual([bsd3.id, bsd4.id]);
    expect(page2.incomingWastes.totalCount).toEqual(6);
    expect(page2.incomingWastes.pageInfo.startCursor).toEqual(bsd3.id);
    expect(page2.incomingWastes.pageInfo.hasPreviousPage).toEqual(true);

    const { data: page3 } = await query<Pick<Query, "incomingWastes">>(
      INCOMING_WASTES,
      {
        variables: {
          sirets: [destination.company.siret],
          last: 2,
          before: page2.incomingWastes.pageInfo.startCursor
        }
      }
    );
    ids = page3.incomingWastes.edges.map(edge => edge.node.id);
    expect(ids).toEqual([bsd1.readableId, bsd2.id]);
    expect(page3.incomingWastes.totalCount).toEqual(6);
    expect(page3.incomingWastes.pageInfo.startCursor).toEqual(bsd1.id);
    expect(page3.incomingWastes.pageInfo.hasPreviousPage).toEqual(false);
  });

  it("should hide initial emitter info and returns only postal codes", async () => {
    const { company: destination, user: userDestination } =
      await userWithCompanyFactory(UserRole.MEMBER);
    const { company: emitter, user: userEmitter } =
      await userWithCompanyFactory(UserRole.MEMBER, {
        address: "8 rue des Lilas, 07100 Annonay"
      });
    const ttr = await companyFactory();
    const form = await formWithTempStorageFactory({
      ownerId: userEmitter.id,
      opt: {
        emitterCompanySiret: emitter.siret,
        emitterCompanyAddress: emitter.address,
        recipientCompanySiret: ttr.siret,
        status: Status.PROCESSED,
        receivedAt: new Date(),
        processedAt: new Date()
      },
      forwardedInOpts: {
        emitterCompanySiret: ttr.siret,
        emitterCompanyName: ttr.name,
        recipientCompanySiret: destination.siret,
        receivedAt: new Date()
      }
    });
    await indexForm(await getFormForElastic(form));
    await refreshElasticSearch();
    const { query } = makeClient(userDestination);
    const { data } = await query<Pick<Query, "incomingWastes">>(
      INCOMING_WASTES,
      {
        variables: {
          sirets: [destination.siret]
        }
      }
    );
    expect(data.incomingWastes.edges).toHaveLength(1);
    const incomingWaste = data.incomingWastes.edges.map(e => e.node)[0];
    expect(incomingWaste.emitterCompanySiret).toEqual(ttr.siret);
    expect(incomingWaste.initialEmitterCompanySiret).toBeNull();
    expect(incomingWaste.initialEmitterCompanyName).toBeNull();
    expect(incomingWaste.initialEmitterPostalCodes).toEqual(["07100"]);
  });

  it("should allow user to request any siret if authenticated from a service account", async () => {
    const request = supertest(app);

    const allowedIP = faker.internet.ipv4();

    const { accessToken } = await userWithAccessTokenFactory({
      governmentAccount: {
        create: {
          name: "RDNTS",
          permissions: [GovernmentPermission.REGISTRY_CAN_READ_ALL],
          authorizedOrgIds: ["ALL"],
          authorizedIPs: [allowedIP]
        }
      }
    });

    const res = await request
      .post("/")
      .send({
        query: `{ incomingWastes(sirets: ["${destination.company.siret}"]) { totalCount } }`
      })
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Forwarded-For", allowedIP);

    expect(res.body).toEqual({ data: { incomingWastes: { totalCount: 6 } } });
  });

  it("should allow user to request any siret if authenticated from a service account and orgId is specified in white list", async () => {
    const request = supertest(app);

    const allowedIP = faker.internet.ipv4();

    const { accessToken } = await userWithAccessTokenFactory({
      governmentAccount: {
        create: {
          name: "RDNTS",
          permissions: [GovernmentPermission.REGISTRY_CAN_READ_ALL],
          authorizedOrgIds: [destination.company!.siret!],
          authorizedIPs: [allowedIP]
        }
      }
    });

    const res = await request
      .post("/")
      .send({
        query: `{ incomingWastes(sirets: ["${destination.company.siret}"]) { totalCount } }`
      })
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Forwarded-For", allowedIP);

    expect(res.body).toEqual({ data: { incomingWastes: { totalCount: 6 } } });
  });

  it("should not accept service account connection from IP address not in the white list", async () => {
    const request = supertest(app);

    const allowedIP = faker.internet.ipv4();
    const forbiddenIP = faker.internet.ipv4();

    const { accessToken } = await userWithAccessTokenFactory({
      governmentAccount: {
        create: {
          name: "RDNTS",
          permissions: [GovernmentPermission.REGISTRY_CAN_READ_ALL],
          authorizedOrgIds: ["ALL"],
          authorizedIPs: [allowedIP]
        }
      }
    });

    const res = await request
      .post("/")
      .send({
        query: `{ incomingWastes(sirets: ["${destination.company.siret}"]) { totalCount } }`
      })
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Forwarded-For", forbiddenIP);

    expect(res.body).toEqual({
      data: null,
      errors: [
        expect.objectContaining({
          message: `Vous n'êtes pas autorisé à accéder au registre de l'établissement portant le n°SIRET ${destination.company.siret}`
        })
      ]
    });
  });

  it("should not accept service account connection from allowed IP if the orgId does not match", async () => {
    const request = supertest(app);

    const allowedIP = faker.internet.ipv4();

    const { accessToken } = await userWithAccessTokenFactory({
      governmentAccount: {
        create: {
          name: "RDNTS",
          permissions: [GovernmentPermission.REGISTRY_CAN_READ_ALL],
          authorizedOrgIds: [siretify()], // only allowed for another orgId
          authorizedIPs: [allowedIP]
        }
      }
    });

    const res = await request
      .post("/")
      .send({
        query: `{ incomingWastes(sirets: ["${destination.company.siret}"]) { totalCount } }`
      })
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Forwarded-For", allowedIP);

    expect(res.body).toEqual({
      data: null,
      errors: [
        expect.objectContaining({
          message: `Vous n'êtes pas autorisé à accéder au registre de l'établissement portant le n°SIRET ${destination.company.siret}`
        })
      ]
    });
  });
});
