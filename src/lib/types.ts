import type { CandidateRoute, EmployerRoute } from "@/lib/routes";
import type { appRouter } from "@/server/api/root";
import type * as schema from "@/server/db/schema";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { MySqlTransaction } from "drizzle-orm/mysql-core";
import type {
  MySql2PreparedQueryHKT,
  MySql2QueryResultHKT,
} from "drizzle-orm/mysql2";
import type { LucideIcon } from "lucide-react";

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

export type Transaction = MySqlTransaction<
  MySql2QueryResultHKT,
  MySql2PreparedQueryHKT,
  typeof schema,
  ExtractTablesWithRelations<typeof schema>
>;

export type InferValueTypeFromConst<T> = T[keyof T];

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export type AppRouter = typeof appRouter;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export type Nullable<T> = T | null;

export type ValueOf<T> = T[keyof T];

export interface JobListingItem {
  id: number;
  companyId: number;
  title: string;
  location: string;
  workType: string;
  salaryRange?: string | null;
  postingContent: string;
  employmentType: string;
  status: string;
  postedAt: string;
  createdUserId: number;
  expiresAt: string;
  updatedAt: string;
  company: { name: string; logo?: string | null };
  userViewedJob: number;
  userBookmarkedJob?: number | null;
}
