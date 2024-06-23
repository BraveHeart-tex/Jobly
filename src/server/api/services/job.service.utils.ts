import { job, userBookmarksJob, userViewsJob } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import type { MySqlSelect } from "drizzle-orm/mysql-core";

export function withBookmarkJoin<T extends MySqlSelect>(
  qb: T,
  userId: number,
  bookmarkedCondition: boolean,
) {
  return bookmarkedCondition
    ? qb.innerJoin(
        userBookmarksJob,
        and(
          eq(job.id, userBookmarksJob.jobId),
          eq(userBookmarksJob.userId, userId),
        ),
      )
    : qb.leftJoin(
        userBookmarksJob,
        and(
          eq(job.id, userBookmarksJob.jobId),
          eq(userBookmarksJob.userId, userId),
        ),
      );
}

export function withUserViewsJobJoin<T extends MySqlSelect>(
  qb: T,
  userId: number,
  viewedCondition: boolean,
) {
  return viewedCondition
    ? qb.innerJoin(
        userViewsJob,
        and(
          eq(job.id, userViewsJob.viewedJobId),
          eq(userViewsJob.viewerUserId, userId),
        ),
      )
    : qb.leftJoin(
        userViewsJob,
        and(
          eq(job.id, userViewsJob.viewedJobId),
          eq(userViewsJob.viewerUserId, userId),
        ),
      );
}
