import { validateRequestByRole } from "@/lib/auth/actions";
import JobListSearchToolbar from "./_components/JobListSearchToolbar";
import JobsList from "./_components/JobsList";

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
