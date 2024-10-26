import { DocumentInsertValidator } from "@/validators/user/document/baseDocumentValidator";
import { DocumentSectionInsertValidator } from "@/validators/user/document/documentSectionValidators";
import { DocumentSectionFieldInsertValidator } from "@/validators/user/document/sectionFieldValidators";
import { array, object, optional, type InferOutput } from "valibot";

export const SaveDocumentDetailsValidator = object({
  document: optional(DocumentInsertValidator),
  sections: optional(array(DocumentSectionInsertValidator)),
  fields: optional(array(DocumentSectionFieldInsertValidator)),
});

export type SaveDocumentDetailsData = InferOutput<
  typeof SaveDocumentDetailsValidator
>;
