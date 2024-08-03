import {
  type InferInsertModel,
  type InferSelectModel,
  sql,
  relations,
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
    content: text("content"),
    location: varchar("location", { length: 255 }),
    workType: mysqlEnum("workType", [
      "office",
      "remote",
      "hybrid",
      "other",
    ]).default("office"),
    salaryRange: varchar("salaryRange", { length: 50 }),
    employmentType: mysqlEnum("employmentType", [
      "full-time",
      "part-time",
      "contract",
      "internship",
      "temporary",
      "volunteer",
      "other",
    ] as const).default("full-time"),
    benefits: text("benefits"),
    createdAt: datetime("createdAt", { mode: "string" }).default(sql`(now())`),
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
