import { api } from "@/trpc/react";

export const useUpdateJobPosting = (
  options: {
    onSuccess?: () => void;
  } = {},
) => {
  const { mutate: updateJobPosting, isPending: isUpdatingJobPosting } =
    api.jobPosting.updateJobPosting.useMutation(options);

  return {
    updateJobPosting,
    isUpdatingJobPosting,
  };
};
