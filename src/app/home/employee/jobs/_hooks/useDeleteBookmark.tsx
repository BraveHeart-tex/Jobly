"use client";
import { api } from "@/trpc/react";

export const useDeleteBookmark = (currentJobId: number) => {
  const queryClientUtils = api.useUtils();
  const { mutate: deleteJobBookmark, isPending: isDeletingJobBookmark } =
    api.job.deleteJobBookmark.useMutation({
      onMutate: async () => {
        await queryClientUtils.job.getJobById.cancel();

        const previousJobDetails = queryClientUtils.job.getJobById.getData();

        queryClientUtils.job.getJobById.setData(
          { id: currentJobId },
          (oldJobData) => {
            if (!oldJobData) return oldJobData;
            oldJobData.userBookmarkedJob = Number(
              !oldJobData.userBookmarkedJob,
            );
            return oldJobData;
          },
        );

        return { previousJobDetails };
      },
      onError: (_err, _newJob, context) => {
        queryClientUtils.job.getJobById.setData(
          { id: currentJobId },
          context?.previousJobDetails,
        );
      },
      onSettled: () => {
        void queryClientUtils.job.getJobById.invalidate();
        void queryClientUtils.job.getJobListings.invalidate();
      },
    });

  return {
    deleteJobBookmark,
    isDeletingJobBookmark,
  };
};
