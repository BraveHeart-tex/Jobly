import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { WorkExperienceValidator } from "@/validators/user/profile/workExperienceValidator";
import { parser } from "valibot";
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
});
