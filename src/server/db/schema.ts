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

export const user = mysqlTable(
  "User",
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

export const session = mysqlTable(
  "Session",
  {
    id: varchar("id", {
      length: 255,
    }).primaryKey(),
    userId: int("user_id")
      .notNull()
      .references(() => user.id, {
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

export const company = mysqlTable(
  "Company",
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

export const job = mysqlTable(
  "Job",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    companyId: int("companyId")
      .notNull()
      .references(() => company.id, {
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

export const application = mysqlTable(
  "Application",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),
    jobId: int("jobId")
      .notNull()
      .references(() => job.id),
    coverLetterId: int("coverLetterId").references(() => document.id),
    resumeId: int("resumeId").references(() => document.id),
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

export const applicationRelations = relations(application, ({ one }) => ({
  job: one(job, {
    fields: [application.jobId],
    references: [job.id],
  }),
  user: one(user, {
    fields: [application.userId],
    references: [user.id],
  }),
}));

export const jobRelations = relations(job, ({ one }) => ({
  company: one(company, {
    fields: [job.companyId],
    references: [company.id],
  }),
}));

export const jobSkill = mysqlTable(
  "JobSkill",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    jobId: int("jobId")
      .notNull()
      .references(() => job.id, {
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

export const jobSkillRelations = relations(jobSkill, ({ one }) => ({
  job: one(job, {
    fields: [jobSkill.jobId],
    references: [job.id],
  }),
}));

export const userProfile = mysqlTable(
  "UserProfile",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    userId: int("userId")
      .notNull()
      .references(() => user.id, {
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
      .references(() => company.id, {
        onDelete: "cascade",
      }),
    userId: int("userId")
      .notNull()
      .references(() => user.id, {
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

export const resumeView = mysqlTable(
  "ResumeView",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    viewerCompanyId: int("viewerCompanyId").references(() => company.id, {
      onDelete: "cascade",
    }),
    viewedResumeId: int("viewedResumeId")
      .notNull()
      .references(() => document.id),
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
      .references(() => user.id, {
        onDelete: "cascade",
      }),
    jobId: int("jobId")
      .notNull()
      .references(() => job.id, {
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
      .references(() => user.id, {
        onDelete: "cascade",
      }),
    viewedJobId: int("viewedJobId")
      .notNull()
      .references(() => job.id, {
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

export const document = mysqlTable(
  "Document",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    title: varchar("title", { length: 512 }).notNull(),
    userId: int("userId")
      .references(() => user.id, { onDelete: "cascade" })
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

export const documentRelations = relations(document, ({ one, many }) => ({
  user: one(user, {
    fields: [document.userId],
    references: [user.id],
  }),
  sections: many(section),
}));

export const section = mysqlTable(
  "Section",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    documentId: int("documentId")
      .references(() => document.id, { onDelete: "cascade" })
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

export const sectionRelations = relations(section, ({ one, many }) => ({
  document: one(document, {
    fields: [section.documentId],
    references: [document.id],
  }),
  fields: many(field),
}));

export const field = mysqlTable(
  "Field",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    sectionId: int("sectionId")
      .references(() => section.id, { onDelete: "cascade" })
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

export const fieldRelations = relations(field, ({ one, many }) => ({
  section: one(section, {
    fields: [field.sectionId],
    references: [section.id],
  }),
  fieldValues: many(fieldValue),
}));

export const fieldValue = mysqlTable(
  "FieldValue",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    fieldId: int("fieldId")
      .references(() => field.id, { onDelete: "cascade" })
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

export const fieldValueRelations = relations(fieldValue, ({ one }) => ({
  field: one(field, {
    fields: [fieldValue.fieldId],
    references: [field.id],
  }),
}));

export const jobTrackerApplications = mysqlTable("JobTrackerApplication", {
  id: int("id").primaryKey().autoincrement().notNull(),
  status: mysqlEnum("status", [
    "shortlist",
    "applied",
    "interview",
    "offer",
    "rejected",
  ]).notNull(),
  userId: int("userId")
    .references(() => user.id, { onDelete: "cascade" })
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

export type User = InferSelectModel<typeof user>;

export type JobInsertModel = InferInsertModel<typeof job>;
export type Job = InferSelectModel<typeof job>;
export type JobEmploymentType = (typeof job.employmentType.enumValues)[number];
export type JobWorkType = (typeof job.workType.enumValues)[number];

export type Document = InferSelectModel<typeof document>;
export type DocumentInsertModel = InferInsertModel<typeof document>;
export type DocumentType = (typeof document.type.enumValues)[number];

export type Section = InferSelectModel<typeof section>;
export type SectionInsertModel = InferInsertModel<typeof section>;

export type SectionField = InferSelectModel<typeof field>;
export type SectionFieldInsertModel = InferInsertModel<typeof field>;

export type SectionFieldValue = InferSelectModel<typeof fieldValue>;
export type SectionFieldValueInsertModel = InferInsertModel<typeof fieldValue>;

export type JobTrackerApplication = InferSelectModel<
  typeof jobTrackerApplications
>;
export type JobTrackerApplicationInsertModel = InferInsertModel<
  typeof jobTrackerApplications
>;

export type JobTrackerApplicationStatus = JobTrackerApplication["status"];
