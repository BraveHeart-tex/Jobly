import { APP_NAME } from "@/lib/constants";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import type { DocumentSection } from "@/server/db/schema/documentSections";
import type { DocumentSelectModel } from "@/server/db/schema/documents";
import Dexie, { type EntityTable } from "dexie";

const appDb = new Dexie(`${APP_NAME}LocalDatabase`) as Dexie & {
  documents: EntityTable<DocumentSelectModel, "id">;
  documentSections: EntityTable<DocumentSection, "id">;
  documentSectionFields: EntityTable<DocumentSectionField, "id">;
};

appDb.version(1).stores({
  documents: "++id, userId, type, source, createdAt, updatedAt",
  documentSections: "++id, documentId, name, internalSectionTag",
  documentSectionFields: "++id, sectionId, fieldName",
});

export default appDb;
