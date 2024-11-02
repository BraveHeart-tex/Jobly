import type { Session } from "@/server/db/schema/sessions";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { db } from "@/server/db";
import sessions from "@/server/db/schema/sessions";
import { deviceSessions, users } from "@/server/db/schema";
import { and, eq, not } from "drizzle-orm";
import type { DBUser } from "@/server/db/schema/users";
import type { Transaction } from "@/lib/types";
import type { InsertDeviceSessionModel } from "@/server/db/schema/deviceSessions";
import { getCurrentTimestamp } from "@/server/db/utils";

export interface ContextUserAttributes
  extends Pick<
    DBUser,
    "id" | "email" | "role" | "firstName" | "lastName" | "avatarUrl"
  > {}

export const generateSessionToken = (): string => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
};

export const createSession = async (
  token: string,
  userId: number,
  deviceSessionData: Omit<InsertDeviceSessionModel, "sessionId">,
): Promise<Session> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  return await db.transaction(async (trx) => {
    await Promise.all([
      trx.insert(sessions).values(session),
      trx.insert(deviceSessions).values({
        ...deviceSessionData,
        sessionId,
      }),
    ]);

    return session;
  });
};

export const validateSessionToken = async (
  token: string,
): Promise<SessionValidationResult> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const [result] = await db
    .select({
      user: {
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
        avatarUrl: users.avatarUrl,
      },
      session: sessions,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId));

  if (!result) {
    return { session: null, user: null };
  }

  const { user, session } = result;

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, session.id));
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await Promise.all([
      db
        .update(sessions)
        .set({
          expiresAt: session.expiresAt,
        })
        .where(eq(sessions.id, session.id)),
      db
        .update(deviceSessions)
        .set({
          lastActive: getCurrentTimestamp(),
        })
        .where(eq(deviceSessions.sessionId, sessionId)),
    ]);
  }

  return { session, user };
};

export const invalidateSession = async (sessionId: string): Promise<void> => {
  await db
    .delete(sessions)
    .where(
      eq(
        sessions.id,
        encodeHexLowerCase(sha256(new TextEncoder().encode(sessionId))),
      ),
    );
};

export const invalidateAllUserSessions = async (
  userId: number,
  trx?: Transaction,
): Promise<void> => {
  const dbLayer = trx || db;
  await dbLayer.delete(sessions).where(eq(sessions.userId, userId));
};

export const invalidateAllOtherUserSessions = async (
  currentSessionId: string,
  userId: number,
) => {
  await db
    .delete(sessions)
    .where(
      and(eq(sessions.userId, userId), not(eq(sessions.id, currentSessionId))),
    );
};

export type SessionValidationResult =
  | {
      session: Session;
      user: ContextUserAttributes;
    }
  | {
      session: null;
      user: null;
    };
