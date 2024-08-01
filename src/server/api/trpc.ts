import { uncachedValidateRequest } from "@/lib/auth/validate-request";
import { db } from "@/server/db";
import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError, z } from "zod";
import { users } from "../db/schema";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const { session, user } = await uncachedValidateRequest();

  return {
    session,
    user,
    db,
    headers: opts.headers,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const protectedProcedure = t.procedure
  .input(
    z
      .object({
        allowedRoles: z.array(z.enum(users.role.enumValues)).optional(),
      })
      .optional(),
  )
  .use(({ ctx, next, input }) => {
    const { allowedRoles } = input ?? {};
    if (!ctx.session || !ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to perform this action.",
      });
    }

    const userRole = ctx.user.role;
    if (
      allowedRoles &&
      allowedRoles?.length > 0 &&
      !allowedRoles?.includes(userRole)
    ) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not allowed to perform this action",
      });
    }

    return next({
      ctx: {
        session: { ...ctx.session },
        user: { ...ctx.user },
      },
    });
  });

export const publicProcedure = t.procedure;

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
export type ProtectedTRPCContext = TRPCContext & {
  user: NonNullable<TRPCContext["user"]>;
  session: NonNullable<TRPCContext["session"]>;
};
