import type {
  Document,
  Section,
  SectionField,
  SectionFieldValue,
} from "@/server/db/schema";
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
