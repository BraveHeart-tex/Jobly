import type { WorkExperience } from "@/server/db/schema/workExperiences";

export interface ExperienceGroup {
  employer: string;
  experiences: WorkExperience[];
  canBeGrouped: boolean;
}

export interface GetWorkExperienceParams {
  userId: number;
  experienceId: number;
}

export interface DeleteWorkExperienceParams {
  userId: number;
  experienceId: number;
}
