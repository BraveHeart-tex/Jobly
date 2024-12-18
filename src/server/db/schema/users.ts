import {
  deviceSessions,
  educationalBackgrounds,
  userBios,
  userEmailNotificationSettings,
  userPrivacySettings,
  userProfiles,
  userSkills,
  workExperiences,
} from "@/server/db/schema";
import candidateNotificationSettings from "@/server/db/schema/candidateNotificationSettings";
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
  varchar,
} from "drizzle-orm/mysql-core";

const users = mysqlTable(
  "Users",
  {
    id: int("id").primaryKey().autoincrement().notNull(),
    googleId: varchar("googleId", { length: 255 }),
    email: varchar("email", { length: 255 }).unique().notNull(),
    firstName: varchar("firstName", { length: 255 }).notNull(),
    lastName: varchar("lastName", { length: 255 }).notNull(),
    hashedPassword: varchar("hashedPassword", { length: 255 }),
    role: mysqlEnum("role", ["employer", "candidate"]).notNull(),
    avatarUrl: varchar("avatarUrl", { length: 2048 }),
    createdAt: customTimestamp("createdAt").$defaultFn(() =>
      getCurrentTimestamp(),
    ),
    updatedAt: customTimestamp("updatedAt")
      .$defaultFn(() => getCurrentTimestamp())
      .notNull()
      .$onUpdate(() => getCurrentTimestamp()),
  },
  (table) => {
    return {
      User_id: primaryKey({ columns: [table.id], name: "User_id" }),
      email: index("email").on(table.email),
      googleId: index("googleId").on(table.googleId),
    };
  },
);

export const userRelations = relations(users, ({ one, many }) => ({
  workExperiences: many(workExperiences),
  educationalBackgrounds: many(educationalBackgrounds),
  userSkills: many(userSkills),
  userBio: one(userBios, {
    fields: [users.id],
    references: [userBios.userId],
  }),
  userProfile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
  userEmailNotificationSettings: one(userEmailNotificationSettings, {
    fields: [users.id],
    references: [userEmailNotificationSettings.userId],
  }),
  userPrivacySettings: one(userPrivacySettings, {
    fields: [users.id],
    references: [userPrivacySettings.userId],
  }),
  candidateNotificationSettings: one(candidateNotificationSettings, {
    fields: [users.id],
    references: [candidateNotificationSettings.userId],
  }),
  deviceSessions: many(deviceSessions),
}));

export type DBUser = InferSelectModel<typeof users>;
export type DBUserInsertModel = InferInsertModel<typeof users>;

export default users;
