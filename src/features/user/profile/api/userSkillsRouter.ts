import {
  createUserSkillUseCase,
  deleteUserSkillUseCase,
  getUserSkillByIdUseCase,
} from "@/features/user/profile/use-cases/userSkills";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { GenericIdValidator } from "@/validators/schemaUtils";
import { userSkillsValidator } from "@/validators/user/profile/userSkillsValidator";
import { parser } from "valibot";

export const userSkillsRouter = createTRPCRouter({
  createUserSkill: protectedProcedure
    .input(parser(userSkillsValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return createUserSkillUseCase(userId, input);
    }),
  getUserSkillById: protectedProcedure
    .input(parser(GenericIdValidator))
    .query(async ({ input }) => {
      return getUserSkillByIdUseCase(input.id);
    }),
  deleteUserSkill: protectedProcedure
    .input(parser(GenericIdValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return deleteUserSkillUseCase({
        userId,
        userSkillId: input.id,
      });
    }),
});
