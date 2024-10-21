import documentSectionFields from "@/server/db/schema/documentSectionFields";
import { encryptedTextWithDerivedKey } from "@/server/db/utils";
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from "drizzle-orm";
import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";

const documentSectionFieldValues = mysqlTable(
  "DocumentSectionFieldValues",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    fieldId: int("fieldId")
      .references(() => documentSectionFields.id, { onDelete: "cascade" })
      .notNull(),
    value: encryptedTextWithDerivedKey("value").notNull(),
  },
  (table) => {
    return {
      FieldValue_id: primaryKey({
        columns: [table.id],
        name: "FieldValue_id",
      }),
      fieldId: index("fieldId").on(table.fieldId),
    };
  },
);

export const documentSectionFieldValueRelations = relations(
  documentSectionFieldValues,
  ({ one }) => ({
    field: one(documentSectionFields, {
      fields: [documentSectionFieldValues.fieldId],
      references: [documentSectionFields.id],
    }),
  }),
);

export type DocumentSectionFieldValue = InferSelectModel<
  typeof documentSectionFieldValues
>;
export type DocumentSectionFieldValueInsertModel = InferInsertModel<
  typeof documentSectionFieldValues
>;

export default documentSectionFieldValues;
