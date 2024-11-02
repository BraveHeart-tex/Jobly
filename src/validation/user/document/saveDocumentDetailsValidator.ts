import { documentInsertValidator } from "@/validation/user/document/baseDocumentValidator";
import { documentSectionInsertValidator } from "@/validation/user/document/documentSectionValidators";
import { DocumentSectionFieldInsertValidator } from "@/validation/user/document/sectionFieldValidators";
import { array, object, optional, type InferOutput } from "valibot";

export const saveDocumentDetailsValidator = object({
  document: optional(documentInsertValidator),
  sections: optional(array(documentSectionInsertValidator)),
  fields: optional(array(DocumentSectionFieldInsertValidator)),
});

export type SaveDocumentDetailsData = InferOutput<
  typeof saveDocumentDetailsValidator
>;
