import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { deleteUserAvatarUrlUseCase } from "@/use-cases/users";
export const userRouter = createTRPCRouter({
  deleteAvatar: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.user.id;
    const previousAvatarUrl = ctx.user.avatarUrl;

    return await deleteUserAvatarUrlUseCase(userId, previousAvatarUrl);
  }),
});
