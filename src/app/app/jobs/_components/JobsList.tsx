import { type RouterOutputs } from "@/trpc/react";
import { headers } from "next/headers";
import JobsListCard from "./JobsListCard";
import JobDetails from "./JobDetails";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type JobsListProps = {
  jobs: RouterOutputs["job"]["getJobListings"];
};

const JobsList = ({ jobs }: JobsListProps) => {
  const url = new URL(headers().get("x-url")!);
  const currentJobId = parseInt(url.searchParams.get("currentJobId") ?? "0");

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
          <JobDetails currentJobId={currentJobId} />
        </Suspense>
      </div>
    </div>
  );
};

export default JobsList;
