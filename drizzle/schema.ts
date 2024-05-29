import { mysqlTable, index, primaryKey, int, text, varchar, datetime, tinyint } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const application = mysqlTable(
  "Application",
  {
    id: int("id").autoincrement().notNull(),
    userId: int("userId"),
    jobId: int("jobId").notNull(),
    coverLetter: text("coverLetter"),
    resume: varchar("resume", { length: 255 }),
    status: varchar("status", { length: 50 }).default("pending"),
    appliedAt: datetime("appliedAt", { mode: "string" }).default(sql`(now())`),
  },
  (table) => {
    return {
      jobId: index("jobId").on(table.jobId),
      Application_id: primaryKey({ columns: [table.id], name: "Application_id" }),
    };
  },
);

export const company = mysqlTable(
  "Company",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    website: varchar("website", { length: 100 }),
    industry: varchar("industry", { length: 100 }),
    location: varchar("location", { length: 100 }),
    logo: varchar("logo", { length: 500 }),
    description: text("description"),
    createdAt: datetime("createdAt", { mode: "string" }).default(sql`(now())`),
    updatedAt: datetime("updatedAt", { mode: "string" }).default(sql`(now())`),
  },
  (table) => {
    return {
      Company_id: primaryKey({ columns: [table.id], name: "Company_id" }),
    };
  },
);

export const job = mysqlTable(
  "Job",
  {
    id: int("id").autoincrement().notNull(),
    companyId: int("companyId").notNull(),
    title: varchar("title", { length: 100 }).notNull(),
    description: text("description"),
    location: varchar("location", { length: 100 }),
    salaryRange: varchar("salaryRange", { length: 50 }),
    employmentType: varchar("employmentType", { length: 50 }),
    isAnonymous: tinyint("isAnonymous").default(0),
    createdAt: datetime("createdAt", { mode: "string" }).default(sql`(now())`),
    updatedAt: datetime("updatedAt", { mode: "string" }).default(sql`(now())`),
  },
  (table) => {
    return {
      companyId: index("companyId").on(table.companyId),
      Job_id: primaryKey({ columns: [table.id], name: "Job_id" }),
    };
  },
);

export const jobSkill = mysqlTable(
  "JobSkill",
  {
    id: int("id").autoincrement().notNull(),
    hobId: int("hobId").notNull(),
    skillName: varchar("skillName", { length: 100 }).notNull(),
  },
  (table) => {
    return {
      hobId: index("hobId").on(table.hobId),
      JobSkill_id: primaryKey({ columns: [table.id], name: "JobSkill_id" }),
    };
  },
);

export const userProfile = mysqlTable(
  "UserProfile",
  {
    id: int("id").autoincrement().notNull(),
    userId: int("userId"),
    bio: text("bio"),
    experience: text("experience"),
    education: text("education"),
    linkedin: varchar("linkedin", { length: 100 }),
    github: varchar("github", { length: 100 }),
    image: varchar("image", { length: 500 }),
    createdAt: datetime("createdAt", { mode: "string" }).default(sql`(now())`),
    updatedAt: datetime("updatedAt", { mode: "string" }).default(sql`(now())`),
  },
  (table) => {
    return {
      UserProfile_id: primaryKey({ columns: [table.id], name: "UserProfile_id" }),
    };
  },
);

export const userSkill = mysqlTable(
  "UserSkill",
  {
    id: int("id").autoincrement().notNull(),
    userId: int("userId"),
    skillName: varchar("skillName", { length: 100 }).notNull(),
  },
  (table) => {
    return {
      UserSkill_id: primaryKey({ columns: [table.id], name: "UserSkill_id" }),
    };
  },
);
