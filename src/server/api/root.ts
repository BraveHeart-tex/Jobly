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
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { educationalBackgroundsRouter } from "@/features/user/profile/api/educationalBackgrounds";
import { cityRouter } from "@/features/user/profile/api/cities";
import { userRouter } from "@/features/user/api/userRouter";
import { userSkillsRouter } from "@/features/user/profile/api/userSkillsRouter";
import { userSettingsRouter } from "@/features/user/accountSettings/api/userSettingsRouter";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  userJobListing: userJobListingRouter,
  document: documentRouter,
  jobTracker: jobTrackerRouter,
  jobPosting: jobPostingRouter,
  skill: skillsRouter,
  userProfile: userProfileRouter,
  userSkills: userSkillsRouter,
  workExperience: workExperienceRouter,
  educationalBackgrounds: educationalBackgroundsRouter,
  accountSettings: userSettingsRouter,
  countries: countryRouter,
  cities: cityRouter,
  company: companyRouter,
});

export const createCaller = createCallerFactory(appRouter);
