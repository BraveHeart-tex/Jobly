import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { jobService } from "../services/jobService";
import { number, object, parser } from "valibot";
import { getJobListingsValidator } from "@/validators/getJobListingsValidator";

const jobIdValidator = object({
  id: number(),
});

export const userJobListingRouter = createTRPCRouter({
  getJobListings: protectedProcedure
    .input(parser(getJobListingsValidator))
    .query(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return jobService.getJobListings({
        ...input,
        userId,
      });
    }),
  getJobById: protectedProcedure
    .input(parser(jobIdValidator))
    .query(async ({ ctx, input }) => {
      const id = input.id;
      return jobService.getJobById({
        jobId: id,
        userId: ctx.user.id,
      });
    }),

  markJobAsViewed: protectedProcedure
    .input(parser(jobIdValidator))
    .mutation(async ({ ctx, input }) => {
      await jobService.markJobAsViewed({
        userId: ctx.user.id,
        jobId: input.id,
      });
      return { success: true };
    }),
  bookmarkJob: protectedProcedure
    .input(parser(jobIdValidator))
    .mutation(async ({ ctx, input }) => {
      await jobService.bookmarkJob({
        userId: ctx.user.id,
        jobPostingId: input.id,
      });

      return { success: true };
    }),
  deleteJobBookmark: protectedProcedure
    .input(parser(jobIdValidator))
    .mutation(async ({ ctx, input }) => {
      await jobService.deleteJobBookmark({
        userId: ctx.user.id,
        jobPostingId: input.id,
      });
      return { success: true };
    }),
  getBookmarkedJobs: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    return jobService.getBookmarkedJobs(userId);
  }),
  getViewedJobs: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    return jobService.getViewedJobs(userId);
  }),
});
