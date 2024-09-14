import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { benefitsService } from "../services/benefitsService";

export const benefitRouter = createTRPCRouter({
  getBenefitsByName: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      return benefitsService.getBenefitsByName(input.query);
    }),
});
