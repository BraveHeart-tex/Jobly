import {
  type InferOutput,
  minValue,
  nullable,
  number,
  object,
  pipe,
} from "valibot";

export const userSkillsValidator = object({
  skillId: pipe(number(), minValue(1, "Please select a skill")),
  attributedWorkExperienceId: nullable(number()),
  attributedEducationId: nullable(number()),
});

export type UserSkillsData = InferOutput<typeof userSkillsValidator>;
