import { upsertUserEmailNotificationSettingsUseCase } from "@/features/user/accountSettings/use-cases/userEmailNotifications";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { upsertEmailSettingsValidator } from "@/validation/user/settings/upsertEmailSettingsValidator";
import { parser } from "valibot";

export const accountSettingsRouter = createTRPCRouter({
  upsertUserEmailNotificationSettings: protectedProcedure
    .input(parser(upsertEmailSettingsValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return await upsertUserEmailNotificationSettingsUseCase(userId, input);
    }),
});
