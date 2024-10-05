import {
  minValue,
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
  value: string(),
});

export const documentSectionFieldInsertValidator = partial(
  documentSectionFieldValueValidator,
  ["id"],
);

export const documentSectionFieldUpdateValidator = required(
  documentSectionFieldValueValidator,
  ["id"],
);
