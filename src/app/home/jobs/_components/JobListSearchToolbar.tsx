"use client";
import JobListFilters from "@/app/home/jobs/_components/JobListFilters";
import JoblistLocationInput from "@/app/home/jobs/_components/JoblistLocationInput";
import { useJobListViewStore } from "@/lib/stores/useJobListViewStore";
import { cn } from "@/lib/utils";
import JobListSearchInput from "./JobListSearchInput";

const JobListSearchToolbar = () => {
  const { view } = useJobListViewStore();

  return (
    <div
      className={cn(
        "mx-auto max-w-screen-2xl mb-1 pt-1",
        view === "jobDetail" && "hidden lg:block",
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
