"use client";
import { api } from "@/trpc/react";

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
          oldJobData.userViewedJob = 1;
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
                // @ts-ignore
                job.userViewedJob = 1;
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
