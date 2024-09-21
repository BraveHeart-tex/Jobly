import { Button } from "@/components/ui/button";
import { formatDateRangeWithDuration } from "@/features/user/profile/components/utils";
import type { EducationalBackground } from "@/server/db/schema/educationalBackgrounds";
import { EditIcon } from "lucide-react";

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
    <article className="grid gap-2 rounded-md border p-4 bg-card group">
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
export default EducationInformationCard;
