import { z } from "zod";
import * as v from "valibot";

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

export const EmailSchema = v.pipe(
  v.string("Please enter a valid email address"),
  v.nonEmpty("Email is required"),
  v.email("Please enter a valid email address"),
);

export const PasswordSchema = v.pipe(
  v.string("Please enter your password"),
  v.minLength(8, "Password must be at least 8 characters long"),
  v.maxLength(256, "Password cannot exceed 256 characters"),
);
