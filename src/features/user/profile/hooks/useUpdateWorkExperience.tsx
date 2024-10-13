import { api } from "@/trpc/react";

export const useUpdateWorkExperience = () => {
  const { mutate, isPending } =
    api.workExperience.updateWorkExperience.useMutation();
};
