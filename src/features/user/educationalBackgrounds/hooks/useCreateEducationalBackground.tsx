import { api } from "@/trpc/react";

export const useCreateEducationalBackground = (options?: {
  onSuccess: () => void;
}) => {
  const {
    mutate: createEducationalBackground,
    isPending: isCreatingEducationalBackground,
  } =
    api.educationalBackgrounds.createEducationalBackground.useMutation(options);

  return {
    createEducationalBackground,
    isCreatingEducationalBackground,
  };
};
