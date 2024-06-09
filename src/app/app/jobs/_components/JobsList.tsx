import { Skeleton } from "@/components/ui/skeleton";
import type { RouterOutputs } from "@/trpc/react";
import { headers } from "next/headers";
import { Suspense } from "react";
import JobDetails from "./JobDetails";
import JobsListCard from "./JobsListCard";

type JobsListProps = {
  jobs: RouterOutputs["job"]["getJobListings"];
};

const JobsList = ({ jobs }: JobsListProps) => {
  const url = new URL(headers().get("x-url") as string);
  const currentJobId = Number.parseInt(
    url.searchParams.get("currentJobId") ?? "0",
  );

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4 grid h-[calc(100vh-62px)] grid-cols-1 gap-4 overflow-auto p-1">
        {jobs.map((job) => (
          <JobsListCard
            key={job.id}
            job={job}
            isActive={currentJobId === job.id}
          />
        ))}
      </div>
      <div className="col-span-8  h-[calc(100vh-62px)]">
        <Suspense
          fallback={
            <div className="h-full rounded-md bg-card p-4">
              <div className="grid gap-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-8 w-full lg:w-1/2" />
                <Skeleton className="h-8 w-full lg:w-1/2" />
              </div>
            </div>
          }
        >
          {currentJobId ? <JobDetails currentJobId={currentJobId} /> : null}
        </Suspense>
      </div>
    </div>
  );
};

export default JobsList;
