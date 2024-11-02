import { getCandidateAccountSettingsUseCase } from "@/features/user/accountSettings/data-access/accountSettings";
import { upsertNotificationSettingsUseCase } from "@/features/user/accountSettings/use-cases/candidateNotifications";
import { upsertUserEmailNotificationSettingsUseCase } from "@/features/user/accountSettings/use-cases/userEmailNotifications";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { candidateNotificationSettingsValidator } from "@/validation/user/settings/candidateNotificationSettingsValidator";
import { upsertEmailSettingsValidator } from "@/validation/user/settings/upsertEmailSettingsValidator";
import { parser } from "valibot";

export const userSettingsRouter = createTRPCRouter({
  upsertUserEmailNotificationSettings: protectedProcedure
    .input(parser(upsertEmailSettingsValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return await upsertUserEmailNotificationSettingsUseCase(userId, input);
    }),
  getCandidateAccountSettings: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    return await getCandidateAccountSettingsUseCase(userId);
  }),
  upsertNotificationSettings: protectedProcedure
    .input(parser(candidateNotificationSettingsValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return await upsertNotificationSettingsUseCase(userId, input);
    }),
});
