import type { OptionType } from "@/components/common/CreatableMultiSelect";
import { api } from "@/trpc/react";

export const useFetchBenefits = () => {
  const queryClientUtils = api.useUtils();

  const fetchBenefits = async (
    benefitsQuery: string,
  ): Promise<OptionType[]> => {
    const benefits = await queryClientUtils.benefit.getBenefitsByName.fetch({
      query: benefitsQuery,
    });

    return benefits.map((benefit) => ({
      label: benefit.name,
      value: benefit.name,
    }));
  };

  return { fetchBenefits };
};
