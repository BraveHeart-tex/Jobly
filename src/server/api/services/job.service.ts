import type { MakeFieldsRequired } from "@/lib/types";
import { db } from "@/server/db";
import {
  type JobInsertModel,
  company,
  job,
  userViewsJob,
} from "@/server/db/schema";
import { and, desc, eq, exists, getTableColumns } from "drizzle-orm";

export const getJobListings = async (userId: number) => {
  return db
    .select({
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
    })
    .from(job)
    .innerJoin(company, eq(job.companyId, company.id))
    .leftJoin(userViewsJob, eq(job.id, userViewsJob.viewedJobId))
    .orderBy(desc(job.createdAt))
    .limit(12);
};

export const getJobById = async (id: number) => {
  return db.query.job.findFirst({
    where: (job, { eq }) => eq(job.id, id),
    with: {
      company: {
        columns: { name: true, logo: true },
      },
    },
  });
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
