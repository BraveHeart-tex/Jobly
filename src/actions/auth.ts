import { getUserAssociatedWithCompanyUseCase } from "@/features/user/profile/use-cases/users";
import type { ContextUserAttributes } from "@/lib/auth/session";
import { validateRequest } from "@/lib/auth/validateRequest";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { and, eq, not } from "drizzle-orm";

export interface GetCurrentUserReturnType extends ContextUserAttributes {
  hasToSetupCompanyInformation?: boolean;
  companyId?: number;
}

export const getCurrentUser =
  async (): Promise<GetCurrentUserReturnType | null> => {
    const result = await validateRequest();
    if (!result.user) return null;

    const ctxUser: GetCurrentUserReturnType = result.user;

    if (ctxUser?.role === "employer") {
      const companyId = await getUserAssociatedWithCompanyUseCase(ctxUser.id);

      if (!companyId) {
        ctxUser.hasToSetupCompanyInformation = true;
      } else {
        ctxUser.companyId = companyId;
      }
    }

    return ctxUser;
  };

export const validateEmployerRequest = async () => {
  const user = await getCurrentUser();
  if (!user || user?.role !== "employer" || !user.companyId) {
    return null;
  }

  return user;
};

export const deleteUserAccount = async (userId: number) => {
  return await db.delete(users).where(eq(users.id, userId));
};

export const getUserFromGoogleId = async (googleId: string) => {
  return await db.query.users.findFirst({
    where: () => eq(users.googleId, googleId),
  });
};

export const checkUserEmailAlreadyInUseByGoogleId = async (
  email: string,
  googleId: string,
) => {
  const result = await db.query.users.findFirst({
    columns: { id: true },
    where: () => and(eq(users.email, email), not(eq(users.googleId, googleId))),
  });

  return !!result?.id;
};
