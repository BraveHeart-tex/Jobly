import { db } from "@/server/db";
import type { UpdateUserNameAndLastNameParams } from "@/data-access/types";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import type { Transaction } from "@/lib/types";
import type { MySqlRawQueryResult } from "drizzle-orm/mysql2";

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
