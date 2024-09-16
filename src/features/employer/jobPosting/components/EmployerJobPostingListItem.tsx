import { buttonVariants } from "@/components/ui/button";
import { EMPLOYER_ROUTES } from "@/lib/routes";
import type { RouterOutputs } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";

interface EmployerJobPostingListItemProps {
  jobPosting: RouterOutputs["jobPosting"]["getJobPostings"][number];
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
      <footer className="mt-auto self-end text-muted-foreground text-sm">
        <p>
          Posted at{" "}
          {DateTime.fromFormat(
            jobPosting.postedAt,
            "yyyy-MM-dd HH:mm:ss",
          ).toLocaleString({
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>Created by {jobPosting.createdUserName}</p>
      </footer>
    </article>
  );
};

export default EmployerJobPostingListItem;
