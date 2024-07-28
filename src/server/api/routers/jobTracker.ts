import { createTRPCRouter, protectedProcedure } from "../trpc";
import * as jobTrackerService from "../services/jobTracker.service";

export const jobTrackerRouter = createTRPCRouter({
  getJobTrackerApplications: protectedProcedure.query(async ({ ctx }) => {
    return jobTrackerService.getJobTrackerApplications(ctx.user.id);
  }),
});
