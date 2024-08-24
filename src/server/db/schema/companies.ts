import { type InferInsertModel, type InferSelectModel, sql } from "drizzle-orm";
import {
  datetime,
  index,
  int,
  mysqlTable,
  primaryKey,
  text,
  varchar,
} from "drizzle-orm/mysql-core";

const companies = mysqlTable(
  "Companies",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    name: varchar("name", { length: 512 }).notNull(),
    bio: text("bio").notNull(),
    website: varchar("website", { length: 2048 }),
    industry: varchar("industry", { length: 255 }),
    address: varchar("address", { length: 512 }),
    yearOfEstablishment: varchar("yearOfEstablishment", {
      length: 4,
    }).notNull(),
    companySize: varchar("companySize", { length: 50 }).notNull(),
    logo: varchar("logo", { length: 2048 }),
    coverImage: varchar("coverImage", { length: 2048 }),
    description: varchar("description", { length: 1024 }),
    areasOfExpertise: varchar("areasOfExpertise", { length: 256 }),
    verifiedAt: datetime("verifiedAt", { mode: "string" }),
    createdAt: datetime("createdAt", { mode: "string" }).default(sql`(now())`),
    updatedAt: datetime("updatedAt", { mode: "string" })
      .default(sql`(now())`)
      .notNull()
      .$onUpdate(() => sql`(now())`),
  },
  (table) => {
    return {
      name: index("name").on(table.name),
      Company_id: primaryKey({ columns: [table.id], name: "Company_id" }),
    };
  },
);

export type CompanySelectModel = InferSelectModel<typeof companies>;
export type CompanyInsertModel = InferInsertModel<typeof companies>;

export default companies;
