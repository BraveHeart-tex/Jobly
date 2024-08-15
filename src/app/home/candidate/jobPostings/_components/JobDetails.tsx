"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ArrowLeft, BookmarkPlus, BookmarkX } from "lucide-react";
import { useEffect, useRef } from "react";
import { useBookmark } from "../_hooks/useBookmark";
import { useDeleteBookmark } from "../_hooks/useDeleteBookmark";
import { useJobsListPageSearchParams } from "../_hooks/useJobsListPageSearchParams";
import { useMarkJobAsViewed } from "../_hooks/useMarkJobAsViewed";
import ApplyToJobDialog from "./ApplyToJobDialog";
import CompanyLogo from "./CompanyLogo";

type JobDetailsProps = {
  currentJobId: number;
};

const JobDetails = ({ currentJobId }: JobDetailsProps) => {
  const { view, setView } = useJobsListPageSearchParams();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { data: jobDetails, isPending: isPendingJobDetails } =
    api.userJobListing.getJobById.useQuery({
      id: currentJobId,
    });

  const { markJobAsViewed } = useMarkJobAsViewed(currentJobId);
  const { bookmarkJob } = useBookmark(currentJobId);
  const { deleteJobBookmark } = useDeleteBookmark(currentJobId);

  useEffect(() => {
    if (!currentJobId || !containerRef?.current || !jobDetails?.id) return;

    containerRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
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

  const renderActionButtons = () => (
    <div className="grid grid-cols-2 gap-2 ml-auto lg:ml-0">
      <ApplyToJobDialog jobDetails={jobDetails} />
      <Button
        variant="secondary"
        className="flex items-center gap-1"
        onClick={handleBookmarkJob}
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
  );

  return (
    <article
      ref={containerRef}
      className="h-full overflow-auto rounded-lg bg-background p-4 relative"
    >
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          className={cn("hidden", view === "jobDetails" && "flex lg:hidden")}
          onClick={() => setView("list")}
        >
          <ArrowLeft size={18} />
        </Button>
        <div className={cn(view === "jobDetails" && "block lg:hidden")}>
          {renderActionButtons()}
        </div>
      </div>

      <header className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <CompanyLogo
            className="size-14"
            companyName={jobDetails?.company.name}
            logo={jobDetails?.company.logo}
          />
          <div className="grid">
            <h2 className="text-2xl font-semibold tracking-tight">
              {jobDetails.title}
            </h2>
            <p className="text-base text-muted-foreground">
              {jobDetails.company.name}
            </p>
          </div>
        </div>
        <div className="hidden lg:block">{renderActionButtons()}</div>
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
