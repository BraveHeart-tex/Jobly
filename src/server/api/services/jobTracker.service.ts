import { db } from "@/server/db";
import { jobTrackerApplications } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import type { User } from "lucia";

export const getJobTrackerApplications = async (userId: User["id"]) => {
  return db.query.jobTrackerApplications.findMany({
    where: eq(jobTrackerApplications.userId, userId),
  });
};
