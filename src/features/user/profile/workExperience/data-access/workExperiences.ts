import { db } from "@/server/db";
import workExperiences, {
  type WorkExperience,
  type InsertWorkExperienceModel,
} from "@/server/db/schema/workExperiences";
import { and, eq } from "drizzle-orm";
import type { MakeFieldsRequired } from "@/lib/types";
import type {
  GetWorkExperienceParams,
  DeleteWorkExperienceParams,
} from "@/features/user/profile/workExperience/types";

export const createWorkExperience = (
  data: InsertWorkExperienceModel,
): Promise<{ id: number }[]> => {
  return db.insert(workExperiences).values(data).$returningId();
};

export const getWorkExperience = ({
  experienceId,
  userId,
}: GetWorkExperienceParams): Promise<WorkExperience | undefined> => {
  return db.query.workExperiences.findFirst({
    where: () =>
      and(
        eq(workExperiences.id, experienceId),
        eq(workExperiences.userId, userId),
      ),
  });
};

export const updateWorkExperience = (
  data: MakeFieldsRequired<WorkExperience, "id">,
) => {
  return db
    .update(workExperiences)
    .set(data)
    .where(
      and(
        eq(workExperiences.id, data.id),
        eq(workExperiences.userId, data.userId),
      ),
    );
};

export const deleteWorkExperience = ({
  userId,
  experienceId,
}: DeleteWorkExperienceParams) => {
  return db
    .delete(workExperiences)
    .where(
      and(
        eq(workExperiences.userId, userId),
        eq(workExperiences.id, experienceId),
      ),
    );
};
