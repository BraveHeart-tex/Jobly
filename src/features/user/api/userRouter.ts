import {
  deleteUserAvatarUrlUseCase,
  updatePersonalSettingsUseCase,
} from "@/features/user/profile/use-cases/users";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { personalSettingsFormValidator } from "@/validation/user/settings/personalSettingsFormValidator";
import { parser } from "valibot";
export const userRouter = createTRPCRouter({
  deleteAvatar: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.user.id;
    const previousAvatarUrl = ctx.user.avatarUrl as string;

    return await deleteUserAvatarUrlUseCase(userId, previousAvatarUrl);
  }),
  updatePersonalSettings: protectedProcedure
    .input(parser(personalSettingsFormValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return await updatePersonalSettingsUseCase({
        ...input,
        userId,
        previousRole: ctx.user.role,
      });
    }),
});
