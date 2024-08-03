import {
  index,
  int,
  mysqlTable,
  primaryKey,
  text,
} from "drizzle-orm/mysql-core";
import documentSectionFields from "./documentSectionFields";
import {
  relations,
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm";

const documentSectionFieldValues = mysqlTable(
  "DocumentSectionFieldValues",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    fieldId: int("fieldId")
      .references(() => documentSectionFields.id, { onDelete: "cascade" })
      .notNull(),
    value: text("value"),
  },
  (table) => {
    return {
      FieldValue_id: primaryKey({ columns: [table.id], name: "FieldValue_id" }),
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