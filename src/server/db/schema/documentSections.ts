import { INTERNAL_SECTION_TAGS } from "@/lib/constants";
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from "drizzle-orm";
import {
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  varchar,
} from "drizzle-orm/mysql-core";
import { documents, documentSectionFields } from "@/server/db/schema";

export const documentSections = mysqlTable(
  "DocumentSections",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    documentId: int("documentId")
      .references(() => documents.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    fieldsContainerType: mysqlEnum("fieldsContainerType", [
      "collapsible",
      "static",
    ])
      .default("static")
      .notNull(),
    displayOrder: int("displayOrder").notNull(),
    internalSectionTag: mysqlEnum("internalSectionTag", [
      INTERNAL_SECTION_TAGS.PERSONAL_DETAILS,
      INTERNAL_SECTION_TAGS.PROFESSIONAL_SUMMARY,
      INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY,
      INTERNAL_SECTION_TAGS.EDUCATION,
      INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS,
      INTERNAL_SECTION_TAGS.SKILLS,
      INTERNAL_SECTION_TAGS.CUSTOM,
      INTERNAL_SECTION_TAGS.INTERNSHIPS,
      INTERNAL_SECTION_TAGS.EXTRA_CURRICULAR_ACTIVITIES,
      INTERNAL_SECTION_TAGS.HOBBIES,
      INTERNAL_SECTION_TAGS.REFERENCES,
      INTERNAL_SECTION_TAGS.COURSES,
      INTERNAL_SECTION_TAGS.LANGUAGES,
    ]).notNull(),
    defaultName: varchar("defaultName", { length: 100 }).notNull(),
    itemCountPerContainer: int("itemCountPerContainer").default(0).notNull(),
    metadata: text("metadata"),
  },
  (table) => {
    return {
      Section_id: primaryKey({ columns: [table.id], name: "Section_id" }),
      documentId: index("documentId").on(table.documentId),
    };
  },
);

export const documentSectionRelations = relations(
  documentSections,
  ({ one, many }) => ({
    document: one(documents, {
      fields: [documentSections.documentId],
      references: [documents.id],
    }),
    fields: many(documentSectionFields),
  }),
);

export type DocumentSection = InferSelectModel<typeof documentSections>;
export type DocumentSectionInsertModel = InferInsertModel<
  typeof documentSections
>;

export default documentSections;
