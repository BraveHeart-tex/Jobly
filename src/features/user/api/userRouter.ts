import { deleteUserAvatarUrlUseCase } from "@/features/user/profile/use-cases/users";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
export const userRouter = createTRPCRouter({
  deleteAvatar: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.user.id;
    const previousAvatarUrl = ctx.user.avatarUrl as string;

    return await deleteUserAvatarUrlUseCase(userId, previousAvatarUrl);
  }),
});
