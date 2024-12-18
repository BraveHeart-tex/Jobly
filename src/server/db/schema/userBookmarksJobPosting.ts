import { customTimestamp, getCurrentTimestamp } from "@/server/db/utils";
import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import { users, jobPostings } from "@/server/db/schema";

const userBookmarksJobPosting = mysqlTable(
  "UserBookmarksJobPosting",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    jobPostingId: int("jobPostingId")
      .notNull()
      .references(() => jobPostings.id, {
        onDelete: "cascade",
      }),
    bookmarkedAt: customTimestamp("bookmarkedAt").$defaultFn(() =>
      getCurrentTimestamp(),
    ),
  },
  (table) => {
    return {
      UserBookmarksJob_id: primaryKey({
        columns: [table.id],
        name: "UserBookmarksJobPosting_id",
      }),
      userId: index("userId").on(table.userId),
      jobId: index("jobId").on(table.jobPostingId),
    };
  },
);

export default userBookmarksJobPosting;
