import { ISO_DATE_FORMAT_REGEX } from "@/lib/constants";
import { workExperiences } from "@/server/db/schema";
import { DateValidator } from "@/validators/schemaUtils";
import { DateTime } from "luxon";
import {
  type InferOutput,
  maxLength,
  nonEmpty,
  number,
  object,
  picklist,
  pipe,
  string,
  regex,
  rawCheck,
  nullable,
  optional,
  minValue,
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
      regex(ISO_DATE_FORMAT_REGEX, "Please enter a valid date format."),
    ),
    endDate: nullable(DateValidator),
    employmentType: picklist(workExperiences.employmentType.enumValues),
    workType: picklist(workExperiences.workType.enumValues),
    location: nullable(
      pipe(string(), maxLength(255, "Location cannot exceed 255 characters")),
    ),
    description: nullable(string()),
  }),
  rawCheck(({ dataset, addIssue }) => {
    if (!dataset.typed) return;
    if (!dataset.value.endDate) return;
    if (!dataset.value.startDate) return;

    const startDate = DateTime.fromISO(dataset.value.startDate).startOf("day");
    const endDate = DateTime.fromISO(dataset.value.endDate).startOf("day");

    if (endDate < startDate) {
      addIssue({
        path: [
          {
            key: "endDate",
            value: dataset.value.endDate,
            origin: "value",
            type: "object",
            input: dataset.value,
          },
        ],
        message: "End date cannot be before start date.",
      });
    }
  }),
);

export const UpdateWorkExperienceValidator = object({
  ...WorkExperienceValidator.entries,
  id: pipe(number(), minValue(1, "Please provide valid work experience id.")),
});

export type WorkExperienceData = InferOutput<typeof WorkExperienceValidator>;
