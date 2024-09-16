import { userCompanyService } from "@/features/employer/company/services/userCompanyService";
import { employerJobPostingService } from "@/features/employer/jobPosting/services/employerJobPostingService";
import employerJobPostingFormSchema from "@/schemas/jobPostingFormSchema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { jobPostings } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const jobPostingRouter = createTRPCRouter({
  getJobPostings: protectedProcedure
    .input(
      z.object({
        status: z
          .enum(jobPostings.status.enumValues)
          .optional()
          .default("published"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const company = await userCompanyService.getUserCompanyDetailsByUserId(
        ctx.user.id,
      );
      if (!company) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Company not found. Please setup your company profile first.",
        });
      }
      return employerJobPostingService.getJobPostings({
        ...input,
        companyId: company.id,
      });
    }),
  createJobPosting: protectedProcedure
    .input(employerJobPostingFormSchema)
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      if (user.role !== "employer") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action.",
        });
      }

      const company = await userCompanyService.getUserCompanyDetailsByUserId(
        user.id,
      );

      if (!company) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Please setup your company profile first to create a job posting.",
        });
      }

      const isAssociatedWithCompany =
        await userCompanyService.verifyUserCompanyAssociation({
          userId: user.id,
          companyId: company.id,
        });

      if (!isAssociatedWithCompany) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You are not associated with this company.",
        });
      }

      return employerJobPostingService.createJobPosting({
        ...input,
        companyId: company.id,
        createdUserId: user.id,
      });
    }),
});
