import PageContainer from "@/components/common/PageContainer";
import { validateRequestByRole } from "@/features/auth/utils";
import JobListSearchToolbar from "@/features/candidate/jobs/components/JobListSearchToolbar";
import JobsList from "@/features/candidate/jobs/components/JobsList";

const JobsPage = async () => {
  await validateRequestByRole(["candidate"]);

  return (
    <main className="bg-muted overflow-hidden">
      <PageContainer className="mt-0 pt-1">
        <JobListSearchToolbar />
        <JobsList />
      </PageContainer>
    </main>
  );
};

export default JobsPage;
