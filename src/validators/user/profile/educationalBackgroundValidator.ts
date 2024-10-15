import { DateValidator } from "@/validators/schemaUtils";
import { DateTime } from "luxon";
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
  minValue,
  rawCheck,
} from "valibot";

export const EducationalBackgroundValidator = pipe(
  object({
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

export const InsertEducationValidator = object({
  ...EducationalBackgroundValidator.entries,
  id: optional(number()),
});

export const UpdateEducationValidator = object({
  ...EducationalBackgroundValidator.entries,
  id: pipe(number(), minValue(1, "Please provide valid education id.")),
});

export type EducationalBackgroundData = InferOutput<
  typeof EducationalBackgroundValidator
>;
