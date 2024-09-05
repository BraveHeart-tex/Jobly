import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { index, int, mysqlTable, primaryKey } from "drizzle-orm/mysql-core";
import brandingAssets from "./brandingAssets";
import companies from "./companies";

const companyBrandingAssets = mysqlTable(
  "CompanyBrandingAssets",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    companyId: int("companyId")
      .references(() => companies.id)
      .notNull(),
    brandingAssetId: int("brandingAssetId")
      .references(() => brandingAssets.id)
      .notNull(),
  },
  (table) => {
    return {
      CompanyBrandingAsset_id: primaryKey({
        columns: [table.id],
        name: "CompanyBrandingAsset_id",
      }),
      companyId: index("companyId").on(table.companyId),
      brandingAssetId: index("brandingAssetId").on(table.brandingAssetId),
    };
  },
);

export type CompanyBrandingAssetSelectModel = InferSelectModel<
  typeof companyBrandingAssets
>;
export type CompanyBrandingAssetInsertModel = InferInsertModel<
  typeof companyBrandingAssets
>;

export default companyBrandingAssets;
