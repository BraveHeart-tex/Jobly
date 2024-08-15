import { db } from "@/server/db";
import type { JobPosting } from "@/server/db/schema/jobPostings";
import jobPostings from "@/server/db/schema/jobPostings";
import { and, eq, gt, lt } from "drizzle-orm";

export const getJobPostings = ({
  companyId,
  status,
}: {
  companyId: JobPosting["companyId"];
  status?: JobPosting["status"] | "expired";
}) => {
  if (status === "draft") {
    return getDraftJobPostings(companyId);
  }

  if (status === "published") {
    return getActiveJobPostings(companyId);
  }

  if (status === "expired") {
    return getExpiredJobPostings(companyId);
  }

  return db.query.jobPostings.findMany({
    where: () => eq(jobPostings.companyId, companyId),
  });
};

export const getActiveJobPostings = (companyId: JobPosting["companyId"]) => {
  return db.query.jobPostings.findMany({
    where: () =>
      and(
        eq(jobPostings.companyId, companyId),
        eq(jobPostings.status, "published"),
        gt(jobPostings.expiresAt, new Date().toISOString()),
      ),
  });
};

export const getDraftJobPostings = (companyId: JobPosting["companyId"]) => {
  return db.query.jobPostings.findMany({
    where: () =>
      and(
        eq(jobPostings.companyId, companyId),
        eq(jobPostings.status, "draft"),
      ),
  });
};

export const getExpiredJobPostings = (companyId: JobPosting["companyId"]) => {
  return db.query.jobPostings.findMany({
    where: () =>
      and(
        eq(jobPostings.companyId, companyId),
        eq(jobPostings.status, "published"),
        lt(jobPostings.expiresAt, new Date().toISOString()),
      ),
  });
};
