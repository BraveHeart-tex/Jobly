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
  },
  (table) => {
    return {
      User_id: primaryKey({ columns: [table.id], name: "User_id" }),
      email: index("email").on(table.email),
    };
  },
);

export type UserSelectModel = InferSelectModel<typeof user>;

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
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 512 }).notNull(),
    bio: text("bio"),
    website: varchar("website", { length: 512 }),
    followerCount: int("followerCount").default(0),
    industry: varchar("industry", { length: 255 }),
    address: varchar("address", { length: 512 }),
    foundedYear: varchar("foundedYear", { length: 50 }),
    employeeCount: varchar("employeeCount", { length: 50 }),
    logo: varchar("logo", { length: 512 }),
    coverImage: varchar("coverImage", { length: 512 }),
    description: text("description"),
    createdAt: datetime("createdAt", { mode: "string" }).default(sql`(now())`),
    updatedAt: datetime("updatedAt", { mode: "string" }).default(sql`(now())`),
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
    id: int("id").autoincrement().notNull(),
    companyId: int("companyId")
      .notNull()
      .references(() => company.id, {
        onDelete: "cascade",
      }),
    title: varchar("title", { length: 512 }).notNull(),
    description: text("description"),
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
    applicationCount: int("applicationCount").default(0),
    benefits: text("benefits"),
    createdAt: datetime("createdAt", { mode: "string" }).default(sql`(now())`),
    updatedAt: datetime("updatedAt", { mode: "string" }).default(sql`(now())`),
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

export type JobInsertModel = InferInsertModel<typeof job>;

export const application = mysqlTable(
  "Application",
  {
    id: int("id").autoincrement().notNull(),
    userId: int("userId")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),
    jobId: int("jobId")
      .notNull()
      .references(() => job.id),
    coverLetter: text("coverLetter"),
    resume: varchar("resume", { length: 255 }),
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
    id: int("id").autoincrement().notNull(),
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
    id: int("id").autoincrement().notNull(),
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
    updatedAt: datetime("updatedAt", { mode: "string" }).default(sql`(now())`),
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

export const coverLetter = mysqlTable(
  "CoverLetter",
  {
    id: int("id").autoincrement().notNull(),
    userId: int("userId")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),
    content: text("content").notNull(),
  },
  (table) => {
    return {
      userId: index("userId").on(table.userId),
      CoverLetter_id: primaryKey({
        columns: [table.id],
        name: "CoverLetter_id",
      }),
    };
  },
);

export const userFollowsComapny = mysqlTable(
  "UserFollowsCompany",
  {
    id: int("id").autoincrement().notNull(),
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
    id: int("id").autoincrement().notNull(),
    viewerCompanyId: int("viewerCompanyId").references(() => company.id, {
      onDelete: "cascade",
    }),
    viewedUserId: int("viewedUserId")
      .notNull()
      .references(() => user.id, {
        onDelete: "cascade",
      }),
    viewedAt: datetime("viewedAt", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      ResumeView_id: primaryKey({ columns: [table.id], name: "ResumeView_id" }),
      viewerCompanyId: index("viewerCompanyId").on(table.viewerCompanyId),
      viewedUserId: index("viewedUserId").on(table.viewedUserId),
    };
  },
);

export const userBookmarksJob = mysqlTable(
  "UserBookmarksJob",
  {
    id: int("id").autoincrement().notNull(),
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
    bookmarkedAt: datetime("bookmarkedAt", { mode: "string" }).notNull(),
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
    id: int("id").autoincrement().notNull(),
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

export const resume = mysqlTable(
  "Resume",
  {
    id: int("id").autoincrement().notNull(),
    title: varchar("title", { length: 512 }).notNull(),
    userId: int("userId")
      .references(() => user.id, { onDelete: "cascade" })
      .notNull(),
    language: varchar("language", { length: 100 }).notNull(),
    createdAt: datetime("createdAt", { mode: "string" }).default(sql`(now())`),
    updatedAt: datetime("updatedAt", { mode: "string" }).default(sql`(now())`),
  },
  (table) => {
    return {
      Resume_id: primaryKey({ columns: [table.id], name: "Resume_id" }),
      userId: index("userId").on(table.userId),
    };
  },
);

export const section = mysqlTable(
  "Section",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    displayOrder: int("displayOrder").notNull(),
  },
  (table) => {
    return {
      Section_id: primaryKey({ columns: [table.id], name: "Section_id" }),
    };
  },
);

export const field = mysqlTable(
  "Field",
  {
    id: int("id").autoincrement().notNull(),
    sectionId: int("sectionId")
      .references(() => section.id)
      .notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    dataType: varchar("dataType", { length: 100 }).notNull(),
  },
  (table) => {
    return {
      Field_id: primaryKey({ columns: [table.id], name: "Field_id" }),
      sectionId: index("sectionId").on(table.sectionId),
    };
  },
);

export const userSection = mysqlTable(
  "UserSection",
  {
    id: int("id").autoincrement().notNull(),
    resumeId: int("resumeId")
      .references(() => resume.id, {
        onDelete: "cascade",
      })
      .notNull(),
    sectionId: int("sectionId")
      .references(() => section.id)
      .notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    displayOrder: int("displayOrder").notNull(),
  },
  (table) => {
    return {
      UserSection_id: primaryKey({
        columns: [table.id],
        name: "UserSection_id",
      }),
      resumeId: index("resumeId").on(table.resumeId),
      sectionId: index("sectionId").on(table.sectionId),
    };
  },
);

export const userField = mysqlTable(
  "UserField",
  {
    id: int("id").autoincrement().notNull(),
    userSectionId: int("userSectionId")
      .references(() => userSection.id, {
        onDelete: "cascade",
      })
      .notNull(),
    fieldId: int("fieldId")
      .references(() => field.id)
      .notNull(),
    label: varchar("label", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      UserField_id: primaryKey({ columns: [table.id], name: "UserField_id" }),
      userSectionId: index("userSectionId").on(table.userSectionId),
      fieldId: index("fieldId").on(table.fieldId),
    };
  },
);
