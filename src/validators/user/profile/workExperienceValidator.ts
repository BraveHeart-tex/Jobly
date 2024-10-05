import { workExperiences } from "@/server/db/schema";
import {
  type InferOutput,
  isoDate,
  maxLength,
  nonEmpty,
  number,
  object,
  optional,
  picklist,
  pipe,
  string,
} from "valibot";

export const WorkExperienceValidator = object({
  id: number(),
  userId: number(),
  jobTitle: pipe(
    string(),
    maxLength(255, "Job title cannot exceed 255 characters"),
  ),
  employer: pipe(
    string(),
    maxLength(255, "Employer cannot exceed 255 characters"),
  ),
  startDate: pipe(string(), nonEmpty("Start date is required"), isoDate()),
  endDate: optional(pipe(string(), isoDate())),
  employmentType: optional(
    picklist(workExperiences.employmentType.enumValues),
    "full-time",
  ),
  workType: optional(picklist(workExperiences.workType.enumValues), "office"),
  location: optional(
    pipe(string(), maxLength(255, "Location cannot exceed 255 characters")),
  ),
  description: optional(string()),
});

export type WorkExperienceData = InferOutput<typeof WorkExperienceValidator>;
