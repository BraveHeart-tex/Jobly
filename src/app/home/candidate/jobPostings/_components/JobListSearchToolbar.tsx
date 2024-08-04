"use client";

import { cn } from "@/lib/utils";
import { useJobsListPageSearchParams } from "../_hooks/useJobsListPageSearchParams";
import JobListFilters from "./JobListFilters";
import JobListSearchInput from "./JobListSearchInput";
import JoblistLocationInput from "./JoblistLocationInput";

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
        <JoblistLocationInput />
        <JobListFilters />
      </div>
    </div>
  );
};

export default JobListSearchToolbar;
