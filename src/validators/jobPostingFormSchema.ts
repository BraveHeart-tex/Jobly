import { JobPostingValidator } from "./jobPostingSchema";
import { type InferInput, type InferOutput, array, object } from "valibot";
import { SkillValidator } from "./user/profile/skillSchema";

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
