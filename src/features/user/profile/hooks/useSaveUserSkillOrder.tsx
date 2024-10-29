import { api } from "@/trpc/react";

export const useSaveUserSkillOrder = (options?: {
  onSuccess?: () => void;
}) => {
  const { mutate: saveUserSkillOrder, isPending: isSavingUserSkillOrder } =
    api.userSkills.saveUserSkillOrder.useMutation(options);

  return {
    saveUserSkillOrder,
    isSavingUserSkillOrder,
  };
};
