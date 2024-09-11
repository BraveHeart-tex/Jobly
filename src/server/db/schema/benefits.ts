import type { InferInsertModel } from "drizzle-orm";
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";

const benefits = mysqlTable(
  "Benefits",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    name: varchar("name", { length: 256 }).notNull().unique(),
  },
  (table) => {
    return {
      Benefit_id: primaryKey({ columns: [table.id], name: "Benefit_id" }),
      name: index("name").on(table.name),
    };
  },
);

export type BenefitInsertModel = InferInsertModel<typeof benefits>;

export default benefits;
