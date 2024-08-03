import {
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";
import documentSections from "./documentSections";
import {
  relations,
  type InferInsertModel,
  type InferSelectModel,
} from "drizzle-orm";
import documentSectionFieldValues from "./documentSectionFieldValues";

const documentSectionFields = mysqlTable(
  "DocumentSectionFields",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    sectionId: int("sectionId")
      .references(() => documentSections.id, { onDelete: "cascade" })
      .notNull(),
    fieldName: varchar("fieldName", { length: 100 }).notNull(),
    fieldType: varchar("fieldType", { length: 100 }).notNull(),
    displayOrder: int("displayOrder").notNull(),
  },
  (table) => {
    return {
      Field_id: primaryKey({ columns: [table.id], name: "Field_id" }),
      sectionId: index("sectionId").on(table.sectionId),
    };
  },
);

export const documentSectionFieldsRelations = relations(
  documentSectionFields,
  ({ one, many }) => ({
    section: one(documentSections, {
      fields: [documentSectionFields.sectionId],
      references: [documentSections.id],
    }),
    fieldValues: many(documentSectionFieldValues),
  }),
);

export type DocumentSectionField = InferSelectModel<
  typeof documentSectionFields
>;
export type DocumentSectionFieldInsertModel = InferInsertModel<
  typeof documentSectionFields
>;

export default documentSectionFields;
