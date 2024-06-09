import { validateRequest } from "@/lib/auth/validate-request";
import { ROUTES } from "@/lib/constants";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import JobsList from "./_components/JobsList";

const JobsPage = async () => {
  const { user } = await validateRequest();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  const jobs = await api.job.getJobListings();

  return (
    <div className="bg-muted p-2 pt-0">
      <div className="mx-auto max-w-screen-2xl">
        <JobsList jobs={jobs} />
      </div>
    </div>
  );
};

export default JobsPage;