import type { WorkExperience } from "@/server/db/schema/workExperiences";
import { groupExperiences } from "../utils";
import { MAX_VISIBLE_WORK_EXPERIENCE_COUNT } from "./UserProfileWorkExperienceSection";
import WorkExperienceCard from "./WorkExperienceCard";

interface WorkExperienceTimelineProps {
  experiences: WorkExperience[];
}

const WorkExperienceTimeline = ({
  experiences,
}: WorkExperienceTimelineProps) => {
  const groupedExperiences = groupExperiences(experiences);

  return (
    <div className="space-y-4">
      {groupedExperiences
        .slice(0, MAX_VISIBLE_WORK_EXPERIENCE_COUNT)
        .map((groupedExperience, index) => (
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
