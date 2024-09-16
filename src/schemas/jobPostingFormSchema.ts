import { z } from "zod";
import { jobPostingSchema } from "./jobPostingSchema";
import { createSelectSchema } from "drizzle-zod";
import { benefits, skills } from "@/server/db/schema";

const employerJobPostingFormSchema = jobPostingSchema
  .omit({ companyId: true, createdUserId: true })
  .extend({
    skills: z.array(createSelectSchema(skills)).default([]),
    benefits: z.array(createSelectSchema(benefits)).default([]),
  });

export type EmployerJobPostingFormSchema = z.infer<
  typeof employerJobPostingFormSchema
>;

export default employerJobPostingFormSchema;
