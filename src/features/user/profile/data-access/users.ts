import { db } from "@/server/db";
import type { UpdateUserNameAndLastNameParams } from "@/features/user/profile/types";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import type { Transaction } from "@/lib/types";
import type { MySqlRawQueryResult } from "drizzle-orm/mysql2";
import type { DBUserInsertModel } from "@/server/db/schema/users";
import type { PersonalSettingsFormData } from "@/validators/user/profile/settings/personalSettingsFormValidator";

export const updateUserNameAndLastName = async (
  { userId, firstName, lastName }: UpdateUserNameAndLastNameParams,
  trx?: Transaction,
): Promise<void> => {
  if (!firstName && !lastName) return;

  const updateValues: {
    firstName?: string;
    lastName?: string;
  } = {};

  if (firstName) updateValues.firstName = firstName;
  if (lastName) updateValues.lastName = lastName;

  const dbLayer = trx || db;

  await dbLayer.update(users).set(updateValues).where(eq(users.id, userId));
};

export const updateUserAvatarUrl = async (
  userId: number,
  avatarUrl: string | null,
): Promise<MySqlRawQueryResult> => {
  return await db
    .update(users)
    .set({
      avatarUrl,
    })
    .where(eq(users.id, userId));
};

export const getUserByEmail = async (email: string) => {
  return db.query.users.findFirst({
    where: (users) => eq(users.email, email),
  });
};

export const createUser = async (data: DBUserInsertModel) => {
  const [response] = await db.insert(users).values(data).$returningId();
  return response?.id;
};

export const updatePersonalSettings = async (
  data: PersonalSettingsFormData & { userId: number },
) => {
  return await db
    .update(users)
    .set({
      role: data.accountType,
      firstName: data.firstName,
      lastName: data.lastName,
    })
    .where(eq(users.id, data.userId));
};
