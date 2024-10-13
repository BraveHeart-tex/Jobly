import type { SkillInsertModel } from "@/server/db/schema/skills";
import { api } from "@/trpc/react";

export const useCreateSkill = (
  options: {
    onSuccess?: (data: { id: number }[], variables: SkillInsertModel) => void;
  } = {},
) => {
  const { mutate: createSkill, isPending: isCreatingSkill } =
    api.skill.createSkill.useMutation(options);

  return {
    createSkill,
    isCreatingSkill,
  };
};
