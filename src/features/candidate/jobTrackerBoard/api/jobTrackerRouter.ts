import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { jobTrackerApplications } from "@/server/db/schema";
import { array, number, object, parser, picklist } from "valibot";
import {
  jobTrackerApplicationInsertValidator,
  jobTrackerApplicationValidator,
} from "@/schemas/user/jobTracker/jobTrackerApplicationValidator";
import { jobTrackerApplicationService } from "@/features/candidate/jobTrackerBoard/services/jobTrackerApplicationService";

export const jobTrackerRouter = createTRPCRouter({
  getJobTrackerApplications: protectedProcedure.query(async ({ ctx }) => {
    return jobTrackerApplicationService.getApplications(ctx.user.id);
  }),
  addJobTrackerApplication: protectedProcedure
    .input(parser(jobTrackerApplicationInsertValidator))
    .mutation(async ({ ctx, input }) => {
      return jobTrackerApplicationService.createApplication({
        ...input,
        userId: ctx.user.id,
      });
    }),
  deleteById: protectedProcedure
    .input(
      parser(
        object({
          id: number(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      return jobTrackerApplicationService.deleteApplication({
        id: input.id,
        userId: ctx.user.id,
      });
    }),
  updateJobTrackerApplication: protectedProcedure
    .input(parser(jobTrackerApplicationValidator))
    .mutation(async ({ ctx, input }) => {
      return jobTrackerApplicationService.updateApplication({
        ...input,
        userId: ctx.user.id,
      });
    }),
  deleteByStatus: protectedProcedure
    .input(
      parser(
        object({
          status: picklist(jobTrackerApplications.status.enumValues),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      return jobTrackerApplicationService.deleteApplicationsByStatus({
        status: input.status,
        userId: ctx.user.id,
      });
    }),
  updateStatusAndOrder: protectedProcedure
    .input(
      parser(
        object({
          data: array(jobTrackerApplicationValidator),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.data.length === 0) return;
      return jobTrackerApplicationService.saveApplicationDetails(
        input.data.map((item) => ({
          ...item,
          userId: ctx.user.id,
        })),
      );
    }),
});
