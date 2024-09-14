import type { JobPostingFormSchema } from "@/schemas/jobPostingFormSchema";
import type {
  CompanyInsertModel,
  CompanySelectModel,
} from "@/server/db/schema/companies";

export interface CreateCompanyParams extends CompanyInsertModel {
  userId: number;
}

export interface CreateCompanySuccess {
  companyId: CompanySelectModel["id"];
}

export interface VerifyUserCompanyAssociationParams {
  userId: number;
  companyId: number;
}

export interface CreateJobPostingParams extends JobPostingFormSchema {
  companyId: number;
}
