import { showErrorToast } from "@/components/toastUtils";
import { api } from "@/trpc/react";
import { useRouter } from "nextjs-toploader/app";
export const useSignOutDevice = () => {
  const utils = api.useUtils();
  const router = useRouter();
  const { mutate: signOutDevice, isPending: isSigningOutDevice } =
    api.accountSettings.signOutDevice.useMutation({
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
              deviceSessions: oldSettings.deviceSessions.filter(
                (item) => item.sessionId !== variables.sessionId,
              ),
            };
          },
        );

        return { previousData };
      },
      onError: (_err, _newJob, context) => {
        showErrorToast(
          "An error occurred while signing out your device. Please try again.",
        );
        utils.accountSettings.getCandidateAccountSettings.setData(
          undefined,
          context?.previousData,
        );
      },
      onSettled: () => {
        router.refresh();
      },
    });
  return { signOutDevice, isSigningOutDevice };
};
