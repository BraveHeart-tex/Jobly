import { api } from "@/trpc/react";

export const useGetProfileAboutSection = () => {
  const { data, isPending } = api.userProfile.getAboutInformation.useQuery();
  return { data, isPending };
};
