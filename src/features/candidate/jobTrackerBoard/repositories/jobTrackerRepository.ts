import type { MakeFieldsRequired } from "@/lib/types";
import { buildConflictUpdateColumns, db } from "@/server/db";
import { jobTrackerApplications } from "@/server/db/schema";
import type {
  JobTrackerApplication,
  JobTrackerApplicationInsertModel,
} from "@/server/db/schema/jobTrackerApplications";
import { and, eq } from "drizzle-orm";

export const jobTrackerApplicationRepository = {
  async getApplicationsByUserId(userId: JobTrackerApplication["userId"]) {
    return db.query.jobTrackerApplications.findMany({
      where: eq(jobTrackerApplications.userId, userId),
    });
  },

  async createApplication(data: JobTrackerApplicationInsertModel) {
    const [response] = await db
      .insert(jobTrackerApplications)
      .values(data)
      .$returningId();

    return response?.id;
  },

  async deleteApplicationById({
    id,
    userId,
  }: {
    id: JobTrackerApplication["id"];
    userId: JobTrackerApplication["userId"];
  }) {
    return db
      .delete(jobTrackerApplications)
      .where(
        and(
          eq(jobTrackerApplications.id, id),
          eq(jobTrackerApplications.userId, userId),
        ),
      );
  },

  async updateApplication(
    data: MakeFieldsRequired<JobTrackerApplicationInsertModel, "id" | "userId">,
  ) {
    return db
      .update(jobTrackerApplications)
      .set(data)
      .where(
        and(
          eq(jobTrackerApplications.id, data.id),
          eq(jobTrackerApplications.userId, data.userId),
        ),
      );
  },

  async deleteApplicationsByStatus({
    userId,
    status,
  }: Pick<JobTrackerApplicationInsertModel, "userId" | "status">) {
    return db
      .delete(jobTrackerApplications)
      .where(
        and(
          eq(jobTrackerApplications.status, status),
          eq(jobTrackerApplications.userId, userId),
        ),
      );
  },

  async saveApplicationDetails(data: JobTrackerApplicationInsertModel[]) {
    return db
      .insert(jobTrackerApplications)
      .values(data)
      .onDuplicateKeyUpdate({
        set: buildConflictUpdateColumns(jobTrackerApplications, ["id"]),
      });
  },
};
