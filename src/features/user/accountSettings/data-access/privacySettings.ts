import { db } from "@/server/db";
import { userPrivacySettings } from "@/server/db/schema";
import type { InsertUserPrivacySettingsModel } from "@/server/db/schema/userPrivacySettings";

import { eq } from "drizzle-orm";

export const getUserPrivacySettings = async (userId: number) => {
  return await db.query.userPrivacySettings.findFirst({
    where: () => eq(userPrivacySettings.userId, userId),
  });
};

export const updateUserPrivacySettings = async (
  userId: number,
  data: Partial<InsertUserPrivacySettingsModel>,
) => {
  return await db
    .update(userPrivacySettings)
    .set(data)
    .where(eq(userPrivacySettings.userId, userId));
};

export const createUserPrivacySettings = async (
  data: InsertUserPrivacySettingsModel,
) => {
  return await db.insert(userPrivacySettings).values(data);
};
