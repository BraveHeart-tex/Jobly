import { userService } from "@/features/user/services/userService";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { parser } from "valibot";
import {
  createSessionWithUserId,
  hashPassword,
  verifyPassword,
} from "../utils";
import { SignUpValidator } from "@/validators/auth/signUpValidator";
import {
  LoginResponseValidator,
  LoginValidator,
} from "@/validators/auth/loginValidator";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(parser(SignUpValidator))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session ?? ctx.user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Invalid Request. You cannot sign up again as a registered user.",
        });
      }

      const { email, firstName, lastName, password, role } = input;

      const userAlreadyExists = await userService.getUserByEmail(email);

      if (userAlreadyExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "The provided email is already in use.",
        });
      }

      const hashedPassword = await hashPassword(password);

      const userId = await userService.createUser({
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
  login: publicProcedure
    .input(parser(LoginValidator))
    .output(parser(LoginResponseValidator))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session ?? ctx.user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Invalid Request. You cannot sign in again while being signed in.",
        });
      }

      const { email, password } = input;
      const existingUser = await userService.getUserByEmail(email);
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
});
