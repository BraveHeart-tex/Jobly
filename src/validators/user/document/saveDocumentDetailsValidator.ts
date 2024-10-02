import { type InferInput, array, object, partial } from "valibot";
import { DocumentUpdateValidator } from "./baseDocumentValidator";
import { DocumentSectionUpdateValidator } from "./documentSectionValidators";
import { DocumentSectionFieldUpdateValidator } from "./sectionFieldValidators";
import { documentSectionFieldUpdateValidator } from "./sectionFieldValueValidators";

export const SaveDocumentDetailsValidator = partial(
  object({
    document: DocumentUpdateValidator,
    sections: array(DocumentSectionUpdateValidator),
    fields: array(DocumentSectionFieldUpdateValidator),
    fieldValues: array(documentSectionFieldUpdateValidator),
  }),
);

export type SaveDocumentDetailsData = InferInput<
  typeof SaveDocumentDetailsValidator
>;
