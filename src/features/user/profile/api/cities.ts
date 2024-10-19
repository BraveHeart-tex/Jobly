import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getCountryCitiesByNameUseCase } from "@/use-cases/cities";
import { number, object, parser, string } from "valibot";

export const cityRouter = createTRPCRouter({
  getCountryCitiesByName: protectedProcedure
    .input(
      parser(
        object({
          query: string(),
          countryId: number(),
        }),
      ),
    )
    .query(async ({ input }) => {
      return await getCountryCitiesByNameUseCase(input.countryId, input.query);
    }),
});
