import { getCountriesByName } from "@/features/user/profile/data-access/countries";

export const getCountriesByNameUseCase = async (query: string) => {
  return await getCountriesByName(query);
};
