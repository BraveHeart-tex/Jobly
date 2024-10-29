import { api } from "@/trpc/react";

export const useGetUserSkills = () => {
  const { data: userSkills, isPending: isFetchingUserSkills } =
    api.userSkills.getUserSkillsByUserId.useQuery();

  return { userSkills, isFetchingUserSkills };
};
