import {
  datetime,
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";
import { users } from "../schema";

const sessions = mysqlTable(
  "Sessions",
  {
    id: varchar("id", {
      length: 255,
    }).primaryKey(),
    userId: int("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    expiresAt: datetime("expires_at").notNull(),
  },
  (table) => {
    return {
      Session_id: primaryKey({ columns: [table.id], name: "Session_id" }),
      userId: index("user_id").on(table.userId),
    };
  },
);

export default sessions;
