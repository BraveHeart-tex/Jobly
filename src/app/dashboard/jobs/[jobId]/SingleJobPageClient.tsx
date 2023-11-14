import JobTypeOptions from "@/app/utils/JobTypeOptions";
import formatDate from "@/app/utils/formatDate";
import AnimationRoot from "@/app/animations/AnimationRoot";
import { Button } from "@/components/ui/button";
import { getGeneric } from "@/lib/generic";
import { JobApplication } from "@prisma/client";
import Link from "next/link";
import { FaArrowLeft, FaPencilAlt } from "react-icons/fa";

interface ISingleJobPageClientProps {
  jobId: string;
}

const SingleJobPageClient = async ({ jobId }: ISingleJobPageClientProps) => {
  const jobApplication = await getGeneric<JobApplication>({
    tableName: "jobApplication",
    whereCondition: {
      id: parseInt(jobId),
    },
  });

  if (!jobApplication.data || jobApplication.error) {
    return (
      <div className="min-h-screen flex flex-col">
        <h2 className="text-facebook dark:text-foreground mb-3 text-2xl font-semibold">404 Job Not Found :(</h2>
        <p className="mr-2 text-foreground">No job data was found for the given id: {jobId}</p>
        <Button className="w-max mt-4 bg-facebook dark:bg-gray-700 text-white hover:bg-facebook-400 dark:hover:bg-gray-600 transition-all">
          <Link href={"/dashboard/jobs"}>Back to Jobs List</Link>
        </Button>
      </div>
    );
  }

  const { jobTitle, companyName, location, jobType, createdAt, applicationStatus, comments } = jobApplication.data;

  return (
    <AnimationRoot>
      <section>
        <div className="grid grid-cols-1">
          <div>
            <h2 className="text-facebook dark:text-foreground text-3xl font-semibold">{jobTitle}</h2>
            <p className="text-lg text-foreground pl-2">{companyName}</p>
          </div>
          <div className="grid grid-cols-1 bg-gray-100 dark:bg-gray-800 p-8 shadow-md gap-8 rounded-md">
            <div>
              <h3 className="text-2xl font-semibold">Job Location</h3>
              <div>{location}</div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Job Type</h3>
              <div>{JobTypeOptions[jobType!]}</div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Application Created At</h3>
              <time>{formatDate(new Date(createdAt!))}</time>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Application Status</h3>
              <div>{applicationStatus}</div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Comments</h3>
              <p className="w-full lg:w-3/4 xl:w-1/2 leading-7 text-foreground">
                {comments ? `"${comments}"` : "No comments were added for this job application"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Button variant="outline">
            <Link href={"/dashboard/jobs"} className="flex items-center gap-2">
              <FaArrowLeft />
              Back to Jobs List
            </Link>
          </Button>
          <Button className="w-max bg-facebook h-9 px-4 py-2 dark:bg-gray-700 text-white hover:bg-facebook-400 dark:hover:bg-gray-600 transition-all">
            <Link href={`/dashboard/jobs/${jobId}/edit`} className="flex items-center gap-2">
              Edit <FaPencilAlt />
            </Link>
          </Button>
        </div>
      </section>
    </AnimationRoot>
  );
};

export default SingleJobPageClient;
