import { db } from "@/server/db";
import type { UpdateUserNameAndLastNameParams } from "./types";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import type { Transaction } from "@/lib/types";

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
