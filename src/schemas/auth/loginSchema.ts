import * as v from "valibot";
import { EmailSchema, PasswordSchema } from "../utils";

export const LoginSchema = v.object({
  email: EmailSchema,
  password: PasswordSchema,
});

const LoginSuccessSchema = v.object({
  success: v.boolean(),
  message: v.string(),
});

const LoginErrorSchema = v.object({
  error: v.string(),
});

export const LoginResponseSchema = v.union([
  LoginSuccessSchema,
  LoginErrorSchema,
]);

export type LoginResponse = v.InferOutput<typeof LoginResponseSchema>;

export type LoginData = v.InferInput<typeof LoginSchema>;
