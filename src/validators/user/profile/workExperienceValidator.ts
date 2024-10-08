import { ISO_8601_REGEX } from "@/lib/constants";
import { workExperiences } from "@/server/db/schema";
import { DateTimeValidator } from "@/validators/schemaUtils";
import { DateTime } from "luxon";
import {
  type InferOutput,
  maxLength,
  nonEmpty,
  number,
  object,
  optional,
  picklist,
  pipe,
  string,
  regex,
  check,
} from "valibot";

export const WorkExperienceValidator = pipe(
  object({
    id: optional(number()),
    jobTitle: pipe(
      string(),
      nonEmpty("Job title is required"),
      maxLength(255, "Job title cannot exceed 255 characters"),
    ),
    employer: pipe(
      string(),
      nonEmpty("Employer is required"),
      maxLength(255, "Employer cannot exceed 255 characters"),
    ),
    startDate: pipe(
      string(),
      nonEmpty("Start date is required"),
      regex(ISO_8601_REGEX, "Please enter a valid date-time format."),
    ),
    endDate: optional(DateTimeValidator),
    employmentType: picklist(workExperiences.employmentType.enumValues),
    workType: picklist(workExperiences.workType.enumValues),
    location: optional(
      pipe(string(), maxLength(255, "Location cannot exceed 255 characters")),
    ),
    description: optional(string()),
  }),
  check(
    (input) =>
      input?.endDate
        ? DateTime.fromISO(input?.endDate) > DateTime.fromISO(input?.startDate)
        : true,
    "End date must be after start date",
  ),
);

export type WorkExperienceData = InferOutput<typeof WorkExperienceValidator>;
