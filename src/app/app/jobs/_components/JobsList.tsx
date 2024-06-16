"use client";
import type { RouterOutputs } from "@/trpc/react";
import { useQueryState } from "nuqs";
import React, { type RefObject, useEffect, useRef } from "react";
import JobDetails from "./JobDetails";
import JobsListCard from "./JobsListCard";

type JobsListProps = {
  jobs: RouterOutputs["job"]["getJobListings"];
};

const JobsList = ({ jobs }: JobsListProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<RefObject<HTMLDivElement | null>[]>([]);
  const [currentJobId] = useQueryState("currentJobId");

  if (jobs.length > 0) {
    itemRefs.current = jobs.map(() => React.createRef<HTMLDivElement>());
  }

  useEffect(() => {
    if (currentJobId) {
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

  return (
    <div className="grid grid-cols-12 gap-4">
      <div
        ref={containerRef}
        className="col-span-4 grid h-[calc(100vh-62px)] grid-cols-1 gap-4 overflow-auto p-1"
      >
        {jobs.map((job, index) => (
          <JobsListCard ref={itemRefs?.current[index]} key={job.id} job={job} />
        ))}
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
