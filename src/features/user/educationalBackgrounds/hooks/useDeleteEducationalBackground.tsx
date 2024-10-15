import { api } from "@/trpc/react";

export const useDeleteEducationalBackground = (options?: {
  onSuccess?: () => void;
}) => {
  const {
    mutate: deleteEducationalBackground,
    isPending: isDeletingEducationalBackground,
  } =
    api.educationalBackgrounds.deleteEducationalBackground.useMutation(options);

  return {
    deleteEducationalBackground,
    isDeletingEducationalBackground,
  };
};
