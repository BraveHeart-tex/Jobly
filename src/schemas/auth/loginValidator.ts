import { emailValidator, passwordValidator } from "@/schemas/schemaUtils";
import {
  type InferInput,
  type InferOutput,
  boolean,
  object,
  string,
  union,
} from "valibot";

export const loginValidator = object({
  email: emailValidator,
  password: passwordValidator,
});

const loginSuccessValidator = object({
  success: boolean(),
  message: string(),
});

const loginErrorValidator = object({
  error: string(),
});

export const loginResponseValidator = union([
  loginSuccessValidator,
  loginErrorValidator,
]);

export type LoginResponse = InferOutput<typeof loginResponseValidator>;
export type LoginData = InferInput<typeof loginValidator>;
