import { db } from "@/server/db";
import { and, eq, gt, lt } from "drizzle-orm";
import { jobPostings } from "@/server/db/schema";
import type { JobPosting } from "@/server/db/schema/jobPostings";

export const employerJobPostingRepository = {
  async getActiveJobPostingsByCompanyId(companyId: JobPosting["companyId"]) {
    return db.query.jobPostings.findMany({
      where: () =>
        and(
          eq(jobPostings.companyId, companyId),
          eq(jobPostings.status, "published"),
          gt(jobPostings.expiresAt, new Date().toISOString()),
        ),
    });
  },
  async getDraftJobPostingsByCompanyId(companyId: JobPosting["companyId"]) {
    return db.query.jobPostings.findMany({
      where: () =>
        and(
          eq(jobPostings.companyId, companyId),
          eq(jobPostings.status, "draft"),
        ),
    });
  },
  async getExpiredJobPostingsByCompanyId(companyId: JobPosting["companyId"]) {
    return db.query.jobPostings.findMany({
      where: () =>
        and(
          eq(jobPostings.companyId, companyId),
          eq(jobPostings.status, "published"),
          lt(jobPostings.expiresAt, new Date().toISOString()),
        ),
    });
  },
};
