import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { signUpSchema } from "@/schemas/signUpSchema";
import { TRPCError } from "@trpc/server";
import { getUserByEmail } from "@/server/api/services/user.service";
import { hash } from "@node-rs/argon2";
import * as authService from "@/server/api/services/auth.service";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure.input(signUpSchema).mutation(async ({ ctx, input }) => {
    if (ctx.session ?? ctx.user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid Request. You cannot sign up again as a registered user.",
      });
    }

    const { email, firstName, lastName, password } = input;

    const userAlreadyExists = await getUserByEmail(email);
    if (!userAlreadyExists) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "The provided email is already in use.",
      });
    }

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    const [result] = await authService.signUp({
      email,
      firstName,
      lastName,
      hashedPassword: passwordHash,
    });

    if (!result.insertId) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong while signing up. Please try again later.",
      });
    }

    return {
      createdUserId: result.insertId,
    };
  }),
});
