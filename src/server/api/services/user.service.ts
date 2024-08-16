import { db } from "@/server/db";
import { userCompanies } from "@/server/db/schema";
import type { DBUser } from "@/server/db/schema/users";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  return db.query.users.findFirst({
    where: (users) => eq(users.email, email),
  });
};

export const getUserById = async (id: DBUser["id"]) => {
  return db.query.users.findFirst({
    where: (users) => eq(users.id, id),
  });
};

export const checkIfUserHasToSetupCompanyInformation = async (
  userId: DBUser["id"],
): Promise<boolean> => {
  const hasSetupCompanyInformation = await db.query.userCompanies.findFirst({
    where: () => eq(userCompanies.userId, userId),
    columns: {
      id: true,
    },
  });

  return !hasSetupCompanyInformation;
};
