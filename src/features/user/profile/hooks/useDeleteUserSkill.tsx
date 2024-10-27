import { api } from "@/trpc/react";

export const useDeleteUserSkill = (options?: {
  onSuccess?: () => void;
}) => {
  const { mutate: deleteUserSkill, isPending: isDeletingUserSkill } =
    api.userSkills.deleteUserSkill.useMutation(options);
  return {
    deleteUserSkill,
    isDeletingUserSkill,
  };
};
