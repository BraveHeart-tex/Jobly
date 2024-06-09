import { api } from "@/trpc/server";
import { renderCompanyLogo } from "./JobsListCard";
import { Button } from "@/components/ui/button";

type JobDetailsProps = {
  currentJobId: number;
};

const JobDetails = async ({ currentJobId }: JobDetailsProps) => {
  const jobDetails = await api.job.getJobById({ id: currentJobId });

  if (!jobDetails || !jobDetails.company) return null;

  return (
    <article className="rounded-md bg-background p-2">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {renderCompanyLogo(
            jobDetails?.company.name,
            jobDetails?.company.logo,
          )}
          <div className="grid">
            <h2 className="text-2xl font-semibold tracking-tight">
              {jobDetails.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {jobDetails.company.name}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button>Apply Now</Button>
          <Button variant="secondary">Save</Button>
        </div>
      </header>
    </article>
  );
};

export default JobDetails;
