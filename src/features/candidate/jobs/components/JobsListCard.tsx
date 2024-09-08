"use client";
import { useJobsListPageSearchParams } from "@/features/candidate/jobs/hooks/useJobsListPageSearchParams";
import type { ArrayElement, RouterOutputs } from "@/lib/types";
import { cn, generateReadableEnumLabel } from "@/lib/utils";
import { forwardRef } from "react";
import CompanyLogo from "./CompanyLogo";

interface JobsListCardProps {
  job: ArrayElement<
    RouterOutputs["userJobListing"]["getJobListings"]["jobListings"]
  >;
}

const JobsListCard = forwardRef<HTMLDivElement, JobsListCardProps>(
  ({ job }, ref) => {
    const { setView } = useJobsListPageSearchParams();
    const { id, title, company, employmentType, workType, userViewedJob } = job;
    const { currentJobId, setCurrentJobId } = useJobsListPageSearchParams();
    const isActive = currentJobId?.toString() === id.toString();

    return (
      <div
        ref={ref}
        onMouseDown={() => {
          setCurrentJobId(id.toString());
          setView("jobDetails");
        }}
        key={id}
        className={cn(
          "cursor-pointer rounded-md bg-card p-4",
          isActive && "bg-muted-foreground/20 dark:bg-accent",
        )}
      >
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <CompanyLogo companyName={company.name} logo={company.logo} />
            <div className="flex flex-col">
              <h4 className="text-base font-medium text-foreground">{title}</h4>
              <p className="text-sm text-muted-foreground">{company.name}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
            <div className="rounded-md bg-muted p-1 text-muted-foreground">
              {generateReadableEnumLabel(employmentType)}
            </div>
            <div className="rounded-md bg-muted p-1 text-muted-foreground">
              {generateReadableEnumLabel(workType)}
            </div>
          </div>
          {userViewedJob ? (
            <p className="text-sm text-muted-foreground h-4">Viewed.</p>
          ) : (
            <div className="h-4" />
          )}
        </div>
      </div>
    );
  },
);

JobsListCard.displayName = "JobsListCard";

export default JobsListCard;
