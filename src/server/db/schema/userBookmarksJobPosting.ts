import { sql } from "drizzle-orm";
import {
	datetime,
	index,
	int,
	mysqlTable,
	primaryKey,
} from "drizzle-orm/mysql-core";
import jobPostings from "./jobPostings";
import users from "./users";

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
		bookmarkedAt: datetime("bookmarkedAt", { mode: "string" }).default(
			sql`(now())`,
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
