import { db } from "@/server/db";
import { candidateNotificationSettings } from "@/server/db/schema";
import type { InsertCandidateNotificationSettingsModel } from "@/server/db/schema/candidateNotificationSettings";
import type { CandidateNotificationSettingsData } from "@/schemas/user/settings/candidateNotificationSettingsValidator";
import { eq } from "drizzle-orm";

export const getCandidateNotificationSettings = async (userId: number) => {
  return await db.query.candidateNotificationSettings.findFirst({
    where: () => eq(candidateNotificationSettings.userId, userId),
  });
};

export const updateCandidateNotificationSettings = async (
  userId: number,
  data: Partial<CandidateNotificationSettingsData>,
) => {
  return await db
    .update(candidateNotificationSettings)
    .set(data)
    .where(eq(candidateNotificationSettings.userId, userId));
};

export const insertCandidateNotificationSettings = async (
  data: InsertCandidateNotificationSettingsModel,
) => {
  return await db
    .insert(candidateNotificationSettings)
    .values(data)
    .$returningId();
};
