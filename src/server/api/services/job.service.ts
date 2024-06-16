import type { MakeFieldsRequired } from "@/lib/types";
import { db } from "@/server/db";
import {
  type JobInsertModel,
  company,
  job,
  userViewsJob,
  userBookmarksJob,
} from "@/server/db/schema";
import { and, desc, eq, exists, getTableColumns } from "drizzle-orm";

const jobDetailsWithUserViewStatusQuery = (userId: number) =>
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

export const getJobListings = async (userId: number) => {
  const jobDetailsList = await jobDetailsWithUserViewStatusQuery(userId)
    .orderBy(desc(job.createdAt))
    .limit(12);

  return jobDetailsList;
};

export const getJobById = async ({
  jobId,
  userId,
}: { jobId: number; userId: number }) => {
  const jobDetails = await jobDetailsWithUserViewStatusQuery(userId).where(
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
