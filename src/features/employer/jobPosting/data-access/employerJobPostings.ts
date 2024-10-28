import type { CreateJobPostingParams } from "@/features/employer/company/types";
import type { MakeFieldsRequired, Transaction } from "@/lib/types";
import { db } from "@/server/db";
import { jobPostings, users } from "@/server/db/schema";
import type { JobPostingInsertModel } from "@/server/db/schema/jobPostings";
import { getCurrentTimestamp } from "@/server/db/utils";
import { and, desc, eq, gt, lt, sql } from "drizzle-orm";

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

export const getActiveJobPostingsByCompanyId = async (companyId: number) => {
  return baseJobPostingsQuery(companyId).where(
    and(
      eq(jobPostings.status, "published"),
      gt(jobPostings.expiresAt, getCurrentTimestamp()),
    ),
  );
};

export const getDraftJobPostingsByCompanyId = async (companyId: number) => {
  return baseJobPostingsQuery(companyId).where(eq(jobPostings.status, "draft"));
};

export const getExpiredJobPostingsByCompanyId = async (companyId: number) => {
  return baseJobPostingsQuery(companyId).where(
    and(
      eq(jobPostings.status, "published"),
      lt(jobPostings.expiresAt, getCurrentTimestamp()),
    ),
  );
};

export const createJobPosting = async (
  data: CreateJobPostingParams,
  transaction: Transaction,
) => {
  const dbLayer = transaction || db;
  const [result] = await dbLayer
    .insert(jobPostings)
    .values({
      ...data,
      status: "published",
    })
    .$returningId();
  return result?.id;
};

export const getJobPostingById = async (id: number) => {
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
};

export const updateJobPosting = async (
  data: MakeFieldsRequired<JobPostingInsertModel, "id">,
) => {
  return db.update(jobPostings).set(data).where(eq(jobPostings.id, data.id));
};
