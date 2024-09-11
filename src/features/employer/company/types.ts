import type { GenericServiceError } from "@/lib/types";
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

export type CreateCompanyResult = GenericServiceError | CreateCompanySuccess;
