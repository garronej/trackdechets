import { Bsda, BsdaType } from "@prisma/client";
import { resetDatabase } from "../../../integration-tests/helper";
import { companyFactory } from "../../__tests__/factories";
import { bsdaSchema } from "../validation";

import { bsdaFactory } from "./factories";

describe("BSDA validation", () => {
  let bsda: Bsda;

  beforeEach(async () => {
    bsda = await bsdaFactory({});
  });

  afterEach(resetDatabase);

  describe("BSDA should be valid", () => {
    test("when all data is present", async () => {
      const isValid = await bsdaSchema({}).isValid(bsda);
      expect(isValid).toBe(true);
    });

    test("when there is a foreign transporter and recepisse fields are null", async () => {
      const foreignTransporter = await companyFactory({
        orgId: "BE0541696005",
        vatNumber: "BE0541696005"
      });
      expect(
        await bsdaSchema({}).isValid({
          ...bsda,
          transporterCompanyVatNumber: foreignTransporter.vatNumber,
          transporterCompanyName: "transporteur BE",
          transporterRecepisseDepartment: null,
          transporterRecepisseNumber: null,
          transporterRecepisseIsExempted: null
        })
      ).toEqual(true);
    });

    test("when a foreign transporter vat number is specified and transporter siret is null", async () => {
      const foreignTransporter = await companyFactory({
        orgId: "BE0541696005",
        vatNumber: "BE0541696005"
      });
      const data = {
        ...bsda,
        transporterCompanySiret: null,
        transporterCompanyVatNumber: foreignTransporter.vatNumber
      };

      const isValid = await bsdaSchema({}).isValid(data);
      expect(isValid).toBe(true);
    });
  });

  describe("BSDA should not be valid", () => {
    afterEach(resetDatabase);
    test("when emitter siret is not valid", async () => {
      const data = {
        ...bsda,
        emitterCompanySiret: "1"
      };
      const validateFn = () => bsdaSchema({}).validate(data);
      await expect(validateFn()).rejects.toThrow(
        "Émetteur: 1 n'est pas un numéro de SIRET valide"
      );
    });

    test("when transporter siret is not valid", async () => {
      const data = {
        ...bsda,
        transporterCompanySiret: "1"
      };
      const validateFn = () => bsdaSchema({}).validate(data);
      await expect(validateFn()).rejects.toThrow(
        "Transporteur: 1 n'est pas un numéro de SIRET valide"
      );
    });

    test("when transporter VAT number is FR", async () => {
      const data = {
        ...bsda,
        transporterCompanyVatNumber: "FR35552049447"
      };
      const validateFn = () => bsdaSchema({}).validate(data);
      await expect(validateFn()).rejects.toThrow(
        "Transporteur : Impossible d'utiliser le numéro de TVA pour un établissement français, veuillez renseigner son SIRET uniquement"
      );
    });

    test("when transporter is not registered in Trackdéchets", async () => {
      const data = {
        ...bsda,
        transporterCompanySiret: "85001946400021"
      };
      const validateFn = () =>
        bsdaSchema({}).validate(data, { abortEarly: false });
      await expect(validateFn()).rejects.toThrow(
        "Transporteur : l'établissement avec le SIRET 85001946400021 n'est pas inscrit sur Trackdéchets"
      );
    });

    test("when transporter is registered with wrong profile", async () => {
      const company = await companyFactory({ companyTypes: ["PRODUCER"] });
      const data = {
        ...bsda,
        transporterCompanySiret: company.siret
      };
      const validateFn = () => bsdaSchema({}).validate(data);
      await expect(validateFn()).rejects.toThrow(
        `Le transporteur saisi sur le bordereau (SIRET: ${company.siret}) n'est pas inscrit sur Trackdéchets en tant qu'entreprise de transport.` +
          " Cette entreprise ne peut donc pas être visée sur le bordereau. Veuillez vous rapprocher de l'administrateur de cette entreprise pour" +
          " qu'il modifie le profil de l'établissement depuis l'interface Trackdéchets Mon Compte > Établissements"
      );
    });

    test("when foreign transporter is not registered in Trackdéchets", async () => {
      const data = {
        ...bsda,
        trasnporterCompanySiret: null,
        transporterCompanyVatNumber: "IT13029381004"
      };
      const validateFn = () => bsdaSchema({}).validate(data);
      await expect(validateFn()).rejects.toThrow(
        "Transporteur : le transporteur avec le n°de TVA IT13029381004 n'est pas inscrit sur Trackdéchets"
      );
    });

    test("when foreign transporter is registered with wrong profile", async () => {
      const company = await companyFactory({
        companyTypes: ["PRODUCER"],
        orgId: "IT13029381004",
        vatNumber: "IT13029381004"
      });
      const data = {
        ...bsda,
        transporterCompanyVatNumber: company.vatNumber
      };
      const validateFn = () => bsdaSchema({}).validate(data);
      await expect(validateFn()).rejects.toThrow(
        `Le transporteur saisi sur le bordereau (numéro de TVA: ${company.vatNumber}) n'est pas inscrit sur Trackdéchets en tant qu'entreprise de transport.` +
          " Cette entreprise ne peut donc pas être visée sur le bordereau. Veuillez vous rapprocher de l'administrateur de cette entreprise pour" +
          " qu'il modifie le profil de l'établissement depuis l'interface Trackdéchets Mon Compte > Établissements"
      );
    });

    test("when destination siret is not valid", async () => {
      const data = {
        ...bsda,
        destinationCompanySiret: "1"
      };
      const validateFn = () => bsdaSchema({}).validate(data);
      await expect(validateFn()).rejects.toThrow(
        "Destination: 1 n'est pas un numéro de SIRET valide"
      );
    });

    test("when destination is not registered in Trackdéchets", async () => {
      const data = {
        ...bsda,
        destinationCompanySiret: "85001946400021"
      };
      const validateFn = () => bsdaSchema({}).validate(data);
      await expect(validateFn()).rejects.toThrow(
        "Destination : l'établissement avec le SIRET 85001946400021 n'est pas inscrit sur Trackdéchets"
      );
    });

    test("when destination is registered with wrong profile", async () => {
      const company = await companyFactory({ companyTypes: ["PRODUCER"] });
      const data = {
        ...bsda,
        destinationCompanySiret: company.siret
      };
      const validateFn = () => bsdaSchema({}).validate(data);
      await expect(validateFn()).rejects.toThrow(
        `L'installation de destination ou d’entreposage ou de reconditionnement avec le SIRET \"${company.siret}\" n'est pas inscrite` +
          " sur Trackdéchets en tant qu'installation de traitement ou de tri transit regroupement. Cette installation ne peut donc" +
          " pas être visée sur le bordereau. Veuillez vous rapprocher de l'administrateur de cette installation pour qu'il" +
          " modifie le profil de l'établissement depuis l'interface Trackdéchets Mon Compte > Établissements"
      );
    });

    test("when there is a french transporter and recepisse fields are null", async () => {
      const transporterCompany = await companyFactory({
        companyTypes: ["TRANSPORTER"]
      });
      const data = {
        ...bsda,
        type: BsdaType.OTHER_COLLECTIONS,
        transporterCompanySiret: transporterCompany.siret,
        transporterCompanyVatNumber: null,
        transporterRecepisseIsExempted: false,
        transporterRecepisseNumber: null,
        transporterRecepisseDepartment: null
      };
      const validateFn = () =>
        bsdaSchema({ transportSignature: true }).validate(data);
      await expect(validateFn()).rejects.toThrow(
        "Transporteur: le numéro de récépissé est obligatoire"
      );
    });
  });
});
