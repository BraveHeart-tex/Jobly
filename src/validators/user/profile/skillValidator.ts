import { maxLength, nonEmpty, number, object, pipe, string } from "valibot";

export const SkillValidator = object({
  id: number(),
  name: pipe(
    string(),
    nonEmpty("Skill name is required"),
    maxLength(256, "Skill name cannot exceed 256 characters"),
  ),
});
