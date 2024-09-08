import PageContainer from "@/components/PageContainer";
import CreateJobPostingForm from "@/components/jobPostings/CreateJobPostingForm";
import { validateRequestByRole } from "@/lib/auth/actions";

const CreateNewJobPostingPage = async () => {
  await validateRequestByRole(["employer"]);
  return (
    <div>
      <PageContainer>
        <div className="grid gap-4 mb-4">
          <div className="grid gap-1">
            <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
              New Job Posting
            </h1>
            <p className="text-muted-foreground">
              Fill out the form below to create a new job posting.
            </p>
          </div>
        </div>
        <CreateJobPostingForm />
      </PageContainer>
    </div>
  );
};

export default CreateNewJobPostingPage;
