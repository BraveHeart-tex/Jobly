import PageContainer from "@/components/common/PageContainer";
import { buttonVariants } from "@/components/ui/button";
import { validateRequestByRole } from "@/lib/auth/actions";
import { EMPLOYER_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

const JobPostingsPage = async () => {
  await validateRequestByRole(["employer"]);
  return (
    <div>
      <PageContainer>
        <div className="grid">
          <div className="flex items-center justify-between">
            <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight">
              Job Postings
            </h1>
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
      </PageContainer>
    </div>
  );
};

export default JobPostingsPage;
