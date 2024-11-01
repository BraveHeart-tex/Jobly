import { documentInsertValidator } from "@/validators/user/document/baseDocumentValidator";
import { documentSectionInsertValidator } from "@/validators/user/document/documentSectionValidators";
import { DocumentSectionFieldInsertValidator } from "@/validators/user/document/sectionFieldValidators";
import { array, object, optional, type InferOutput } from "valibot";

export const saveDocumentDetailsValidator = object({
  document: optional(documentInsertValidator),
  sections: optional(array(documentSectionInsertValidator)),
  fields: optional(array(DocumentSectionFieldInsertValidator)),
});

export type SaveDocumentDetailsData = InferOutput<
  typeof saveDocumentDetailsValidator
>;
