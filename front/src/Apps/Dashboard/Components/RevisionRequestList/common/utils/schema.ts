import { z } from "zod";
import {
  getInitialBroker,
  getInitialTrader
} from "../../../../../../form/bsdd/utils/initial-state";
import { ALL_WASTES } from "@td/constants";

export const initialDasriReview = {
  emitter: {
    pickupSite: {
      name: null,
      address: null,
      city: null,
      postalCode: null,
      infos: null
    }
  },
  destination: {
    reception: { packagings: null },
    operation: {
      weight: null,
      code: null,
      mode: null
    }
  },
  waste: { code: null },
  comment: ""
};

const bsdasriPackagingSchema = z
  .object({
    type: z.enum(
      [
        "BOITE_CARTON",
        "FUT",
        "BOITE_PERFORANTS",
        "GRAND_EMBALLAGE",
        "GRV",
        "AUTRE"
      ],
      {
        required_error: "Ce champ est requis",
        invalid_type_error: "Ce champ est requis"
      }
    ),
    other: z.string(),
    volume: z.coerce
      .number()
      .positive("Ce champ est requis est doit être supérieur à 0"),

    quantity: z.coerce
      .number()
      .positive("Ce champ est requis est doit être supérieur à 0")
  })
  .superRefine((values, context) => {
    if (values.type === "AUTRE" && !values.other) {
      context.addIssue({
        code: z.ZodIssueCode.custom,

        message: "Veuillez préciser le conditionnement",

        path: ["other"]
      });
    }
  });

export const getDasriSchema = () =>
  z.object({
    emitter: z
      .object({
        pickupSite: z.object({
          name: z.string().nullish(),
          address: z.string().nullish(),
          city: z.string().nullish(),
          postalCode: z.string().nullish(),
          infos: z.string().nullish()
        })
      })
      .nullish(),
    destination: z
      .object({
        reception: z.object({
          packagings: z.array(bsdasriPackagingSchema).nullish()
        }),
        operation: z.object({
          weight: z.coerce.number().nonnegative().nullish(),

          code: z.string().nullish(),
          mode: z.string().nullish()
        })
      })
      .nullish(),
    waste: z.object({ code: z.string().nullish() }),
    isCanceled: z.boolean().nullish(),
    comment: z
      .string()
      .min(3, "Le commentaire doit faire au moins 3 caractères")
  });

export const initialBsddReview = {
  wasteDetails: {
    code: "",
    name: "",
    pop: null,
    packagingInfos: [],
    sampleNumber: "",
    quantity: null
  },
  trader: getInitialTrader(),
  broker: getInitialBroker(),
  recipient: {
    cap: ""
  },
  quantityReceived: null,
  processingOperationDone: "",
  destinationOperationMode: null,
  processingOperationDescription: "",
  temporaryStorageDetail: {
    temporaryStorer: {
      quantityReceived: null
    },
    destination: {
      cap: "",
      processingOperation: ""
    }
  },
  isCanceled: false,
  comment: ""
};

export const validationBsddSchema = z.object({
  comment: z.string().min(3, "Le commentaire doit faire au moins 3 caractères"),
  isCanceled: z.boolean().nullish(),
  wasteDetails: z.object({
    code: z
      .string()
      .nullish()
      .superRefine((wasteCode, context) => {
        if (wasteCode) {
          const wasteCodeWithoutSpaces = wasteCode?.replace(/\s+/g, "") ?? "";
          if (wasteCodeWithoutSpaces.length < 6) {
            context.addIssue({
              code: z.ZodIssueCode.custom,

              message:
                "Le code déchet saisi n'existe pas. Il doit être composé d'au moins 6 caractères."
            });
          }
          if (wasteCodeWithoutSpaces.length > 7) {
            context.addIssue({
              code: z.ZodIssueCode.custom,

              message:
                "Le code déchet saisi n'existe pas. Il doit être composé de moins de 7 caractères."
            });
          }

          if (!ALL_WASTES.find(waste => waste.code === wasteCode)) {
            context.addIssue({
              code: z.ZodIssueCode.custom,

              message: "Le code déchet saisi n'existe pas."
            });
          }
        }
      }),
    name: z.string().nullish(),
    pop: z.boolean().nullish(),
    packagingInfos: z
      .array(
        z
          .object({
            type: z.enum(
              ["BENNE", "FUT", "CITERNE", "PIPELINE", "GRV", "AUTRE"],
              {
                required_error: "Ce champ est requis",
                invalid_type_error: "Ce champ est requis"
              }
            ),
            other: z.string(),
            quantity: z.coerce
              .number()
              .positive("Ce champ est requis est doit être supérieur à 0")
          })
          .superRefine((values, context) => {
            if (values.type === "AUTRE" && !values.other) {
              context.addIssue({
                code: z.ZodIssueCode.custom,

                message: "Veuillez préciser le conditionnement",

                path: ["other"]
              });
            }
          })
      )
      .nullish(),
    sampleNumber: z.string().nullish(),
    quantity: z.number().nullish()
  }),
  trader: z.object({
    receipt: z.string().nullish(),
    department: z.string().nullish(),
    validityLimit: z.string().nullish(),
    company: z.object({
      orgId: z.string().nullish(),
      siret: z.string().nullish(),
      name: z.string().nullish(),
      address: z.string().nullish(),
      contact: z.string().nullish(),
      mail: z.string().nullish(),
      phone: z.string().nullish(),
      vatNumber: z.string().nullish(),
      country: z.string().nullish(),
      omiNumber: z.string().nullish()
    })
  }),
  broker: z.object({
    receipt: z.string().nullish(),
    department: z.string().nullish(),
    validityLimit: z.string().nullish(),
    company: z.object({
      orgId: z.string().nullish(),
      siret: z.string().nullish(),
      name: z.string().nullish(),
      address: z.string().nullish(),
      contact: z.string().nullish(),
      mail: z.string().nullish(),
      phone: z.string().nullish(),
      vatNumber: z.string().nullish(),
      country: z.string().nullish(),
      omiNumber: z.string().nullish()
    })
  }),
  recipient: z.object({
    cap: z.string().nullish()
  }),
  quantityReceived: z.number().nullish(),
  processingOperationDone: z.string().nullish(),
  destinationOperationMode: z.string().nullish(),
  processingOperationDescription: z.string().nullish(),
  temporaryStorageDetail: z.object({
    temporaryStorer: z.object({
      quantityReceived: z.number().nullish()
    }),
    destination: z.object({
      cap: z.string().nullish(),
      processingOperation: z.string().nullish()
    })
  })
});
