import { api } from "@/trpc/react";
import type { ProfileData } from "@/schemas/user/profile/profileValidator";

export const useUpdateUserProfile = (options?: {
  onSuccess?: (
    // biome-ignore lint/suspicious/noConfusingVoidType: Make react-query happy
    data: void,
    variables: ProfileData,
    context: unknown,
  ) => void;
}) => {
  const { mutate: updateUserProfile, isPending: isUpdatingUserProfile } =
    api.userProfile.updateUserProfile.useMutation(options);

  return {
    updateUserProfile,
    isUpdatingUserProfile,
  };
};
