import { users } from "@/server/db/schema";
import {
  type InferOutput,
  nonEmpty,
  object,
  picklist,
  pipe,
  string,
} from "valibot";

export const personalSettingsFormValidator = object({
  firstName: pipe(string(), nonEmpty("First name is required")),
  lastName: pipe(string(), nonEmpty("Last name is required")),
  accountType: picklist(users.role.enumValues, "Please select an account type"),
});

export type PersonalSettingsFormData = InferOutput<
  typeof personalSettingsFormValidator
>;
