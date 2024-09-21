import { z } from "zod";

const workExperienceSchema = z.object({
  jobTitle: z.string().min(1).default(""),
  employer: z.string().min(1).default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  location: z.string().default(""),
  description: z.string().default(""),
});

export type WorkExperienceSchema = z.infer<typeof workExperienceSchema>;

export default workExperienceSchema;
