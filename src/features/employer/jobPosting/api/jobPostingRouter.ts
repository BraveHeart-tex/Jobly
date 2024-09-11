import { employerJobPostingService } from "@/features/employer/jobPosting/services/employerJobPostingService";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { jobPostings } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { userCompanyService } from "../../company/services/userCompanyService";

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
});
