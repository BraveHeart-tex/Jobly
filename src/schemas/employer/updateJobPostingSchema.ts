import { jobPostings } from "@/server/db/schema";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const updateJobPostingSchema = createSelectSchema(jobPostings, {
  postedAt: z.string(),
  expiresAt: z.string(),
  updatedAt: z.string(),
}).omit({ companyId: true });
