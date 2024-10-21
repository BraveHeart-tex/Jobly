import {
  educationalBackgrounds,
  userBios,
  userHighlightedSkills,
  userProfiles,
  userSkills,
  workExperiences,
} from "@/server/db/schema";
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
    email: varchar("email", { length: 255 }).unique().notNull(),
    firstName: varchar("firstName", { length: 255 }).notNull(),
    lastName: varchar("lastName", { length: 255 }).notNull(),
    hashedPassword: varchar("hashedPassword", { length: 255 }).notNull(),
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
  userHighlightedSkills: many(userHighlightedSkills),
  userProfile: one(userProfiles, {
    fields: [users.id],
    references: [userProfiles.userId],
  }),
}));

export type DBUser = InferSelectModel<typeof users>;
export type DBUserInsertModel = InferInsertModel<typeof users>;

export default users;
