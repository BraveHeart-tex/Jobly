import { jobPostings, skills } from "@/server/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const updateJobPostingSchema = createSelectSchema(jobPostings, {
  postedAt: z.string(),
  expiresAt: z.string(),
  updatedAt: z.string(),
})
  .omit({ companyId: true, createdUserId: true })
  .extend({
    skills: z.array(createSelectSchema(skills)),
  });

export type UpdateJobPostingSchema = z.infer<typeof updateJobPostingSchema>;
