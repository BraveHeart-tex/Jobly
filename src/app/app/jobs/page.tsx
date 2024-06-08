import { api } from "@/trpc/server";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { generateReadableEnumLabel, getAvatarPlaceholder } from "@/lib/utils";
import { validateRequest } from "@/lib/auth/validate-request";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/constants";

const JobsPage = async () => {
  const { user } = await validateRequest();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  const jobs = await api.job.getJobListings();

  const renderCompanyLogo = (companyName: string, logo?: string | null) => {
    if (logo) {
      return <Image src={logo} width={80} height={80} alt={companyName} />;
    }

    return (
      <Avatar>
        <AvatarFallback>{getAvatarPlaceholder(companyName)}</AvatarFallback>
      </Avatar>
    );
  };

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
      <div className="rounded-2xl bg-muted p-10">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 grid grid-cols-1 gap-4">
              {jobs.map(({ id, title, company, employmentType, workType }) => (
                <div key={id} className="cursor-pointer rounded-md bg-card p-4">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      {renderCompanyLogo(company.name, company.logo)}
                      <div className="flex flex-col">
                        <h4 className="text-base font-medium text-foreground">
                          {title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {company.name}
                        </p>
                      </div>
                    </div>
                    <p className="line-clamp-3 text-foreground/70">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Cumque debitis, delectus ducimus excepturi expedita harum
                      minus nesciunt perferendis quos? A accusantium assumenda
                      atque aut blanditiis culpa debitis doloremque earum eius
                      error excepturi fuga ipsum iure, maxime minima mollitia
                      natus neque obcaecati omnis pariatur perspiciatis, quasi
                      repudiandae tempora vel veritatis voluptatibus?
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                      <div className="rounded-md bg-muted p-1 text-muted-foreground">
                        {generateReadableEnumLabel(employmentType)}
                      </div>
                      <div className="rounded-md bg-muted p-1 text-muted-foreground">
                        {generateReadableEnumLabel(workType)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-8">MAN!</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default JobsPage;
