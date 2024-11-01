import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createEducationalBackgroundUseCase,
  deleteEducationalBackgroundUseCase,
  getEducationalBackgroundUseCase,
  getEducationalBackgroundsUseCase,
  updateEducationalBackgroundUseCase,
} from "@/features/user/profile/use-cases/educationalBackgrounds";
import { genericIdValidator } from "@/validators/schemaUtils";
import {
  insertEducationValidator,
  updateEducationValidator,
} from "@/validators/user/profile/educationalBackgroundValidator";
import { parser } from "valibot";

export const educationalBackgroundsRouter = createTRPCRouter({
  createEducationalBackground: protectedProcedure
    .input(parser(insertEducationValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return createEducationalBackgroundUseCase({
        ...input,
        userId,
      });
    }),
  deleteEducationalBackground: protectedProcedure
    .input(parser(genericIdValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return deleteEducationalBackgroundUseCase(userId, input.id);
    }),
  getEducationalBackground: protectedProcedure
    .input(parser(genericIdValidator))
    .query(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return getEducationalBackgroundUseCase(userId, input.id);
    }),
  updateEducationalBackground: protectedProcedure
    .input(parser(updateEducationValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return updateEducationalBackgroundUseCase({
        ...input,
        userId,
      });
    }),
  getEducationalBackgrounds: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    return getEducationalBackgroundsUseCase(userId);
  }),
});
