import {
  jobPostings,
  userBookmarksJobPosting,
  userViewsJobPosting,
} from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import type { MySqlSelect } from "drizzle-orm/mysql-core";

export function withBookmarkJoin<T extends MySqlSelect>(
  qb: T,
  userId: number,
  bookmarkedCondition: boolean,
) {
  return bookmarkedCondition
    ? qb.innerJoin(
        userBookmarksJobPosting,
        and(
          eq(jobPostings.id, userBookmarksJobPosting.jobPostingId),
          eq(userBookmarksJobPosting.userId, userId),
        ),
      )
    : qb.leftJoin(
        userBookmarksJobPosting,
        and(
          eq(jobPostings.id, userBookmarksJobPosting.jobPostingId),
          eq(userBookmarksJobPosting.userId, userId),
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
        userViewsJobPosting,
        and(
          eq(jobPostings.id, userViewsJobPosting.viewedJobPostingId),
          eq(userViewsJobPosting.viewerUserId, userId),
        ),
      )
    : qb.leftJoin(
        userViewsJobPosting,
        and(
          eq(jobPostings.id, userViewsJobPosting.viewedJobPostingId),
          eq(userViewsJobPosting.viewerUserId, userId),
        ),
      );
}
