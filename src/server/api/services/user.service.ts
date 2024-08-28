import { db } from "@/server/db";
import type { DBUser } from "@/server/db/schema/users";
import { eq } from "drizzle-orm";
import { checkIfUserHasCompany } from "./company.service";

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
  const hasAlreadySetupCompanyInformation = await checkIfUserHasCompany(userId);
  return !hasAlreadySetupCompanyInformation;
};
