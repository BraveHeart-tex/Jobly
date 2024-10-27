import { api } from "@/trpc/react";

export const useGetWorkExperiences = () => {
  const { data: workExperiences, isPending: isFetchingWorkExperiences } =
    api.workExperience.getWorkExperiences.useQuery();

  return { workExperiences, isFetchingWorkExperiences };
};
