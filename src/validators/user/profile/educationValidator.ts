import { DateTimeValidator } from "@/validators/schemaUtils";
import {
  type InferInput,
  maxLength,
  number,
  object,
  optional,
  pipe,
  string,
} from "valibot";

export const EducationValidator = object({
  id: number(),
  userId: number(),
  school: pipe(
    string(),
    maxLength(255, "School name cannot exceed 255 characters"),
  ),
  degree: pipe(string(), maxLength(255, "Degree cannot exceed 255 characters")),
  startDate: DateTimeValidator,
  endDate: optional(DateTimeValidator),
  city: optional(
    pipe(string(), maxLength(100, "City cannot exceed 100 characters")),
  ),
  description: optional(string()),
});

export type EducationInput = InferInput<typeof EducationValidator>;
