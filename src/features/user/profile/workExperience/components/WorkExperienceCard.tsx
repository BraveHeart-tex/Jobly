import { Button } from "@/components/ui/button";
import type { GroupedExperience } from "@/features/user/profile/types";
import { formatDateRangeWithDuration } from "@/features/user/profile/utils";
import { generateReadableEnumLabel } from "@/lib/utils/stringUtils";
import { PenSquare } from "lucide-react";
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
    <article className="grid gap-2 p-4 px-0 pt-0 bg-card group border-b last:border-b-0 last:py-0 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1 w-full">
          <h3 className="scroll-m-20 text-base font-semibold tracking-tight">
            {employer}
          </h3>
          <p className="text-sm text-muted-foreground">
            {formattedStartDate} - {formattedEndDate} · {differenceString}
          </p>
          {sortedExperiences.map((experience) => (
            <div key={experience.id} className="mt-2 w-full">
              <div className="w-full flex items-center justify-between gap-4">
                <p className="text-base font-medium">{experience.jobTitle}</p>
                <Button size="icon" variant="ghost">
                  <PenSquare size={22} />
                </Button>
              </div>
              <p className="text-sm">
                {generateReadableEnumLabel(experience.employmentType)}
              </p>
              <p className="text-sm text-muted-foreground">
                {
                  formatDateRangeWithDuration({
                    startDate: experience.startDate,
                    endDate: experience.endDate,
                  }).formattedStartDate
                }{" "}
                -{" "}
                {
                  formatDateRangeWithDuration({
                    startDate: experience.startDate,
                    endDate: experience.endDate,
                  }).formattedEndDate
                }
              </p>
              <p className="text-sm text-muted-foreground">
                {experience.location && `${experience.location} - `}
                {generateReadableEnumLabel(experience.workType)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};
export default WorkExperienceCard;
