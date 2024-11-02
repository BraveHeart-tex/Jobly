import { api } from "@/trpc/react";

export const useUpsertEmailNotificationSettings = () => {
  const {
    mutate: upsertUserEmailNotificationSettings,
    isPending: isUpsertingNotificationSettings,
  } = api.candidateSettings.upsertUserEmailNotificationSettings.useMutation();

  return {
    upsertUserEmailNotificationSettings,
    isUpsertingNotificationSettings,
  };
};
