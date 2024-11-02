import { api } from "@/trpc/react";

export const useGetCandidateAccountSettings = () => {
  const { data: accountSettings, isPending: isFetchingAccountSettings } =
    api.accountSettings.getCandidateAccountSettings.useQuery();

  return {
    accountSettings,
    isFetchingAccountSettings,
  };
};
