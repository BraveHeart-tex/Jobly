import ClientOnly from "@/components/common/ClientOnly";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import { JobTrackerApplicationsBoard } from "@/features/candidate/jobTrackerBoard/components/JobTrackerBoard";
import { api } from "@/trpc/server";

const JobTrackerPage = async () => {
  const data = await api.jobTracker.getJobTrackerApplications();

  return (
    <main>
      <PageContainer>
        <div className="grid gap-1">
          <PageTitle>Job Tracker Board</PageTitle>
          <p className="text-muted-foreground">
            Track / organize your job applications and interviews. Click on the
            job card to see more.
          </p>
        </div>
      </PageContainer>
      <div className="mt-4">
        <ClientOnly>
          <JobTrackerApplicationsBoard data={data} />
        </ClientOnly>
      </div>
    </main>
  );
};

export default JobTrackerPage;
