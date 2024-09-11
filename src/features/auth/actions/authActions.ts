import type { CtxUserAttributes } from "@/lib/auth";
import { validateRequest } from "@/lib/auth/validateRequest";
import { hashPasswordSHA1 } from "../utils";
import { userCompanyService } from "@/features/employer/company/services/userCompanyService";

export const authActions = {
  async checkPasswordPwned(password: string) {
    const sha1Hash = await hashPasswordSHA1(password);
    const prefix = sha1Hash.substring(0, 5);
    const suffix = sha1Hash.slice(5);

    const url = `https://api.pwnedpasswords.com/range/${prefix}`;
    const response = await fetch(url);
    const data = await response.text();

    const hashes = data.split("\r\n").map((line: string) => line.split(":"));

    for (const [hashSuffix] of hashes) {
      if (hashSuffix?.toUpperCase() === suffix) {
        return true;
      }
    }

    return false;
  },

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
