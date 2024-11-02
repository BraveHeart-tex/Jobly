"use client";

import JobListFilters from "@/features/candidate/jobs/components/JobListFilters";
import JobListLocationInput from "@/features/candidate/jobs/components/JobListLocationInput";
import JobListSearchInput from "@/features/candidate/jobs/components/JobListSearchInput";
import { useJobsListPageSearchParams } from "@/features/candidate/jobs/hooks/useJobsListPageSearchParams";
import { cn } from "@/lib/utils";

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
