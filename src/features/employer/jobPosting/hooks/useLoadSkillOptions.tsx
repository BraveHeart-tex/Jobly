import { api } from "@/trpc/react";
import type { OptionType } from "@/components/common/CreatableMultiSelect";
import { useDebouncedOptionLoader } from "../../../../hooks/useDebouncedOptionLoader";

export const useLoadSkillOptions = () => {
  const queryClientUtils = api.useUtils();

  const fetchSkills = async (query: string) => {
    return queryClientUtils.skill.getSkillsByName.fetch({
      query,
    });
  };

  const mapSkillToOption = (skill: {
    name: string;
    id: number;
  }): OptionType => ({
    label: skill.name,
    value: skill.id.toString(),
  });

  return useDebouncedOptionLoader(fetchSkills, mapSkillToOption);
};
