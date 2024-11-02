import { showErrorToast } from "@/components/toastUtils";
import { useLeavePageConfirm } from "@/hooks/useLeavePageConfirm";
import { api } from "@/trpc/react";

export const useUpsertEmailNotificationSettings = () => {
  const queryClientUtils = api.useUtils();

  const {
    mutate: upsertUserEmailNotificationSettings,
    isPending: isUpsertingNotificationSettings,
  } = api.accountSettings.upsertUserEmailNotificationSettings.useMutation({
    onMutate: async (variables) => {
      await queryClientUtils.accountSettings.getCandidateAccountSettings.cancel();

      const previousSettings =
        queryClientUtils.accountSettings.getCandidateAccountSettings.getData();

      queryClientUtils.accountSettings.getCandidateAccountSettings.setData(
        undefined,
        (oldSettings) => {
          if (!oldSettings) return oldSettings;
          return {
            ...oldSettings,
            notificationSettings: {
              ...oldSettings.notificationSettings,
              email: {
                ...oldSettings.notificationSettings.email,
                ...variables,
              },
            },
          };
        },
      );

      return { previousSettings };
    },
    onError: (_err, _newJob, context) => {
      showErrorToast(
        "Something went wrong while updating email notification preferences, please try again later",
      );
      queryClientUtils.accountSettings.getCandidateAccountSettings.setData(
        undefined,
        context?.previousSettings,
      );
    },
  });

  useLeavePageConfirm(isUpsertingNotificationSettings);

  return {
    upsertUserEmailNotificationSettings,
    isUpsertingNotificationSettings,
  };
};
