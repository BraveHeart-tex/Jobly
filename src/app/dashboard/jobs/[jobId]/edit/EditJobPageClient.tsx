import { JobApplication } from "@prisma/client";
import EditJobModalForm from "./EditJobForm";
import Link from "next/link";
import JobCrudForm from "@/components/JobCrudForm";

interface IEditJobPageClientProps {
  jobApplication: JobApplication | null | undefined;
}

const EditJobPageClient = ({ jobApplication }: IEditJobPageClientProps) => {
  if (!jobApplication) {
    return (
      <div>
        <h2 className="mr-4 text-facebook dark:text-foreground font-semibold text-3xl">404 Job Not Found</h2>
        <p className="mt-3 text-foreground">It seems that the job application you are looking for does not exist.</p>
        <Link className="capitalize text-facebook dark:text-foreground font-semibold text-3xl" href={"/dashboard/jobs"}>
          Go back to jobs list
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-facebook dark:text-foreground mb-6 text-3xl">
        Editing: {jobApplication.jobTitle} at {jobApplication.companyName}
      </h2>
      <JobCrudForm mode="edit" initialData={jobApplication} formClassName="2xl:grid-cols-2" />
    </div>
  );
};

export default EditJobPageClient;
