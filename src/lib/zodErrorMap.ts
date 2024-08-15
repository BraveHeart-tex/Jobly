import { type ZodErrorMap, ZodIssueCode } from "zod";

// Define a custom error map
export const zodErrorMap: ZodErrorMap = (issue, _ctx) => {
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      return {
        message: `Expected ${issue.expected}, but received ${issue.received}`,
      };
    case ZodIssueCode.invalid_literal:
      return {
        message: `Invalid literal value, expected ${issue.expected}`,
      };
    case ZodIssueCode.unrecognized_keys:
      return {
        message: `Unrecognized keys in object: ${issue.keys.join(", ")}`,
      };
    case ZodIssueCode.invalid_union:
      return {
        message: "Invalid input, expected one of the union types",
      };
    case ZodIssueCode.invalid_enum_value:
      return {
        message: `Invalid enum value. Expected one of: ${issue.options.join(", ")}`,
      };
    case ZodIssueCode.invalid_arguments:
      return { message: "Invalid function arguments" };
    case ZodIssueCode.invalid_return_type:
      return { message: "Invalid function return type" };
    case ZodIssueCode.invalid_date:
      return { message: "Invalid date" };
    case ZodIssueCode.invalid_string:
      return { message: "Invalid string" };
    case ZodIssueCode.too_small:
      if (issue.type === "string") {
        return {
          message: `Should at least be ${issue.minimum} character${issue.minimum === 1 ? "" : "s"}`,
        };
      }
      return {
        message: `Value is too small. Minimum allowed is ${issue.minimum}`,
      };
    case ZodIssueCode.too_big:
      if (issue.type === "string") {
        return {
          message: `Can at most be ${issue.maximum} ${`character${issue.maximum}` === "1" ? "" : "s"}`,
        };
      }
      return {
        message: `Value is too big. Maximum allowed is ${issue.maximum}`,
      };
    case ZodIssueCode.custom:
      return { message: `Custom error: ${issue.message}` };
    case ZodIssueCode.invalid_intersection_types:
      return { message: "Intersection results in an invalid type" };
    default:
      return { message: "Invalid input" };
  }
};
