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
  country: string;
  city: string;
  avatarUrl: string | null;
  title: string | null;
  websiteLink: string | null;
  websiteLinkText: string | null;
  skillsWithExperience: SkillWithExperience[];
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
export interface UpdateUserNameAndLastNameParams {
  userId: number;
  firstName?: string;
  lastName?: string;
}
export interface GetUserProfileReturn {
  id: number;
  title: string | null;
  sector: string | null;
  presentedWorkExperienceId: number | null;
  countryId: number | null;
  cityId: number | null;
  websiteLink: string | null;
  websiteLinkText: string | null;
  userId: number;
  firstName: string;
  lastName: string;
  workExperiences: WorkExperience[];
  educationalBackgrounds: EducationalBackground[];
  selectedCountry: { label: string; value: number } | null;
  selectedCity: { label: string; value: number } | null;
}

export interface SkillWithExperience {
  skillName: string;
  userSkillId: number;
  workExperiences: { workExperienceId: number; workExperienceTitle: string }[];
  educationalBackgrounds: {
    educationalBackgroundId: number;
    educationalBackgroundTitle: string;
  }[];
}

export interface DeleteUserSkillParams {
  userId: number;
  userSkillId: number;
}

export interface OrderedUserSkill {
  id: number;
  skillId: number;
  name: string;
  userId: number;
  displayOrder: number | null;
}
