import { api } from "@/trpc/react";

export const useCreateUserSkill = (options?: {
  onSuccess?: () => void;
}) => {
  const { mutate: createUserSkill, isPending: isCreatingUserSkill } =
    api.userSkills.createUserSkill.useMutation(options);

  return {
    createUserSkill,
    isCreatingUserSkill,
  };
};
