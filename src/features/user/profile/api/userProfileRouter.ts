import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { number, object, optional, parser } from "valibot";
import { SaveAboutInformationValidator } from "@/validators/user/profile/saveAboutInformationValidator";
import {
  fetchUserProfileDetailsUseCase,
  fetchUserProfileUseCase,
  getAboutInformationUseCase,
  saveAboutInformationUseCase,
  updateUserProfileUseCase,
} from "@/features/user/profile/use-cases/userProfiles";
import { ProfileValidator } from "@/validators/user/profile/profileValidator";

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
  updateUserProfile: protectedProcedure
    .input(parser(ProfileValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return await updateUserProfileUseCase({
        ...input,
        userId,
      });
    }),
  fetchUserProfileDetails: protectedProcedure
    .input(parser(optionalUserIdValidator))
    .query(async ({ ctx, input }) => {
      const userId = input?.userId || ctx.user.id;
      return fetchUserProfileDetailsUseCase(userId);
    }),
  getAboutInformation: protectedProcedure
    .input(parser(optionalUserIdValidator))
    .query(async ({ ctx, input }) => {
      const userId = input?.userId || ctx.user.id;
      return getAboutInformationUseCase(userId);
    }),
  saveAboutInformation: protectedProcedure
    .input(parser(SaveAboutInformationValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return saveAboutInformationUseCase(userId, input);
    }),
});
