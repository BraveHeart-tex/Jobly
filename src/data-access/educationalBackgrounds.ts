import { db } from "@/server/db";
import type {
  EducationalBackground,
  InsertEducationalBackgroundModel,
} from "@/server/db/schema/educationalBackgrounds";
import educationalBackgrounds from "@/server/db/schema/educationalBackgrounds";
import { and, eq } from "drizzle-orm";

export const createEducationalBackground = async (
  data: InsertEducationalBackgroundModel,
): Promise<number | undefined> => {
  const [insertIdResult] = await db
    .insert(educationalBackgrounds)
    .values(data)
    .$returningId();
  return insertIdResult?.id;
};

export const deleteEducationalBackground = async (
  userId: number,
  educationalBackgroundId: number,
): Promise<void> => {
  await db
    .delete(educationalBackgrounds)
    .where(
      and(
        eq(educationalBackgrounds.userId, userId),
        eq(educationalBackgrounds.id, educationalBackgroundId),
      ),
    );
};

export const getEducationalBackground = async (
  userId: number,
  educationalBackgroundId: number,
): Promise<EducationalBackground | undefined> => {
  return await db.query.educationalBackgrounds.findFirst({
    where: () =>
      and(
        eq(educationalBackgrounds.userId, userId),
        eq(educationalBackgrounds.id, educationalBackgroundId),
      ),
  });
};
