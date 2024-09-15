import { api } from "@/trpc/react";
import type { OptionType } from "@/components/common/CreatableMultiSelect";

export const useFetchSkills = () => {
  const utils = api.useUtils();

  const fetchSkills = async (query: string): Promise<OptionType[]> => {
    const skills = await utils.skill.getSkillsByName.fetch({
      query,
    });

    return skills.map((skill) => ({
      label: skill.name,
      value: skill.name,
    }));
  };

  return { fetchSkills };
};
