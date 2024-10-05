import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { userProfileService } from "../services/userProfileService";
import { number, object, optional, parser } from "valibot";

const optionalUserIdValidator = optional(
  object({
    userId: number(),
  }),
);

export const userProfileRouter = createTRPCRouter({
  getUserProfileInformation: protectedProcedure
    .input(parser(optionalUserIdValidator))
    .query(async ({ ctx, input }) => {
      const userId = input?.userId || ctx.user.id;

      return userProfileService.getUserProfileInformation(userId);
    }),
  getAboutInformation: protectedProcedure
    .input(parser(optionalUserIdValidator))
    .query(async ({ ctx, input }) => {
      const userId = input?.userId || ctx.user.id;

      return userProfileService.getAboutInformation(userId);
    }),
  getWorkExperiences: protectedProcedure
    .input(parser(optionalUserIdValidator))
    .query(async () => {}),
  getEducationalBackground: protectedProcedure
    .input(parser(optionalUserIdValidator))
    .query(async () => {}),
});
