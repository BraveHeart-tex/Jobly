"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ApplyToJobDialog from "@/features/candidate/jobs/components/ApplyToJobDialog";
import CompanyLogo from "@/features/candidate/jobs/components/CompanyLogo";
import { useBookmark } from "@/features/candidate/jobs/hooks/useBookmark";
import { useDeleteBookmark } from "@/features/candidate/jobs/hooks/useDeleteBookmark";
import { useJobsListPageSearchParams } from "@/features/candidate/jobs/hooks/useJobsListPageSearchParams";
import { useMarkJobAsViewed } from "@/features/candidate/jobs/hooks/useMarkJobAsViewed";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ArrowLeft, BookmarkPlus, BookmarkX } from "lucide-react";
import { useEffect, useRef } from "react";

interface JobDetailsProps {
  currentJobId: number;
}

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
        <div className={cn("lg:hidden", view === "jobDetails" && "block")}>
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

      <div className="mt-12">Job content</div>
    </article>
  );
};

export default JobDetails;
