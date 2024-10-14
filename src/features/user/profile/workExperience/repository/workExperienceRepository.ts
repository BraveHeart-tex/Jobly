import { db } from "@/server/db";
import workExperiences, {
  type WorkExperience,
  type InsertWorkExperienceModel,
} from "@/server/db/schema/workExperiences";
import type {
  DeleteWorkExperienceParams,
  GetWorkExperienceParams,
} from "../types";
import { and, eq } from "drizzle-orm";
import type { MakeFieldsRequired } from "@/lib/types";

export const workExperienceRepository = {
  async createWorkExperience(
    data: InsertWorkExperienceModel,
  ): Promise<{ id: number }[]> {
    return db.insert(workExperiences).values(data).$returningId();
  },
  async getWorkExperience({
    experienceId,
    userId,
  }: GetWorkExperienceParams): Promise<WorkExperience | undefined> {
    return db.query.workExperiences.findFirst({
      where: () =>
        and(
          eq(workExperiences.id, experienceId),
          eq(workExperiences.userId, userId),
        ),
    });
  },
  async updateWorkExperience(data: MakeFieldsRequired<WorkExperience, "id">) {
    return db
      .update(workExperiences)
      .set(data)
      .where(
        and(
          eq(workExperiences.id, data.id),
          eq(workExperiences.userId, data.userId),
        ),
      );
  },
  async deleteWorkExperience({
    userId,
    experienceId,
  }: DeleteWorkExperienceParams) {
    return db
      .delete(workExperiences)
      .where(
        and(
          eq(workExperiences.userId, userId),
          eq(workExperiences.id, experienceId),
        ),
      );
  },
};
