import PageContainer from "@/components/common/PageContainer";
import PageTitle from "@/components/common/PageTitle";
import { buttonVariants } from "@/components/ui/button";
import { validateRequestByRole } from "@/features/auth/utils";
import EmployerJobPostingForm from "@/features/employer/jobPosting/components/EmployerJobPostingForm";
import { EMPLOYER_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const CreateNewJobPostingPage = async () => {
  await validateRequestByRole(["employer"]);
  return (
    <div>
      <PageContainer>
        <div className="grid gap-4 mb-4">
          <div className="grid gap-1">
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
              <PageTitle>New Job Posting</PageTitle>
            </div>
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
