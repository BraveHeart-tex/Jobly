import type { JobTrackerApplicationSchema } from "@/schemas/jobTrackerApplicationSchema";
import { db } from "@/server/db";
import { jobTrackerApplications } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import type { User } from "lucia";

export const getJobTrackerApplications = async (userId: User["id"]) => {
  return db.query.jobTrackerApplications.findMany({
    where: eq(jobTrackerApplications.userId, userId),
  });
};

export const createJobTrackerApplication = async (
  data: JobTrackerApplicationSchema,
) => {
  const [response] = await db
    .insert(jobTrackerApplications)
    .values(data)
    .$returningId();

  return response?.id;
};
