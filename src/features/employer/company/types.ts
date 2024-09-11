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
