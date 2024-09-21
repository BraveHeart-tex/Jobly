import { Button } from "@/components/ui/button";
import type { WorkExperience } from "@/server/db/schema/workExperiences";
import { EditIcon } from "lucide-react";
import { DateTime } from "luxon";

interface WorkExperienceCardProps {
  workExperience: WorkExperience;
}

const WorkExperienceCard = ({ workExperience }: WorkExperienceCardProps) => {
  const startDate = DateTime.fromISO(workExperience.startDate);
  const endDate = workExperience.endDate
    ? DateTime.fromISO(workExperience.endDate)
    : undefined;

  const formattedStartDate = startDate.toLocaleString(DateTime.DATE_FULL);
  const formattedEndDate = endDate
    ? endDate.toLocaleString(DateTime.DATE_FULL)
    : "Current";

  const difference = (endDate || DateTime.now()).diff(startDate, [
    "years",
    "months",
  ]);

  const years = Math.floor(difference.years);
  const months = Math.floor(difference.months);
  const days = Math.floor(difference.days);

  const differenceString = `${years ? `${years} year${years > 1 ? "s" : ""}` : ""}${
    months ? `, ${months} month${months > 1 ? "s" : ""}` : ""
  }${days ? `, ${days} day${days > 1 ? "s" : ""}` : ""}`;

  return (
    <article className="grid gap-2 rounded-md border p-4 bg-card group">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="scroll-m-20 text-base font-semibold tracking-tight">
            {workExperience.jobTitle}
          </h3>
          <p className="text-sm">{workExperience.employer}</p>
          <p className="text-sm text-muted-foreground">
            {formattedStartDate} - {formattedEndDate} ·{" "}
            {differenceString.trim().replace(/^,/, "")}
          </p>
        </div>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={
            "lg:opacity-0 lg:group-hover:opacity-100 transition-all ease-in-out duration-300 text-muted-foreground"
          }
        >
          <EditIcon size={20} />
        </Button>
      </div>
    </article>
  );
};
export default WorkExperienceCard;
