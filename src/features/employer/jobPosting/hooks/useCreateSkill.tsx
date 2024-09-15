import type { ReactQueryOptions } from "@/lib/types";
import { api } from "@/trpc/react";

export const useCreateSkill = (
  options: ReactQueryOptions["skill"]["createSkill"] = {},
) => {
  const { mutate: createSkill, isPending: isCreatingSkill } =
    api.skill.createSkill.useMutation(options);

  return {
    createSkill,
    isCreatingSkill,
  };
};
