import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import { buttonVariants } from "@/components/ui/button";
import EmployerJobPostingForm from "@/features/employer/jobPosting/components/EmployerJobPostingForm";
import { EMPLOYER_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";
import { ArrowLeftIcon } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { redirect } from "next/navigation";

interface EditJobPostingPageParams {
  params: {
    id: string;
  };
}

const EditJobPostingPage = async ({ params }: EditJobPostingPageParams) => {
  const { id } = params;
  if (!id) {
    redirect(EMPLOYER_ROUTES.PUBLISHED_LISTINGS);
  }

  const jobPostingDetails = await api.jobPosting.getJobPostingById({
    id: Number.parseInt(id),
  });

  if (!jobPostingDetails) {
    redirect(EMPLOYER_ROUTES.PUBLISHED_LISTINGS);
  }

  const mappedJobPostingDetails = {
    ...jobPostingDetails,
    skills: jobPostingDetails.jobPostingSkills.map((item) => item.skill),
    benefits: jobPostingDetails.jobPostingBenefits.map((item) => item.benefit),
  };

  return (
    <main>
      <PageContainer className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Link
              href={EMPLOYER_ROUTES.PUBLISHED_LISTINGS}
              className={cn(
                buttonVariants({
                  size: "icon",
                  variant: "secondary",
                }),
              )}
            >
              <ArrowLeftIcon />
            </Link>
            <PageTitle>Editing "{jobPostingDetails?.title}"</PageTitle>
          </div>
          {jobPostingDetails.updatedAt ? (
            <p className="text-muted-foreground text-sm">
              Last Updated:{" "}
              {DateTime.fromISO(jobPostingDetails.updatedAt).toLocaleString(
                DateTime.DATETIME_MED_WITH_WEEKDAY,
              )}
            </p>
          ) : null}
        </div>
        <EmployerJobPostingForm initialData={mappedJobPostingDetails} />
      </PageContainer>
    </main>
  );
};

export default EditJobPostingPage;
