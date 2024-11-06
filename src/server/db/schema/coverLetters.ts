import documents from "@/server/db/schema/documents";
import { customTimestamp } from "@/server/db/utils";
import { relations } from "drizzle-orm";
import { int, mysqlTable, text } from "drizzle-orm/mysql-core";

const coverLetters = mysqlTable("CoverLetters", {
  id: int("id").primaryKey().autoincrement().notNull(),
  documentId: int("documentId")
    .notNull()
    .references(() => documents.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  lastUpdated: customTimestamp("lastUpdated"),
});

export const coverLetterRelations = relations(coverLetters, ({ one }) => ({
  document: one(documents, {
    fields: [coverLetters.documentId],
    references: [documents.id],
  }),
}));

export default coverLetters;
