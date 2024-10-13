import { api } from "@/trpc/react";

export const useCreateJobPosting = (
  options: {
    onSuccess?: () => void;
  } = {},
) => {
  const { mutate: createJobPosting, isPending: isCreatingJobPosting } =
    api.jobPosting.createJobPosting.useMutation(options);

  return {
    createJobPosting,
    isCreatingJobPosting,
  };
};
