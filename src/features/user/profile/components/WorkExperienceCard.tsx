import { Button } from "@/components/ui/button";
import {
  type GroupedExperience,
  formatDateRangeWithDuration,
} from "@/features/user/profile/components/utils";
import { generateReadableEnumLabel } from "@/lib/utils/stringUtils";
import { EditIcon } from "lucide-react";
import { DateTime } from "luxon";

interface WorkExperienceCardProps {
  groupedExperience: GroupedExperience;
}

const WorkExperienceCard = ({ groupedExperience }: WorkExperienceCardProps) => {
  const { employer, experiences } = groupedExperience;

  const sortedExperiences = experiences.sort(
    (a, b) =>
      DateTime.fromISO(b.startDate).toMillis() -
      DateTime.fromISO(a.startDate).toMillis(),
  );

  const overallStartDate =
    sortedExperiences[sortedExperiences.length - 1]?.startDate ??
    DateTime.now().toISODate();
  const overallEndDate = sortedExperiences[0]?.endDate ?? null;

  const { formattedStartDate, formattedEndDate, difference } =
    formatDateRangeWithDuration({
      startDate: overallStartDate,
      endDate: overallEndDate,
    });

  const years = Math.floor(difference.years);
  const months = Math.floor(difference.months);

  const differenceString =
    `${years ? `${years} year${years > 1 ? "s" : ""}` : ""}${
      months
        ? `${years ? ", " : ""}${months} month${months > 1 ? "s" : ""}`
        : ""
    }`.trim();

  return (
    <article className="grid gap-2 rounded-md border p-4 bg-card group">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="scroll-m-20 text-base font-semibold tracking-tight">
            {employer}
          </h3>
          <p className="text-sm text-muted-foreground">
            {formattedStartDate} - {formattedEndDate} · {differenceString}
          </p>
          {sortedExperiences.map((exp) => (
            <div key={exp.id} className="mt-2">
              <p className="text-sm font-medium">{exp.jobTitle}</p>
              <p className="text-sm">
                {generateReadableEnumLabel(exp.employmentType)}
              </p>
              <p className="text-sm text-muted-foreground">
                {
                  formatDateRangeWithDuration({
                    startDate: exp.startDate,
                    endDate: exp.endDate,
                  }).formattedStartDate
                }{" "}
                -{" "}
                {
                  formatDateRangeWithDuration({
                    startDate: exp.startDate,
                    endDate: exp.endDate,
                  }).formattedEndDate
                }
              </p>
              <p className="text-sm text-muted-foreground">
                {exp.location && `${exp.location} - `}
                {generateReadableEnumLabel(exp.workType)}
              </p>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="lg:opacity-0 lg:group-hover:opacity-100 transition-all ease-in-out duration-300 text-muted-foreground"
        >
          <EditIcon size={20} />
        </Button>
      </div>
    </article>
  );
};
export default WorkExperienceCard;
