import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getCountriesByNameUseCase } from "@/use-cases/countries";
import { parser, object, string } from "valibot";

export const countryRouter = createTRPCRouter({
  getCountriesByName: protectedProcedure
    .input(
      parser(
        object({
          query: string(),
        }),
      ),
    )
    .query(async ({ input }) => {
      return await getCountriesByNameUseCase(input.query);
    }),
});
