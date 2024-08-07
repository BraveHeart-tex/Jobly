import type { InferValueTypeFromConst } from "./types";

export const SHARED_ROUTES = {
  // Shared
  LOGIN: "/login",
  "SIGN-UP": "/sign-up",
  HOME: "/home",
} as const;

const BASE_CANDIDATE_ROUTE = "/home/candidate";
const BASE_EMPLOYER_ROUTE = "/home/employer";

export const CANDIDATE_ROUTES = {
  JOBS: `${BASE_CANDIDATE_ROUTE}/jobs`,
  RECOMMENDED_JOBS: `${BASE_CANDIDATE_ROUTE}/jobs/?recommended=true`,
  JOB_ALERTS: `${BASE_CANDIDATE_ROUTE}/jobs/alerts`,
  JOB_HISTORY: `${BASE_CANDIDATE_ROUTE}/jobs/?viewed=true`,
  JOB_TRACKER: `${BASE_CANDIDATE_ROUTE}/jobs/job-tracker`,
  BOOKMARKED_JOBS: `${BASE_CANDIDATE_ROUTE}/jobs/?bookmarked=true`,

  APPLICATIONS: `${BASE_CANDIDATE_ROUTE}/applications`,
  UNFINISHED_APPLICATIONS: `${BASE_CANDIDATE_ROUTE}/applications?unfinished=true`,

  INTERVIEWS: `${BASE_CANDIDATE_ROUTE}/interviews`,

  EDIT_PROFILE: `${BASE_CANDIDATE_ROUTE}/profile/edit`,
  PRIVACY_SETTINGS: `${BASE_CANDIDATE_ROUTE}/profile/privacy-settings`,
  MY_DOCUMENTS: `${BASE_CANDIDATE_ROUTE}/profile/my-documents`,

  DOCUMENT_BUILDER: `${BASE_CANDIDATE_ROUTE}/tools/document-builder`,
} as const;

export const EMPLOYER_ROUTES = {
  // Job Postings
  POST_JOB: `${BASE_EMPLOYER_ROUTE}/jobs/post`,
  ACTIVE_LISTINGS: `${BASE_EMPLOYER_ROUTE}/jobs/active`,
  DRAFT_LISTINGS: `${BASE_EMPLOYER_ROUTE}/jobs/drafts`,
  EXPIRED_LISTINGS: `${BASE_EMPLOYER_ROUTE}/jobs/expired`,

  // Candidates
  ALL_APPLICATIONS: `${BASE_EMPLOYER_ROUTE}/candidates/applications`,
  CANDIDATE_PIPELINE: `${BASE_EMPLOYER_ROUTE}/candidates/pipeline`,
  INTERVIEWS: `${BASE_EMPLOYER_ROUTE}/candidates/interviews`,
  TALENT_POOL: `${BASE_EMPLOYER_ROUTE}/candidates/talent-pool`,

  // Analytics
  JOB_PERFORMANCE: `${BASE_EMPLOYER_ROUTE}/analytics/job-performance`,
  APPLICANT_INSIGHTS: `${BASE_EMPLOYER_ROUTE}/analytics/applicant-insights`,
  HIRING_FUNNEL: `${BASE_EMPLOYER_ROUTE}/analytics/hiring-funnel`,
  REPORTS: `${BASE_EMPLOYER_ROUTE}/analytics/reports`,

  // Company
  COMPANY_PROFILE: `${BASE_EMPLOYER_ROUTE}/company/profile`,
  TEAM_MANAGEMENT: `${BASE_EMPLOYER_ROUTE}/company/team`,
  EMPLOYER_BRANDING: `${BASE_EMPLOYER_ROUTE}/company/branding`,
  ACCOUNT_SETTINGS: `${BASE_EMPLOYER_ROUTE}/company/settings`,
  DASHBOARD: `${BASE_EMPLOYER_ROUTE}/dashboard`,
} as const;

export type CandidateRoute = InferValueTypeFromConst<typeof CANDIDATE_ROUTES>;
export type EmployerRoute = InferValueTypeFromConst<typeof EMPLOYER_ROUTES>;
