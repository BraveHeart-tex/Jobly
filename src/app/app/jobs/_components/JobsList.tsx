"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/trpc/react";
import { useQueryState } from "nuqs";
import React, {
  type LegacyRef,
  type RefObject,
  useEffect,
  useRef,
} from "react";
import JobDetails from "./JobDetails";
import JobsListCard from "./JobsListCard";

const JobsList = () => {
  const { data: jobs, isPending: isPendingJobs } =
    api.job.getJobListings.useQuery();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<RefObject<HTMLDivElement | null>[]>([]);
  const [currentJobId, setCurrentJobId] = useQueryState("currentJobId");

  if (jobs && jobs?.length > 0) {
    itemRefs.current = jobs.map(() => React.createRef<HTMLDivElement>());
  }

  useEffect(() => {
    if (Array.isArray(jobs) && jobs.length > 0 && !currentJobId) {
      const firstJobId = jobs[0]?.id.toString() || "";
      setCurrentJobId(firstJobId);
    }
  }, [jobs, currentJobId, setCurrentJobId]);

  useEffect(() => {
    if (jobs && currentJobId) {
      const index = jobs.findIndex(
        (job) => job.id === Number.parseInt(currentJobId),
      );

      if (index && itemRefs?.current[index] && containerRef.current) {
        const container = containerRef.current;
        const activeItem = itemRefs.current[index]?.current;

        if (!container || !activeItem) return;

        const containerRect = container?.getBoundingClientRect();
        const itemRect = activeItem?.getBoundingClientRect();

        const offsetTop =
          itemRect.top - containerRect.top + container.scrollTop;

        container.scrollTo({
          top: offsetTop - containerRect.height / 2 + itemRect.height / 2,
          behavior: "smooth",
        });
      }
    }
  }, [currentJobId, jobs]);

  const renderJobs = () => {
    if (!jobs || jobs.length === 0) return null;

    return (
      <>
        {jobs?.map((job, index) => (
          <JobsListCard
            ref={itemRefs?.current[index] as LegacyRef<HTMLDivElement>}
            key={job.id}
            job={job}
          />
        ))}
      </>
    );
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div
        ref={containerRef}
        className="col-span-4 grid h-[calc(100vh-62px)] grid-cols-1 gap-4 overflow-auto p-1"
      >
        {isPendingJobs ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                key={index}
                className="rounded-md p-4 h-52"
              />
            ))}
          </>
        ) : (
          renderJobs()
        )}
      </div>
      <div className="col-span-8  h-[calc(100vh-62px)]">
        {currentJobId ? (
          <JobDetails currentJobId={Number.parseInt(currentJobId)} />
        ) : null}
      </div>
    </div>
  );
};

export default JobsList;
