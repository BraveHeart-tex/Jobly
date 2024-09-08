"use client";
import { api } from "@/trpc/react";

export const useDeleteBookmark = (currentJobId: number) => {
  const queryClientUtils = api.useUtils();
  const { mutate: deleteJobBookmark, isPending: isDeletingJobBookmark } =
    api.userJobListing.deleteJobBookmark.useMutation({
      onMutate: async () => {
        await queryClientUtils.userJobListing.getJobById.cancel();

        const previousJobDetails =
          queryClientUtils.userJobListing.getJobById.getData();

        queryClientUtils.userJobListing.getJobById.setData(
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
        queryClientUtils.userJobListing.getJobById.setData(
          { id: currentJobId },
          context?.previousJobDetails,
        );
      },
      onSettled: () => {
        void queryClientUtils.userJobListing.getJobById.invalidate();
        void queryClientUtils.userJobListing.getJobListings.invalidate();
      },
    });

  return {
    deleteJobBookmark,
    isDeletingJobBookmark,
  };
};
