import type { MakeFieldsRequired } from "@/lib/types";
import type { GetJobListingsSchema } from "@/schemas/getJobListingsSchema";
import { db } from "@/server/db";
import {
  type JobInsertModel,
  companies,
  jobs,
  userBookmarksJob,
  userViewsJob,
} from "@/server/db/schema";
import { and, desc, eq, getTableColumns, like, or, sql } from "drizzle-orm";
import type { User } from "lucia";
import {
  withBookmarkJoin,
  withUserViewsJobJoin,
} from "../../utils/job.service.utils";

export const getJobListings = async ({
  userId,
  query = "",
  page = 1,
  bookmarked = false,
  viewed = false,
  employmentType,
  workType,
}: GetJobListingsSchema & { userId: User["id"] }) => {
  const limit = 12;
  const skipAmount = (page - 1) * limit;

  const jobDetailsListQuery = db
    .selectDistinct({
      ...getTableColumns(jobs),
      company: {
        name: companies.name,
        logo: companies.logo,
      },
      userViewedJob: userViewsJob.viewerUserId,
      userBookmarkedJob: userBookmarksJob.userId,
    })
    .from(jobs)
    .innerJoin(companies, eq(jobs.companyId, companies.id))
    .where(
      and(
        or(like(jobs.title, `%${query}%`), like(companies.name, `%${query}%`)),
        workType ? eq(jobs.workType, workType) : undefined,
        employmentType ? eq(jobs.employmentType, employmentType) : undefined,
      ),
    )
    .orderBy(desc(jobs.createdAt))
    .limit(limit)
    .offset(skipAmount)
    .$dynamic();

  const jobDetailsListCountQuery = db
    .select({
      count: sql<number>`count(*)`.as("count"),
    })
    .from(jobs)
    .innerJoin(companies, eq(jobs.companyId, companies.id))
    .where(
      and(
        or(like(jobs.title, `%${query}%`), like(companies.name, `%${query}%`)),
        workType ? eq(jobs.workType, workType) : undefined,
        employmentType ? eq(jobs.employmentType, employmentType) : undefined,
      ),
    )
    .$dynamic();

  const [jobDetailsList, jobDetailsListCount] = await Promise.all([
    withBookmarkJoin(
      withUserViewsJobJoin(jobDetailsListQuery, userId, viewed),
      userId,
      bookmarked,
    ),
    withBookmarkJoin(
      withUserViewsJobJoin(jobDetailsListCountQuery, userId, viewed),
      userId,
      bookmarked,
    ),
  ]);

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
  const jobDetails = await db
    .selectDistinct({
      ...getTableColumns(jobs),
      company: {
        name: companies.name,
        logo: companies.logo,
      },
      userViewedJob: userViewsJob.viewerUserId,
      userBookmarkedJob: userBookmarksJob.userId,
    })
    .from(jobs)
    .innerJoin(companies, eq(jobs.companyId, companies.id))
    .leftJoin(
      userViewsJob,
      and(
        eq(jobs.id, userViewsJob.viewedJobId),
        eq(userViewsJob.viewerUserId, userId),
      ),
    )
    .leftJoin(
      userBookmarksJob,
      and(
        eq(jobs.id, userBookmarksJob.jobId),
        eq(userBookmarksJob.userId, userId),
      ),
    )
    .where(and(eq(jobs.id, jobId)));
  return jobDetails[0];
};

export const updateJob = async (
  data: MakeFieldsRequired<Partial<JobInsertModel>, "id">,
) => {
  return db.update(jobs).set(data).where(eq(jobs.id, data.id));
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
      ...getTableColumns(jobs),
      bookmarkedAt: userBookmarksJob.bookmarkedAt,
    })
    .from(jobs)
    .innerJoin(userBookmarksJob, eq(jobs.id, userBookmarksJob.jobId))
    .where(eq(userBookmarksJob.userId, userId));
};

export const getViewedJobs = async (userId: number) => {
  return db
    .select({
      // TODO: Get only the needed columns later on instead of spreading
      ...getTableColumns(jobs),
      viewedAt: userViewsJob.viewedAt,
    })
    .from(jobs)
    .innerJoin(userViewsJob, eq(jobs.id, userViewsJob.viewedJobId))
    .where(eq(userViewsJob.viewerUserId, userId));
};
