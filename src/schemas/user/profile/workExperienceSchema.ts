import { workExperiences } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";

const workExperienceSchema = createInsertSchema(workExperiences);

export type WorkExperienceSchema = z.infer<typeof workExperienceSchema>;

export default workExperienceSchema;
