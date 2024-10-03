import { type InferInput, array, object } from "valibot";
import { DocumentSectionInsertValidator } from "./documentSectionValidators";
import { DocumentSectionFieldInsertValidator } from "./sectionFieldValidators";
import { documentSectionFieldInsertValidator } from "./sectionFieldValueValidators";
import { DocumentInsertValidator } from "./baseDocumentValidator";

export const SaveDocumentDetailsValidator = object({
  document: DocumentInsertValidator,
  sections: array(DocumentSectionInsertValidator),
  fields: array(DocumentSectionFieldInsertValidator),
  fieldValues: array(documentSectionFieldInsertValidator),
});

export type SaveDocumentDetailsData = InferInput<
  typeof SaveDocumentDetailsValidator
>;
