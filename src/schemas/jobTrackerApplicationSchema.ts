import { jobTrackerApplications } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const jobTrackerApplicationSchema = createInsertSchema(
  jobTrackerApplications,
  {
    jobTitle: z.string().min(1).max(512).default(""),
    location: z.string().min(1).max(512).default(""),
    url: z
      .union([z.string().url("Please enter a valid URL"), z.literal("")])
      .default(""),
  },
);

export type JobTrackerApplicationSchema = z.infer<
  typeof jobTrackerApplicationSchema
>;
