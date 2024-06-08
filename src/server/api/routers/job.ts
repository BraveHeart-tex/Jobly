import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

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
});
