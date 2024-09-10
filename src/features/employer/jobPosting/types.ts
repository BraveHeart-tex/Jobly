import type { JobPosting } from "@/server/db/schema/jobPostings";

export interface GetEmployerJobPostingsParams {
  companyId: JobPosting["companyId"];
  status: JobPosting["status"] | "expired";
}
