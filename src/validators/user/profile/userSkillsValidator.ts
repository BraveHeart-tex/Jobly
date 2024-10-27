import {
  type InferOutput,
  minValue,
  number,
  object,
  pipe,
  string,
  array,
} from "valibot";

export const userSkillsValidator = object({
  selectedSkill: object({
    id: pipe(
      number("Please select a skill"),
      minValue(1, "Please select a skill"),
    ),
    label: string(),
  }),
  attributedWorkExperienceIds: array(number()),
  attributedEducationIds: array(number()),
});

export type UserSkillsData = InferOutput<typeof userSkillsValidator>;
