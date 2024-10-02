import { skills } from "@/server/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { jobPostingSchema } from "./jobPostingSchema";

const employerJobPostingFormSchema = jobPostingSchema
  .omit({ companyId: true, createdUserId: true })
  .extend({
    skills: z.array(createSelectSchema(skills)).default([]),
  });

export type EmployerJobPostingFormSchema = z.infer<
  typeof employerJobPostingFormSchema
>;

export default employerJobPostingFormSchema;
