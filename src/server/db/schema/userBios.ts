import { users } from "@/server/db/schema";
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

const userBios = mysqlTable("UserBios", {
  id: int("id").primaryKey().autoincrement().notNull(),
  userId: int("userId")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  bio: varchar("bio", {
    length: 2600,
  }).notNull(),
});

export const userBiosRelations = relations(userBios, ({ one }) => ({
  user: one(users, {
    fields: [userBios.userId],
    references: [users.id],
  }),
}));

export type UserBio = InferSelectModel<typeof userBios>;
export type UserBioInsertModel = InferInsertModel<typeof userBios>;

export default userBios;
