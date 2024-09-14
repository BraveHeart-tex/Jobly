import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { skillsService } from "../services/skillsService";

export const skillsRouter = createTRPCRouter({
  getSkillsByName: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ ctx, input }) => {
      const { user } = ctx;
      if (user.role !== "employer") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action.",
        });
      }

      return skillsService.getSkillsByName(input.query);
    }),
});
