import { userCompanyService } from "@/features/employer/company/services/userCompanyService";
import type { CtxUserAttributes } from "@/lib/auth";
import { validateRequest } from "@/lib/auth/validateRequest";

export const authActions = {
  async getCurrentUser() {
    const result = await validateRequest();
    if (!result.user) return;

    const ctxUser: CtxUserAttributes = result.user;

    if (ctxUser?.role === "employer") {
      const companyDetails =
        await userCompanyService.getUserCompanyDetailsByUserId(ctxUser.id);
      if (!companyDetails) {
        ctxUser.hasToSetupCompanyInformation = true;
      } else {
        ctxUser.companyId = companyDetails.id;
      }
    }

    return ctxUser;
  },
};
