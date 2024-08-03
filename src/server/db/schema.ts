import { INTERNAL_SECTION_TAGS } from "@/lib/constants";
import {
  type InferInsertModel,
  type InferSelectModel,
  relations,
  sql,
} from "drizzle-orm";
import {
  datetime,
  decimal,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  primaryKey,
  text,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "Users",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    email: varchar("email", {
      length: 255,
    })
      .unique()
      .notNull(),
    firstName: varchar("firstName", { length: 255 }).notNull(),
    lastName: varchar("lastName", { length: 255 }).notNull(),
    hashedPassword: varchar("hashedPassword", { length: 255 }).notNull(),
    role: mysqlEnum("role", ["employer", "candidate"]).notNull(),
  },
  (table) => {
    return {
      User_id: primaryKey({ columns: [table.id], name: "User_id" }),
      email: index("email").on(table.email),
    };
  },
);

export const sessions = mysqlTable(
  "Sessions",
  {
    id: varchar("id", {
      length: 255,
    }).primaryKey(),
    userId: int("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    expiresAt: datetime("expires_at").notNull(),
  },
  (table) => {
    return {
      Session_id: primaryKey({ columns: [table.id], name: "Session_id" }),
      userId: index("user_id").on(table.userId),
    };
  },
);

export const companies = mysqlTable(
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
    createdAt: datetime("createdAt", { mode: "string" }).default(sql`(now())`),
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

export const jobs = mysqlTable(
  "Jobs",
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
      Job_id: primaryKey({ columns: [table.id], name: "Job_id" }),
      title: index("title").on(table.title),
      companyId: index("companyId").on(table.companyId),
      location: index("location").on(table.location),
      workType: index("workType").on(table.workType),
      employmentType: index("employmentType").on(table.employmentType),
    };
  },
);

export const jobApplications = mysqlTable(
  "Applications",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    jobId: int("jobId")
      .notNull()
      .references(() => jobs.id),
    coverLetterId: int("coverLetterId").references(() => documents.id),
    resumeId: int("resumeId").references(() => documents.id),
    status: mysqlEnum("status", [
      "pending",
      "applied",
      "rejected",
      "interview",
      "offer",
    ] as const).default("applied"),
    appliedAt: datetime("appliedAt", { mode: "string" }).default(sql`(now())`),
  },
  (table) => {
    return {
      jobId: index("jobId").on(table.jobId),
      userId: index("userId").on(table.userId),
      status: index("status").on(table.status),
      coverLetterId: index("coverLetterId").on(table.coverLetterId),
      Application_id: primaryKey({
        columns: [table.id],
        name: "Application_id",
      }),
    };
  },
);

export const applicationRelations = relations(jobApplications, ({ one }) => ({
  job: one(jobs, {
    fields: [jobApplications.jobId],
    references: [jobs.id],
  }),
  user: one(users, {
    fields: [jobApplications.userId],
    references: [users.id],
  }),
}));

export const jobRelations = relations(jobs, ({ one }) => ({
  company: one(companies, {
    fields: [jobs.companyId],
    references: [companies.id],
  }),
}));

export const jobSkills = mysqlTable(
  "JobSkills",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    jobId: int("jobId")
      .notNull()
      .references(() => jobs.id, {
        onDelete: "cascade",
      }),
    skillName: varchar("skillName", { length: 100 }).notNull(),
  },
  (table) => {
    return {
      jobId: index("jobId").on(table.jobId),
      JobSkill_id: primaryKey({ columns: [table.id], name: "JobSkill_id" }),
    };
  },
);

export const jobSkillRelations = relations(jobSkills, ({ one }) => ({
  job: one(jobs, {
    fields: [jobSkills.jobId],
    references: [jobs.id],
  }),
}));

export const userProfiles = mysqlTable(
  "UserProfiles",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    bio: text("bio"),
    linkedin: varchar("linkedin", { length: 255 }),
    github: varchar("github", { length: 255 }),
    portfolio: varchar("portfolio", { length: 255 }),
    image: varchar("image", { length: 512 }),
    createdAt: datetime("createdAt", { mode: "string" }).default(sql`(now())`),
    updatedAt: datetime("updatedAt", { mode: "string" })
      .default(sql`(now())`)
      .notNull()
      .$onUpdate(() => sql`(now())`),
  },
  (table) => {
    return {
      userId: index("userId").on(table.userId),
      UserProfile_id: primaryKey({
        columns: [table.id],
        name: "UserProfile_id",
      }),
    };
  },
);

