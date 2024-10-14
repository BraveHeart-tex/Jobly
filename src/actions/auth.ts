import { companyUserService } from "@/features/employer/company/services/userCompanyService";
import type { CtxUserAttributes } from "@/lib/auth";
import { validateRequest } from "@/lib/auth/validateRequest";

export const getCurrentUser = async () => {
  const result = await validateRequest();
  if (!result.user) return;

  const ctxUser: CtxUserAttributes = result.user;

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
