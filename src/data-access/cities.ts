import { ASYNC_SELECT_OPTIONS_LIMIT } from "@/lib/constants";
import { db } from "@/server/db";
import { cities } from "@/server/db/schema";
import { and, eq, like } from "drizzle-orm";

export const getCountryCitiesByName = async (
  countryId: number,
  query: string,
) => {
  return await db
    .select()
    .from(cities)
    .where(
      and(eq(cities.countryId, countryId), like(cities.name, `%${query}%`)),
    )
    .limit(ASYNC_SELECT_OPTIONS_LIMIT);
};
