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
  attributedWorkExperienceId: nullable(number()),
  attributedEducationId: nullable(number()),
});

export type UserSkillsData = InferOutput<typeof userSkillsValidator>;
