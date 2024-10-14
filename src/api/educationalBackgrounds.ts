import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createEducationalBackgroundUseCase } from "@/use-cases/educationalBackgrounds";
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
});
