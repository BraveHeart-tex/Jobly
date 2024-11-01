import { type InferOutput, array, number, object } from "valibot";

export const saveUserSkillOrderValidator = object({
  items: array(
    object({
      id: number(),
      skillId: number(),
      displayOrder: number(),
    }),
  ),
});

export type SaveUserSkillOrderData = InferOutput<
  typeof saveUserSkillOrderValidator
>;
