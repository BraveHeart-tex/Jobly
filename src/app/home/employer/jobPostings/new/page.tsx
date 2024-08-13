import PageContainer from "@/components/PageContainer";
import { buttonVariants } from "@/components/ui/button";
import { EMPLOYER_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

const CreateNewJobPostingPage = () => {
  return (
    <div>
      <PageContainer>
        <div className="grid gap-4">
          <Link
            href={EMPLOYER_ROUTES.ACTIVE_LISTINGS}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "flex items-center gap-1 lg:w-max px-0 justify-start",
            )}
          >
            <ArrowLeftIcon />
            <span>Back to Job Postings</span>
          </Link>
          <div className="grid gap-1">
            <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
              New Job Posting
            </h1>
            <p className="text-muted-foreground">
              Fill out the form below to create a new job posting.
            </p>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default CreateNewJobPostingPage;
