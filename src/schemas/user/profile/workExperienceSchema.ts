import { workExperiences } from "@/server/db/schema";
import { createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

const workExperienceSchema = createSelectSchema(workExperiences);

export type WorkExperienceSchema = z.infer<typeof workExperienceSchema>;

export default workExperienceSchema;
