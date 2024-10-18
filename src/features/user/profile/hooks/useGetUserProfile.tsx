import { api } from "@/trpc/react";

export const useGetUserProfile = (userId?: number) => {
  const { data: userProfile, isPending: isFetchingUserProfile } =
    api.userProfile.fetchUserProfile.useQuery(userId ? { userId } : undefined);

  return { userProfile, isFetchingUserProfile };
};
