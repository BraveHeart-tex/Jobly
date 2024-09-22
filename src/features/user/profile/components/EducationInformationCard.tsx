import { formatDateRangeWithDuration } from "@/features/user/profile/utils";
import { cn } from "@/lib/utils";
import type { EducationalBackground } from "@/server/db/schema/educationalBackgrounds";

interface EducationInformationCardProps {
  educationInformation: EducationalBackground;
  className?: string;
}

const EducationInformationCard = ({
  educationInformation,
  className,
}: EducationInformationCardProps) => {
  const { formattedStartDate, formattedEndDate } = formatDateRangeWithDuration({
    startDate: educationInformation.startDate,
    endDate: educationInformation.endDate,
    localeStringFormat: {
      year: "numeric",
    },
  });

  return (
    <article className={cn("grid gap-2 p-4 px-0 bg-card group", className)}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="scroll-m-20 text-base font-semibold tracking-tight">
            {educationInformation.degree}
          </h3>
          <p className="text-sm">{educationInformation.school}</p>
          <p className="text-sm text-muted-foreground">
            {formattedStartDate} - {formattedEndDate}
          </p>
        </div>
      </div>
    </article>
  );
};
export default EducationInformationCard;
