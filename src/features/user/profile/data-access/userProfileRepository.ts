import { db } from "@/server/db";
import {
  cities,
  countries,
  educationalBackgrounds,
  userBios,
  userHighlightedSkills,
  userSkills,
  users,
  workExperiences,
} from "@/server/db/schema";
import { and, asc, desc, eq, inArray } from "drizzle-orm";
import type { SaveAboutInformationInput } from "@/validators/user/profile/saveAboutInformationValidator";
import { mapHighlightedSkills } from "@/features/user/profile/utils";
import type {
  GetAboutInformationReturnType,
  SkillWithExperience,
  UserProfileInformation,
} from "@/features/user/profile/types";

export const userProfileRepository = {
  async fetchUserProfileDetails(
    userId: number,
  ): Promise<UserProfileInformation | null> {
    const result = await db.query.users.findFirst({
      columns: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
      },
      where: () => eq(users.id, userId),
      with: {
        userBio: {
          columns: {
            bio: true,
          },
        },
        userProfile: true,
        workExperiences: {
          orderBy: () => desc(workExperiences.startDate),
        },
        educationalBackgrounds: {
          orderBy: () => desc(educationalBackgrounds.startDate),
        },
        userHighlightedSkills: {
          orderBy: () => asc(userHighlightedSkills.order),
          columns: {
            skillId: true,
          },
        },
        userSkills: {
          with: {
            skill: true,
            userSkillEducationalBackgrounds: true,
            userSkillWorkExperiences: true,
          },
        },
      },
    });

    if (!result) return null;

    const highlightedSkills = result.userHighlightedSkills
      .map(
        (item) =>
          result?.userSkills.find(
            (skillItem) => skillItem.skillId === item.skillId,
          )?.skill.name || "",
      )
      .filter(Boolean) as string[];

    const cityId = result.userProfile?.cityId;
    const countryId = result.userProfile?.countryId;

    let country = "";
    let city = "";

    if (countryId) {
      const countryResult = await db.query.countries.findFirst({
        columns: {
          name: true,
        },
        where: () => eq(countries.id, countryId),
        with: {
          ...(cityId
            ? {
                cities: {
                  where: () => eq(cities.id, cityId),
                  limit: 1,
                },
              }
            : {}),
        },
      });

      country = countryResult?.name || "";
      city = countryResult?.cities?.[0]?.name || "";
    }

    const skillsWithExperience: SkillWithExperience[] = result.userSkills
      .map((userSkill) => ({
        skillId: userSkill.skill.id,
        skillName: userSkill.skill.name,
        workExperiences: userSkill.userSkillWorkExperiences.map((item) => {
          const workExperience = result.workExperiences.find(
            (workExperience) => workExperience.id === item.workExperienceId,
          );

          if (!workExperience) return null;
          return {
            workExperienceId: workExperience.id,
            workExperienceTitle: `${workExperience.jobTitle} - ${workExperience.employer}`,
          };
        }),
        educationalBackgrounds: userSkill.userSkillEducationalBackgrounds.map(
          (item) => {
            const educationalBackground = result.educationalBackgrounds.find(
              (educationalBackground) =>
                educationalBackground.id === item.educationalBackgroundId,
            );

            if (!educationalBackground) return null;
            return {
              educationalBackgroundId: educationalBackground.id,
              educationalBackgroundTitle: `${educationalBackground.fieldOfStudy} - ${educationalBackground.school}`,
            };
          },
        ),
      }))
      .filter(Boolean) as SkillWithExperience[];

    return {
      firstName: result.firstName,
      lastName: result.lastName,
      avatarUrl: result.avatarUrl,
      ...result.userProfile,
      educationalBackground: result.educationalBackgrounds,
      skills: result.userSkills.map((item) => item.skill),
      skillsWithExperience,
      bio: result.userBio?.bio || "",
      highlightedSkills,
      workExperiences: result.workExperiences,
      country,
      city,
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
      if (!bio?.id) {
        await trx.insert(userBios).values({
          userId,
          bio: bio?.content || "",
        });
      } else {
        await trx
          .update(userBios)
          .set({
            bio: bio?.content || "",
          })
          .where(and(eq(userBios.userId, userId), eq(userBios.id, bio.id)));
      }

      if (!highlightedSkills) return;

      const hasHighlightedSkills = highlightedSkills.length > 0;

      await Promise.all([
        hasHighlightedSkills
          ? trx.delete(userSkills).where(
              and(
                eq(userSkills.userId, userId),
                inArray(
                  userSkills.skillId,
                  highlightedSkills.map((item) => item.id),
                ),
              ),
            )
          : undefined,
        trx
          .delete(userHighlightedSkills)
          .where(eq(userHighlightedSkills.userId, userId)),
      ]);

      if (!hasHighlightedSkills) return;

      await Promise.all([
        trx.insert(userSkills).values(
          highlightedSkills.map((item) => ({
            userId,
            skillId: item.id,
          })),
        ),
        trx.insert(userHighlightedSkills).values(
          highlightedSkills.map((item) => ({
            userId,
            skillId: item.id,
            order: item.order,
          })),
        ),
      ]);
    });
  },
};
