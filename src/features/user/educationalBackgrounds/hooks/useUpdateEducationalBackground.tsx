import { api } from "@/trpc/react";

export const useUpdateEducationalBackground = (options?: {
  onSuccess?: () => void;
}) => {
  const {
    mutate: updateEducationalBackground,
    isPending: isUpdatingEducationalBackground,
  } =
    api.educationalBackgrounds.updateEducationalBackground.useMutation(options);

  return {
    updateEducationalBackground,
    isUpdatingEducationalBackground,
  };
};
