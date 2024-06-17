import type { MakeFieldsRequired } from "@/lib/types";
import { db } from "@/server/db";
import {
  type JobInsertModel,
  company,
  job,
  userViewsJob,
  userBookmarksJob,
} from "@/server/db/schema";
import {
  and,
  desc,
  eq,
  exists,
  getTableColumns,
  like,
  or,
  sql,
} from "drizzle-orm";

const jobDetailsWithUserStatusQuery = (userId: number) =>
  db
    .selectDistinct({
      ...getTableColumns(job),
      company: {
        name: company.name,
        logo: company.logo,
      },
      userViewedJob: exists(
        db
          .select()
          .from(userViewsJob)
          .where(
            and(
              eq(userViewsJob.viewedJobId, job.id),
              eq(userViewsJob.viewerUserId, userId),
            ),
          ),
      ),
      userBookmarkedJob: exists(
        db
          .select()
          .from(userBookmarksJob)
          .where(
            and(
              eq(userBookmarksJob.jobId, job.id),
              eq(userBookmarksJob.userId, userId),
            ),
          ),
      ),
    })
    .from(job)
    .innerJoin(company, eq(job.companyId, company.id))
    .leftJoin(userViewsJob, eq(job.id, userViewsJob.viewedJobId));

type GetJobListingsParams = {
  userId: number;
  query?: string;
  page?: number;
  limit?: number;
};

export const getJobListings = async ({
  userId,
  query = "",
  page = 1,
  limit = 12,
}: GetJobListingsParams) => {
  const skipAmount = (page - 1) * limit;

  const jobDetailsList = await jobDetailsWithUserStatusQuery(userId)
    .where(or(like(job.title, `%${query}%`), like(company.name, `%${query}%`)))
    .orderBy(desc(job.createdAt))
    .limit(limit)
    .offset(skipAmount);

  const jobDetailsListCount = await db
    .select({
      count: sql<number>`count(*)`.as("count"),
    })
    .from(job)
    .innerJoin(company, eq(job.companyId, company.id))
    .where(or(like(job.title, `%${query}%`), like(company.name, `%${query}%`)));

  const totalCount = jobDetailsListCount[0]?.count ?? 0;

  if (jobDetailsList.length === 0) {
    return {
      jobListings: [],
      hasNextPage: false,
      hasPreviousPage: page > 1,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    };
  }

  return {
    jobListings: jobDetailsList,
    hasNextPage: totalCount > skipAmount + limit,
    hasPreviousPage: page > 1,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  };
};

export const getJobById = async ({
  jobId,
  userId,
}: { jobId: number; userId: number }) => {
  const jobDetails = await jobDetailsWithUserStatusQuery(userId).where(
    and(eq(job.id, jobId)),
  );
  return jobDetails[0];
};

export const updateJob = async (
  data: MakeFieldsRequired<Partial<JobInsertModel>, "id">,
) => {
  return db.update(job).set(data).where(eq(job.id, data.id));
};

export const markJobAsViewed = async ({
  jobId,
  userId,
}: { jobId: number; userId: number }) => {
  return db.insert(userViewsJob).values({
    viewedJobId: jobId,
    viewerUserId: userId,
  });
};

export const bookmarkJob = async ({
  jobId,
  userId,
}: { jobId: number; userId: number }) => {
  return db.insert(userBookmarksJob).values({
    jobId,
    userId,
  });
};

export const deleteJobBookmark = async ({
  userId,
  jobId,
}: { userId: number; jobId: number }) => {
  return db
    .delete(userBookmarksJob)
    .where(
      and(
        eq(userBookmarksJob.jobId, jobId),
        eq(userBookmarksJob.userId, userId),
      ),
    );
};

export const getBookmarkedJobs = async (userId: number) => {
  return db
    .select({
      // TODO: Get only the needed columns later on instead of spreading
      ...getTableColumns(job),
      bookmarkedAt: userBookmarksJob.bookmarkedAt,
    })
    .from(job)
    .innerJoin(userBookmarksJob, eq(job.id, userBookmarksJob.jobId))
    .where(eq(userBookmarksJob.userId, userId));
};

export const getViewedJobs = async (userId: number) => {
  return db
    .select({
      // TODO: Get only the needed columns later on instead of spreading
      ...getTableColumns(job),
      viewedAt: userViewsJob.viewedAt,
    })
    .from(job)
    .innerJoin(userViewsJob, eq(job.id, userViewsJob.viewedJobId))
    .where(eq(userViewsJob.viewerUserId, userId));
};
