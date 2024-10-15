import { formatDateRangeWithDuration } from "@/features/user/profile/utils";
import type { EducationalBackground } from "@/server/db/schema/educationalBackgrounds";
import ExperienceDescription from "../workExperience/components/ExperienceDescription";
import EditProfileRecordButton from "./EditProfileRecordButton";

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
    <article className="grid gap-2 p-4 px-0 bg-card border-b last:border-b-0 first:pt-0">
      <div className="flex items-center justify-between">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between gap-4">
            <h3 className="scroll-m-20 text-base font-semibold tracking-tight">
              {educationInformation.fieldOfStudy}
            </h3>
            <EditProfileRecordButton
              recordId={educationInformation.id}
              modalLink="educationalBackground/edit"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {educationInformation.school}
          </p>
          <p className="text-sm text-muted-foreground">
            {formattedStartDate} - {formattedEndDate}
          </p>
          {educationInformation.gpa && (
            <p className="text-sm text-muted-foreground mt-1">
              GPA: {educationInformation.gpa}
            </p>
          )}
        </div>
      </div>
      {educationInformation.description && (
        <ExperienceDescription description={educationInformation.description} />
      )}
    </article>
  );
};

export default EducationInformationCard;
