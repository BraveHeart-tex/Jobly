import { api } from "@/trpc/react";

export const useCreateWorkExperience = (options: {
  onSuccess?: () => void;
}) => {
  const { mutate: createWorkExperience, isPending: isCreatingWorkExperience } =
    api.workExperience.createWorkExperience.useMutation(options);

  return { createWorkExperience, isCreatingWorkExperience };
};
