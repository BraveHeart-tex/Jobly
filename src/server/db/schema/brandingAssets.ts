import { type InferInsertModel, type InferSelectModel, sql } from "drizzle-orm";
import {
  datetime,
  index,
  int,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";

const brandingAssets = mysqlTable(
  "BrandingAssets",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    fileUrl: varchar("fileUrl", { length: 2048 }).notNull(),
    createdAt: datetime("createdAt", { mode: "string" }).default(sql`(now())`),
    createdBy: int("createdBy").notNull(),
    updatedAt: datetime("updatedAt", { mode: "string" })
      .default(sql`(now())`)
      .notNull()
      .$onUpdate(() => sql`(now())`),
    updatedBy: int("updatedBy").notNull(),
  },
  (table) => {
    return {
      BrandingAsset_id: primaryKey({
        columns: [table.id],
        name: "BrandingAsset_id",
      }),
      createdBy: index("createdBy").on(table.createdBy),
      updatedBy: index("updatedBy").on(table.updatedBy),
    };
  },
);

export type BrandAssetSelectModel = InferSelectModel<typeof brandingAssets>;
export type BrandAssetInsertModel = InferInsertModel<typeof brandingAssets>;

export default brandingAssets;
