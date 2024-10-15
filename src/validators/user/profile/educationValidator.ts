import { DateValidator } from "@/validators/schemaUtils";
import {
  maxLength,
  number,
  object,
  optional,
  pipe,
  string,
  type InferOutput,
  nullable,
  decimal,
  nonEmpty,
} from "valibot";

export const EducationalBackgroundValidator = object({
  id: optional(number()),
  userId: optional(number()),
  school: pipe(
    string(),
    nonEmpty("School name is required"),
    maxLength(255, "School name cannot exceed 255 characters"),
  ),
  fieldOfStudy: pipe(
    string(),
    nonEmpty("Field of study is required"),
    maxLength(255, "Field of study cannot exceed 255 characters"),
  ),
  gpa: nullable(
    pipe(string(), decimal("Please enter a valid decimal number (e.g. 3.5)")),
  ),
  startDate: DateValidator,
  endDate: nullable(DateValidator),
  description: optional(string()),
});

export const InsertEducationValidator = object({
  ...EducationalBackgroundValidator.entries,
  id: optional(number()),
});

export type EducationalBackgroundData = InferOutput<
  typeof EducationalBackgroundValidator
>;
