import { Company, Prisma, TransportMode, User } from ".prisma/client";
import getReadableId, { ReadableIdPrefix } from "../../forms/readableId";
import prisma from "../../prisma";
import { PACKAGING_TYPE, WASTE_CODES } from "../constants";
import { getFicheInterventionId } from "../converter";

interface UserAndCompany {
  user: User;
  company: Company;
}

export function createBsff(
  {
    emitter,
    transporter,
    destination,
    ficheInterventions
  }: {
    emitter?: UserAndCompany;
    transporter?: UserAndCompany;
    destination?: UserAndCompany;
    ficheInterventions?: Prisma.BsffFicheInterventionCreateInput[];
  } = {},
  initialData: Partial<Prisma.BsffCreateInput> = {}
) {
  const data = {
    id: getReadableId(ReadableIdPrefix.FF),
    ...initialData
  };

  if (emitter) {
    Object.assign(data, {
      emitterCompanyName: emitter.company.name,
      emitterCompanySiret: emitter.company.siret,
      emitterCompanyAddress: emitter.company.address,
      emitterCompanyContact: emitter.user.name,
      emitterCompanyPhone: emitter.company.contactPhone,
      emitterCompanyMail: emitter.company.contactEmail
    });
  }

  if (transporter) {
    Object.assign(data, {
      transporterCompanyName: transporter.company.name,
      transporterCompanySiret: transporter.company.siret,
      transporterCompanyAddress: transporter.company.address,
      transporterCompanyContact: transporter.user.name,
      transporterCompanyPhone: transporter.company.contactPhone,
      transporterCompanyMail: transporter.company.contactEmail
    });
  }

  if (destination) {
    Object.assign(data, {
      destinationCompanyName: destination.company.name,
      destinationCompanySiret: destination.company.siret,
      destinationCompanyAddress: destination.company.address,
      destinationCompanyContact: destination.user.name,
      destinationCompanyPhone: destination.company.contactPhone,
      destinationCompanyMail: destination.company.contactEmail
    });
  }

  if (ficheInterventions) {
    Object.assign(data, {
      ficheInterventions: {
        create: ficheInterventions.map(ficheIntervention => ({
          id: getFicheInterventionId(data.id, ficheIntervention.numero),
          ...ficheIntervention
        }))
      }
    });
  }

  return prisma.bsff.create({ data });
}

export function createBsffBeforeEmission(
  {
    emitter,
    transporter,
    destination
  }: {
    emitter: UserAndCompany;
    transporter?: UserAndCompany;
    destination?: UserAndCompany;
  },
  initialData: Partial<Prisma.BsffCreateInput> = {}
) {
  return createBsff(
    { emitter, transporter, destination },
    {
      wasteCode: WASTE_CODES[0],
      wasteDescription: "Fluides",
      quantityKilos: 1,
      ...initialData
    }
  );
}

export function createBsffAfterEmission(
  {
    emitter,
    transporter,
    destination
  }: {
    emitter: UserAndCompany;
    transporter?: UserAndCompany;
    destination?: UserAndCompany;
  },
  initialData: Partial<Prisma.BsffCreateInput> = {}
) {
  return createBsffBeforeEmission(
    { emitter, transporter, destination },
    {
      emitterEmissionSignatureAuthor: emitter.user.name,
      emitterEmissionSignatureDate: new Date().toISOString(),
      ...initialData
    }
  );
}

export function createBsffBeforeTransport(
  {
    emitter,
    transporter,
    destination
  }: {
    emitter: UserAndCompany;
    transporter: UserAndCompany;
    destination?: UserAndCompany;
  },
  initialData: Partial<Prisma.BsffCreateInput> = {}
) {
  return createBsffAfterEmission(
    { emitter, transporter, destination },
    {
      packagings: [{ type: PACKAGING_TYPE.BOUTEILLE, numero: "01", litres: 1 }],
      wasteAdr: "Mention ADR",
      transporterTransportMode: TransportMode.ROAD,
      ...initialData
    }
  );
}
