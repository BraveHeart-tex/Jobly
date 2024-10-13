import { api } from "@/trpc/react";

export const useUpdateWorkExperience = (
  options: {
    onSuccess?: () => void;
  } = {},
) => {
  const { mutate: updateWorkExperience, isPending: isUpdatingWorkExperience } =
    api.workExperience.updateWorkExperience.useMutation(options);

  return {
    updateWorkExperience,
    isUpdatingWorkExperience,
  };
};
