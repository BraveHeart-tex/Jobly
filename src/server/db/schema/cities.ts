import {
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";
import countries from "./countries";
import { type InferSelectModel, relations } from "drizzle-orm";

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

export const cityRelations = relations(cities, ({ one }) => ({
  country: one(countries, {
    fields: [cities.countryId],
    references: [countries.id],
  }),
}));

export type City = InferSelectModel<typeof cities>;

export default cities;
