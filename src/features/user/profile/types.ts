import type { EducationalBackground } from "@/server/db/schema/educationalBackgrounds";
import type { SkillSelectModel } from "@/server/db/schema/skills";
import type { WorkExperience } from "@/server/db/schema/workExperiences";
import type { Duration } from "luxon";

export interface FormatDateRangeWithDurationParams {
  startDate: string;
  endDate?: string | null;
  localeStringFormat?: Intl.DateTimeFormatOptions;
}

export interface FormatDateRangeWithDurationReturn {
  formattedStartDate: string;
  formattedEndDate: string;
  difference: Duration;
}

export interface GroupedExperience {
  employer: string;
  experiences: WorkExperience[];
}

export interface UserProfileInformation {
  firstName: string;
  lastName: string;
  educationalBackground: EducationalBackground[];
  skills: SkillSelectModel[];
  workExperiences: WorkExperience[];
  bio: string;
  highlightedSkills: string[];
}

export interface GetAboutInformationReturnType {
  bio: { id: number | null; content: string };
  highlightedSkills: {
    name: string;
    userId: number;
    skillId: number;
    order: number;
  }[];
}
