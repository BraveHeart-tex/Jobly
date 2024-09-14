import { api } from "@/trpc/react";

export const useFetchSkills = () => {
  const queryClientUtils = api.useUtils();

  const { isFetching: isFetchingSkills, data: skills } =
    api.skill.getSkillsByName.useQuery({
      query: "",
    });

  const fetchSkills = (skillsQuery: string) => {
    queryClientUtils.skill.getSkillsByName.fetch({
      query: skillsQuery,
    });
  };

  return { fetchSkills, skills, isFetchingSkills };
};
