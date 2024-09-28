import { api } from "@/trpc/react";

export const useGetProfileAboutSection = () => {
  const { data, isPending: isPendingAboutData } =
    api.userProfile.getAboutInformation.useQuery();
  return { data, isPendingAboutData };
};
