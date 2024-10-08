import { db } from "@/server/db";
import workExperiences, {
  type WorkExperienceInsertModel,
} from "@/server/db/schema/workExperiences";

export const workExperienceRepository = {
  async createWorkExperience(
    data: WorkExperienceInsertModel,
  ): Promise<{ id: number }[]> {
    return db.insert(workExperiences).values(data).$returningId();
  },
};
