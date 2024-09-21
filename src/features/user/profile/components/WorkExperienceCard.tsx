import { Button } from "@/components/ui/button";
import { formatDateRangeWithDuration } from "@/features/user/profile/components/utils";
import { generateReadableEnumLabel } from "@/lib/utils/stringUtils";
import type { WorkExperience } from "@/server/db/schema/workExperiences";
import { EditIcon } from "lucide-react";

interface WorkExperienceCardProps {
  workExperience: WorkExperience;
}

const WorkExperienceCard = ({ workExperience }: WorkExperienceCardProps) => {
  const {
    startDate,
    endDate,
    jobTitle,
    employer,
    employmentType,
    location,
    workType,
  } = workExperience;
  const { formattedStartDate, formattedEndDate, difference } =
    formatDateRangeWithDuration({
      startDate,
      endDate,
    });

  const years = Math.floor(difference.years);
  const months = Math.floor(difference.months);

  const differenceString = `${years ? `${years} year${years > 1 ? "s" : ""}` : ""}${
    months ? `, ${months} month${months > 1 ? "s" : ""}` : ""
  }`;

  return (
    <article className="grid gap-2 rounded-md border p-4 bg-card group">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="scroll-m-20 text-base font-semibold tracking-tight">
            {jobTitle}
          </h3>
          <p className="text-sm">
            {employer} · {generateReadableEnumLabel(employmentType)}
          </p>
          <p className="text-sm text-muted-foreground">
            {formattedStartDate} - {formattedEndDate} ·{" "}
            {differenceString.trim().replace(/^,/, "")}
          </p>
          <p className="text-sm text-muted-foreground">
            {location && `${location} - `}
            {generateReadableEnumLabel(workType)}
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
