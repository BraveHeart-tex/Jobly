import {
	type InferInsertModel,
	type InferSelectModel,
	relations,
	sql,
} from "drizzle-orm";
import {
	datetime,
	index,
	int,
	mysqlEnum,
	mysqlTable,
	primaryKey,
	varchar,
} from "drizzle-orm/mysql-core";
import documentSections from "./documentSections";
import users from "./users";

const documents = mysqlTable(
	"Documents",
	{
		id: int("id").primaryKey().autoincrement().notNull(),
		title: varchar("title", { length: 512 }).notNull(),
		userId: int("userId")
			.references(() => users.id, { onDelete: "cascade" })
			.notNull(),
		type: mysqlEnum("type", ["resume", "cover_letter"]).notNull(),
		language: varchar("language", { length: 100 }).notNull(),
		createdAt: datetime("createdAt", { mode: "string" })
			.default(sql`(now())`)
			.notNull(),
		updatedAt: datetime("updatedAt", { mode: "string" })
			.default(sql`(now())`)
			.notNull()
			.$onUpdate(() => sql`(now())`),
	},
	(table) => {
		return {
			Document_id: primaryKey({
				columns: [table.id],
				name: "Document_id",
			}),
			userId: index("userId").on(table.userId),
		};
	},
);

export const documentRelations = relations(documents, ({ one, many }) => ({
	user: one(users, {
		fields: [documents.userId],
		references: [users.id],
	}),
	sections: many(documentSections),
}));

export type DocumentSelectModel = InferSelectModel<typeof documents>;
export type DocumentInsertModel = InferInsertModel<typeof documents>;
export type DocumentType = (typeof documents.type.enumValues)[number];

export default documents;
