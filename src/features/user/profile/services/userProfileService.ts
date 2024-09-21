import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const userProfileService = {
  getUserProfileInformation: async (userId: number) => {
    return db.query.users.findFirst({
      columns: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
      where: () => eq(users.id, userId),
      with: {
        workExperiences: true,
        educationalBackgrounds: true,
        personalDetail: true,
      },
    });
  },
};
