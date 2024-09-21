import { z } from "zod";

const skillSchema = z.object({
  name: z.string().min(1).default(""),
  level: z.string().min(1).default(""),
});

export type SkillSchema = z.infer<typeof skillSchema>;
export default skillSchema;
