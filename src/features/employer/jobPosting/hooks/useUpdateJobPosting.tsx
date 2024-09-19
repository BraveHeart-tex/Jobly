import type { ReactQueryOptions } from "@/lib/types";
import { api } from "@/trpc/react";

export const useUpdateJobPosting = (
  options: ReactQueryOptions["jobPosting"]["updateJobPosting"] = {},
) => {
  const { mutate: updateJobPosting, isPending: isUpdatingJobPosting } =
    api.jobPosting.updateJobPosting.useMutation(options);

  return {
    updateJobPosting,
    isUpdatingJobPosting,
  };
};
