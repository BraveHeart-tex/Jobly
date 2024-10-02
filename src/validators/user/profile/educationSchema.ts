import { educationalBackgrounds } from "@/server/db/schema";
import { createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

const educationSchema = createSelectSchema(educationalBackgrounds, {});

export type EducationSchema = z.infer<typeof educationSchema>;

export default educationSchema;
