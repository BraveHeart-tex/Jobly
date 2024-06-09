import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
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
    .query(async ({ input }) => {
      const id = input.id;
      return jobService.getJobById(id);
    }),
});
