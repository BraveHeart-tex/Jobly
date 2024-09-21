import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { skills } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { skillsService } from "../services/skillsService";

export const skillsRouter = createTRPCRouter({
  getSkillsByName: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      return await skillsService.getSkillsByName(input.query);
    }),
  createSkill: protectedProcedure
    .input(createInsertSchema(skills))
    .mutation(async ({ input }) => {
      return await skillsService.createSkill(input);
    }),
});
