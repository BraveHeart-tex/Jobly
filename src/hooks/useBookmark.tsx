"use client";
import { api } from "@/trpc/react";

export const useBookmark = (currentJobId: number) => {
  const queryClientUtils = api.useUtils();
  const { mutate: bookmarkJob, isPending: isBookmarkingJob } =
    api.userJobListing.bookmarkJob.useMutation({
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
      },
    });

  return {
    bookmarkJob,
    isBookmarkingJob,
  };
};
