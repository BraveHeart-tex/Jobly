import { document, field, fieldValue, section } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const saveDocumentDetailsSchema = z.object({
  document: createInsertSchema(document),
  sections: z.array(createInsertSchema(section)),
  fields: z.array(createInsertSchema(field)),
  fieldValues: z.array(createInsertSchema(fieldValue)),
});

export type SaveDocumentDetailsSchema = z.infer<
  typeof saveDocumentDetailsSchema
>;
