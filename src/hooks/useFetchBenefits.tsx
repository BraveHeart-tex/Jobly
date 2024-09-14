import { api } from "@/trpc/react";

export const useFetchBenefits = () => {
  const queryClientUtils = api.useUtils();

  const { isFetching: isFetchingBenefits, data: benefits } =
    api.benefit.getBenefitsByName.useQuery({
      query: "",
    });

  const fetchBenefits = (benefitsQuery: string) => {
    queryClientUtils.benefit.getBenefitsByName.fetch({
      query: benefitsQuery,
    });
  };

  return { fetchBenefits, benefits, isFetchingBenefits };
};
