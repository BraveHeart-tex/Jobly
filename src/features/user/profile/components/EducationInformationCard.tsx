import { formatDateRangeWithDuration } from "@/features/user/profile/utils";
import type { EducationalBackground } from "@/server/db/schema/educationalBackgrounds";

interface EducationInformationCardProps {
  educationInformation: EducationalBackground;
}

const EducationInformationCard = ({
  educationInformation,
}: EducationInformationCardProps) => {
  const { formattedStartDate, formattedEndDate } = formatDateRangeWithDuration({
    startDate: educationInformation.startDate,
    endDate: educationInformation.endDate,
    localeStringFormat: {
      year: "numeric",
    },
  });

  return (
    <article
      className={
        "grid gap-2 p-4 px-0 bg-card border-b last:border-b-0 first:pt-0"
      }
    >
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
