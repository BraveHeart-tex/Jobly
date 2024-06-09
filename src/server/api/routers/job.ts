import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { z } from "zod";

export const jobRouter = createTRPCRouter({
  getJobListings: protectedProcedure.query(async () => {
    return db.query.job.findMany({
      with: {
        company: {
          columns: { name: true, logo: true },
        },
      },
    });
  }),
  getJobById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const id = input.id;

      return db.query.job.findFirst({
        where: (job, { eq }) => eq(job.id, id),
        with: {
          company: {
            columns: { name: true, logo: true },
          },
        },
      });
    }),
});
