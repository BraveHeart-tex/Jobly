import { users } from "@/server/db/schema";
import * as v from "valibot";
import { EmailSchema, PasswordSchema } from "../schemaUtils";

export const SignUpSchema = v.object({
  firstName: v.pipe(
    v.string("Please enter your first name"),
    v.minLength(1, "First name is required"),
  ),
  lastName: v.pipe(
    v.string("Please enter your last name"),
    v.minLength(1, "Last name is required"),
  ),
  email: EmailSchema,
  password: PasswordSchema,
  role: v.optional(
    v.pipe(
      v.picklist(users.role.enumValues, "Please select a role"),
      v.nonEmpty("Role is required"),
    ),
    "candidate",
  ),
});

export type SignUpData = v.InferInput<typeof SignUpSchema>;
