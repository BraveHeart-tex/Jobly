import { db } from "@/server/db";
import workExperiences, {
  type WorkExperience,
  type WorkExperienceInsertModel,
} from "@/server/db/schema/workExperiences";
import type { GetWorkExperienceParams } from "../types";
import { and, eq } from "drizzle-orm";
import type { MakeFieldsRequired } from "@/lib/types";

export const workExperienceRepository = {
  async createWorkExperience(
    data: WorkExperienceInsertModel,
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
};
