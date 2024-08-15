"use client";
import { api } from "@/trpc/react";

export const useMarkJobAsViewed = (currentJobId: number) => {
  const queryClientUtils = api.useUtils();
  const { mutate: markJobAsViewed } =
    api.userJobListing.markJobAsViewed.useMutation({
      onMutate: async () => {
        await queryClientUtils.userJobListing.getJobById.cancel();
        await queryClientUtils.userJobListing.getJobListings.cancel();

        const previousJobDetails =
          queryClientUtils.userJobListing.getJobById.getData();
        const previostJobListings =
          queryClientUtils.userJobListing.getJobListings.getData();

        queryClientUtils.userJobListing.getJobById.setData(
          { id: currentJobId },
          (oldJobData) => {
            if (!oldJobData) return oldJobData;
            oldJobData.userViewedJob = 1;
            return oldJobData;
          },
        );
        queryClientUtils.userJobListing.getJobListings.setData(
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
        queryClientUtils.userJobListing.getJobById.setData(
          { id: currentJobId },
          context?.previousJobDetails,
        );
        queryClientUtils.userJobListing.getJobListings.setData(
          { query: "" },
          context?.previostJobListings,
        );
      },
      onSettled: () => {
        void queryClientUtils.userJobListing.getJobListings.invalidate();
        void queryClientUtils.userJobListing.getJobById.invalidate();
      },
    });

  return { markJobAsViewed };
};
