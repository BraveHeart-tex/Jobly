import { jobPostings } from "@/server/db/schema";
import { DateTime } from "luxon";
import {
  type InferInput,
  type InferOutput,
  check,
  maxLength,
  minValue,
  nonEmpty,
  nullable,
  number,
  object,
  optional,
  picklist,
  pipe,
  string,
} from "valibot";
import { DateTimeValidator } from "./schemaUtils";

const oneWeekFromNow = DateTime.now().plus({ days: 7 }).toISO();
const POST_EXPIRY_THRESHOLD_DAYS = 60 as const;

// TODO: check iso date time values
export const JobPostingValidator = pipe(
  object({
    id: number(),
    companyId: pipe(
      number(),
      minValue(1, "Company id must be greater than or equal to 1"),
    ),
    title: pipe(
      string(),
      nonEmpty("Title is required"),
      maxLength(512, "Title cannot exceed 512 characters"),
    ),
    location: pipe(
      string(),
      nonEmpty("Location is required"),
      maxLength(512, "Location cannot exceed 512 characters"),
    ),
    workType: optional(picklist(jobPostings.workType.enumValues), "office"),
    salaryRange: nullable(
      pipe(string(), maxLength(50, "Salary range cannot exceed 50 characters")),
    ),
    postingContent: pipe(string(), nonEmpty("Posting content is required")),
    employmentType: optional(
      picklist(jobPostings.employmentType.enumValues),
      "full-time",
    ),
    status: optional(picklist(jobPostings.status.enumValues), "draft"),
    postedAt: optional(DateTimeValidator),
    expiresAt: optional(DateTimeValidator, oneWeekFromNow),
    updatedAt: optional(DateTimeValidator),
  }),
  check((input) => {
    const expiresAt = DateTime.fromISO(input.expiresAt);
    const now = DateTime.now();
    const diff = expiresAt.diff(now, "days").days;
    return diff > 0 && diff <= POST_EXPIRY_THRESHOLD_DAYS;
  }, `Job posting expiry date can't exceed ${POST_EXPIRY_THRESHOLD_DAYS} days.`),
);

export type JobPostingInput = InferInput<typeof JobPostingValidator>;
export type JobPostingOutput = InferOutput<typeof JobPostingValidator>;
