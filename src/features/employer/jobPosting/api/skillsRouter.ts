import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { skillsService } from "../services/skillsService";

export const skillsRouter = createTRPCRouter({
  getSkillsByName: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      return await skillsService.getSkillsByName(input.query);
    }),
});
