import type { OptionType } from "@/components/common/select/types";
import { useDebouncedOptionLoader } from "@/hooks/useDebouncedOptionLoader";
import type { City } from "@/server/db/schema/cities";
import { api } from "@/trpc/react";

export const useLoadCityOptions = (countryId: number | null | undefined) => {
  const queryClientUtils = api.useUtils();

  const fetchCountryCities = async (
    query: string,
    countryId?: number | null,
  ) => {
    if (!countryId) return [];
    return queryClientUtils.cities.getCountryCitiesByName.fetch({
      query,
      countryId,
    });
  };

  const mapCityToOption = (city: City): OptionType => ({
    label: city.name,
    value: city.id.toString(),
  });

  return useDebouncedOptionLoader(
    fetchCountryCities,
    mapCityToOption,
    countryId,
  );
};
