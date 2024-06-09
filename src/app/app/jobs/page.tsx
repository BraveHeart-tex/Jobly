import { api } from "@/trpc/server";
import Image from "next/image";
import React from "react";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";
import JobsList from "./_components/JobsList";

const JobsPage = async () => {
  const { user } = await validateRequest();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  const jobs = await api.job.getJobListings();

  return (
    <React.Fragment>
      <div className="mx-auto max-w-screen-2xl lg:pt-2">
        <div className="flex flex-col justify-center bg-primary p-4 px-8 text-primary-foreground lg:rounded-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Job Listings
              </h1>
              <p>
                Check out the latest job postings to find the job that aligns
                with your passion.
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
      </div>
      <div className="bg-muted p-10">
        <div className="mx-auto max-w-screen-2xl">
          <JobsList jobs={jobs} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default JobsPage;
