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
      {groupedExperiences.map((groupedExperience) => (
        <WorkExperienceCard
          key={groupedExperience.id}
          groupedExperience={groupedExperience}
        />
      ))}
    </div>
  );
};

export default WorkExperienceTimeline;
