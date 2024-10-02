import {
  minValue,
  nonEmpty,
  number,
  object,
  partial,
  pipe,
  required,
  string,
} from "valibot";

export const documentSectionFieldValueValidator = object({
  id: number(),
  fieldId: pipe(
    number(),
    minValue(1, "Field id must be greater than or equal to 1"),
  ),
  value: pipe(string(), nonEmpty("Value is required")),
});

export const documentSectionFieldInsertValidator = partial(
  documentSectionFieldValueValidator,
  ["id"],
);

export const documentSectionFieldUpdateValidator = required(
  documentSectionFieldValueValidator,
  ["id"],
);
