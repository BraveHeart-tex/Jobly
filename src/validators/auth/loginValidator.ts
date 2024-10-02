import {
  type InferInput,
  type InferOutput,
  boolean,
  object,
  string,
  union,
} from "valibot";
import { EmailSchema, PasswordSchema } from "../schemaUtils";

export const LoginValidator = object({
  email: EmailSchema,
  password: PasswordSchema,
});

const LoginSuccessValidator = object({
  success: boolean(),
  message: string(),
});

const LoginErrorValidator = object({
  error: string(),
});

export const LoginResponseValidator = union([
  LoginSuccessValidator,
  LoginErrorValidator,
]);

export type LoginResponse = InferOutput<typeof LoginResponseValidator>;
export type LoginData = InferInput<typeof LoginValidator>;
