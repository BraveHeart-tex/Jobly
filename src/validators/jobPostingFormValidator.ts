import { JobPostingValidator } from "./jobPostingValidator";
import { type InferInput, type InferOutput, array, object } from "valibot";
import { SkillValidator } from "./user/profile/skillValidator";

export const EmployerJobPostingFormValidator = object({
  ...JobPostingValidator.entries,
  skills: array(SkillValidator),
});

export type EmployerJobPostingFormInput = InferInput<
  typeof EmployerJobPostingFormValidator
>;
export type EmployerJobPostingFormOutput = InferOutput<
  typeof EmployerJobPostingFormValidator
>;
