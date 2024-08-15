import {
  checkPasswordPwned,
  checkPasswordStrength,
  createSessionWithUserId,
  hashPassword,
  verifyPassword,
} from "@/lib/auth/actions";
import { PASSWORD_STRENGTH_LEVELS } from "@/lib/constants";
import { signInSchema } from "@/schemas/auth/signInSchema";
import { signUpSchema } from "@/schemas/auth/signUpSchema";
import * as authService from "@/server/api/services/auth.service";
import { getUserByEmail } from "@/server/api/services/user.service";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.session ?? ctx.user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Invalid Request. You cannot sign up again as a registered user.",
        });
      }

      const { email, firstName, lastName, password, role } = input;

      const userAlreadyExists = await getUserByEmail(email);

      if (userAlreadyExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "The provided email is already in use.",
        });
      }

      const isPasswordPwned = await checkPasswordPwned(password);

      if (isPasswordPwned) {
        return {
          isPasswordPwned,
          error:
            "This password seems to be compromised. Please use a different and stronger password.",
        };
      }

      const { score, message: passwordStrengthScoreMessage } =
        await checkPasswordStrength(password);

      if (
        score === PASSWORD_STRENGTH_LEVELS.VERY_WEAK ||
        score === PASSWORD_STRENGTH_LEVELS.WEAK
      ) {
        return {
          isWeakPassword: true,
          error: passwordStrengthScoreMessage,
        };
      }

      const hashedPassword = await hashPassword(password);

      const userId = await authService.signUp({
        email,
        firstName,
        lastName,
        hashedPassword,
        role,
      });

      if (!userId) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "Something went wrong while signing up. Please try again later.",
        });
      }

      await createSessionWithUserId(userId);

      return {
        success: true,
        message: "Account created successfully.",
      };
    }),
  signIn: publicProcedure
    .input(signInSchema)
    .mutation(async ({ ctx, input }) => {
      if (ctx.session ?? ctx.user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Invalid Request. You cannot sign in again while being signed in.",
        });
      }

      const { email, password } = input;
      const existingUser = await getUserByEmail(email);
      if (!existingUser) {
        return {
          error: "Incorrect username or password.",
        };
      }

      const isValidPassword = await verifyPassword(
        existingUser.hashedPassword,
        password,
      );

      if (!isValidPassword) {
        return {
          error: "Incorrect username or password.",
        };
      }

      await createSessionWithUserId(existingUser.id);

      return {
        success: true,
        message: "Successfully signed in.",
      };
    }),
  getCurrentUser: publicProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
});
