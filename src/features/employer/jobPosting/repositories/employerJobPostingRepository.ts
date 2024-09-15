import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import { jobPostings } from "@/server/db/schema";
import type { JobPostingSelectModel } from "@/server/db/schema/jobPostings";
import { and, eq, gt, lt } from "drizzle-orm";
import type { CreateJobPostingParams } from "../../company/types";

export const employerJobPostingRepository = {
  async getActiveJobPostingsByCompanyId(
    companyId: JobPostingSelectModel["companyId"],
  ) {
    return db.query.jobPostings.findMany({
      where: () =>
        and(
          eq(jobPostings.companyId, companyId),
          eq(jobPostings.status, "published"),
          gt(jobPostings.expiresAt, new Date().toISOString()),
        ),
    });
  },
  async getDraftJobPostingsByCompanyId(
    companyId: JobPostingSelectModel["companyId"],
  ) {
    return db.query.jobPostings.findMany({
      where: () =>
        and(
          eq(jobPostings.companyId, companyId),
          eq(jobPostings.status, "draft"),
        ),
    });
  },
  async getExpiredJobPostingsByCompanyId(
    companyId: JobPostingSelectModel["companyId"],
  ) {
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
    data: CreateJobPostingParams,
    transaction: Transaction,
  ) {
    const dbLayer = transaction || db;
    const [result] = await dbLayer
      .insert(jobPostings)
      .values({
        ...data,
        status: "published",
      })
      .$returningId();
    return result?.id;
  },
};
