import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { benefitsService } from "../services/benefitsService";
import { createInsertSchema } from "drizzle-zod";
import { benefits } from "@/server/db/schema";

export const benefitRouter = createTRPCRouter({
  getBenefitsByName: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      return benefitsService.getBenefitsByName(input.query);
    }),
  createBenefit: protectedProcedure
    .input(createInsertSchema(benefits))
    .mutation(async ({ input }) => {
      return benefitsService.createBenefit(input.name);
    }),
});
