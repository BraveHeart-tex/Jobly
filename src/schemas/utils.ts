import { z } from "zod";

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
