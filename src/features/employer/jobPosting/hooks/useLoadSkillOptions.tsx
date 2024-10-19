import type { OptionType } from "@/components/common/select/types";
import { useDebouncedOptionLoader } from "@/hooks/useDebouncedOptionLoader";
import type { SkillSelectModel } from "@/server/db/schema/skills";
import { api } from "@/trpc/react";

export const useLoadSkillOptions = () => {
  const queryClientUtils = api.useUtils();

  const fetchSkills = async (query: string) => {
    return queryClientUtils.skill.getSkillsByName.fetch({
      query,
    });
  };

  const mapSkillToOption = (skill: SkillSelectModel): OptionType => ({
    label: skill.name,
    value: skill.id.toString(),
  });

  return useDebouncedOptionLoader(fetchSkills, mapSkillToOption);
};
