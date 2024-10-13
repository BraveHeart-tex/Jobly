import { api } from "@/trpc/react";

export const useGetWorkExperience = () => {
  const utils = api.useUtils();

  const fetchWorkExperience = async (id: number) => {
    return utils.workExperience.getWorkExperience.fetch({ id });
  };

  return {
    fetchWorkExperience,
  };
};
