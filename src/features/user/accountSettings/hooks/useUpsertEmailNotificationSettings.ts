import { api } from "@/trpc/react";

export const useUpsertEmailNotificationSettings = () => {
  const {
    mutate: upsertUserEmailNotificationSettings,
    isPending: isUpsertingNotificationSettings,
  } = api.accountSettings.upsertUserEmailNotificationSettings.useMutation();

  return {
    upsertUserEmailNotificationSettings,
    isUpsertingNotificationSettings,
  };
};
