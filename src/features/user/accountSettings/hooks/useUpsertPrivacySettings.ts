import { showErrorToast } from "@/components/toastUtils";
import { useLeavePageConfirm } from "@/hooks/useLeavePageConfirm";
import { api } from "@/trpc/react";

export const useUpsertPrivacySettings = () => {
  const utils = api.useUtils();
  const {
    mutate: upsertPrivacySettings,
    isPending: isUpsertingPrivacySettings,
  } = api.accountSettings.upsertPrivacySettings.useMutation({
    onMutate: async (variables) => {
      await utils.accountSettings.getCandidateAccountSettings.cancel();
      const previousData =
        utils.accountSettings.getCandidateAccountSettings.getData();

      utils.accountSettings.getCandidateAccountSettings.setData(
        undefined,
        (oldSettings) => {
          if (!oldSettings) return oldSettings;
          return {
            ...oldSettings,
            privacySettings: {
              ...oldSettings.privacySettings,
              ...variables,
            },
          };
        },
      );

      return { previousData };
    },
    onError: (_err, _newJob, context) => {
      showErrorToast(
        "An error occurred while updating your privacy settings. Please try again.",
      );
      utils.accountSettings.getCandidateAccountSettings.setData(
        undefined,
        context?.previousData,
      );
    },
  });

  useLeavePageConfirm(isUpsertingPrivacySettings);

  return {
    upsertPrivacySettings,
    isUpsertingPrivacySettings,
  };
};
