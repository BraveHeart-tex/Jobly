import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import { jobPostings, users } from "@/server/db/schema";
import type { JobPostingSelectModel } from "@/server/db/schema/jobPostings";
import { getCurrentTimestamp } from "@/server/db/utils";
import { and, desc, eq, gt, lt, sql } from "drizzle-orm";
import type { CreateJobPostingParams } from "../../company/types";

const baseJobPostingsQuery = (companyId: number) => {
  return db
    .select({
      id: jobPostings.id,
      companyId: jobPostings.companyId,
      title: jobPostings.title,
      location: jobPostings.location,
      workType: jobPostings.workType,
      expiresAt: jobPostings.expiresAt,
      updatedAt: jobPostings.updatedAt,
      postedAt: jobPostings.postedAt,
      createdUserId: jobPostings.createdUserId,
      status: jobPostings.status,
      createdUserName: sql<string>`CONCAT(${users.firstName},' ',${users.lastName})`,
    })
    .from(jobPostings)
    .innerJoin(users, eq(users.id, jobPostings.createdUserId))
    .where(eq(jobPostings.companyId, companyId))
    .orderBy(desc(jobPostings.id))
    .$dynamic();
};

export const employerJobPostingRepository = {
  async getActiveJobPostingsByCompanyId(companyId: number) {
    return baseJobPostingsQuery(companyId).where(
      and(
        eq(jobPostings.status, "published"),
        gt(jobPostings.expiresAt, getCurrentTimestamp()),
      ),
    );
  },
  async getDraftJobPostingsByCompanyId(companyId: number) {
    return baseJobPostingsQuery(companyId).where(
      eq(jobPostings.status, "draft"),
    );
  },
  async getExpiredJobPostingsByCompanyId(companyId: number) {
    return baseJobPostingsQuery(companyId).where(
      and(
        eq(jobPostings.status, "published"),
        lt(jobPostings.expiresAt, getCurrentTimestamp()),
      ),
    );
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
  async getJobPostingById(id: number) {
    return db.query.jobPostings.findFirst({
      with: {
        jobPostingSkills: {
          with: {
            skill: true,
          },
        },
      },
      where: () => eq(jobPostings.id, id),
    });
  },
  async updateJobPosting(data: JobPostingSelectModel) {
    return db.update(jobPostings).set(data).where(eq(jobPostings.id, data.id));
  },
};
