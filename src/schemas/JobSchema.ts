import { z } from "zod";

const JobSchema = z.object({
  id: z.coerce.number().nullable().optional(),
  jobTitle: z
    .string()
    .min(3, "Job title should at least be 3 characters long.")
    .max(100, "Job title should not exceed 100 characters.")
    .default(""),
  companyName: z.coerce.string().min(3, "Company name should at least be 3 characters long.").default(""),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "TEMPORARY", "VOLUNTEER", "INTERNSHIP"]),
  applicationStatus: z.enum(["PENDING", "REJECTED", "INTERVIEW", "OFFER"]),
  location: z.coerce.string().min(3, "Job location should at least be 3 characters long.").default(""),
  comments: z.coerce.string().nullable().optional().default(""),
});

export default JobSchema;
