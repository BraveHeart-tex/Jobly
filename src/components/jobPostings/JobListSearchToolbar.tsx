"use client";

import { useJobsListPageSearchParams } from "@/hooks/useJobsListPageSearchParams";
import { cn } from "@/lib/utils";
import JobListFilters from "./JobListFilters";
import JobListLocationInput from "./JobListLocationInput";
import JobListSearchInput from "./JobListSearchInput";

const JobListSearchToolbar = () => {
  const { view } = useJobsListPageSearchParams();

  return (
    <div
      className={cn(
        "mx-auto max-w-screen-2xl mb-1 pt-1",
        view === "jobDetails" && "hidden lg:block",
      )}
    >
      <div className="w-full flex items-center gap-1">
        <JobListSearchInput />
        <JobListLocationInput />
        <JobListFilters />
      </div>
    </div>
  );
};

export default JobListSearchToolbar;