export const userFollowsCompany = mysqlTable(
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

export const resumeViews = mysqlTable(
  "ResumeViews",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    viewerCompanyId: int("viewerCompanyId").references(() => companies.id, {
      onDelete: "cascade",
    }),
    viewedResumeId: int("viewedResumeId")
      .notNull()
      .references(() => documents.id),
    viewedAt: datetime("viewedAt", { mode: "string" }).default(sql`(now())`),
  },
  (table) => {
    return {
      ResumeView_id: primaryKey({ columns: [table.id], name: "ResumeView_id" }),
      viewerCompanyId: index("viewerCompanyId").on(table.viewerCompanyId),
      viewedResumeId: index("viewedResumeId").on(table.viewedResumeId),
    };
  },
);

export const userBookmarksJob = mysqlTable(
  "UserBookmarksJob",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    jobId: int("jobId")
      .notNull()
      .references(() => jobs.id, {
        onDelete: "cascade",
      }),
    bookmarkedAt: datetime("bookmarkedAt", { mode: "string" }).default(
      sql`(now())`,
    ),
  },
  (table) => {
    return {
      UserBookmarksJob_id: primaryKey({
        columns: [table.id],
        name: "UserBookmarksJob_id",
      }),
      userId: index("userId").on(table.userId),
      jobId: index("jobId").on(table.jobId),
    };
  },
);

export const userViewsJob = mysqlTable(
  "UserViewsJob",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    viewerUserId: int("viewerUserId")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),
    viewedJobId: int("viewedJobId")
      .notNull()
      .references(() => jobs.id, {
        onDelete: "cascade",
      }),
    viewedAt: datetime("viewedAt", { mode: "string" }).default(sql`(now())`),
  },
  (table) => {
    return {
      UserViewsJob_id: primaryKey({
        columns: [table.id],
        name: "UserViewsJob_id",
      }),
      viewerUserId: index("viewerUserId").on(table.viewerUserId),
      viewedJobId: index("viewedJobId").on(table.viewedJobId),
    };
  },
);

export const documents = mysqlTable(
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
      Document_id: primaryKey({ columns: [table.id], name: "Document_id" }),
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

export const documentSections = mysqlTable(
  "DocumentSections",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    documentId: int("documentId")
      .references(() => documents.id, { onDelete: "cascade" })
      .notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    fieldsContainerType: mysqlEnum("fieldsContainerType", [
      "collapsible",
      "static",
    ])
      .default("static")
      .notNull(),
    displayOrder: int("displayOrder").notNull(),
    internalSectionTag: mysqlEnum("internalSectionTag", [
      INTERNAL_SECTION_TAGS.PERSONAL_DETAILS,
      INTERNAL_SECTION_TAGS.PROFESSIONAL_SUMMARY,
      INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY,
      INTERNAL_SECTION_TAGS.EDUCATION,
      INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS,
      INTERNAL_SECTION_TAGS.SKILLS,
      INTERNAL_SECTION_TAGS.CUSTOM,
      INTERNAL_SECTION_TAGS.INTERNSHIPS,
      INTERNAL_SECTION_TAGS.EXTRA_CURRICULAR_ACTIVITIES,
      INTERNAL_SECTION_TAGS.HOBBIES,
      INTERNAL_SECTION_TAGS.REFERENCES,
      INTERNAL_SECTION_TAGS.COURSES,
      INTERNAL_SECTION_TAGS.LANGUAGES,
    ]).notNull(),
    defaultName: varchar("defaultName", { length: 100 }).notNull(),
    itemCountPerContainer: int("itemCountPerContainer").default(0).notNull(),
    metadata: text("metadata"),
  },
  (table) => {
    return {
      Section_id: primaryKey({ columns: [table.id], name: "Section_id" }),
      documentId: index("documentId").on(table.documentId),
    };
  },
);

export const sectionRelations = relations(
  documentSections,
  ({ one, many }) => ({
    document: one(documents, {
      fields: [documentSections.documentId],
      references: [documents.id],
    }),
    fields: many(documentSectionFields),
  }),
);

