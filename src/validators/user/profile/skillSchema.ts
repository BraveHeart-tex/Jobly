import { skills } from "@/server/db/schema";
import { createSelectSchema } from "drizzle-zod";
import type { z } from "zod";

const skillSchema = createSelectSchema(skills);

export type SkillSchema = z.infer<typeof skillSchema>;
export default skillSchema;
