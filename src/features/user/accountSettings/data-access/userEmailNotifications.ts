import { db } from "@/server/db";
import { userEmailNotificationSettings } from "@/server/db/schema";
import type { InsertUserEmailNotificationSettingModel } from "@/server/db/schema/userEmailNotificationSettings";
import { eq } from "drizzle-orm";

export const getUserEmailNotificationSettings = async (userId: number) => {
  return await db.query.userEmailNotificationSettings.findFirst({
    where: () => eq(userEmailNotificationSettings.userId, userId),
  });
};

export const insertUserEmailNotificationSettings = async (
  data: InsertUserEmailNotificationSettingModel,
) => {
  return await db
    .insert(userEmailNotificationSettings)
    .values(data)
    .$returningId();
};

export const updateUserEmailNotificationSettings = async (
  data: InsertUserEmailNotificationSettingModel,
) => {
  return await db
    .update(userEmailNotificationSettings)
    .set(data)
    .where(eq(userEmailNotificationSettings.userId, data.userId));
};
