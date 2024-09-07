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
  text,
  varchar,
} from "drizzle-orm/mysql-core";
import companies from "./companies";

const jobPostings = mysqlTable(
  "JobPostings",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    companyId: int("companyId")
      .notNull()
      .references(() => companies.id, {
        onDelete: "cascade",
      }),
    title: varchar("title", { length: 512 }).notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    workType: mysqlEnum("workType", ["office", "remote", "hybrid", "other"])
      .default("office")
      .notNull(),
    salaryRange: varchar("salaryRange", { length: 50 }),
    postingContent: text("postingContent").notNull(),
    employmentType: mysqlEnum("employmentType", [
      "full-time",
      "part-time",
      "contract",
      "internship",
      "temporary",
      "volunteer",
      "other",
    ])
      .default("full-time")
      .notNull(),
    status: mysqlEnum("status", ["draft", "published"]).notNull(),
    postedAt: datetime("postedAt", { mode: "string" }).default(sql`(now())`),
    expiresAt: datetime("expiresAt", { mode: "string" }).notNull(),
    updatedAt: datetime("updatedAt", { mode: "string" })
      .default(sql`(now())`)
      .notNull()
      .$onUpdate(() => sql`(now())`),
  },
  (table) => {
    return {
      Job_id: primaryKey({ columns: [table.id], name: "JobPosting_id" }),
      title: index("title").on(table.title),
      companyId: index("companyId").on(table.companyId),
      location: index("location").on(table.location),
      workType: index("workType").on(table.workType),
      employmentType: index("employmentType").on(table.employmentType),
    };
  },
);

export const jobPostingsRelations = relations(jobPostings, ({ one }) => ({
  company: one(companies, {
    fields: [jobPostings.companyId],
    references: [companies.id],
  }),
}));

export type JobPostingInsertModel = InferInsertModel<typeof jobPostings>;
export type JobPosting = InferSelectModel<typeof jobPostings>;
export type JobPostingEmploymentType =
  (typeof jobPostings.employmentType.enumValues)[number];
export type JobPostingWorkType =
  (typeof jobPostings.workType.enumValues)[number];

export default jobPostings;
