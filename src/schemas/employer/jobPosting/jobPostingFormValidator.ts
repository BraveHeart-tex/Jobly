import { jobPostingValidator } from "@/schemas/employer/jobPosting/jobPostingValidator";
import { skillValidator } from "@/schemas/skillValidator";
import { type InferInput, type InferOutput, array, object } from "valibot";

export const employerJobPostingFormValidator = object({
  ...jobPostingValidator.entries,
  skills: array(skillValidator),
});

export type EmployerJobPostingFormInput = InferInput<
  typeof employerJobPostingFormValidator
>;
export type EmployerJobPostingFormOutput = InferOutput<
  typeof employerJobPostingFormValidator
>;
