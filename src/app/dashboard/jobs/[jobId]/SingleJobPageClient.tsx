import AnimationRoot from "@/src/components/animations/AnimationRoot";
import { Button } from "@/src/components/ui/button";
import { getGeneric } from "@/src/lib/generic";
import { JOB_TYPE_OPTIONS, formatDate } from "@/src/lib/utils";
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
        <h2 className="scroll-m-20 text-4xl mb-2 font-bold tracking-tight lg:text-4xl text-facebook dark:text-foreground capitalize">
          404 Job Not Found :(
        </h2>
        <p className="mr-2 text-muted-foreground text-lg">No job data was found for your search...</p>
        <Button className="w-max mt-2 text-lg bg-facebook dark:bg-gray-700 text-white hover:bg-facebook-400 dark:hover:bg-gray-600 transition-all">
          <FaArrowLeft className="mr-2" />
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
          <div className="mb-4">
            <h2 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-4xl text-facebook dark:text-foreground capitalize">
              {jobTitle}
            </h2>
            <p className="text-lg text-muted-foreground">{companyName}</p>
          </div>
          <div className="grid grid-cols-1 bg-card/20 dark:bg-gray-800 p-8 shadow gap-8 rounded-md">
            <div>
              <h3 className="text-2xl font-semibold text-facebook dark:text-foreground">Job Location</h3>
              <div>{location}</div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-facebook dark:text-foreground">Job Type</h3>
              <div>{JOB_TYPE_OPTIONS[jobType!]}</div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-facebook dark:text-foreground">Application Date</h3>
              <time>{formatDate(new Date(createdAt!))}</time>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-facebook dark:text-foreground">Application Status</h3>
              <div>{applicationStatus}</div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-facebook dark:text-foreground">Comments</h3>
              <p className="w-full lg:w-3/4 xl:w-1/2 leading-7 text-foreground">
                {comments ? `"${comments}"` : "No comments were added for this job application"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Button variant="secondary" className="bg-gray-300 dark:bg-gray-900">
            <Link href={"/dashboard/jobs"} className="flex items-center gap-2">
              Back to Jobs List
            </Link>
          </Button>
          <Button className="w-max bg-facebook dark:bg-gray-700 text-white hover:bg-facebook-400 dark:hover:bg-gray-600 transition-all">
            <Link href={`/dashboard/jobs/${jobId}/edit`} className="flex items-center gap-2">
              <FaPencilAlt />
              Edit
            </Link>
          </Button>
        </div>
      </section>
    </AnimationRoot>
  );
};

export default SingleJobPageClient;
