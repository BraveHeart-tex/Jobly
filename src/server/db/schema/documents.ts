import { customTimestamp, getCurrentTimestamp } from "@/server/db/utils";
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
} from "drizzle-orm";
import {
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";
import { documentSections, users } from "@/server/db/schema";

const documents = mysqlTable(
  "Documents",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    title: varchar("title", { length: 512 }).notNull(),
    userId: int("userId")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    type: mysqlEnum("type", ["resume", "cover_letter"]).notNull(),
    source: mysqlEnum("source", ["builder", "uploaded"]).notNull(),
    url: varchar("url", { length: 512 }),
    createdAt: customTimestamp("createdAt")
      .$defaultFn(() => getCurrentTimestamp())
      .notNull(),
    updatedAt: customTimestamp("updatedAt")
      .$defaultFn(() => getCurrentTimestamp())
      .notNull()
      .$onUpdate(() => getCurrentTimestamp()),
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
