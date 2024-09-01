import type { CompanyProfileSetupSchema } from "@/schemas/companyProfileSetupSchema";

export type CompanyProfileSetupFormKey = keyof Omit<
  CompanyProfileSetupSchema,
  "coverImage" | "logo"
>;
