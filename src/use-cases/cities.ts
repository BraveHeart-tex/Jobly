import { getCountryCitiesByName } from "@/data-access/cities";

export const getCountryCitiesByNameUseCase = async (
  countryId: number,
  query: string,
) => {
  return await getCountryCitiesByName(countryId, query);
};
