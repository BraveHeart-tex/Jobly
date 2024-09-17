import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import { validateRequestByRole } from "@/features/auth/utils";
import EmployerJobPostingForm from "@/features/employer/jobPosting/components/EmployerJobPostingForm";

const CreateNewJobPostingPage = async () => {
  await validateRequestByRole(["employer"]);
  return (
    <div>
      <PageContainer>
        <div className="grid gap-4 mb-4">
          <div className="grid gap-1">
            <PageTitle>New Job Posting</PageTitle>
            <p className="text-muted-foreground">
              Fill out the form below to create a new job posting.
            </p>
          </div>
        </div>
        <EmployerJobPostingForm />
      </PageContainer>
    </div>
  );
};

export default CreateNewJobPostingPage;
