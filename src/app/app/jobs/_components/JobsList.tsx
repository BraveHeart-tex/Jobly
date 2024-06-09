import { type RouterOutputs } from "@/trpc/react";
import { headers } from "next/headers";
import JobsListCard from "./JobsListCard";
import JobDetails from "./JobDetails";
import { Suspense } from "react";

type JobsListProps = {
  jobs: RouterOutputs["job"]["getJobListings"];
};

const JobsList = ({ jobs }: JobsListProps) => {
  const url = new URL(headers().get("x-url")!);
  const currentJobId = parseInt(url.searchParams.get("currentJobId") ?? "0");

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4 grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <JobsListCard
            key={job.id}
            job={job}
            isActive={currentJobId === job.id}
          />
        ))}
      </div>
      <div className="col-span-8">
        <Suspense fallback={<div>TODO: Put a skeleton here</div>}>
          <JobDetails currentJobId={currentJobId} />
        </Suspense>
      </div>
    </div>
  );
};

export default JobsList;
