import { jobTrackerApplications } from "@/server/db/schema";
import {
  type InferInput,
  type InferOutput,
  decimal,
  maxLength,
  nonEmpty,
  number,
  object,
  picklist,
  pipe,
  string,
  partial,
  nullish,
  union,
  literal,
} from "valibot";
import { UrlValidator } from "./schemaUtils";

export const JobTrackerApplicationValidator = object({
  id: number(),
  status: pipe(
    picklist(jobTrackerApplications.status.enumValues),
    nonEmpty("Status is required"),
  ),
  userId: number(),
  company: pipe(
    string(),
    nonEmpty("Company is required"),
    maxLength(512, "Company cannot exceed 512 characters"),
  ),
  jobTitle: pipe(
    string(),
    nonEmpty("Job title is required"),
    maxLength(512, "Job title cannot exceed 512 characters"),
  ),
  location: pipe(
    string(),
    nonEmpty("Location is required"),
    maxLength(512, "Location cannot exceed 512 characters"),
  ),
  url: nullish(union([UrlValidator, literal("")])),
  salary: nullish(
    union([
      pipe(
        string(),
        decimal("Please enter a valid salary range (example: 30,000 - 40,000)"),
      ),
      literal(""),
    ]),
  ),
  notes: nullish(string()),
  jobDescription: nullish(string()),
  displayOrder: number(),
});

export const JobTrackerApplicationInsertValidator = partial(
  JobTrackerApplicationValidator,
  ["id", "userId"],
);

export const JobTrackerFormValidator = object({
  ...JobTrackerApplicationInsertValidator.entries,
  displayOrder: nullish(number()),
});

export type JobTrackerApplicationInsertInput = InferInput<
  typeof JobTrackerApplicationInsertValidator
>;

export type JobTrackerApplicationInput = InferInput<
  typeof JobTrackerApplicationValidator
>;

export type JobTrackerApplicationOutput = InferOutput<
  typeof JobTrackerApplicationValidator
>;
