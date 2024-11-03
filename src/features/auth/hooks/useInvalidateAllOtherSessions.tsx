import { showErrorToast, showSuccessToast } from "@/components/toastUtils";
import { api } from "@/trpc/react";

export const useInvalidateAllOtherSessions = () => {
  const utils = api.useUtils();
  const { mutate: invalidateAllOtherUserSessions, isPending } =
    api.auth.invalidateAllOtherUserSessions.useMutation({
      onMutate: async () => {
        await utils.accountSettings.getCandidateAccountSettings.cancel();
        const previousData =
          utils.accountSettings.getCandidateAccountSettings.getData();

        utils.accountSettings.getCandidateAccountSettings.setData(
          undefined,
          (oldSettings) => {
            if (!oldSettings) return oldSettings;
            return {
              ...oldSettings,
              deviceSessions: oldSettings.deviceSessions.filter(
                (item) => item.isCurrentSession,
              ),
            };
          },
        );

        return { previousData };
      },
      onError: (_err, _newJob, context) => {
        showErrorToast(
          "An error occurred while signing out all other sessions. Please try again later.",
        );
        utils.accountSettings.getCandidateAccountSettings.setData(
          undefined,
          context?.previousData,
        );
      },
      onSuccess: () => {
        showSuccessToast("All other sessions signed out successfully.");
      },
    });

  return { invalidateAllOtherUserSessions, isPending };
};
