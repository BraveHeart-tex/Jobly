import type { Transaction } from "@/lib/types";
import { db } from "@/server/db";
import { jobPostings, users } from "@/server/db/schema";
import type { JobPostingSelectModel } from "@/server/db/schema/jobPostings";
import { and, eq, gt, lt, sql } from "drizzle-orm";
import type { CreateJobPostingParams } from "../../company/types";

export const employerJobPostingRepository = {
  async getActiveJobPostingsByCompanyId(
    companyId: JobPostingSelectModel["companyId"],
  ) {
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
      .where(
        and(
          eq(jobPostings.companyId, companyId),
          eq(jobPostings.status, "published"),
          gt(jobPostings.expiresAt, new Date().toISOString()),
        ),
      );
  },
  async getDraftJobPostingsByCompanyId(
    companyId: JobPostingSelectModel["companyId"],
  ) {
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
      .where(
        and(
          and(
            eq(jobPostings.companyId, companyId),
            eq(jobPostings.status, "draft"),
          ),
        ),
      );
  },
  async getExpiredJobPostingsByCompanyId(
    companyId: JobPostingSelectModel["companyId"],
  ) {
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
      .where(
        and(
          eq(jobPostings.companyId, companyId),
          eq(jobPostings.status, "published"),
          lt(jobPostings.expiresAt, new Date().toISOString()),
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
};
