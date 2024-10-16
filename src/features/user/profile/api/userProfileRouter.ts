import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { userProfileService } from "../services/userProfileService";
import { number, object, optional, parser } from "valibot";
import { SaveAboutInformationValidator } from "@/validators/user/profile/saveAboutInformationValidator";
import { fetchUserProfileUseCase } from "@/use-cases/userProfiles";

const optionalUserIdValidator = optional(
  object({
    userId: number(),
  }),
);

export const userProfileRouter = createTRPCRouter({
  fetchUserProfile: protectedProcedure
    .input(parser(optionalUserIdValidator))
    .query(async ({ ctx, input }) => {
      const userId = input?.userId || ctx.user.id;
      return await fetchUserProfileUseCase(userId);
    }),
  fetchUserProfileDetails: protectedProcedure
    .input(parser(optionalUserIdValidator))
    .query(async ({ ctx, input }) => {
      const userId = input?.userId || ctx.user.id;
      return userProfileService.fetchUserProfileDetails(userId);
    }),
  getAboutInformation: protectedProcedure
    .input(parser(optionalUserIdValidator))
    .query(async ({ ctx, input }) => {
      const userId = input?.userId || ctx.user.id;
      return userProfileService.getAboutInformation(userId);
    }),
  saveAboutInformation: protectedProcedure
    .input(parser(SaveAboutInformationValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return userProfileService.saveAboutInformation(userId, input);
    }),
});
