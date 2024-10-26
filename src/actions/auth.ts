import { companyUserService } from "@/features/employer/company/services/userCompanyService";
import type { ContextUserAttributes } from "@/lib/auth/session";

import { unCachedValidateRequest } from "@/lib/auth/validateRequest";

export interface GetCurrentUserReturnType extends ContextUserAttributes {
  hasToSetupCompanyInformation?: boolean;
  companyId?: number;
}

export const getCurrentUser =
  async (): Promise<GetCurrentUserReturnType | null> => {
    const result = await unCachedValidateRequest();
    if (!result.user) return null;

    const ctxUser: GetCurrentUserReturnType = result.user;

    if (ctxUser?.role === "employer") {
      const companyDetails =
        await companyUserService.getCompanyUserDetailsByUserId(ctxUser.id);
      if (!companyDetails) {
        ctxUser.hasToSetupCompanyInformation = true;
      } else {
        ctxUser.companyId = companyDetails.id;
      }
    }

    return ctxUser;
  };
