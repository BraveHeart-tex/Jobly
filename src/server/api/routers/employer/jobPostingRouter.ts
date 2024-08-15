import { z } from "zod";
import * as jobPostingService from "../../services/jobPosting.service";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const jobPostingRouter = createTRPCRouter({
  getJobPostings: protectedProcedure
    .input(
      z.object({
        listingStatus: z.enum(["published", "draft", "expired"]).optional(),
      }),
    )
    .query(async ({ input }) => {
      // TODO: Get dynamically from ctx user
      const companyId = 1;
      return jobPostingService.getJobPostings({
        ...input,
        companyId,
      });
    }),
});
