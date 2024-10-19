import type { OptionType } from "@/components/common/select/types";
import { useDebouncedOptionLoader } from "@/hooks/useDebouncedOptionLoader";
import type { Country } from "@/server/db/schema/countries";
import { api } from "@/trpc/react";

export const useLoadCountryOptions = () => {
  const queryClientUtils = api.useUtils();

  const fetchCountries = async (query: string) => {
    return queryClientUtils.countries.getCountriesByName.fetch({
      query,
    });
  };

  const mapCountryToOption = (country: Country): OptionType => ({
    label: country.name,
    value: country.id.toString(),
  });

  return useDebouncedOptionLoader(fetchCountries, mapCountryToOption);
};
