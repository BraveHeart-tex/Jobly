import { array, object, optional, type InferOutput } from "valibot";
import { DocumentSectionInsertValidator } from "./documentSectionValidators";
import { DocumentSectionFieldInsertValidator } from "./sectionFieldValidators";
import { documentSectionFieldInsertValidator } from "./sectionFieldValueValidators";
import { DocumentInsertValidator } from "./baseDocumentValidator";

export const SaveDocumentDetailsValidator = object({
  document: optional(DocumentInsertValidator),
  sections: optional(array(DocumentSectionInsertValidator)),
  fields: optional(array(DocumentSectionFieldInsertValidator)),
  fieldValues: optional(array(documentSectionFieldInsertValidator)),
});

export type SaveDocumentDetailsData = InferOutput<
  typeof SaveDocumentDetailsValidator
>;
