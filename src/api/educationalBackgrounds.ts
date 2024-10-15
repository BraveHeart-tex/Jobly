import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createEducationalBackgroundUseCase,
  deleteEducationalBackgroundUseCase,
  getEducationalBackgroundUseCase,
} from "@/use-cases/educationalBackgrounds";
import { GenericIdValidator } from "@/validators/schemaUtils";
import { InsertEducationValidator } from "@/validators/user/profile/educationValidator";
import { parser } from "valibot";

export const educationalBackgroundsRouter = createTRPCRouter({
  createEducationalBackground: protectedProcedure
    .input(parser(InsertEducationValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return createEducationalBackgroundUseCase({
        ...input,
        userId,
      });
    }),
  deleteEducationalBackground: protectedProcedure
    .input(parser(GenericIdValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return deleteEducationalBackgroundUseCase(userId, input.id);
    }),
  getEducationalBackground: protectedProcedure
    .input(parser(GenericIdValidator))
    .query(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return getEducationalBackgroundUseCase(userId, input.id);
    }),
});
