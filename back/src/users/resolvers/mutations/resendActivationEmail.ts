import prisma from "../../../prisma";
import { sendMail } from "../../../mailer/mailing";
import { MutationResolvers } from "../../../generated/graphql/types";
import { renderMail } from "../../../mailer/templates/renderers";
import { onSignup } from "../../../mailer/templates";
import { object, string } from "yup";
import { checkCaptcha } from "../../../captchaGen";
import { UserInputError } from "apollo-server-core";

const resendActivationEmail: MutationResolvers["resendActivationEmail"] =
  async (parent, { email, captchaInput }) => {
    const schema = object({
      email: string()
        .email("Cet email n'est pas correctement formatté")
        .required()
    });
    await schema.validate({ email });

    const captchaIsValid = await checkCaptcha(
      captchaInput.value,
      captchaInput.token
    );

    if (!captchaIsValid) {
      throw new UserInputError("Le test anti robots est incorrect");
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // for security reason, do not leak  any clue
      return true;
    }

    if (user.isActive) {
      // for security reason, do not leak  any clue
      return true;
    }

    const activationHashes = await prisma.userActivationHash.findMany({
      where: { userId: user.id }
    });

    if (activationHashes?.length === 0) {
      // for security reason, do not leak  any clue

      return true;
    }

    const { hash } = activationHashes[0];

    await sendMail(
      renderMail(onSignup, {
        to: [{ name: user.name, email: user.email }],
        variables: { activationHash: hash }
      })
    );

    return true;
  };

export default resendActivationEmail;
