import { getUserId, getUserIdFromToken } from "../utils";
import { Context } from "../types";
import {
  flattenObjectForDb,
  unflattenObjectFromDb,
  cleanUpNotDuplicatableFieldsInForm
} from "./form-converter";
import { formSchema } from "./validator";
import { getNextStep } from "./workflow";
import { getReadableId } from "./readable-id";

export default {
  Form: {
    appendix2Forms: (parent, args, context: Context) => {
      return context.prisma.form({ id: parent.id }).appendix2Forms();
    }
  },
  Query: {
    form: async (parent, { id }, context: Context) => {
      if (!id) {
        return null;
      }

      const userId = getUserId(context);

      const formPromise = context.prisma.form({ id });
      // const formOwner = await form.owner();

      // if (formOwner.id !== userId) {
      //   return null;
      // }

      return formPromise.then(dbForm => unflattenObjectFromDb(dbForm));
    },
    forms: async (parent, args, context: Context) => {
      const userId = getUserId(context);
      const userCompany = await context.prisma.user({ id: userId }).company();

      const forms = await context.prisma.forms({
        where: {
          OR: [
            { owner: { id: userId } },
            { recipientCompanySiret: userCompany.siret },
            { emitterCompanySiret: userCompany.siret }
          ],
          isDeleted: false
        }
      });

      return forms.map(f => unflattenObjectFromDb(f));
    },
    stats: async (parent, args, context: Context) => {
      const userId = getUserId(context);
      const userCompany = await context.prisma.user({ id: userId }).company();

      const forms = await context.prisma.forms({
        where: {
          OR: [
            { owner: { id: userId } },
            { recipientCompanySiret: userCompany.siret },
            { emitterCompanySiret: userCompany.siret }
          ],
          status: "PROCESSED",
          isDeleted: false
        }
      });

      const stats = forms.reduce((prev, cur) => {
        prev[cur.wasteDetailsCode] = prev[cur.wasteDetailsCode] || {
          wasteCode: cur.wasteDetailsCode,
          incoming: 0,
          outgoing: 0
        };
        cur.recipientCompanySiret === userCompany.siret
          ? (prev[cur.wasteDetailsCode].incoming = (
              prev[cur.wasteDetailsCode].incoming + cur.quantityReceived
            ).toFixed(2))
          : (prev[cur.wasteDetailsCode].outgoing = (
              prev[cur.wasteDetailsCode].outgoing + cur.quantityReceived
            ).toFixed(2));
        return prev;
      }, {});

      return Object.keys(stats).map(key => stats[key]);
    },
    appendixForms: async (parent, { wasteCode }, context: Context) => {
      const userId = getUserId(context);
      const userCompany = await context.prisma.user({ id: userId }).company();

      const forms = await context.prisma.forms({
        where: {
          wasteDetailsCode: wasteCode,
          recipientCompanySiret: userCompany.siret,
          status: "AWAITING_GROUP",
          isDeleted: false
        }
      });

      return forms.map(f => unflattenObjectFromDb(f));
    }
  },
  Mutation: {
    saveForm: async (parent, { formInput }, context: Context) => {
      const userId = getUserId(context);

      const { id, ...formContent } = formInput;
      if (id) {
        const updatedForm = await context.prisma.updateForm({
          where: { id },
          data: {
            ...flattenObjectForDb(formContent),
            appendix2Forms: { connect: formContent.appendix2Forms }
          }
        });

        return unflattenObjectFromDb(updatedForm);
      }

      const newForm = await context.prisma.createForm({
        ...flattenObjectForDb(formContent),
        appendix2Forms: { connect: formContent.appendix2Forms },
        readableId: await getReadableId(context),
        owner: { connect: { id: userId } }
      });

      return unflattenObjectFromDb(newForm);
    },
    deleteForm: async (parent, { id }, context: Context) => {
      return context.prisma.updateForm({
        where: { id },
        data: { isDeleted: true }
      });
    },
    duplicateForm: async (parent, { id }, context: Context) => {
      const userId = getUserId(context);

      const existingForm = await context.prisma.form({
        id
      });

      const newForm = await context.prisma.createForm({
        ...cleanUpNotDuplicatableFieldsInForm(existingForm),
        readableId: await getReadableId(context),
        status: "DRAFT",
        owner: { connect: { id: userId } }
      });

      return unflattenObjectFromDb(newForm);
    },
    markAsSealed: async (parent, { id }, context: Context) => {
      const form = await context.prisma.form({ id });
      const isValid = await formSchema.isValid(unflattenObjectFromDb(form));

      if (!isValid) {
        throw new Error(
          `Erreur, le bordereau contient des champs obligatoires non renseignés. Ils apparaitront en rouge lorsque vous <a href="/form/${id}">éditez le formulaire</a>.`
        );
      }

      const userId = getUserId(context);
      const userCompany = await context.prisma.user({ id: userId }).company();

      const appendix2Forms = await context.prisma.form({ id }).appendix2Forms();
      if (appendix2Forms.length) {
        await context.prisma.updateManyForms({
          where: { OR: appendix2Forms.map(f => ({ id: f.id })) },
          data: { status: "GROUPED" }
        });
      }

      return context.prisma.updateForm({
        where: { id },
        data: {
          status: getNextStep(form, userCompany.siret)
        }
      });
    },
    markAsSent: async (parent, { id, sentInfo }, context: Context) =>
      markForm(id, sentInfo, context),
    markAsReceived: async (parent, { id, receivedInfo }, context: Context) =>
      markForm(id, receivedInfo, context),
    markAsProcessed: async (
      parent,
      { id, processedInfo },
      context: Context
    ) => {
      const form = await context.prisma.form({ id });

      const userId = getUserId(context);
      const userCompany = await context.prisma.user({ id: userId }).company();

      const appendix2Forms = await context.prisma.form({ id }).appendix2Forms();
      if (appendix2Forms.length) {
        await context.prisma.updateManyForms({
          where: { OR: appendix2Forms.map(f => ({ id: f.id })) },
          data: { status: "PROCESSED" }
        });
      }

      return context.prisma.updateForm({
        where: { id },
        data: {
          status: getNextStep({ ...form, ...processedInfo }, userCompany.siret),
          ...processedInfo
        }
      });
    }
  },
  Subscription: {
    forms: {
      subscribe: async (parent, { token }, context: Context) => {
        // Web socket has no headers so we pass the token as a param
        const userId = getUserIdFromToken(token);
        const userCompany = await context.prisma.user({ id: userId }).company();

        return context.prisma.$subscribe.form({
          OR: [
            { node: { emitterCompanySiret: userCompany.siret } },
            { node: { recipientCompanySiret: userCompany.siret } },
            { node: { owner: { id: userId } } }
          ]
        });
      },
      resolve: payload => {
        return payload;
      }
    }
  }
};

async function markForm(id, inputParams, context: Context) {
  const form = await context.prisma.form({ id });

  const userId = getUserId(context);
  const userCompany = await context.prisma.user({ id: userId }).company();

  return context.prisma.updateForm({
    where: { id },
    data: { status: getNextStep(form, userCompany.siret), ...inputParams }
  });
}
