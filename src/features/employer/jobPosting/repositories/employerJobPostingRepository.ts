import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import { jobPostings } from "@/server/db/schema";
import type {
  JobPosting,
  JobPostingInsertModel,
} from "@/server/db/schema/jobPostings";
import { and, eq, gt, lt } from "drizzle-orm";

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
  async createJobPosting(
    data: JobPostingInsertModel,
    transaction: Transaction,
  ) {
    const dbLayer = transaction || db;
    const [result] = await dbLayer
      .insert(jobPostings)
      .values(data)
      .$returningId();
    return result?.id;
  },
};
