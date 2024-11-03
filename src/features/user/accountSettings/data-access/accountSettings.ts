import type { GetCandidateAccountSettingsReturnType } from "@/features/user/accountSettings/types";
import { db } from "@/server/db";
import { deviceSessions } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";

export const getCandidateAccountSettings = async (
  userId: number,
  currentSessionId: string,
): Promise<GetCandidateAccountSettingsReturnType | null> => {
  const result = await db.query.users.findFirst({
    columns: {
      id: true,
    },
    where: (users) => eq(users.id, userId),
    with: {
      userEmailNotificationSettings: {
        columns: {
          followedJobPostingClosingDates: true,
          jobAlerts: true,
          suitableJobPostings: true,
        },
      },
      userPrivacySettings: {
        columns: {
          searchableProfile: true,
        },
      },
      candidateNotificationSettings: {
        columns: {
          applicationStatus: true,
          jobRecommendations: true,
        },
      },
      deviceSessions: {
        columns: {
          id: true,
          ipAddress: true,
          browser: true,
          deviceName: true,
          lastActive: true,
          location: true,
          operatingSystem: true,
          sessionId: true,
          deviceType: true,
        },
        extras: {
          isCurrentSession:
            sql<boolean>`${deviceSessions.sessionId} = ${currentSessionId}`.as(
              "isCurrentSession",
            ),
        },
      },
    },
  });

  if (!result) {
    return null;
  }

  const { followedJobPostingClosingDates, jobAlerts, suitableJobPostings } =
    result.userEmailNotificationSettings || {};
  const { applicationStatus, jobRecommendations } =
    result.candidateNotificationSettings || {};

  return {
    userId: result?.id,
    notificationSettings: {
      general: {
        jobRecommendations,
        applicationStatus,
      },
      email: {
        followedJobPostingClosingDates,
        jobAlerts,
        suitableJobPostings,
      },
    },
    privacySettings: result.userPrivacySettings,
    deviceSessions: result.deviceSessions,
  };
};
