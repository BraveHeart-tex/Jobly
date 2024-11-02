import type { GetCandidateAccountSettingsReturnType } from "@/features/user/accountSettings/types";
import { db } from "@/server/db";
import type { DBUser } from "@/server/db/schema/users";
import { eq } from "drizzle-orm";

// TODO: make it handle only one role
export const getUserAccountSettings = async (
  userId: number,
  role: DBUser["role"],
): Promise<GetCandidateAccountSettingsReturnType | null> => {
  if (role === "candidate") {
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
  }

  return null;
};
