import { showErrorToast } from "@/components/toastUtils";
import { useLeavePageConfirm } from "@/hooks/useLeavePageConfirm";
import { api } from "@/trpc/react";

export const useUpsertNotificationSettings = () => {
  const utils = api.useUtils();
  const {
    mutate: upsertNotificationSettings,
    isPending: isUpsertingNotificationSettings,
  } = api.accountSettings.upsertNotificationSettings.useMutation({
    onMutate: async (variables) => {
      await utils.accountSettings.getCandidateAccountSettings.cancel();
      const previousSettings =
        utils.accountSettings.getCandidateAccountSettings.getData();
      utils.accountSettings.getCandidateAccountSettings.setData(
        undefined,
        (oldSettings) => {
          if (!oldSettings) return oldSettings;
          return {
            ...oldSettings,
            notificationSettings: {
              ...oldSettings.notificationSettings,
              general: {
                ...oldSettings.notificationSettings.general,
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
        "Something went wrong while updating notification preferences, please try again later",
      );
      utils.accountSettings.getCandidateAccountSettings.setData(
        undefined,
        context?.previousSettings,
      );
    },
  });

  useLeavePageConfirm(isUpsertingNotificationSettings);

  return {
    upsertNotificationSettings,
    isUpsertingNotificationSettings,
  };
};
