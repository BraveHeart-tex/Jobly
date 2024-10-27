import {
  type InferOutput,
  minValue,
  nullable,
  number,
  object,
  pipe,
  string,
} from "valibot";

export const userSkillsValidator = object({
  selectedSkill: object({
    id: pipe(
      number("Please select a skill"),
      minValue(1, "Please select a skill"),
    ),
    label: string(),
  }),
  selectedWorkExperience: nullable(
    object({
      id: number(),
      label: string(),
    }),
  ),
  selectedEducation: nullable(
    object({
      id: number(),
      label: string(),
    }),
  ),
});

export type UserSkillsData = InferOutput<typeof userSkillsValidator>;
