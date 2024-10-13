import { api } from "@/trpc/react";

export const useDeleteWorkExperience = (options?: {
  onSuccess?: () => void;
}) => {
  const { mutate: deleteWorkExperience, isPending: isDeletingWorkExperience } =
    api.workExperience.deleteWorkExperience.useMutation(options);

  return {
    deleteWorkExperience,
    isDeletingWorkExperience,
  };
};
