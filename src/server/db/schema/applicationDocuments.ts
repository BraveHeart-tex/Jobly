import documents from "@/server/db/schema/documents";
import jobApplications from "@/server/db/schema/jobApplications";
import { relations } from "drizzle-orm";
import { mysqlTable, int, index } from "drizzle-orm/mysql-core";

const applicationDocuments = mysqlTable(
  "ApplicationDocuments",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    applicationId: int("applicationId")
      .notNull()
      .references(() => jobApplications.id, { onDelete: "cascade" }),
    documentId: int("documentId")
      .notNull()
      .references(() => documents.id, { onDelete: "cascade" }),
  },
  (table) => ({
    applicationId: index("applicationId").on(table.applicationId),
    documentId: index("documentId").on(table.documentId),
  }),
);

export const applicationDocumentRelations = relations(
  applicationDocuments,
  ({ one }) => ({
    application: one(jobApplications, {
      fields: [applicationDocuments.applicationId],
      references: [jobApplications.id],
    }),
    document: one(documents, {
      fields: [applicationDocuments.documentId],
      references: [documents.id],
    }),
  }),
);

export default applicationDocuments;
