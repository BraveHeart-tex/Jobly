import { z } from "zod";

const educationSchema = z.object({
  school: z.string().min(1).default(""),
  degree: z.string().min(1).default(""),
  startDate: z.string().default(""),
  endDate: z.string().default("").nullable().optional(),
  city: z.string().default("").nullable().optional(),
  description: z.string().default("").nullable().optional(),
});

export type EducationSchema = z.infer<typeof educationSchema>;

export default educationSchema;
