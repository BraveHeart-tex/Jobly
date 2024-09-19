import { customTimestamp, getCurrentTimestamp } from "@/server/db/utils";
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  text,
  varchar,
} from "drizzle-orm/mysql-core";
import users from "./users";

const userProfiles = mysqlTable(
  "UserProfiles",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    bio: text("bio"),
    linkedin: varchar("linkedin", { length: 255 }),
    github: varchar("github", { length: 255 }),
    portfolio: varchar("portfolio", { length: 255 }),
    image: varchar("image", { length: 512 }),
    createdAt: customTimestamp("createdAt").$defaultFn(() =>
      getCurrentTimestamp(),
    ),
    updatedAt: customTimestamp("updatedAt")
      .$defaultFn(() => getCurrentTimestamp())
      .notNull()
      .$onUpdate(() => getCurrentTimestamp()),
  },
  (table) => {
    return {
      userId: index("userId").on(table.userId),
      UserProfile_id: primaryKey({
        columns: [table.id],
        name: "UserProfile_id",
      }),
    };
  },
);

export default userProfiles;
