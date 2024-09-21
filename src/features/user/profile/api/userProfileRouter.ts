import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { userProfileService } from "../services/userProfileService";

export const userProfileRouter = createTRPCRouter({
  getUserProfileInformation: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;

    return userProfileService.getUserProfileInformation(userId);
  }),
});