export const documentSectionFields = mysqlTable(
  "DocumentSectionFields",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    sectionId: int("sectionId")
      .references(() => documentSections.id, { onDelete: "cascade" })
      .notNull(),
    fieldName: varchar("fieldName", { length: 100 }).notNull(),
    fieldType: varchar("fieldType", { length: 100 }).notNull(),
    displayOrder: int("displayOrder").notNull(),
  },
  (table) => {
    return {
      Field_id: primaryKey({ columns: [table.id], name: "Field_id" }),
      sectionId: index("sectionId").on(table.sectionId),
    };
  },
);

export const fieldRelations = relations(
  documentSectionFields,
  ({ one, many }) => ({
    section: one(documentSections, {
      fields: [documentSectionFields.sectionId],
      references: [documentSections.id],
    }),
    fieldValues: many(documentSectionFieldValues),
  }),
);

export const documentSectionFieldValues = mysqlTable(
  "DocumentSectionFieldValues",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    fieldId: int("fieldId")
      .references(() => documentSectionFields.id, { onDelete: "cascade" })
      .notNull(),
    value: text("value"),
  },
  (table) => {
    return {
      FieldValue_id: primaryKey({ columns: [table.id], name: "FieldValue_id" }),
      fieldId: index("fieldId").on(table.fieldId),
    };
  },
);

export const fieldValueRelations = relations(
  documentSectionFieldValues,
  ({ one }) => ({
    field: one(documentSectionFields, {
      fields: [documentSectionFieldValues.fieldId],
      references: [documentSectionFields.id],
    }),
  }),
);

export const jobTrackerApplications = mysqlTable("JobTrackerApplications", {
  id: int("id").primaryKey().autoincrement().notNull(),
  status: mysqlEnum("status", [
    "shortlist",
    "applied",
    "interview",
    "offer",
    "rejected",
  ]).notNull(),
  userId: int("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  company: varchar("company", { length: 512 }).notNull(),
  jobTitle: varchar("jobTitle", { length: 512 }).notNull(),
  location: varchar("location", { length: 512 }).notNull(),
  url: text("url"),
  salary: decimal("salary", { precision: 10, scale: 2 }),
  notes: text("notes"),
  jobDescription: text("jobDescription"),
  displayOrder: int("displayOrder").notNull(),
  createdAt: datetime("createdAt", { mode: "string" })
    .default(sql`(now())`)
    .notNull(),
  updatedAt: datetime("updatedAt", { mode: "string" })
    .default(sql`(now())`)
    .notNull()
    .$onUpdate(() => sql`(now())`),
});

export type User = InferSelectModel<typeof users>;

export type JobInsertModel = InferInsertModel<typeof jobs>;
export type Job = InferSelectModel<typeof jobs>;
export type JobEmploymentType = (typeof jobs.employmentType.enumValues)[number];
export type JobWorkType = (typeof jobs.workType.enumValues)[number];

export type Document = InferSelectModel<typeof documents>;
export type DocumentInsertModel = InferInsertModel<typeof documents>;
export type DocumentType = (typeof documents.type.enumValues)[number];

export type Section = InferSelectModel<typeof documentSections>;
export type SectionInsertModel = InferInsertModel<typeof documentSections>;

export type SectionField = InferSelectModel<typeof documentSectionFields>;
export type SectionFieldInsertModel = InferInsertModel<
  typeof documentSectionFields
>;

export type SectionFieldValue = InferSelectModel<
  typeof documentSectionFieldValues
>;
export type SectionFieldValueInsertModel = InferInsertModel<
  typeof documentSectionFieldValues
>;

export type JobTrackerApplication = InferSelectModel<
  typeof jobTrackerApplications
>;
export type JobTrackerApplicationInsertModel = InferInsertModel<
  typeof jobTrackerApplications
>;

export type JobTrackerApplicationStatus = JobTrackerApplication["status"];

export type CompanySelectModel = InferSelectModel<typeof companies>;
export type CompanyInsertModel = InferInsertModel<typeof companies>;
export type JobApplicationSelectModel = InferSelectModel<
  typeof jobApplications
>;
export type JobApplicationInsertModel = InferInsertModel<
  typeof jobApplications
>;
