import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { minValue, number, object, parser, pipe } from "valibot";
import { userSkillService } from "../services/userSkillService";

const skillIdValidator = object({
  skillId: pipe(number(), minValue(1, "Please provide valid skill id.")),
});

export const userSkillRouter = createTRPCRouter({
  createUserSkill: protectedProcedure
    .input(parser(skillIdValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return userSkillService.createUserSkill({
        userId,
        skillId: input.skillId,
      });
    }),
  deleteUserSkill: protectedProcedure
    .input(parser(skillIdValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return userSkillService.deleteUserSkill({
        userId,
        skillId: input.skillId,
      });
    }),
});
