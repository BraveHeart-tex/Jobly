import { EMPLOYMENT_TYPES, WORK_TYPES } from "@/lib/constants";
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
  text,
  varchar,
} from "drizzle-orm/mysql-core";
import { companies, jobPostingSkills, users } from "@/server/db/schema";

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
    workType: mysqlEnum("workType", WORK_TYPES).default("office").notNull(),
    salaryRange: varchar("salaryRange", { length: 50 }),
    postingContent: text("postingContent").notNull(),
    employmentType: mysqlEnum("employmentType", EMPLOYMENT_TYPES)
      .default("full-time")
      .notNull(),
    status: mysqlEnum("status", ["draft", "published"]).notNull(),
    postedAt: customTimestamp("postedAt")
      .$defaultFn(() => getCurrentTimestamp())
      .notNull(),
    createdUserId: int("createdUserId")
      .references(() => users.id)
      .notNull(),
    expiresAt: customTimestamp("expiresAt").notNull(),
    updatedAt: customTimestamp("updatedAt")
      .$defaultFn(() => getCurrentTimestamp())
      .notNull()
      .$onUpdate(() => getCurrentTimestamp()),
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

export const jobPostingsRelations = relations(jobPostings, ({ one, many }) => ({
  company: one(companies, {
    fields: [jobPostings.companyId],
    references: [companies.id],
  }),
  jobPostingSkills: many(jobPostingSkills),
}));

export type JobPostingInsertModel = InferInsertModel<typeof jobPostings>;
export type JobPostingSelectModel = InferSelectModel<typeof jobPostings>;
export type JobPostingEmploymentType =
  (typeof jobPostings.employmentType.enumValues)[number];
export type JobPostingWorkType =
  (typeof jobPostings.workType.enumValues)[number];

export default jobPostings;
