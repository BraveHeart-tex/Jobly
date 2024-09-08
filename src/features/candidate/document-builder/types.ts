import type { DocumentSectionFieldValue } from "@/server/db/schema/documentSectionFieldValues";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import type {
  DocumentSection,
  DocumentSectionInsertModel,
} from "@/server/db/schema/documentSections";
import type { DocumentSelectModel } from "@/server/db/schema/documents";

export type DocumentBuilderConfig = {
  document: DocumentSelectModel;
  sections: DocumentSection[];
  fields: DocumentSectionField[];
  fieldValues: DocumentSectionFieldValue[];
};

type SectionBase = Omit<
  DocumentSectionInsertModel,
  "fieldsContainerType" | "itemCountPerContainer"
>;

interface SectionNonCollapsible extends SectionBase {
  fieldsContainerType?: "static";
  itemCountPerContainer?: never;
}

interface SectionCollapsible extends SectionBase {
  fieldsContainerType: "collapsible";
  itemCountPerContainer: number;
}

export type MappedSectionInsertModel =
  | SectionNonCollapsible
  | SectionCollapsible;
