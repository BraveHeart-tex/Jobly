import JobsList from "./JobsList";
import JobSearchForm from "./JobSearchForm";
import { getJobApplications } from "../../../../actions";
import PaginationControls from "@/components/PaginationControls";
import NoJobsFound from "@/components/NoJobsFound";
import AnimationRoot from "@/components/animations/AnimationRoot";

const JobsPage = async ({
  searchParams,
}: {
  searchParams: {
    page: string;
    search: string;
    company: string;
    status: string;
    jobType: string;
    sort: string;
    deleteJob: string;
    deleteConfirm: string;
    jobId: string;
  };
}) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const search = searchParams.search ? searchParams.search : "";
  const company = searchParams.company ? searchParams.company : "";
  const status = searchParams.status ? searchParams.status : "";
  const jobType = searchParams.jobType ? searchParams.jobType : "";
  const sort = searchParams.sort ? searchParams.sort : "desc";
  const result = await getJobApplications(page, search, company, status, jobType, sort);

  const hasQuery =
    searchParams.search || searchParams.company || searchParams.status || searchParams.jobType || searchParams.sort;

  return (
    <AnimationRoot>
      <div className="grid grid-cols-1 gap-2">
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-4xl">Job Application Search Form</h3>
          <p className="text-muted-foreground text-lg w-full lg:w-[70%]">
            Use the form below to search for your registered job applications.
          </p>
        </div>
        <JobSearchForm />
        <div className="mr-auto mb-2">
          <PaginationControls
            search={search}
            company={company}
            status={status}
            jobType={jobType}
            sort={sort}
            currentPage={page}
            hasNextPage={result.hasNextPage}
            hasPreviousPage={result.hasPreviousPage}
          />
        </div>
        {result.error || !result?.jobApplications ? (
          <NoJobsFound withQuery={hasQuery ? true : false} />
        ) : (
          <JobsList jobApplications={result.jobApplications} />
        )}
      </div>
    </AnimationRoot>
  );
};

export default JobsPage;
