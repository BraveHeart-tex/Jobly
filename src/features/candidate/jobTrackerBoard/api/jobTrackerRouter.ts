import { jobTrackerApplicationSchema } from "@/schemas/jobTrackerApplicationSchema";
import { jobTrackerApplications } from "@/server/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { jobTrackerApplicationService } from "../services/jobTrackerApplicationService";

export const jobTrackerRouter = createTRPCRouter({
  getJobTrackerApplications: protectedProcedure.query(async ({ ctx }) => {
    return jobTrackerApplicationService.getApplications(ctx.user.id);
  }),
  addJobTrackerApplication: protectedProcedure
    .input(jobTrackerApplicationSchema)
    .mutation(async ({ ctx, input }) => {
      return jobTrackerApplicationService.createApplication({
        ...input,
        userId: ctx.user.id,
      });
    }),
  deleteById: protectedProcedure
    .input(createSelectSchema(jobTrackerApplications).pick({ id: true }))
    .mutation(async ({ ctx, input }) => {
      return jobTrackerApplicationService.deleteApplication({
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
      return jobTrackerApplicationService.updateApplication({
        ...input,
        userId: ctx.user.id,
      });
    }),
  deleteByStatus: protectedProcedure
    .input(
      createSelectSchema(jobTrackerApplications).pick({
        status: true,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return jobTrackerApplicationService.deleteApplicationsByStatus({
        status: input.status,
        userId: ctx.user.id,
      });
    }),
  updateStatusAndOrder: protectedProcedure
    .input(
      z.object({
        data: createInsertSchema(jobTrackerApplications).array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return jobTrackerApplicationService.saveApplicationDetails(
        input.data.map((item) => ({
          ...item,
          userId: ctx.user.id,
        })),
      );
    }),
});
