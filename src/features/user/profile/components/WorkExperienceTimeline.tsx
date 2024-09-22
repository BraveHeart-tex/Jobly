import type { WorkExperience } from "@/server/db/schema/workExperiences";
import WorkExperienceCard from "./WorkExperienceCard";
import { groupExperiences } from "./utils";

interface WorkExperienceTimelineProps {
  experiences: WorkExperience[];
}

const WorkExperienceTimeline = ({
  experiences,
}: WorkExperienceTimelineProps) => {
  const groupedExperiences = groupExperiences(experiences);

  return (
    <div className="space-y-4">
      {groupedExperiences.map((groupedExperience, index) => (
        <WorkExperienceCard
          // biome-ignore lint/suspicious/noArrayIndexKey: This is fine
          key={groupedExperience.employer + index}
          groupedExperience={groupedExperience}
        />
      ))}
    </div>
  );
};

export default WorkExperienceTimeline;
