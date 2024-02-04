import { JobApplication } from "@prisma/client";
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
      <div className="flex flex-col gap-1 mb-4">
        <h2 className="text-facebook font-bold dark:text-foreground scroll-m-20 text-4xl tracking-tight lg:text-4xl capitalize">
          Editing: {jobApplication.jobTitle} at {jobApplication.companyName}
        </h2>
        <p className="text-muted-foreground text-lg">
          You can use the form below to edit the job application details. Once you are done, click the "Update" button
          to save the changes.
        </p>
      </div>
      <JobCrudForm mode="edit" initialData={jobApplication} formClassName="2xl:grid-cols-2" />
    </div>
  );
};

export default EditJobPageClient;
