import { api } from "@/trpc/react";

export const useFetchSkills = (query: string) => {
  const { isFetching: isFetchingSkills, data: skills } =
    api.skill.getSkillsByName.useQuery({
      query,
    });

  return { skills, isFetchingSkills };
};
