import {
  string,
  object,
  date,
  number,
  array,
  boolean,
  setLocale,
  LocaleObject
} from "yup";

setLocale({
  mixed: {
    default: "${path} est invalide",
    required: "${path} est un champ requis et doit avoir une valeur",
    notType: "${path} ne peut pas être null"
  }
} as LocaleObject);

export const companySchema = (type: string) =>
  object().shape({
    name: string().required(`${type}: Le nom de l'entreprise est obligatoire`),
    siret: string().required(
      `${type}: La sélection d'une entreprise par SIRET est obligatoire`
    ),
    address: string().required(
      `${type}: L'adresse d'une entreprise est obligatoire`
    ),
    contact: string().required(
      `${type}: Le contact dans l'entreprise est obligatoire`
    ),
    phone: string().required(
      `${type}: Le téléphone de l'entreprise est obligatoire`
    ),
    mail: string().required(`${type}: L'email de l'entreprise est obligatoire`)
  });

const packagingSchema = string().matches(/(FUT|GRV|CITERNE|BENNE|AUTRE)/);

export const formSchema = object<any>().shape({
  id: string()
    .label("Identifiant (id)")
    .required(),
  emitter: object().shape({
    type: string().matches(/(PRODUCER|OTHER|APPENDIX2)/),
    workSite: object({
      name: string().nullable(),
      address: string().nullable(),
      city: string().nullable(),
      postalCode: string().nullable(),
      infos: string().nullable()
    }).nullable(),
    company: companySchema("Émetteur")
  }),
  recipient: object().shape({
    processingOperation: string()
      .label("Opération de traitement")
      .required(),
    cap: string().nullable(true),
    company: companySchema("Destinataire")
  }),
  transporter: object().shape({
    isExemptedOfReceipt: boolean().nullable(true),
    receipt: string().when(
      "isExemptedOfReceipt",
      (isExemptedOfReceipt, schema) =>
        isExemptedOfReceipt
          ? schema.nullable(true)
          : schema.required(
              "Vous n'avez pas précisé bénéficier de l'exemption de récépissé, il est donc est obligatoire"
            )
    ),
    department: string().when(
      "isExemptedOfReceipt",
      (isExemptedOfReceipt, schema) =>
        isExemptedOfReceipt
          ? schema.nullable(true)
          : schema.required("Le département du transporteur est obligatoire")
    ),
    validityLimit: date().nullable(true),
    numberPlate: string().nullable(true),
    company: companySchema("Transporteur")
  }),
  wasteDetails: object().shape({
    code: string().required("Code déchet manquant"),
    onuCode: string(),
    packagings: array().of(packagingSchema),
    otherPackaging: string().nullable(true),
    numberOfPackages: number()
      .integer()
      .min(1, "Le nombre de colis doit être supérieur à 0")
      .nullable(true),
    quantity: number().min(0, "La quantité doit être supérieure à 0"),
    quantityType: string().matches(
      /(REAL|ESTIMATED)/,
      "Le type de quantité (réelle ou estimée) doit être précisé"
    ),
    consistence: string().matches(
      /(SOLID|LIQUID|GASEOUS)/,
      "La consistance du déchet doit être précisée"
    )
  }),
  ecoOrganisme: object().when("emitter", {
    is: e => e.type === "OTHER",
    then: object({ id: string().nullable() }).nullable(),
    otherwise: object()
      .test(
        "is-not-set",
        "${path} ne peut avoir une valeur que si l'émetteur est de type `Autre détenteur`",
        value => value?.id == null
      )
      .nullable()
  })
});
