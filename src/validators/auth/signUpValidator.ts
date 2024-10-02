import { users } from "@/server/db/schema";
import { EmailSchema, PasswordSchema } from "../schemaUtils";
import {
  type InferInput,
  minLength,
  nonEmpty,
  object,
  optional,
  picklist,
  pipe,
  string,
} from "valibot";

export const SignUpValidator = object({
  firstName: pipe(
    string("Please enter your first name"),
    minLength(1, "First name is required"),
  ),
  lastName: pipe(
    string("Please enter your last name"),
    minLength(1, "Last name is required"),
  ),
  email: EmailSchema,
  password: PasswordSchema,
  role: optional(
    pipe(
      picklist(users.role.enumValues, "Please select a role"),
      nonEmpty("Role is required"),
    ),
    "candidate",
  ),
});

export type SignUpData = InferInput<typeof SignUpValidator>;
