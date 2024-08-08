import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import companies from "./companies";
import users from "./users";

const userFollowsCompany = mysqlTable(
	"UserFollowsCompany",
	{
		id: int("id").primaryKey().autoincrement().notNull(),
		companyId: int("companyId")
			.notNull()
			.references(() => companies.id, {
				onDelete: "cascade",
			}),
		userId: int("userId")
			.notNull()
			.references(() => users.id, {
				onDelete: "cascade",
			}),
	},
	(table) => {
		return {
			UserFollowsCompany_id: primaryKey({
				columns: [table.id],
				name: "UserFollowsCompany_id",
			}),
			userId: index("userId").on(table.userId),
			companyId: index("companyId").on(table.companyId),
		};
	},
);

export default userFollowsCompany;
