import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getCompanyDetailsByEmployerId } from "@/server/api/services/company.service";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { employerJobPostingService } from "@/features/employer/jobPosting/services/employerJobPostingService";
import { jobPostings } from "@/server/db/schema";

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
      const company = await getCompanyDetailsByEmployerId(ctx.user.id);
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
