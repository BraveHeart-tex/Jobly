import { type InferInsertModel, type InferSelectModel, sql } from "drizzle-orm";
import {
	datetime,
	index,
	int,
	mysqlTable,
	primaryKey,
	text,
	varchar,
} from "drizzle-orm/mysql-core";

const companies = mysqlTable(
	"Companies",
	{
		id: int("id").primaryKey().autoincrement().notNull(),
		name: varchar("name", { length: 512 }).notNull(),
		bio: text("bio"),
		website: varchar("website", { length: 512 }),
		industry: varchar("industry", { length: 255 }),
		address: varchar("address", { length: 512 }),
		foundedYear: varchar("foundedYear", { length: 50 }),
		employeeCount: varchar("employeeCount", { length: 50 }),
		logo: varchar("logo", { length: 512 }),
		coverImage: varchar("coverImage", { length: 512 }),
		description: text("description"),
		createdAt: datetime("createdAt", { mode: "string" }).default(
			sql`(now())`,
		),
		updatedAt: datetime("updatedAt", { mode: "string" })
			.default(sql`(now())`)
			.notNull()
			.$onUpdate(() => sql`(now())`),
	},
	(table) => {
		return {
			name: index("name").on(table.name),
			Company_id: primaryKey({ columns: [table.id], name: "Company_id" }),
		};
	},
);

export type CompanySelectModel = InferSelectModel<typeof companies>;
export type CompanyInsertModel = InferInsertModel<typeof companies>;

export default companies;
