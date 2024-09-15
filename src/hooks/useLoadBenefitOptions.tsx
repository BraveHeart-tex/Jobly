import type { OptionType } from "@/components/common/CreatableMultiSelect";
import { api } from "@/trpc/react";
import { useDebouncedOptionLoader } from "./useDebouncedOptionLoader";

export const useLoadBenefitOptions = () => {
  const queryClientUtils = api.useUtils();

  const fetchBenefits = async (benefitsQuery: string) => {
    return queryClientUtils.benefit.getBenefitsByName.fetch({
      query: benefitsQuery,
    });
  };

  const mapBenefitToOption = (benefit: { name: string }): OptionType => ({
    label: benefit.name,
    value: benefit.name,
  });

  return useDebouncedOptionLoader(fetchBenefits, mapBenefitToOption);
};
