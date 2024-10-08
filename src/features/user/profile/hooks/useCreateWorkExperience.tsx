import type { ReactQueryOptions } from "@/lib/types";
import { api } from "@/trpc/react";

export const useCreateWorkExperience = (
  options: ReactQueryOptions["workExperience"]["createWorkExperience"] = {},
) => {
  const { mutate: createWorkExperience, isPending: isCreatingWorkExperience } =
    api.workExperience.createWorkExperience.useMutation(options);

  return { createWorkExperience, isCreatingWorkExperience };
};
