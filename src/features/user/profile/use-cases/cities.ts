import { getCountryCitiesByName } from "@/features/user/profile/data-access/cities";

export const getCountryCitiesByNameUseCase = async (
  countryId: number,
  query: string,
) => {
  return await getCountryCitiesByName(countryId, query);
};
