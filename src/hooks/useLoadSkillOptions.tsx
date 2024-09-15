import { api } from "@/trpc/react";
import type { OptionType } from "@/components/common/CreatableMultiSelect";
import { useDebouncedOptionLoader } from "./useDebouncedOptionLoader";

export const useLoadSkillOptions = () => {
  const queryClientUtils = api.useUtils();

  const fetchSkills = async (query: string) => {
    return queryClientUtils.skill.getSkillsByName.fetch({
      query,
    });
  };

  const mapSkillToOption = (skill: { name: string }): OptionType => ({
    label: skill.name,
    value: skill.name,
  });

  return useDebouncedOptionLoader(fetchSkills, mapSkillToOption);
};
