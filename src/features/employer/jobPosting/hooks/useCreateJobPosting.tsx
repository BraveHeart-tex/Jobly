import type { ReactQueryOptions } from "@/lib/types";
import { api } from "@/trpc/react";

export const useCreateJobPosting = (
  options: ReactQueryOptions["jobPosting"]["createJobPosting"] = {},
) => {
  const { mutate: createJobPosting, isPending: isCreatingJobPosting } =
    api.jobPosting.createJobPosting.useMutation(options);

  return {
    createJobPosting,
    isCreatingJobPosting,
  };
};
