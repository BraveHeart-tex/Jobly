import {
  documentSectionFieldValues,
  documentSectionFields,
  documentSections,
  documents,
} from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const saveDocumentDetailsSchema = z.object({
  document: createInsertSchema(documents),
  sections: z.array(createInsertSchema(documentSections)),
  fields: z.array(createInsertSchema(documentSectionFields)),
  fieldValues: z.array(createInsertSchema(documentSectionFieldValues)),
});

export type SaveDocumentDetailsSchema = z.infer<
  typeof saveDocumentDetailsSchema
>;
