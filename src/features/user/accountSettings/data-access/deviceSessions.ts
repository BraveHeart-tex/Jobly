import { db } from "@/server/db";
import { sessions } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";

export const deleteDeviceSession = async (
  userId: number,
  sessionId: string,
) => {
  return await db
    .delete(sessions)
    .where(and(eq(sessions.userId, userId), eq(sessions.id, sessionId)));
};
