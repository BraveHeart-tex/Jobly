import { api } from "@/trpc/react";

export const useInvalidateAllOtherSessions = (options?: {
  onSuccess?: () => void;
}) => {
  const { mutate: invalidateAllOtherUserSessions, isPending } =
    api.auth.invalidateAllOtherUserSessions.useMutation(options);

  return { invalidateAllOtherUserSessions, isPending };
};
