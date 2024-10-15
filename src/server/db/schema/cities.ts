import {
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";
import countries from "./countries";

const cities = mysqlTable(
  "Cities",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    countryId: int("countryId")
      .references(() => countries.id, {
        onDelete: "cascade",
      })
      .notNull(),
    name: varchar("name", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      City_id: primaryKey({ columns: [table.id], name: "City_id" }),
      countryId: index("countryId").on(table.countryId),
      name: index("name").on(table.name),
    };
  },
);

export default cities;
