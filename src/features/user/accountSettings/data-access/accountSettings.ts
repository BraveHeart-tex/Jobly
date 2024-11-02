import type { GetCandidateAccountSettingsReturnType } from "@/features/user/accountSettings/types";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export const getCandidateAccountSettingsUseCase = async (
  userId: number,
): Promise<GetCandidateAccountSettingsReturnType | null> => {
  const result = await db.query.users.findFirst({
    columns: {
      id: true,
    },
    where: (users) => eq(users.id, userId),
    with: {
      userEmailNotificationSetting: true,
    },
  });

  if (!result) {
    return null;
  }

  const { followedJobPostingClosingDates, jobAlerts, suitableJobPostings } =
    result.userEmailNotificationSetting;

  return {
    userId: result?.id,
    notificationSettings: {
      // TODO:
      general: {
        jobRecommendations: true,
        applicationStatus: true,
      },
      email: {
        followedJobPostingClosingDates,
        jobAlerts,
        suitableJobPostings,
      },
    },
  };
};
