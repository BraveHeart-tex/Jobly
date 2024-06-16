"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAvatarPlaceholder } from "@/lib/utils";
import { api } from "@/trpc/react";
import { BookmarkPlus, BookmarkX } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

type JobDetailsProps = {
  currentJobId: number;
};

export const renderCompanyLogo = (
  companyName: string,
  logo?: string | null,
  className?: string,
) => {
  if (logo) {
    return <Image src={logo} width={80} height={80} alt={companyName} />;
  }

  return (
    <Avatar className={className}>
      <AvatarFallback>{getAvatarPlaceholder(companyName)}</AvatarFallback>
    </Avatar>
  );
};

const JobDetails = ({ currentJobId }: JobDetailsProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { data: jobDetails, isPending: isPendingJobDetails } =
    api.job.getJobById.useQuery({
      id: currentJobId,
    });

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
        undefined,
        (oldJobListings) => {
          if (!oldJobListings) return oldJobListings;
          return oldJobListings.map((job) => {
            if (job.id === currentJobId) {
              job.userViewedJob = true;
            }
            return job;
          });
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
        undefined,
        context?.previostJobListings,
      );
    },
    onSettled: () => {
      void queryClientUtils.job.getJobListings.invalidate();
      void queryClientUtils.job.getJobById.invalidate();
    },
  });
  const { mutate: bookmarkJob, isPending: isBookmarkingJob } =
    api.job.bookmarkJob.useMutation({
      onMutate: async () => {
        await queryClientUtils.job.getJobById.cancel();
        await queryClientUtils.job.getJobListings.cancel();

        const previousJobDetails = queryClientUtils.job.getJobById.getData();
        const previostJobListings =
          queryClientUtils.job.getJobListings.getData();

        queryClientUtils.job.getJobById.setData(
          { id: currentJobId },
          (oldJobData) => {
            if (!oldJobData) return oldJobData;
            oldJobData.userBookmarkedJob = !oldJobData.userBookmarkedJob;
            return oldJobData;
          },
        );
        queryClientUtils.job.getJobListings.setData(
          undefined,
          (oldJobListings) => {
            if (!oldJobListings) return oldJobListings;
            return oldJobListings.map((job) => {
              if (job.id === currentJobId) {
                job.userBookmarkedJob = !job.userBookmarkedJob;
              }
              return job;
            });
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
          undefined,
          context?.previostJobListings,
        );
      },
      onSettled: () => {
        void queryClientUtils.job.getJobListings.invalidate();
        void queryClientUtils.job.getJobById.invalidate();
      },
    });

  const { mutate: deleteJobBookmark, isPending: isDeletingJobBookmark } =
    api.job.deleteJobBookmark.useMutation({
      onMutate: async () => {
        await queryClientUtils.job.getJobById.cancel();
        await queryClientUtils.job.getJobListings.cancel();

        const previousJobDetails = queryClientUtils.job.getJobById.getData();
        const previostJobListings =
          queryClientUtils.job.getJobListings.getData();

        queryClientUtils.job.getJobById.setData(
          { id: currentJobId },
          (oldJobData) => {
            if (!oldJobData) return oldJobData;
            oldJobData.userBookmarkedJob = !oldJobData.userBookmarkedJob;
            return oldJobData;
          },
        );
        queryClientUtils.job.getJobListings.setData(
          undefined,
          (oldJobListings) => {
            if (!oldJobListings) return oldJobListings;
            return oldJobListings.map((job) => {
              if (job.id === currentJobId) {
                job.userBookmarkedJob = !job.userBookmarkedJob;
              }
              return job;
            });
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
          undefined,
          context?.previostJobListings,
        );
      },
      onSettled: () => {
        void queryClientUtils.job.getJobListings.invalidate();
        void queryClientUtils.job.getJobById.invalidate();
      },
    });

  useEffect(() => {
    if (currentJobId && containerRef?.current && jobDetails?.id) {
      containerRef.current.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [currentJobId, jobDetails?.id]);

  useEffect(() => {
    if (jobDetails && !jobDetails.userViewedJob) {
      markJobAsViewed({
        id: jobDetails.id,
      });
    }
  }, [jobDetails, markJobAsViewed]);

  if (!jobDetails && isPendingJobDetails) {
    return (
      <div className="h-full rounded-md bg-card p-4">
        <div className="grid gap-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-8 w-full lg:w-1/2" />
          <Skeleton className="h-8 w-full lg:w-1/2" />
        </div>
      </div>
    );
  }

  if (!jobDetails) return null;

  const handleBookmarkJob = () => {
    if (!jobDetails.userBookmarkedJob) {
      bookmarkJob({
        id: jobDetails.id,
      });
    } else {
      deleteJobBookmark({
        id: jobDetails.id,
      });
    }
  };

  return (
    <article
      ref={containerRef}
      className="h-full overflow-auto rounded-lg bg-background p-4"
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {renderCompanyLogo(
            jobDetails?.company.name,
            jobDetails?.company.logo,
            "size-14",
          )}
          <div className="grid">
            <h2 className="text-2xl font-semibold tracking-tight">
              {jobDetails.title}
            </h2>
            <p className="text-base text-muted-foreground">
              {jobDetails.company.name}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button>Apply Now</Button>
          <Button
            variant="secondary"
            className="flex items-center gap-1"
            onClick={handleBookmarkJob}
            disabled={isBookmarkingJob || isDeletingJobBookmark}
          >
            {jobDetails?.userBookmarkedJob ? (
              <>
                <BookmarkX size={18} />
                Unsave
              </>
            ) : (
              <>
                <BookmarkPlus size={18} />
                Save
              </>
            )}
          </Button>
        </div>
      </header>

      <div className="mt-12">
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-medium text-foreground">
            Job Description
          </h3>
          <p className="text-foreground/90">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
            cupiditate, delectus eveniet molestias ullam vel velit. A aperiam
            consectetur, cupiditate, deleniti dignissimos eos est hic, iure
            iusto laboriosam laborum maxime mollitia nisi optio perferendis
            praesentium quam quibusdam repellat sapiente sunt totam veniam
            voluptate. Debitis excepturi id nam numquam perferendis, rerum.
          </p>
        </div>
      </div>
    </article>
  );
};

export default JobDetails;
