import { db } from "@/server/db";
import type { Country } from "@/server/db/schema/countries";
import countries from "@/server/db/schema/countries";
import { like } from "drizzle-orm";

export const getCountriesByName = async (query: string): Promise<Country[]> => {
  return await db
    .select()
    .from(countries)
    .where(like(countries.name, `%${query}%`));
};
