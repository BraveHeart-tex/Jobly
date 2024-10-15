import { api } from "@/trpc/react";

export const useFetchUserProfile = () => {
  const { data: userProfile, isPending: isFetchingUserProfile } =
    api.userProfile.fetchUserProfile.useQuery();

  return {
    userProfile,
    isFetchingUserProfile,
  };
};
