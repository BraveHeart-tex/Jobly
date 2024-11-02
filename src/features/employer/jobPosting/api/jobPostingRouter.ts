import { companyUserService } from "@/features/employer/company/services/userCompanyService";
import {
  getJobPostingsUseCase,
  createJobPostingUseCase,
  getJobPostingByIdUseCase,
  updateJobPostingUseCase,
} from "@/features/employer/jobPosting/use-cases/employerJobPostings";
import { ensureEmployerCompanyLink } from "@/features/employer/jobPosting/utils";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { jobPostings } from "@/server/db/schema";
import { employerJobPostingFormValidator } from "@/validation/employer/jobPosting/jobPostingFormValidator";
import { TRPCError } from "@trpc/server";
import { number, object, optional, parser, picklist, required } from "valibot";

export const jobPostingRouter = createTRPCRouter({
  getJobPostings: protectedProcedure
    .input(
      parser(
        object({
          status: optional(
            picklist([...jobPostings.status.enumValues, "expired"]),
            "published",
          ),
        }),
      ),
    )
    .query(async ({ ctx, input }) => {
      const company = await companyUserService.getCompanyUserDetailsByUserId(
        ctx.user.id,
      );
      if (!company) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "Company not found. Please setup your company profile first.",
        });
      }

      return getJobPostingsUseCase({
        ...input,
        companyId: company.id,
      });
    }),
  createJobPosting: protectedProcedure
    .input(parser(employerJobPostingFormValidator))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      const companyId = await ensureEmployerCompanyLink(user);

      return createJobPostingUseCase({
        ...input,
        companyId,
        createdUserId: user.id,
      });
    }),
  getJobPostingById: protectedProcedure
    .input(
      parser(
        object({
          id: number(),
        }),
      ),
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const user = ctx.user;
      if (user.role !== "employer") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to perform this action.",
        });
      }

      return getJobPostingByIdUseCase(id);
    }),
  updateJobPosting: protectedProcedure
    .input(parser(required(employerJobPostingFormValidator, ["id"])))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.user;
      const companyId = await ensureEmployerCompanyLink(user);

      return updateJobPostingUseCase({
        ...input,
        companyId,
        createdUserId: user.id,
      });
    }),
});
