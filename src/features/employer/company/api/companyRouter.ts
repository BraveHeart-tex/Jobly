import { companyService } from "@/features/employer/company/services/companyService";
import { companyUserService } from "@/features/employer/company/services/userCompanyService";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { CompanyProfileValidator } from "@/validators/companyProfileSetupValidator";
import { TRPCError } from "@trpc/server";
import { parser } from "valibot";

export const companyRouter = createTRPCRouter({
  registerCompanyDetails: protectedProcedure
    .input(parser(CompanyProfileValidator))
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      if (user.role !== "employer") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action.",
        });
      }

      const createCompanyResult = await companyService.createCompany({
        ...input,
        userId: user.id,
      });

      return {
        companyId: createCompanyResult.companyId,
      };
    }),
  getCompanyUserDetailsByUserId: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    return companyUserService.getCompanyUserDetailsByUserId(userId);
  }),
});
