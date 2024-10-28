import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { object, parser, string } from "valibot";
import { SkillInsertValidator } from "@/validators/skillValidator";
import {
  getSkillsByNameUseCase,
  createSkillUseCase,
} from "@/features/employer/jobPosting/use-cases/skills";

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
      return await getSkillsByNameUseCase(input.query);
    }),
  createSkill: protectedProcedure
    .input(parser(SkillInsertValidator))
    .mutation(async ({ input }) => {
      return await createSkillUseCase(input);
    }),
});
