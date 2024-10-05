import {
  maxLength,
  nonEmpty,
  number,
  object,
  partial,
  pipe,
  string,
} from "valibot";

export const SkillValidator = object({
  id: number(),
  name: pipe(
    string(),
    nonEmpty("Skill name is required"),
    maxLength(256, "Skill name cannot exceed 256 characters"),
  ),
});

export const SkillInsertValidator = partial(SkillValidator, ["id"]);
