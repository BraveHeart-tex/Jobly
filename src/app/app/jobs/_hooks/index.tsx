"use client";
import { api } from "@/trpc/react";

export const useBookmark = (currentJobId: number) => {
  const queryClientUtils = api.useUtils();
  const { mutate: bookmarkJob, isPending: isBookmarkingJob } =
    api.job.bookmarkJob.useMutation({
      onMutate: async () => {
        await queryClientUtils.job.getJobById.cancel();

        const previousJobDetails = queryClientUtils.job.getJobById.getData();

        queryClientUtils.job.getJobById.setData(
          { id: currentJobId },
          (oldJobData) => {
            if (!oldJobData) return oldJobData;
            oldJobData.userBookmarkedJob = !oldJobData.userBookmarkedJob;
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
      },
    });

  return {
    bookmarkJob,
    isBookmarkingJob,
  };
};

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
            oldJobData.userBookmarkedJob = !oldJobData.userBookmarkedJob;
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
      },
    });

  return {
    deleteJobBookmark,
    isDeletingJobBookmark,
  };
};

export const useMarkJobAsViewed = (currentJobId: number) => {
  const queryClientUtils = api.useUtils();
  const { mutate: markJobAsViewed } = api.job.markJobAsViewed.useMutation({
    onMutate: async () => {
      await queryClientUtils.job.getJobById.cancel();
      await queryClientUtils.job.getJobListings.cancel();

      const previousJobDetails = queryClientUtils.job.getJobById.getData();
      const previostJobListings = queryClientUtils.job.getJobListings.getData();

      queryClientUtils.job.getJobById.setData(
        { id: currentJobId },
        (oldJobData) => {
          if (!oldJobData) return oldJobData;
          oldJobData.userViewedJob = true;
          return oldJobData;
        },
      );
      queryClientUtils.job.getJobListings.setData(
        { query: "" },
        (oldJobListingsData) => {
          if (!oldJobListingsData?.jobListings) return oldJobListingsData;
          return {
            ...oldJobListingsData,
            jobListings: oldJobListingsData.jobListings.map((job) => {
              if (job.id === currentJobId) {
                job.userViewedJob = true;
              }
              return job;
            }),
          };
        },
      );

      return { previousJobDetails, previostJobListings };
    },
    onError: (_err, _newJob, context) => {
      queryClientUtils.job.getJobById.setData(
        { id: currentJobId },
        context?.previousJobDetails,
      );
      queryClientUtils.job.getJobListings.setData(
        { query: "" },
        context?.previostJobListings,
      );
    },
    onSettled: () => {
      void queryClientUtils.job.getJobListings.invalidate();
      void queryClientUtils.job.getJobById.invalidate();
    },
  });

  return { markJobAsViewed };
};
