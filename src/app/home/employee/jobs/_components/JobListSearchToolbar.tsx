"use client";
import JobListFilters from "@/app/home/employee/jobs/_components/JobListFilters";
import JoblistLocationInput from "@/app/home/employee/jobs/_components/JoblistLocationInput";
import { useJobsListPageSearchParams } from "@/app/home/employee/jobs/_hooks/useJobsListPageSearchParams";
import { cn } from "@/lib/utils";
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
        <JoblistLocationInput />
        <JobListFilters />
      </div>
    </div>
  );
};

export default JobListSearchToolbar;
