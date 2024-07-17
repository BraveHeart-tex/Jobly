import type { InferValueTypeFromConst } from "./types";

export const SHARED_ROUTES = {
  // Shared
  LOGIN: "/login",
  "SIGN-UP": "/sign-up",
  HOME: "/home",
} as const;

const BASE_EMPLOYEE_ROUTE = "/home/employee";
const BASE_EMPLOYER_ROUTE = "/home/employer";

export const EMPLOYEE_ROUTES = {
  JOBS: `${BASE_EMPLOYEE_ROUTE}/jobs`,
  RECOMENDED_JOBS: `${BASE_EMPLOYEE_ROUTE}/jobs/?recommended=true`,
  JOB_ALERTS: `${BASE_EMPLOYEE_ROUTE}/jobs/alerts`,
  JOB_HISTORY: `${BASE_EMPLOYEE_ROUTE}/jobs/?viewed=true`,
  JOB_TRACKER: `${BASE_EMPLOYEE_ROUTE}/jobs/job-tracker`,
  BOOKMARKED_JOBS: `${BASE_EMPLOYEE_ROUTE}/jobs/?bookmarked=true`,

  APPLICATIONS: `${BASE_EMPLOYEE_ROUTE}/applications`,
  UNFINISHED_APPLICATIONS: `${BASE_EMPLOYEE_ROUTE}/applications?unfinished=true`,

  INTERVIEWS: `${BASE_EMPLOYEE_ROUTE}/interviews`,

  EDIT_PROFILE: `${BASE_EMPLOYEE_ROUTE}/profile/edit`,
  PRIVACY_SETTINGS: `${BASE_EMPLOYEE_ROUTE}/profile/privacy-settings`,
  MY_DOCUMENTS: `${BASE_EMPLOYEE_ROUTE}/profile/my-documents`,

  DOCUMENT_BUILDER: `${BASE_EMPLOYEE_ROUTE}/tools/document-builder`,
} as const;

export const EMPLOYER_ROUTES = {
  // Job Postings
  POST_JOB: `${BASE_EMPLOYER_ROUTE}/jobs/post`,
  ACTIVE_LISTINGS: `${BASE_EMPLOYER_ROUTE}/jobs/active`,
  DRAFT_LISTINGS: `${BASE_EMPLOYER_ROUTE}/jobs/drafts`,
  EXPIRED_LISTINGS: `${BASE_EMPLOYER_ROUTE}/jobs/expired`,

  // Candidates
  ALL_APLICATIONS: `${BASE_EMPLOYER_ROUTE}/candidates/applications`,
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

export type EmployeeRoute = InferValueTypeFromConst<typeof EMPLOYEE_ROUTES>;
export type EmployerRoute = InferValueTypeFromConst<typeof EMPLOYER_ROUTES>;
