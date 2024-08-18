import type * as schema from "@/server/db/schema";
import type { DocumentSectionFieldValue } from "@/server/db/schema/documentSectionFieldValues";
import type { DocumentSectionField } from "@/server/db/schema/documentSectionFields";
import type {
  DocumentSection,
  DocumentSectionInsertModel,
} from "@/server/db/schema/documentSections";
import type { DocumentSelectModel } from "@/server/db/schema/documents";
import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { MySqlTransaction } from "drizzle-orm/mysql-core";
import type {
  MySql2PreparedQueryHKT,
  MySql2QueryResultHKT,
} from "drizzle-orm/mysql2";
import type { LucideIcon } from "lucide-react";
import type { CandidateRoute, EmployerRoute } from "./routes";

export interface NavigationMenuItem {
  triggerLabel: string;
  linkItems: NavigationMenuItemLink[];
}

export interface NavigationMenuItemLink {
  title: string;
  href: CandidateRoute | EmployerRoute;
  description: string;
  icon: LucideIcon;
}

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export type MakeFieldsRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export type DocumentBuilderConfig = {
  document: DocumentSelectModel;
  sections: DocumentSection[];
  fields: DocumentSectionField[];
  fieldValues: DocumentSectionFieldValue[];
};

export type Trx = MySqlTransaction<
  MySql2QueryResultHKT,
  MySql2PreparedQueryHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;

export type InferValueTypeFromConst<T> = T[keyof T];

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
