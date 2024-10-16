import { api } from "@/trpc/react";

export const useGetUserProfile = () => {
  const utils = api.useUtils();

  const getUserProfile = async (userId?: number) => {
    return utils.userProfile.fetchUserProfile.fetch(
      userId ? { userId } : undefined,
    );
  };

  return {
    getUserProfile,
  };
};
