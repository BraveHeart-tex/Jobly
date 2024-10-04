import { ISO_8601_REGEX } from "@/lib/constants";
import {
  pipe,
  string,
  minLength,
  maxLength,
  nonEmpty,
  email,
  picklist,
  optional,
  safeParse,
  regex,
} from "valibot";

export const parseEnumValue = <T extends string>(
  enumValues: readonly T[],
  valueToValidate: string | undefined,
  fallbackValue: T,
): T => {
  if (!valueToValidate) return fallbackValue as T;

  const validator = optional(
    picklist(enumValues as readonly [T, ...T[]]),
    fallbackValue,
  );

  const parseResult = safeParse(validator, valueToValidate);

  return (parseResult.success ? parseResult.output : fallbackValue) as T;
};

export const EmailValidator = pipe(
  string("Please enter a valid email address"),
  nonEmpty("Email is required"),
  email("Please enter a valid email address"),
);

export const PasswordValidator = pipe(
  string("Please enter your password"),
  minLength(8, "Password must be at least 8 characters long"),
  maxLength(256, "Password cannot exceed 256 characters"),
);

export const DateTimeValidator = pipe(
  string(),
  regex(ISO_8601_REGEX, "Please enter a valid date-time format."),
);
