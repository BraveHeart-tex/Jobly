import { api } from "@/trpc/server";
import Image from "next/image";

const JobsPage = async () => {
  const jobs = await api.job.getJobListings();

  return (
    <div className="mx-auto max-w-screen-2xl lg:pt-2">
      <div className="flex flex-col justify-center bg-primary p-4 px-8 text-primary-foreground lg:rounded-lg">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Job Listings
            </h1>
            <p>
              Check out the latest job postings to find the job that aligns with
              your passion.
            </p>
          </div>
          <div className="hidden w-max rounded-lg bg-primary-foreground p-1 lg:block">
            <Image
              src="/illustrations/employee/employee-2.svg"
              width={160}
              height={160}
              alt="Employee looking at job postings"
            />
          </div>
        </div>
      </div>
      <div>
        {jobs.map((jobListing) => (
          <div key={jobListing.id} className="h-32 bg-card">
            {jobListing.company.name} - {jobListing.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
