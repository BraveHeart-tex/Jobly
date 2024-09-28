import { users } from "@/server/db/schema";
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from "drizzle-orm";
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";

export const MAX_USER_BIO_LENGTH = 2600;

const userBios = mysqlTable(
  "UserBios",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .references(() => users.id, {
        onDelete: "cascade",
      })
      .notNull(),
    bio: varchar("bio", {
      length: MAX_USER_BIO_LENGTH,
    }).notNull(),
  },
  (table) => {
    return {
      UserBio_id: primaryKey({
        columns: [table.id],
        name: "UserBio_id",
      }),
      userId: index("userId").on(table.userId),
    };
  },
);

export const userBiosRelations = relations(userBios, ({ one }) => ({
  user: one(users, {
    fields: [userBios.userId],
    references: [users.id],
  }),
}));

export type UserBio = InferSelectModel<typeof userBios>;
export type UserBioInsertModel = InferInsertModel<typeof userBios>;

export default userBios;
