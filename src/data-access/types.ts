import type { EducationalBackground } from "@/server/db/schema/educationalBackgrounds";
import type { WorkExperience } from "@/server/db/schema/workExperiences";

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
}
