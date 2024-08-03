import { sql } from "drizzle-orm";
import {
  datetime,
  index,
  int,
  mysqlTable,
  primaryKey,
} from "drizzle-orm/mysql-core";
import users from "./users";
import jobPostings from "./jobPostings";

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
    viewedAt: datetime("viewedAt", { mode: "string" }).default(sql`(now())`),
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
