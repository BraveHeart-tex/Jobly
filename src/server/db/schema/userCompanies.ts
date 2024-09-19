import { type InferInsertModel, type InferSelectModel, sql } from "drizzle-orm";
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
} from "drizzle-orm/mysql-core";
import companies from "./companies";
import users from "./users";

const userCompanies = mysqlTable(
  "UserCompanies",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    companyId: int("companyId")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("createdAt", { mode: "string" }).default(sql`(now())`),
  },
  (table) => {
    return {
      UserCompany_id: primaryKey({
        columns: [table.id],
        name: "UserCompany_id",
      }),
      userId: index("userId").on(table.userId),
      companyId: index("companyId").on(table.companyId),
    };
  },
);

export type UserCompany = InferSelectModel<typeof userCompanies>;
export type UserCompanyInsertModel = InferInsertModel<typeof userCompanies>;

export default userCompanies;
