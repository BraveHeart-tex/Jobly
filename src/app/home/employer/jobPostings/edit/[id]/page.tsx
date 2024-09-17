import { api } from "@/trpc/server";
import { EMPLOYER_ROUTES } from "@/lib/routes";
import { redirect } from "next/navigation";
import PageContainer from "@/components/common/PageContainer";
import { DateTime } from "luxon";
import EmployerJobPostingForm from "@/features/employer/jobPosting/components/EmployerJobPostingForm";
import PageTitle from "@/components/common/PageTitle";
import type { ComponentProps } from "react";

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

  const mappedJobPostingDetails: ComponentProps<
    typeof EmployerJobPostingForm
  >["initialData"] = {
    ...jobPostingDetails,
    skills: jobPostingDetails.jobPostingSkills.map((item) => item.skill),
    benefits: jobPostingDetails.jobPostingBenefits.map((item) => item.benefit),
  };

  return (
    <main>
      <PageContainer className="grid gap-6">
        <div className="grid gap-2">
          <PageTitle>Editing "{jobPostingDetails?.title}"</PageTitle>
          {jobPostingDetails.updatedAt ? (
            <p className="text-muted-foreground text-sm">
              Last Updated:{" "}
              {DateTime.fromFormat(
                jobPostingDetails.updatedAt,
                "yyyy-MM-dd HH:mm:ss",
              ).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)}
            </p>
          ) : null}
        </div>
        <EmployerJobPostingForm initialData={mappedJobPostingDetails} />
      </PageContainer>
    </main>
  );
};

export default EditJobPostingPage;
