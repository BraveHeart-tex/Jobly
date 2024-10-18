import { getCountriesByName } from "@/data-access/countries";

export const getCountriesByNameUseCase = async (query: string) => {
  return await getCountriesByName(query);
};
