import {
  type InferInput,
  isoDateTime,
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
  startDate: pipe(string(), isoDateTime()),
  endDate: optional(pipe(string(), isoDateTime())),
  city: optional(
    pipe(string(), maxLength(100, "City cannot exceed 100 characters")),
  ),
  description: optional(string()),
});

export type EducationInput = InferInput<typeof EducationValidator>;
