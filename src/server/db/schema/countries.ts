import { type InferSelectModel, relations } from "drizzle-orm";
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";
import cities from "./cities";

const countries = mysqlTable(
  "Countries",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      Country_id: primaryKey({ columns: [table.id], name: "Country_id" }),
      name: index("name").on(table.name),
    };
  },
);

export const countryRelations = relations(countries, ({ many }) => ({
  cities: many(cities),
}));

export type Country = InferSelectModel<typeof countries>;

export default countries;
