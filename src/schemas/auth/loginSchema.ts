import {
  type InferInput,
  type InferOutput,
  boolean,
  object,
  string,
  union,
} from "valibot";
import { EmailSchema, PasswordSchema } from "../schemaUtils";

export const LoginSchema = object({
  email: EmailSchema,
  password: PasswordSchema,
});

const LoginSuccessSchema = object({
  success: boolean(),
  message: string(),
});

const LoginErrorSchema = object({
  error: string(),
});

export const LoginResponseSchema = union([
  LoginSuccessSchema,
  LoginErrorSchema,
]);

export type LoginResponse = InferOutput<typeof LoginResponseSchema>;
export type LoginData = InferInput<typeof LoginSchema>;
