import type {
  Document,
  Section,
  SectionField,
  SectionFieldValue,
  SectionInsertModel,
} from "@/server/db/schema";
import type * as schema from "@/server/db/schema";
import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { MySqlTransaction } from "drizzle-orm/mysql-core";
import type {
  MySql2PreparedQueryHKT,
  MySql2QueryResultHKT,
} from "drizzle-orm/mysql2";
import type { LucideIcon } from "lucide-react";
import type { EmployeeRoute, EmployerRoute } from "./routes";

export type NavigationMenuItem = {
  triggerLabel: string;
  linkItems: NavigationMenuItemLink[];
};

export type NavigationMenuItemLink = {
  title: string;
  href: EmployeeRoute | EmployerRoute;
  description: string;
  icon: LucideIcon;
};

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export type MakeFieldsRequired<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

export type DocumentBuilderConfig = {
  document: Document;
  sections: Section[];
  fields: SectionField[];
  fieldValues: SectionFieldValue[];
};

export type Trx = MySqlTransaction<
  MySql2QueryResultHKT,
  MySql2PreparedQueryHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;

export type InferValueTypeFromConst<T> = T[keyof T];

type SectionBase = Omit<
  SectionInsertModel,
  "fieldsContainerType" | "itemCountPerContainer"
>;

type SectionNonCollapsible = SectionBase & {
  fieldsContainerType?: "static";
  itemCountPerContainer?: never;
};

type SectionCollapsible = SectionBase & {
  fieldsContainerType: "collapsible";
  itemCountPerContainer: number;
};

export type MappedSectionInsertModel =
  | SectionNonCollapsible
  | SectionCollapsible;
