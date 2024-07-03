import { job } from "@/server/db/schema";
import { z } from "zod";

export const getJobListingsSchema = z.object({
  query: z.string().optional().default(""),
  page: z.number().optional().default(1),
  bookmarked: z.boolean().optional().default(false),
  viewed: z.boolean().optional().default(false),
  workType: z.enum(job.workType.enumValues).optional().nullable(),
  employmentType: z.enum(job.employmentType.enumValues).optional().nullable(),
});

export type GetJobListingsSchema = z.infer<typeof getJobListingsSchema>;
