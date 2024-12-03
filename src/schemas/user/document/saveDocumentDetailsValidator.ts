import { documentInsertValidator } from "@/schemas/user/document/baseDocumentValidator";
import { documentSectionInsertValidator } from "@/schemas/user/document/documentSectionValidators";
import { DocumentSectionFieldInsertValidator } from "@/schemas/user/document/sectionFieldValidators";
import { array, object, optional, type InferOutput } from "valibot";

export const saveDocumentDetailsValidator = object({
  document: optional(documentInsertValidator),
  sections: optional(array(documentSectionInsertValidator)),
  fields: optional(array(DocumentSectionFieldInsertValidator)),
});

export type SaveDocumentDetailsData = InferOutput<
  typeof saveDocumentDetailsValidator
>;
