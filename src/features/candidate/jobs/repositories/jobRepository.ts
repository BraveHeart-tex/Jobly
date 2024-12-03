import type { MakeFieldsRequired, Nullable } from "@/lib/types";
import { db } from "@/server/db";
import {
  companies,
  jobPostings,
  userBookmarksJobPosting,
  userViewsJobPosting,
} from "@/server/db/schema";
import type {
  JobPostingInsertModel,
  JobPostingSelectModel,
} from "@/server/db/schema/jobPostings";
import { and, desc, eq, getTableColumns, like, or, sql } from "drizzle-orm";
import type { GetJobListingsOutput } from "@/schemas/user/jobListings/getJobListingsValidator";
import {
  withBookmarkJoin,
  withUserViewsJobJoin,
} from "@/features/candidate/jobs/utils";
import type { DBUser } from "@/server/db/schema/users";

export const jobRepository = {
  async getJobDetailsList({
    query,
    workType,
    employmentType,
    userId,
    bookmarked,
    viewed,
    limit,
    skipAmount,
  }: GetJobDetailsListParams) {
    const jobDetailsListQuery = db
      .selectDistinct({
        ...getTableColumns(jobPostings),
        company: {
          name: companies.name,
          logo: companies.logo,
        },
        userViewedJob: userViewsJobPosting.viewerUserId,
        userBookmarkedJob: userBookmarksJobPosting.userId,
      })
      .from(jobPostings)
      .innerJoin(companies, eq(jobPostings.companyId, companies.id))
      .where(
        and(
          or(
            like(jobPostings.title, `%${query}%`),
            like(companies.name, `%${query}%`),
          ),
          workType ? eq(jobPostings.workType, workType) : undefined,
          employmentType
            ? eq(jobPostings.employmentType, employmentType)
            : undefined,
        ),
      )
      .orderBy(desc(jobPostings.postedAt))
      .limit(limit)
      .offset(skipAmount)
      .$dynamic();

    return withBookmarkJoin(
      withUserViewsJobJoin(jobDetailsListQuery, userId, viewed),
      userId,
      bookmarked,
    );
  },

  async getJobDetailsCount({
    query,
    workType,
    employmentType,
    userId,
    bookmarked,
    viewed,
  }: GetJobDetailsCountParams) {
    const jobDetailsListCountQuery = db
      .select({
        count: sql<number>`count(*)`.as("count"),
      })
      .from(jobPostings)
      .innerJoin(companies, eq(jobPostings.companyId, companies.id))
      .where(
        and(
          or(
            like(jobPostings.title, `%${query}%`),
            like(companies.name, `%${query}%`),
          ),
          workType ? eq(jobPostings.workType, workType) : undefined,
          employmentType
            ? eq(jobPostings.employmentType, employmentType)
            : undefined,
        ),
      )
      .$dynamic();

    return withBookmarkJoin(
      withUserViewsJobJoin(jobDetailsListCountQuery, userId, viewed),
      userId,
      bookmarked,
    );
  },
  async getJobById({ jobId, userId }: GetJobByIdParams) {
    const jobDetails = await db
      .selectDistinct({
        ...getTableColumns(jobPostings),
        company: {
          name: companies.name,
          logo: companies.logo,
        },
        userViewedJob: userViewsJobPosting.viewerUserId,
        userBookmarkedJob: userBookmarksJobPosting.userId,
      })
      .from(jobPostings)
      .innerJoin(companies, eq(jobPostings.companyId, companies.id))
      .leftJoin(
        userViewsJobPosting,
        and(
          eq(jobPostings.id, userViewsJobPosting.viewedJobPostingId),
          eq(userViewsJobPosting.viewerUserId, userId),
        ),
      )
      .leftJoin(
        userBookmarksJobPosting,
        and(
          eq(jobPostings.id, userBookmarksJobPosting.jobPostingId),
          eq(userBookmarksJobPosting.userId, userId),
        ),
      )
      .where(eq(jobPostings.id, jobId));

    return jobDetails[0];
  },
  async updateJob(
    data: MakeFieldsRequired<Partial<JobPostingInsertModel>, "id">,
  ) {
    return await db
      .update(jobPostings)
      .set(data)
      .where(eq(jobPostings.id, data.id));
  },
  async markJobAsViewed({ jobId, userId }: { jobId: number; userId: number }) {
    return db.insert(userViewsJobPosting).values({
      viewedJobPostingId: jobId,
      viewerUserId: userId,
    });
  },
  async bookmarkJob({
    jobPostingId,
    userId,
  }: {
    jobPostingId: number;
    userId: number;
  }) {
    return db.insert(userBookmarksJobPosting).values({
      jobPostingId,
      userId,
    });
  },
  async deleteJobBookmark({
    userId,
    jobPostingId,
  }: {
    userId: number;
    jobPostingId: number;
  }) {
    return db
      .delete(userBookmarksJobPosting)
      .where(
        and(
          eq(userBookmarksJobPosting.jobPostingId, jobPostingId),
          eq(userBookmarksJobPosting.userId, userId),
        ),
      );
  },
  async getBookmarkedJobs(userId: DBUser["id"]) {
    return db
      .select({
        // TODO: Get only the needed columns later on instead of spreading
        ...getTableColumns(jobPostings),
        bookmarkedAt: userBookmarksJobPosting.bookmarkedAt,
      })
      .from(jobPostings)
      .innerJoin(
        userBookmarksJobPosting,
        eq(jobPostings.id, userBookmarksJobPosting.jobPostingId),
      )
      .where(eq(userBookmarksJobPosting.userId, userId));
  },
  async getViewedJobs(userId: DBUser["id"]) {
    return db
      .select({
        // TODO: Get only the needed columns later on instead of spreading
        ...getTableColumns(jobPostings),
        viewedAt: userViewsJobPosting.viewedAt,
      })
      .from(jobPostings)
      .innerJoin(
        userViewsJobPosting,
        eq(jobPostings.id, userViewsJobPosting.viewedJobPostingId),
      )
      .where(eq(userViewsJobPosting.viewerUserId, userId));
  },
};

interface GetJobDetailsListParams extends Omit<GetJobListingsOutput, "page"> {
  workType?: Nullable<JobPostingSelectModel["workType"]>;
  employmentType?: Nullable<JobPostingSelectModel["employmentType"]>;
  userId: DBUser["id"];
  limit: number;
  skipAmount: number;
}

interface GetJobDetailsCountParams {
  query: string;
  workType?: Nullable<JobPostingSelectModel["workType"]>;
  employmentType?: Nullable<JobPostingSelectModel["employmentType"]>;
  userId: DBUser["id"];
  bookmarked: boolean;
  viewed: boolean;
}

interface GetJobByIdParams {
  jobId: JobPostingSelectModel["id"];
  userId: DBUser["id"];
}
