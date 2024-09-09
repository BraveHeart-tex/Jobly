import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getCompanyDetailsByEmployerId } from "../../services/company.service";
import * as jobPostingService from "../../services/jobPosting.service";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const jobPostingRouter = createTRPCRouter({
  getJobPostings: protectedProcedure
    .input(
      z.object({
        listingStatus: z.enum(["published", "draft", "expired"]).optional(),
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
      return jobPostingService.getJobPostings({
        ...input,
        companyId: company.id,
      });
    }),
});
