import { jobPostings } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";

export const jobPostingSchema = createInsertSchema(jobPostings);

export type JobPostingSchema = z.infer<typeof jobPostingSchema>;
