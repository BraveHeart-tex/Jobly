import { countryRouter } from "@/features/user/profile/api/countries";
import { authRouter } from "@/features/auth/api/authRouter";
import { documentRouter } from "@/features/candidate/documents/api/documentRouter";
import { jobTrackerRouter } from "@/features/candidate/jobTrackerBoard/api/jobTrackerRouter";
import { userJobListingRouter } from "@/features/candidate/jobs/api/jobRouter";
import { companyRouter } from "@/features/employer/company/api/companyRouter";
import { jobPostingRouter } from "@/features/employer/jobPosting/api/jobPostingRouter";
import { skillsRouter } from "@/features/employer/jobPosting/api/skillsRouter";
import { userProfileRouter } from "@/features/user/profile/api/userProfileRouter";
import { workExperienceRouter } from "@/features/user/profile/workExperience/api/workExperienceRouter";
import { userSkillRouter } from "@/features/user/skills/api/userSkillRouter";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { educationalBackgroundsRouter } from "@/features/user/profile/api/educationalBackgrounds";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  userJobListing: userJobListingRouter,
  document: documentRouter,
  jobTracker: jobTrackerRouter,
  jobPosting: jobPostingRouter,
  company: companyRouter,
  skill: skillsRouter,
  userProfile: userProfileRouter,
  userSkill: userSkillRouter,
  workExperience: workExperienceRouter,
  educationalBackgrounds: educationalBackgroundsRouter,
  countries: countryRouter,
});

export const createCaller = createCallerFactory(appRouter);
