"use client";
import { useJobListViewStore } from "@/lib/stores/useJobListViewStore";
import JobListSearchInput from "./JobListSearchInput";
import { cn } from "@/lib/utils";

const JobListSearchToolbar = () => {
  const { view } = useJobListViewStore();

  return (
    <div
      className={cn(
        "mx-auto max-w-screen-2xl mb-1 pt-1",
        view === "jobDetail" && "hidden lg:block",
      )}
    >
      <JobListSearchInput />
    </div>
  );
};

export default JobListSearchToolbar;
