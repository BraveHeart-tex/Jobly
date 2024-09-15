import { z } from "zod";
import { jobPostingSchema } from "./jobPostingSchema";
import { createSelectSchema } from "drizzle-zod";
import { benefits, skills } from "@/server/db/schema";

const jobPostingFormSchema = jobPostingSchema.omit({ companyId: true }).extend({
  skills: z.array(createSelectSchema(skills)).default([]),
  benefits: z.array(createSelectSchema(benefits)).default([]),
});

export type JobPostingFormSchema = z.infer<typeof jobPostingFormSchema>;

export default jobPostingFormSchema;
