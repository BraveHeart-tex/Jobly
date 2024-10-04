import {
  type InferInput,
  type InferOutput,
  boolean,
  object,
  string,
  union,
} from "valibot";
import { EmailValidator, PasswordValidator } from "../schemaUtils";

export const LoginValidator = object({
  email: EmailValidator,
  password: PasswordValidator,
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
