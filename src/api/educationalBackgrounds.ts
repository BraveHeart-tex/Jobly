import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  createEducationalBackgroundUseCase,
  deleteEducationalBackgroundUseCase,
} from "@/use-cases/educationalBackgrounds";
import { InsertEducationValidator } from "@/validators/user/profile/educationValidator";
import { minValue, number, object, parser, pipe } from "valibot";

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
    .input(
      parser(
        object({
          id: pipe(
            number(),
            minValue(1, "Please provide valid educational background id."),
          ),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return deleteEducationalBackgroundUseCase(userId, input.id);
    }),
});
