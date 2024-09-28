import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { userProfileService } from "../services/userProfileService";

const optionalUserIdSchema = z
  .object({
    userId: z.number().optional().nullable(),
  })
  .optional()
  .default({});

export const userProfileRouter = createTRPCRouter({
  getUserProfileInformation: protectedProcedure
    .input(optionalUserIdSchema)
    .query(async ({ ctx, input }) => {
      const userId = input?.userId || ctx.user.id;

      return userProfileService.getUserProfileInformation(userId);
    }),
  getAboutInformation: protectedProcedure
    .input(optionalUserIdSchema)
    .query(async ({ ctx, input }) => {
      const userId = input?.userId || ctx.user.id;
    }),
  getWorkExperiences: protectedProcedure
    .input(optionalUserIdSchema)
    .query(async ({ ctx }) => {}),
  getEducationalBackground: protectedProcedure
    .input(optionalUserIdSchema)
    .query(async ({ ctx }) => {}),
});
