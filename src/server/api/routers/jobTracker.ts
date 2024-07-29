import { jobTrackerApplicationSchema } from "@/schemas/jobTrackerApplicationSchema";
import { jobTrackerApplications } from "@/server/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as jobTrackerService from "../services/jobTracker.service";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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
  deleteJobTrackerApplication: protectedProcedure
    .input(createSelectSchema(jobTrackerApplications).pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      return jobTrackerService.deleteJobTrackerApplication({
        id: input.id,
        userId: ctx.user.id,
      });
    }),
  updateJobTrackerApplication: protectedProcedure
    .input(
      createInsertSchema(jobTrackerApplications).required({
        id: true,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return jobTrackerService.updateJobTrackerApplication({
        ...input,
        userId: ctx.user.id,
      });
    }),
});
