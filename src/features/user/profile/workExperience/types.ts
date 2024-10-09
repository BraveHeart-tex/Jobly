import type { WorkExperience } from "@/server/db/schema/workExperiences";

export interface ExperienceGroup {
  employer: string;
  experiences: WorkExperience[];
  canBeGrouped: boolean;
}
