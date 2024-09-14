import { z } from "zod";
import { jobPostingSchema } from "./jobPostingSchema";

const jobPostingFormSchema = jobPostingSchema.omit({ companyId: true }).extend({
  createdSkills: z.array(z.string()).default([]),
  createdBenefits: z.array(z.string()).default([]),
});

export type JobPostingFormSchema = z.infer<typeof jobPostingFormSchema>;

export default jobPostingFormSchema;
