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
import { and, desc, eq, inArray } from "drizzle-orm";
import type { SaveAboutInformationInput } from "@/validators/user/profile/saveAboutInformationValidator";
import type {
  GetAboutInformationReturnType,
  SkillWithExperience,
  UserProfileInformation,
} from "@/features/user/profile/types";
import { getHighlightedUserSkillsByUserId } from "@/features/user/profile/data-access/userSkills";

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

        return {
          skillName: userSkill.skill.name,
          ...userHighlightedSkill,
        };
      })
      .filter(Boolean)
      // biome-ignore lint/style/noNonNullAssertion: we filtered the nulls in the line above
      .sort((a, b) => a!.order - b!.order)
      .map((item) => item?.skillName as string);

    const mappedUserSkills = result.userSkills
      .sort((a, b) => {
        if (!a.displayOrder && !b.displayOrder) return a.id - b.id;

        return (a?.displayOrder || 0) - (b.displayOrder || 0);
      })
      .map((item) => item.skill);

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
      skills: mappedUserSkills,
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
            userHighlightedSkills: true,
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
      .filter((item) => item !== null)
      .sort((a, b) => a.order - b.order);

    return {
      bio: {
        id: result.userBio?.id,
        content: result.userBio?.bio || "",
      },
      highlightedSkills,
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

      const newHighlightedSkillIds = highlightedSkills.map((item) => item.id);

      const highlightedUserSkillsResult =
        await getHighlightedUserSkillsByUserId(userId, trx);

      const prevUserSkills = highlightedUserSkillsResult.map((item) => ({
        ...item.UserSkills,
        highlighted: !!item.UserHighlightedSkills?.id,
      }));

      // get the deleted ones
      const deletedUserSkills = prevUserSkills.filter(
        (item) => !newHighlightedSkillIds.includes(item.skillId),
      );

      // get the added ones
      const addedUserHighlightedSkills = highlightedSkills.filter(
        (highlightedSkill) =>
          !prevUserSkills
            .map((item) => item.skillId)
            .includes(highlightedSkill.id),
      );

      if (deletedUserSkills.length > 0) {
        await trx.delete(userHighlightedSkills).where(
          inArray(
            userHighlightedSkills.userSkillId,
            deletedUserSkills.map((item) => item.id),
          ),
        );
      }

      if (addedUserHighlightedSkills.length > 0) {
        const userSkillIdsResult = await trx
          .insert(userSkills)
          .values(
            addedUserHighlightedSkills
              .filter(
                (skill) =>
                  !prevUserSkills
                    .map((prevUserSkill) => prevUserSkill.skillId)
                    .includes(skill.id),
              )
              .map((item) => ({
                userId,
                skillId: item.id,
              })),
          )
          .$returningId();

        await trx.insert(userHighlightedSkills).values(
          addedUserHighlightedSkills.map((item, index) => ({
            userSkillId:
              userSkillIdsResult[index]?.id ||
              (prevUserSkills
                .map((item) => item.id)
                .find((id) => id === item.id) as number),
            order: item.order,
          })),
        );
      }

      const unhHighlightedUserSkills = highlightedSkills.filter((item) => {
        const userSkill = prevUserSkills.find(
          (prevUserSkill) =>
            !prevUserSkill.highlighted && prevUserSkill.skillId === item.id,
        );
        return userSkill;
      });

      if (unhHighlightedUserSkills.length > 0) {
        await trx.insert(userHighlightedSkills).values(
          unhHighlightedUserSkills.map((item) => ({
            order: item.order,
            userSkillId: prevUserSkills.find(
              (userSkill) => userSkill.skillId === item.id,
            )?.id as number,
          })),
        );
      }

      const shouldUpdateItemDisplayOrders =
        deletedUserSkills.length === 0 &&
        addedUserHighlightedSkills.length === 0 &&
        highlightedSkills.length > 0;

      if (shouldUpdateItemDisplayOrders) {
        await Promise.all(
          highlightedSkills
            .map((skill) => {
              const userSkillItem = prevUserSkills.find(
                (userSkill) => userSkill.skillId === skill.id,
              );

              if (!userSkillItem) return;

              return trx
                .update(userHighlightedSkills)
                .set({
                  order: skill.order,
                })
                .where(eq(userHighlightedSkills.userSkillId, userSkillItem.id));
            })
            .filter(Boolean),
        );
      }
    });
  },
};
