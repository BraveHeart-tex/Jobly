import MotionClientWrapper from "@/components/common/MotionClientWrapper";
import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import { buttonVariants } from "@/components/ui/button";
import { validateRequestByRole } from "@/features/auth/utils";
import EmployerJobPostingListItem from "@/features/employer/jobPosting/components/EmployerJobPostingListItem";
import { EMPLOYER_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { jobPostings } from "@/server/db/schema";
import { api } from "@/trpc/server";
import { parseEnumValue } from "@/schemas/schemaUtils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

interface JobPostingsPageSearchParams {
  status?: string;
}

interface JobPostingsPageProps {
  searchParams: Promise<JobPostingsPageSearchParams>;
}

const jobPostingsFilterOptions = [
  {
    label: "Published",
    value: "published",
    href: EMPLOYER_ROUTES.PUBLISHED_LISTINGS,
  },
  {
    label: "Draft",
    value: "draft",
    href: EMPLOYER_ROUTES.DRAFT_LISTINGS,
  },
  {
    label: "Expired",
    value: "expired",
    href: EMPLOYER_ROUTES.EXPIRED_LISTINGS,
  },
];

const JobPostingsPage = async (props: JobPostingsPageProps) => {
  const searchParams = await props.searchParams;
  await validateRequestByRole(["employer"]);

  const jobPostingStatusParam = parseEnumValue(
    [...jobPostings.status.enumValues, "expired"],
    searchParams?.status,
    "published",
  );

  const jobPostingsList = await api.jobPosting.getJobPostings({
    status: jobPostingStatusParam,
  });

  return (
    <div>
      <PageContainer className="grid gap-2">
        <div className="grid">
          <div className="flex items-center justify-between">
            <PageTitle>Job Postings</PageTitle>
            <Link
              href={EMPLOYER_ROUTES.NEW_LISTING}
              className={cn(
                buttonVariants({ variant: "default" }),
                "flex items-center gap-1",
              )}
            >
              <PlusIcon aria-label="Add New Job Posting" />
              <span className="hidden md:inline">Add New Job Posting</span>
            </Link>
          </div>
        </div>
        <div className="w-full border-b relative">
          <div className="flex items-center gap-4 w-max">
            {jobPostingsFilterOptions.map((option) => (
              <div key={option.value} className="relative w-max min-[75px]">
                <Link
                  href={option.href}
                  className={cn(
                    buttonVariants({
                      variant: "link",
                    }),
                    "text-foreground p-0 hover:no-underline hover:text-primary font-normal text-[18px]",
                  )}
                >
                  {option.label}
                </Link>
                {jobPostingStatusParam === option.value && (
                  <MotionClientWrapper
                    layoutId="job-posting-status-filter"
                    transition={{ duration: 0.2 }}
                    className="absolute -bottom-[2px] left-0 right-0 h-1 bg-primary w-full rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-4 gap-4">
          {jobPostingsList.map((jobPosting) => (
            <EmployerJobPostingListItem
              key={jobPosting.id}
              jobPosting={jobPosting}
            />
          ))}
        </div>
      </PageContainer>
    </div>
  );
};

export default JobPostingsPage;
