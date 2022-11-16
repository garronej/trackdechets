import { gql } from "apollo-server-express";
import prisma from "../../../../prisma";
import { userFactory } from "../../../../__tests__/factories";
import makeClient from "../../../../__tests__/testClient";
import * as mailing from "../../../../mailer/mailing";
import { resetDatabase } from "../../../../../integration-tests/helper";
import { renderMail } from "../../../../mailer/templates/renderers";
import { onSignup } from "../../../../mailer/templates";
import { setCaptchaToken } from "../../../../common/redis/captcha";
import { Mutation } from "../../../../generated/graphql/types";
const RESEND_ACTIVATION_EMAIL = gql`
  mutation ResendActivationEmail(
    $email: String!
    $captchaInput: CaptchaInput!
  ) {
    resendActivationEmail(email: $email, captchaInput: $captchaInput)
  }
`;

// No mails
const sendMailSpy = jest.spyOn(mailing, "sendMail");
sendMailSpy.mockImplementation(() => Promise.resolve());

describe("mutation resendActivationEmail", () => {
  afterAll(resetDatabase);
  afterEach(sendMailSpy.mockClear);

  it("should resend activation email to user", async () => {
    const user = await userFactory({ isActive: false });
    const hash = "hash_1";
    await prisma.userActivationHash.create({
      data: { userId: user.id, hash }
    });
    const token = "xyz654";
    const captcha = "TD765";
    await setCaptchaToken(token, captcha);
    const { mutate } = makeClient();
    await mutate<Pick<Mutation, "resendActivationEmail">>(
      RESEND_ACTIVATION_EMAIL,
      {
        variables: {
          email: user.email,
          captchaInput: { value: captcha, token: token }
        }
      }
    );
    expect(sendMailSpy).toHaveBeenCalledWith(
      renderMail(onSignup, {
        to: [{ name: user.name, email: user.email }],
        variables: { activationHash: hash }
      })
    );
  });

  it("should return true if user does not exist", async () => {
    const { mutate } = makeClient();
    const token = "xyz650";
    const captcha = "TD765";
    await setCaptchaToken(token, captcha);
    const { data, errors } = await mutate(RESEND_ACTIVATION_EMAIL, {
      variables: {
        email: "john.snow@trackdechets.fr",
        captchaInput: { value: captcha, token: token }
      }
    });
    expect(data.resendActivationEmail).toEqual(true);
    expect(errors).toEqual(undefined);
    // no mail sent
    expect(sendMailSpy).not.toHaveBeenCalled();
  });

  it("should return true if user is already active", async () => {
    const user = await userFactory({ isActive: true });
    const token = "xyz652";
    const captcha = "TD765";
    await setCaptchaToken(token, captcha);
    await prisma.userActivationHash.create({
      data: { userId: user.id, hash: "hash_2" }
    });
    const { mutate } = makeClient();
    const { data, errors } = await mutate(RESEND_ACTIVATION_EMAIL, {
      variables: {
        email: user.email,
        captchaInput: { value: captcha, token: token }
      }
    });
    expect(errors).toEqual(undefined);
    expect(data.resendActivationEmail).toEqual(true);

    // no mail sent
    expect(sendMailSpy).not.toHaveBeenCalled();
  });

  it("should expect a valid captcha", async () => {
    const user = await userFactory({ isActive: true });
    const token = "xyz652";
    const captcha = "TD765";
    await setCaptchaToken(token, captcha);
    await prisma.userActivationHash.create({
      data: { userId: user.id, hash: "hash_3" }
    });
    const { mutate } = makeClient();
    const { errors } = await mutate(RESEND_ACTIVATION_EMAIL, {
      variables: {
        email: user.email,
        captchaInput: { value: "toto", token: token }
      }
    });

    expect(errors).toEqual([
      expect.objectContaining({
        message: "Le test anti robots est incorrect",

        extensions: {
          code: "BAD_USER_INPUT"
        }
      })
    ]);
    // no mail sent
    expect(sendMailSpy).not.toHaveBeenCalled();
  });
});
