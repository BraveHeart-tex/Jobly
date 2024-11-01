import {
  ISO_8601_DATE_TIME_REGEX,
  ISO_DATE_FORMAT_REGEX,
  URL_REGEX,
} from "@/lib/constants";
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
  object,
  number,
  minValue,
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

export const emailValidator = pipe(
  string("Please enter a valid email address"),
  nonEmpty("Email is required"),
  email("Please enter a valid email address"),
);

export const passwordValidator = pipe(
  string("Please enter your password"),
  minLength(8, "Password must be at least 8 characters long"),
  maxLength(256, "Password cannot exceed 256 characters"),
);

export const dateTimeValidator = pipe(
  string(),
  regex(ISO_8601_DATE_TIME_REGEX, "Please enter a valid date-time format."),
);

export const dateValidator = pipe(
  string(),
  regex(ISO_DATE_FORMAT_REGEX, "Please enter a valid date format."),
);

export const urlValidator = pipe(
  string(),
  regex(URL_REGEX, "Please enter a valid URL."),
);

export const genericIdValidator = object({
  id: pipe(number(), minValue(1, "Please provide valid id.")),
});
