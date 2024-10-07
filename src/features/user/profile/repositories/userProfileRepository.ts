import { db } from "@/server/db";
import {
  educationalBackgrounds,
  userBios,
  userHighlightedSkills,
  users,
  workExperiences,
} from "@/server/db/schema";
import { and, asc, desc, eq } from "drizzle-orm";
import type {
  GetAboutInformationReturnType,
  UserProfileInformation,
} from "../types";
import type { SaveAboutInformationInput } from "@/validators/user/profile/saveAboutInformationValidator";
import { mapHighlightedSkills } from "../utils";

export const userProfileRepository = {
  async getUserProfileInformation(
    userId: number,
  ): Promise<UserProfileInformation | null> {
    const result = await db.query.users.findFirst({
      columns: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
      where: () => eq(users.id, userId),
      with: {
        workExperiences: {
          orderBy: () => desc(workExperiences.startDate),
        },
        educationalBackgrounds: {
          orderBy: () => desc(educationalBackgrounds.startDate),
        },
        userSkills: {
          with: {
            skill: true,
          },
        },
      },
    });

    if (!result) return null;

    return {
      firstName: result.firstName,
      lastName: result.lastName,
      educationalBackground: result.educationalBackgrounds,
      skills: result.userSkills.map((item) => ({
        ...item.skill,
        level: item.level,
      })),
      workExperiences: result.workExperiences,
    };
  },
  async getAboutInformation(
    userId: number,
  ): Promise<GetAboutInformationReturnType | null> {
    const result = await db.query.users.findFirst({
      columns: {
        id: true,
      },
      where: () => eq(users.id, userId),
      with: {
        userBio: {
          columns: {
            id: true,
            bio: true,
          },
        },
        userHighlightedSkills: {
          orderBy: () => asc(userHighlightedSkills.order),
          with: {
            skill: true,
          },
        },
      },
    });

    if (!result) return null;

    return {
      bio: {
        id: result.userBio?.id,
        content: result.userBio?.bio || "",
      },
      highlightedSkills: mapHighlightedSkills(result.userHighlightedSkills),
    };
  },
  async saveAboutInformation(
    userId: number,
    input: SaveAboutInformationInput,
  ): Promise<void> {
    const { bio, highlightedSkills } = input;

    await db.transaction(async (trx) => {
      if (bio?.id) {
        // update
        await trx
          .update(userBios)
          .set({
            bio: bio?.content || "",
          })
          .where(and(eq(userBios.userId, userId), eq(userBios.id, bio.id)));
      } else {
        // insert
        await trx.insert(userBios).values({
          userId,
          bio: bio?.content || "",
        });
      }

      if (highlightedSkills) {
        await trx
          .delete(userHighlightedSkills)
          .where(eq(userHighlightedSkills.userId, userId));
        await trx.insert(userHighlightedSkills).values(
          highlightedSkills.map((item) => ({
            userId,
            skillId: item.id,
            order: item.order,
          })),
        );
      }
    });
  },
};
