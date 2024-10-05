import type {
  CompanyInsertModel,
  CompanySelectModel,
} from "@/server/db/schema/companies";
import type { EmployerJobPostingFormOutput } from "@/validators/jobPostingFormValidator";

export interface CreateCompanyParams extends CompanyInsertModel {
  userId: number;
}

export interface CreateCompanySuccess {
  companyId: CompanySelectModel["id"];
}

export interface VerifyCompanyUserAssociationParams {
  userId: number;
  companyId: number;
}

export interface CreateJobPostingParams extends EmployerJobPostingFormOutput {
  companyId: number;
  createdUserId: number;
}
