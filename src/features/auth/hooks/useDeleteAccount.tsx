import { api } from "@/trpc/react";

export const useDeleteAccount = (options?: {
  onSuccess?: () => void;
}) => {
  const { mutate: deleteAccount, isPending: isDeletingAccount } =
    api.auth.deleteAccount.useMutation(options);

  return { deleteAccount, isDeletingAccount };
};
