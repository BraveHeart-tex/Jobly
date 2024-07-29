import PageContainer from "@/components/PageContainer";
import { JobTrackerApplicationsBoard } from "@/components/jobTrackerBoard/JobTrackerBoard";
import { api } from "@/trpc/server";
import ClientOnly from "../../tools/_components/ClientOnly";

const JobTrackerPage = async () => {
  const data = await api.jobTracker.getJobTrackerApplications();

  return (
    <main>
      <PageContainer>
        <div className="grid gap-1">
          <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
            Job Tracker Board
          </h1>
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
