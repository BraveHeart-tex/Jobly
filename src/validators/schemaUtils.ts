import { z } from "zod";
import { pipe, string, minLength, maxLength, nonEmpty, email } from "valibot";

export const parseEnumValue = <T extends string>(
  enumValues: readonly T[],
  valueToValidate: string | undefined,
  fallbackValue: T,
): T => {
  if (!valueToValidate) return fallbackValue as T;

  const schema = z.enum(enumValues as readonly [T, ...T[]]);

  const parseResult = schema.safeParse(valueToValidate);
  return (parseResult.success ? parseResult.data : fallbackValue) as T;
};

export const EmailSchema = pipe(
  string("Please enter a valid email address"),
  nonEmpty("Email is required"),
  email("Please enter a valid email address"),
);

export const PasswordSchema = pipe(
  string("Please enter your password"),
  minLength(8, "Password must be at least 8 characters long"),
  maxLength(256, "Password cannot exceed 256 characters"),
);