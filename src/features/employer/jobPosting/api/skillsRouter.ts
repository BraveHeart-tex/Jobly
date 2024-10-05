import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { skillsService } from "../services/skillsService";
import { object, parser, string } from "valibot";
import { SkillInsertValidator } from "@/validators/skillValidator";

export const skillsRouter = createTRPCRouter({
  getSkillsByName: protectedProcedure
    .input(
      parser(
        object({
          query: string(),
        }),
      ),
    )
    .query(async ({ input }) => {
      return await skillsService.getSkillsByName(input.query);
    }),
  createSkill: protectedProcedure
    .input(parser(SkillInsertValidator))
    .mutation(async ({ input }) => {
      return await skillsService.createSkill(input);
    }),
});
