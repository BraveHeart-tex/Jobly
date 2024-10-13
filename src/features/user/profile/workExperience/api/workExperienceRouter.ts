import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { WorkExperienceValidator } from "@/validators/user/profile/workExperienceValidator";
import { minValue, number, object, parser, pipe } from "valibot";
import { workExperienceService } from "../services/workExperienceService";

export const workExperienceRouter = createTRPCRouter({
  createWorkExperience: protectedProcedure
    .input(parser(WorkExperienceValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return workExperienceService.createWorkExperience({
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
      return workExperienceService.getWorkExperience({
        userId,
        experienceId: input.id,
      });
    }),
  updateWorkExperience: protectedProcedure
    .input(parser(WorkExperienceValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return workExperienceService.updateWorkExperience({
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
      return workExperienceService.deleteWorkExperience({
        userId,
        experienceId: input.id,
      });
    }),
});
