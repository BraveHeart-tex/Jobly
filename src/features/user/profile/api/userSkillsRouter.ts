import {
  createUserSkillUseCase,
  deleteUserSkillUseCase,
  getUserSkillByIdUseCase,
  getUserSkillsByUserIdUseCase,
  saveUserSkillOrderUseCase,
} from "@/features/user/profile/use-cases/userSkills";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { genericIdValidator } from "@/schemas/schemaUtils";
import { saveUserSkillOrderValidator } from "@/schemas/user/profile/saveUserSkillOrderValidator";
import { userSkillsValidator } from "@/schemas/user/profile/userSkillsValidator";
import { parser } from "valibot";

export const userSkillsRouter = createTRPCRouter({
  createUserSkill: protectedProcedure
    .input(parser(userSkillsValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return createUserSkillUseCase(userId, input);
    }),
  getUserSkillById: protectedProcedure
    .input(parser(genericIdValidator))
    .query(async ({ input }) => {
      return getUserSkillByIdUseCase(input.id);
    }),
  deleteUserSkill: protectedProcedure
    .input(parser(genericIdValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return deleteUserSkillUseCase({
        userId,
        userSkillId: input.id,
      });
    }),
  getUserSkillsByUserId: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    return getUserSkillsByUserIdUseCase(userId);
  }),
  saveUserSkillOrder: protectedProcedure
    .input(parser(saveUserSkillOrderValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return saveUserSkillOrderUseCase(userId, input);
    }),
});
