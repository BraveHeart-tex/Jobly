import { mysqlTable, index, primaryKey, int, text, varchar, datetime, mysqlEnum } from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";

export const user = mysqlTable(
  "User",
  {
    id: varchar("id", {
      length: 255,
    }).primaryKey(),
    email: varchar("email", {
      length: 255,
    })
      .unique()
      .notNull(),
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
    userId: varchar("user_id", {
      length: 255,
    })
      .notNull()
      .references(() => user.id),
    expiresAt: datetime("expires_at").notNull(),
  },
  (table) => {
    return {
      Session_id: primaryKey({ columns: [table.id], name: "Session_id" }),
      userId: index("user_id").on(table.userId),
    };
  },
);

export const application = mysqlTable(
  "Application",
  {
    id: int("id").autoincrement().notNull(),
    userId: int("userId")
      .notNull()
      .references(() => user.id),
    jobId: int("jobId")
      .notNull()
      .references(() => job.id),
    coverLetter: text("coverLetter"),
    resume: varchar("resume", { length: 255 }),
    status: mysqlEnum("status", ["pending", "applied", "rejected", "interview", "offer"] as const).default("applied"),
    appliedAt: datetime("appliedAt", { mode: "string" }).default(sql`(now())`),
  },
  (table) => {
    return {
      jobId: index("jobId").on(table.jobId),
      userId: index("userId").on(table.userId),
      status: index("status").on(table.status),
      Application_id: primaryKey({ columns: [table.id], name: "Application_id" }),
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

export const company = mysqlTable(
  "Company",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 512 }).notNull(),
    bio: text("bio"),
    website: varchar("website", { length: 512 }),
    followerCount: int("followerCount").default(0),
    industry: varchar("industry", { length: 256 }),
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
      .references(() => company.id),
    title: varchar("title", { length: 512 }).notNull(),
    description: text("description"),
    location: varchar("location", { length: 256 }),
    workType: mysqlEnum("workType", ["office", "remote", "hybrid", "other"]).default("office"),
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
      .references(() => job.id),
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
      .references(() => user.id),
    bio: text("bio"),
    linkedin: varchar("linkedin", { length: 256 }),
    github: varchar("github", { length: 256 }),
    portfolio: varchar("portfolio", { length: 256 }),
    image: varchar("image", { length: 512 }),
    createdAt: datetime("createdAt", { mode: "string" }).default(sql`(now())`),
    updatedAt: datetime("updatedAt", { mode: "string" }).default(sql`(now())`),
  },
  (table) => {
    return {
      userId: index("userId").on(table.userId),
      UserProfile_id: primaryKey({ columns: [table.id], name: "UserProfile_id" }),
    };
  },
);

export const education = mysqlTable(
  "Education",
  {
    id: int("id").autoincrement().notNull(),
    userProfileId: int("userProfileId")
      .notNull()
      .references(() => userProfile.id),
    institution: varchar("institution", { length: 255 }).notNull(),
    degree: varchar("degree", { length: 255 }).notNull(),
    fieldOfStudy: varchar("fieldOfStudy", { length: 255 }),
    startDate: datetime("startDate", { mode: "string" }).notNull(),
    endDate: datetime("endDate", { mode: "string" }),
    createdAt: datetime("createdAt", { mode: "string" }).default(sql`(now())`),
    updatedAt: datetime("updatedAt", { mode: "string" }).default(sql`(now())`),
  },
  (table) => {
    return {
      userProfileId: index("userProfileId").on(table.userProfileId),
      Education_id: primaryKey({ columns: [table.id], name: "Education_id" }),
    };
  },
);

export const experience = mysqlTable(
  "Experience",
  {
    id: int("id").autoincrement().notNull(),
    userProfileId: int("userProfileId")
      .notNull()
      .references(() => userProfile.id),
    description: text("description").notNull(),
    startDate: datetime("startDate", { mode: "string" }).notNull(),
    endDate: datetime("endDate", { mode: "string" }),
    createdAt: datetime("createdAt", { mode: "string" }).default(sql`(now())`),
    updatedAt: datetime("updatedAt", { mode: "string" }).default(sql`(now())`),
  },
  (table) => {
    return {
      userProfileId: index("userProfileId").on(table.userProfileId),
      Experience_id: primaryKey({ columns: [table.id], name: "Experience_id" }),
    };
  },
);

export const userSkill = mysqlTable(
  "UserSkill",
  {
    id: int("id").autoincrement().notNull(),
    userId: int("userId")
      .notNull()
      .references(() => user.id),
    skillName: varchar("skillName", { length: 100 }).notNull(),
  },
  (table) => {
    return {
      userId: index("userId").on(table.userId),
      UserSkill_id: primaryKey({ columns: [table.id], name: "UserSkill_id" }),
    };
  },
);

export const coverLetter = mysqlTable(
  "CoverLetter",
  {
    id: int("id").autoincrement().notNull(),
    userId: int("userId")
      .notNull()
      .references(() => user.id),
    content: text("content").notNull(),
  },
  (table) => {
    return {
      userId: index("userId").on(table.userId),
      CoverLetter_id: primaryKey({ columns: [table.id], name: "CoverLetter_id" }),
    };
  },
);

export const userFollowsComapny = mysqlTable(
  "UserFollowsCompany",
  {
    id: int("id").autoincrement().notNull(),
    companyId: int("companyId")
      .notNull()
      .references(() => company.id),
    userId: int("userId")
      .notNull()
      .references(() => user.id),
  },
  (table) => {
    return {
      UserFollowsCompany_id: primaryKey({ columns: [table.id], name: "UserFollowsCompany_id" }),
      userId: index("userId").on(table.userId),
      companyId: index("companyId").on(table.companyId),
    };
  },
);

export const resumeView = mysqlTable(
  "ResumeView",
  {
    id: int("id").autoincrement().notNull(),
    viewerCompanyId: int("viewerCompanyId").references(() => company.id),
    viewedUserId: int("viewedUserId")
      .notNull()
      .references(() => user.id),
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
      .references(() => user.id),
    jobId: int("jobId")
      .notNull()
      .references(() => job.id),
    bookmarkedAt: datetime("bookmarkedAt", { mode: "string" }).notNull(),
  },
  (table) => {
    return {
      UserBookmarksJob_id: primaryKey({ columns: [table.id], name: "UserBookmarksJob_id" }),
      userId: index("userId").on(table.userId),
      jobId: index("jobId").on(table.jobId),
    };
  },
);

export const userViewsJob = mysqlTable(
  "UserViewsJob",
  {
    id: int("id").autoincrement().notNull(),
    viewedUserId: int("viewedUserId")
      .notNull()
      .references(() => user.id),
    viewedJobId: int("viewedJobId")
      .notNull()
      .references(() => job.id),
  },
  (table) => {
    return {
      UserViewsJob_id: primaryKey({ columns: [table.id], name: "UserViewsJob_id" }),
      viewedUserId: index("viewedUserId").on(table.viewedUserId),
      viewedJobId: index("viewedJobId").on(table.viewedJobId),
    };
  },
);
