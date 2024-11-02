import { jobPostings, users } from "@/server/db/schema";
import { customTimestamp, getCurrentTimestamp } from "@/server/db/utils";
import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";

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
    viewedAt: customTimestamp("viewedAt").$defaultFn(() =>
      getCurrentTimestamp(),
    ),
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
