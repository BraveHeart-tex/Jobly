import { createTRPCRouter, protectedProcedure } from "../trpc";
import * as jobTrackerService from "../services/jobTracker.service";
import { jobTrackerApplicationSchema } from "@/schemas/jobTrackerApplicationSchema";

export const jobTrackerRouter = createTRPCRouter({
  getJobTrackerApplications: protectedProcedure.query(async ({ ctx }) => {
    return jobTrackerService.getJobTrackerApplications(ctx.user.id);
  }),
  addJobTrackerApplication: protectedProcedure
    .input(jobTrackerApplicationSchema)
    .mutation(async ({ ctx, input }) => {
      return jobTrackerService.createJobTrackerApplication({
        ...input,
        userId: ctx.user.id,
      });
    }),
});
