import { validateRequestByRole } from "@/features/auth/utils";
import JobListSearchToolbar from "@/features/candidate/jobs/components/JobListSearchToolbar";
import JobsList from "@/features/candidate/jobs/components/JobsList";

const JobsPage = async () => {
  await validateRequestByRole(["candidate"]);

  return (
    <div className="bg-muted p-1 pt-0">
      <div className="mx-auto max-w-screen-2xl">
        <JobListSearchToolbar />
        <JobsList />
      </div>
    </div>
  );
};

export default JobsPage;
