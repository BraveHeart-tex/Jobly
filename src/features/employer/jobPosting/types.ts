import type { JobPostingSelectModel } from "@/server/db/schema/jobPostings";

export interface GetEmployerJobPostingsParams {
  companyId: JobPostingSelectModel["companyId"];
  status: JobPostingSelectModel["status"] | "expired";
}
