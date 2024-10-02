import {
  maxLength,
  minValue,
  nonEmpty,
  number,
  object,
  partial,
  pipe,
  required,
  string,
} from "valibot";

export const DocumentSectionFieldValidator = object({
  id: number(),
  sectionId: number(),
  fieldName: pipe(
    string(),
    nonEmpty("Field name is required"),
    maxLength(100, "Field name cannot exceed 100 characters"),
  ),
  fieldType: pipe(
    string(),
    nonEmpty("Field type is required"),
    maxLength(100, "Field type cannot exceed 100 characters"),
  ),
  displayOrder: pipe(
    number(),
    minValue(1, "Display order must be greater than or equal to 1"),
  ),
});

export const DocumentSectionFieldInsertValidator = partial(
  DocumentSectionFieldValidator,
  ["id"],
);

export const DocumentSectionFieldUpdateValidator = required(
  DocumentSectionFieldValidator,
  ["id"],
);
