import { educationalBackgrounds } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";

const educationSchema = createInsertSchema(educationalBackgrounds, {
  // school: z.string().min(1).default(""),
  // degree: z.string().min(1).default(""),
  // startDate: z.string().default(""),
  // endDate: z.string().default("").nullable().optional(),
  // city: z.string().default("").nullable().optional(),
  // description: z.string().default("").nullable().optional(),
});

export type EducationSchema = z.infer<typeof educationSchema>;

export default educationSchema;
