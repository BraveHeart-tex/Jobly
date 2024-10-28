import { db } from "@/server/db";
import {
  cities,
  countries,
  educationalBackgrounds,
  userBios,
  userHighlightedSkills,
  userSkillEducationalBackgrounds,
  userSkillWorkExperiences,
  userSkills,
  users,
  workExperiences,
} from "@/server/db/schema";
import { and, asc, desc, eq, inArray } from "drizzle-orm";
import type { SaveAboutInformationInput } from "@/validators/user/profile/saveAboutInformationValidator";
import type {
  GetAboutInformationReturnType,
  SkillWithExperience,
  UserProfileInformation,
} from "@/features/user/profile/types";
import {
  deleteHighlightedUserSkills,
  getHighlightedUserSkillsByUserId,
} from "@/features/user/profile/data-access/userSkills";

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

        userSkills: {
          with: {
            skill: true,
            userSkillEducationalBackgrounds: true,
            userSkillWorkExperiences: true,
            userHighlightedSkills: true,
          },
        },
      },
    });

    if (!result) return null;

    const highlightedSkills: string[] = result.userSkills
      .map((userSkill) => {
        const userHighlightedSkill = userSkill.userHighlightedSkills.find(
          (item) => item.userSkillId === userSkill.id,
        );

        if (!userHighlightedSkill) return null;

        return userSkill.skill.name;
      })
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
        userSkillId: userSkill.id,
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
        userSkills: {
          with: {
            skill: true,
            userHighlightedSkills: {
              orderBy: () => asc(userHighlightedSkills.order),
            },
          },
        },
      },
    });

    if (!result) return null;

    const highlightedSkills: {
      name: string;
      userId: number;
      skillId: number;
      order: number;
    }[] = result.userSkills
      .map((userSkill) => {
        const userHighlightedSkill = userSkill.userHighlightedSkills.find(
          (userHighlightedSkill) =>
            userHighlightedSkill.userSkillId === userSkill.id,
        );

        if (!userHighlightedSkill) return null;

        return {
          name: userSkill.skill.name,
          userId: result.id,
          skillId: userSkill.skill.id,
          order: userHighlightedSkill.order,
        };
      })
      .filter(Boolean) as {
      name: string;
      userId: number;
      skillId: number;
      order: number;
    }[];

    return {
      bio: {
        id: result.userBio?.id,
        content: result.userBio?.bio || "",
      },
      highlightedSkills,
    };
  },
  // FIXME: God, help me.
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

      const highlightedUserSkillsResult =
        await getHighlightedUserSkillsByUserId(userId, trx);

      const prevHighlightedSkills = highlightedUserSkillsResult.map(
        (item) => item.UserHighlightedSkills,
      );

      const prevUserSkills = highlightedUserSkillsResult.map(
        (item) => item.UserSkills,
      );

      await Promise.all([
        prevUserSkills.length
          ? deleteHighlightedUserSkills(
              prevUserSkills.map((item) => item.id),
              trx,
            )
          : undefined,
        prevHighlightedSkills.length
          ? trx.delete(userHighlightedSkills).where(
              inArray(
                userHighlightedSkills.id,
                prevHighlightedSkills.map((item) => item.id),
              ),
            )
          : undefined,
      ]);

      if (highlightedSkills.length > 0) {
        const userSkillInsertIds = await trx
          .insert(userSkills)
          .values(
            highlightedSkills.map((item) => ({
              skillId: item.id,
              userId,
            })),
          )
          .$returningId();

        await trx.insert(userHighlightedSkills).values(
          highlightedSkills.map((item, index) => ({
            order: item.order,
            userSkillId: userSkillInsertIds[index]?.id as number,
          })),
        );

        const updatePromises = [];

        for (const [index, prevUserSkill] of prevUserSkills.entries()) {
          const newUserSkillId = userSkillInsertIds[index]?.id as number;
          updatePromises.push(
            trx
              .update(userSkillWorkExperiences)
              .set({
                userSkillId: newUserSkillId,
              })
              .where(
                eq(userSkillWorkExperiences.userSkillId, prevUserSkill.id),
              ),
            trx
              .update(userSkillEducationalBackgrounds)
              .set({
                userSkillId: newUserSkillId,
              })
              .where(
                eq(
                  userSkillEducationalBackgrounds.userSkillId,
                  prevUserSkill.id,
                ),
              ),
          );
        }

        await Promise.all(updatePromises);
      }
    });
  },
};
