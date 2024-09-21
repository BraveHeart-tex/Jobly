import { workExperiences } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";

const workExperienceSchema = createInsertSchema(workExperiences, {
  // jobTitle: z.string().min(1).default(""),
  // employer: z.string().min(1).default("").nullable().optional(),
  // startDate: z.string().default(""),
  // endDate: z.string().default("").nullable().optional(),
  // location: z.string().default("").nullable().optional(),
  // description: z.string().default("").nullable().optional(),
});

export type WorkExperienceSchema = z.infer<typeof workExperienceSchema>;

export default workExperienceSchema;
