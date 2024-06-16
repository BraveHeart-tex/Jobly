import { jobSchema } from "@/schemas/jobSchema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import * as jobService from "../services/job.service";

export const jobRouter = createTRPCRouter({
  getJobListings: protectedProcedure
    .input(
      z.object({
        query: z.string().optional().default(""),
      }),
    )
    .query(async ({ ctx, input: { query } }) => {
      const userId = ctx.user.id;
      return jobService.getJobListings({
        userId,
        query,
      });
    }),
  getJobById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const id = input.id;
      return jobService.getJobById({
        jobId: id,
        userId: ctx.user.id,
      });
    }),
  updateJob: protectedProcedure
    .input(
      jobSchema.partial().required({
        id: true,
      }),
    )
    .mutation(async ({ input }) => {
      return jobService.updateJob(input);
    }),
  markJobAsViewed: protectedProcedure
    .input(jobSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await jobService.markJobAsViewed({
        userId: ctx.user.id,
        jobId: input.id,
      });
      return { success: true };
    }),
  bookmarkJob: protectedProcedure
    .input(jobSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await jobService.bookmarkJob({
        userId: ctx.user.id,
        jobId: input.id,
      });

      return { success: true };
    }),
  deleteJobBookmark: protectedProcedure
    .input(jobSchema.pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      await jobService.deleteJobBookmark({
        userId: ctx.user.id,
        jobId: input.id,
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
