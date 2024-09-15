import { buttonVariants } from "@/components/ui/button";
import { EMPLOYER_ROUTES } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { JobPostingSelectModel } from "@/server/db/schema/jobPostings";
import { EditIcon } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";

interface JobPostingListItemProps {
  jobPosting: JobPostingSelectModel;
}

const JobPostingListItem = ({ jobPosting }: JobPostingListItemProps) => {
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
      </footer>
    </article>
  );
};

export default JobPostingListItem;
