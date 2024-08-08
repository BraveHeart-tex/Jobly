import { sql } from "drizzle-orm";
import {
	datetime,
	index,
	int,
	mysqlTable,
	primaryKey,
} from "drizzle-orm/mysql-core";
import { documents } from "../schema";
import companies from "./companies";

const resumeViews = mysqlTable(
	"ResumeViews",
	{
		id: int("id").primaryKey().autoincrement().notNull(),
		viewerCompanyId: int("viewerCompanyId").references(() => companies.id, {
			onDelete: "cascade",
		}),
		viewedResumeId: int("viewedResumeId")
			.notNull()
			.references(() => documents.id),
		viewedAt: datetime("viewedAt", { mode: "string" }).default(
			sql`(now())`,
		),
	},
	(table) => {
		return {
			ResumeView_id: primaryKey({
				columns: [table.id],
				name: "ResumeView_id",
			}),
			viewerCompanyId: index("viewerCompanyId").on(table.viewerCompanyId),
			viewedResumeId: index("viewedResumeId").on(table.viewedResumeId),
		};
	},
);

export default resumeViews;
