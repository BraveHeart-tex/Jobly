import { sql } from "drizzle-orm";
import {
  index,
  int,
  mysqlTable,
  primaryKey,
  timestamp,
} from "drizzle-orm/mysql-core";
import jobPostings from "./jobPostings";
import users from "./users";

const userViewsJobPosting = mysqlTable(
  "UserViewsJobPosting",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    viewerUserId: int("viewerUserId")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    viewedJobPostingId: int("viewedJobPostingId")
      .notNull()
      .references(() => jobPostings.id, {
        onDelete: "cascade",
      }),
    viewedAt: timestamp("viewedAt", { mode: "string" }).default(sql`(now())`),
  },
  (table) => {
    return {
      UserViewsJob_id: primaryKey({
        columns: [table.id],
        name: "UserViewsJob_id",
      }),
      viewerUserId: index("viewerUserId").on(table.viewerUserId),
      viewedJobId: index("viewedJobId").on(table.viewedJobPostingId),
    };
  },
);

export default userViewsJobPosting;
