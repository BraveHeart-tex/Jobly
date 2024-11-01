import { getCompanyUserCompanyId } from "@/features/user/profile/use-cases/users";
import type { ContextUserAttributes } from "@/lib/auth/session";
import { cachedValidateRequest } from "@/lib/auth/validateRequest";

export interface GetCurrentUserReturnType extends ContextUserAttributes {
  hasToSetupCompanyInformation?: boolean;
  companyId?: number;
}

export const getCurrentUser =
  async (): Promise<GetCurrentUserReturnType | null> => {
    const result = await cachedValidateRequest();
    if (!result.user) return null;

    const ctxUser: GetCurrentUserReturnType = result.user;

    if (ctxUser?.role === "employer") {
      const companyId = await getCompanyUserCompanyId(ctxUser.id);

      if (!companyId) {
        ctxUser.hasToSetupCompanyInformation = true;
      } else {
        ctxUser.companyId = companyId;
      }
    }

    return ctxUser;
  };
