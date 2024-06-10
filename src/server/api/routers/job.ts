import { jobSchema } from "@/schemas/jobSchema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import * as jobService from "../services/job.service";

export const jobRouter = createTRPCRouter({
  getJobListings: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    return jobService.getJobListings(userId);
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
      revalidatePath("/jobs");
      return { success: true };
    }),
});
