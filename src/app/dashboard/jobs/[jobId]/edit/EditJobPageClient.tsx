import { JobApplication } from "@prisma/client";
import Link from "next/link";
import JobCrudForm from "@/src/components/JobCrudForm";
import { Button } from "@/src/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";

interface IEditJobPageClientProps {
  jobApplication: JobApplication | null | undefined;
}

const EditJobPageClient = ({ jobApplication }: IEditJobPageClientProps) => {
  if (!jobApplication) {
    return (
      <article>
        <div className="flex flex-col">
          <h2 className=" block scroll-m-20 text-4xl font-bold tracking-tight lg:text-4xl text-facebook dark:text-foreground capitalize">
            404 Job Not Found
          </h2>
          <p className="text-muted-foreground text-lg">
            It seems that the job application you are looking for does not exist.
          </p>
        </div>
        <Button className="w-max mt-2 text-lg bg-facebook dark:bg-gray-700 text-white hover:bg-facebook-400 dark:hover:bg-gray-600 transition-all">
          <FaArrowLeft className="mr-2" />
          <Link href={"/dashboard/jobs"}>Back to Jobs List</Link>
        </Button>
      </article>
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
