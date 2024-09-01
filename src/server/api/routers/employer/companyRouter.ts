import { companyProfileSetupSchema } from "@/schemas/companyProfileSetupSchema";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import * as companyService from "../../services/company.service";
import { TRPCError } from "@trpc/server";

export const companyRouter = createTRPCRouter({
  registerCompanyDetails: protectedProcedure
    .input(companyProfileSetupSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      if (user.role !== "employer") {
        return { error: "You are not authorized to perform this action." };
      }

      const userHasCompany = await companyService.checkIfUserHasCompany(
        user.id,
      );

      if (userHasCompany) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You already have a company registered.",
        });
      }

      return companyService.registerNewCompany({
        ...input,
        userId: user.id,
      });
    }),
  getCompanyDetailsByEmployerId: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    return companyService.getCompanyDetailsByEmployerId(userId);
  }),
});
