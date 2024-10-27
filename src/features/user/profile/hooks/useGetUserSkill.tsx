import { api } from "@/trpc/react";

export const useGetUserSkill = (userSkillId?: number | null) => {
  const { data: userSkill, isPending: isFetchingUserSkill } =
    api.userSkills.getUserSkillById.useQuery(
      {
        id: userSkillId as number,
      },
      {
        enabled: !!userSkillId,
      },
    );

  return { userSkill, isFetchingUserSkill };
};
