import type { ReactQueryOptions } from "@/lib/types";
import { api } from "@/trpc/react";

export const useCreateBenefit = (
  options: ReactQueryOptions["benefit"]["createBenefit"] = {},
) => {
  const { mutate: createBenefit, isPending: isCreatingBenefit } =
    api.benefit.createBenefit.useMutation(options);

  return {
    createBenefit,
    isCreatingBenefit,
  };
};
