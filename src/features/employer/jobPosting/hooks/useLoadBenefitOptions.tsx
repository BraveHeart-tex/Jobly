import type { OptionType } from "@/components/common/CreatableMultiSelect";
import { useDebouncedOptionLoader } from "@/hooks/useDebouncedOptionLoader";
import type { BenefitSelectModel } from "@/server/db/schema/benefits";
import { api } from "@/trpc/react";

export const useLoadBenefitOptions = () => {
  const queryClientUtils = api.useUtils();

  const fetchBenefits = async (benefitsQuery: string) => {
    return queryClientUtils.benefit.getBenefitsByName.fetch({
      query: benefitsQuery,
    });
  };

  const mapBenefitToOption = (benefit: BenefitSelectModel): OptionType => ({
    label: benefit.name,
    value: benefit.id,
  });

  return useDebouncedOptionLoader(fetchBenefits, mapBenefitToOption);
};
