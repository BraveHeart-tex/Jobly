import { api } from "@/trpc/react";

export const useDeleteUserAvatar = (options?: {
  onSuccess?: () => void;
}) => {
  const { mutate: deleteUserAvatar, isPending: isDeletingUserAvatar } =
    api.user.deleteAvatar.useMutation(options);

  return {
    deleteUserAvatar,
    isDeletingUserAvatar,
  };
};
