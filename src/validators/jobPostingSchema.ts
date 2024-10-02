import { ISO_8601_REGEX } from "@/lib/constants";
import { jobPostings } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { DateTime } from "luxon";
import { z } from "zod";

const oneWeekFromNow = DateTime.now().plus({ days: 7 }).toISO();
const POST_EXPIRY_THRESHOLD_DAYS = 60 as const;

export const jobPostingSchema = createInsertSchema(jobPostings, {
  id: z.number().optional(),
  companyId: z.number().min(1),
  title: z.string().min(1).default(""),
  location: z.string().min(1).default(""),
  workType: z.enum(jobPostings.workType.enumValues).default("office"),
  salaryRange: z
    .string()
    .default("")
    .nullable()
    .transform((val) => (!val ? null : val)),
  postingContent: z.string().min(1).default(""),
  employmentType: z
    .enum(jobPostings.employmentType.enumValues)
    .default("full-time"),
  status: z.enum(jobPostings.status.enumValues).default("draft"),
  postedAt: z.string().optional(),
  expiresAt: z
    .string()
    .regex(ISO_8601_REGEX)
    .refine(
      (val) => {
        const expiresAt = DateTime.fromISO(val);
        const now = DateTime.now();
        const diff = expiresAt.diff(now, "days").days;
        return diff > 0 && diff <= POST_EXPIRY_THRESHOLD_DAYS;
      },
      {
        message: `Job posting expiry date can't exceed ${POST_EXPIRY_THRESHOLD_DAYS} days.`,
      },
    )
    .default(oneWeekFromNow),
  updatedAt: z.string().optional(),
});

export type JobPostingSchema = z.infer<typeof jobPostingSchema>;
