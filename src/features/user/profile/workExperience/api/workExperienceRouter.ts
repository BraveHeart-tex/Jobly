import {
  createWorkExperienceUseCase,
  getWorkExperienceUseCase,
  updateWorkExperienceUseCase,
  deleteWorkExperienceUseCase,
  getWorkExperiencesUseCase,
} from "@/features/user/profile/workExperience/use-cases/workExperiences";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
  updateWorkExperienceValidator,
  workExperienceValidator,
} from "@/schemas/user/profile/workExperienceValidator";
import { minValue, number, object, parser, pipe } from "valibot";

export const workExperienceRouter = createTRPCRouter({
  createWorkExperience: protectedProcedure
    .input(parser(workExperienceValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return createWorkExperienceUseCase({
        ...input,
        userId,
      });
    }),
  getWorkExperience: protectedProcedure
    .input(
      parser(
        object({
          id: pipe(
            number(),
            minValue(1, "Please provide valid work experience id."),
          ),
        }),
      ),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return getWorkExperienceUseCase({
        userId,
        experienceId: input.id,
      });
    }),
  updateWorkExperience: protectedProcedure
    .input(parser(updateWorkExperienceValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return updateWorkExperienceUseCase({
        ...input,
        userId,
      });
    }),
  deleteWorkExperience: protectedProcedure
    .input(
      parser(
        object({
          id: pipe(
            number(),
            minValue(1, "Please provide valid work experience id."),
          ),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return deleteWorkExperienceUseCase({
        userId,
        experienceId: input.id,
      });
    }),
  getWorkExperiences: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    return getWorkExperiencesUseCase(userId);
  }),
});
