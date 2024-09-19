import ClientOnly from "@/components/common/ClientOnly";
import { buttonVariants } from "@/components/ui/button";
import EmployerJobListItemFooter from "@/features/employer/jobPosting/components/EmployerJobListItemFooter";
import { EMPLOYER_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import Link from "next/link";

interface EmployerJobPostingListItemProps {
  jobPosting: {
    id: number;
    title: string;
    postedAt: string;
    createdUserName: string;
  };
}

const EmployerJobPostingListItem = ({
  jobPosting,
}: EmployerJobPostingListItemProps) => {
  return (
    <article className="grid gap-2 rounded-md border p-4 bg-card group">
      <div className="flex items-center justify-between">
        <h3 className="scroll-m-20 text-base font-medium tracking-tight">
          {jobPosting.title}
        </h3>
        <Link
          href={EMPLOYER_ROUTES.EDIT_LISTING(jobPosting.id)}
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "icon",
            }),
            "lg:opacity-0 lg:group-hover:opacity-100 transition-all ease-in-out duration-300 text-muted-foreground",
          )}
        >
          <EditIcon size={20} />
        </Link>
      </div>
      <ClientOnly>
        <EmployerJobListItemFooter
          postedAt={jobPosting.postedAt}
          createdUserName={jobPosting.createdUserName}
        />
      </ClientOnly>
    </article>
  );
};

export default EmployerJobPostingListItem;
