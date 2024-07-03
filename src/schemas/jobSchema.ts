import { job } from "@/server/db/schema";
import { z } from "zod";

export const jobSchema = z.object({
  id: z.number(),
  companyId: z.number(),
  title: z.string().min(1).max(512),
  description: z.string().optional(),
  location: z.string().optional(),
  workType: z.enum(job.workType.enumValues),
  salaryRange: z.string().optional(),
  employmentType: z.enum(job.employmentType.enumValues).default("full-time"),
  applicationCount: z.number().default(0),
  benefits: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type JobSchema = z.infer<typeof jobSchema>;
