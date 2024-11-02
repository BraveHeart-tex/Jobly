import { getCandidateAccountSettingsUseCase } from "@/features/user/accountSettings/data-access/accountSettings";
import { upsertNotificationSettingsUseCase } from "@/features/user/accountSettings/use-cases/candidateNotifications";
import { deleteDeviceSessionUseCase } from "@/features/user/accountSettings/use-cases/deviceSessions";
import { upsertPrivacySettingsUseCase } from "@/features/user/accountSettings/use-cases/privacySettings";
import { upsertUserEmailNotificationSettingsUseCase } from "@/features/user/accountSettings/use-cases/userEmailNotifications";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { candidateNotificationSettingsValidator } from "@/validation/user/settings/candidateNotificationSettingsValidator";
import { privacySettingsValidator } from "@/validation/user/settings/privacySettingsValidator";
import { upsertEmailSettingsValidator } from "@/validation/user/settings/upsertEmailSettingsValidator";
import { object, parser, string } from "valibot";

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
  upsertPrivacySettings: protectedProcedure
    .input(parser(privacySettingsValidator))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return await upsertPrivacySettingsUseCase(userId, input);
    }),
  signOutDevice: protectedProcedure
    .input(
      parser(
        object({
          sessionId: string(),
        }),
      ),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.user.id;
      return await deleteDeviceSessionUseCase(userId, input.sessionId);
    }),
});
