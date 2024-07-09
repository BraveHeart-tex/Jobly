export const contentByPortalType = {
  employee: [
    "Find your dream job with just one click",
    "Discover endless opportunities aligned with your passions",
    "Land interviews and secure your dream job",
  ],
  employer: [
    "Discover the ideal talent the right way",
    "Build your dream team effortlessly",
    "Transform hiring with tools that prioritize talent and humanity",
  ],
};

export const PASSWORD_STRENGTH_LEVELS = {
  VERY_WEAK: 0,
  WEAK: 1,
  MODERATE: 2,
  STRONG: 3,
  VERY_STRONG: 4,
} as const;

export const APP_NAME = "Jobly" as const;

export const URL_SEARCH_QUERY_KEYS = {
  CURRENT_JOB_ID: "currentJobId",
  QUERY: "query",
  PAGE: "page",
  BOOKMARKED_JOBS: "bookmarked",
  VIEWED_JOBS: "viewed",
  JOB_LOCATION: "location",
  JOB_WORK_TYPE: "workType",
  JOB_EMPLOYMENT_TYPE: "employmentType",
  DOCUMENT_TYPE: "documentType",
  DOCUMENT_BUILDER_VIEW: "view",
  JOB_LIST_VIEW: "listView",
} as const;

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export const INTERNAL_SECTION_TAGS = {
  PERSONAL_DETAILS: "personal-details",
  PROFESSIONAL_SUMMARY: "professional-summary",
  EMPLOYMENT_HISTORY: "employment-history",
  WEBSITES_SOCIAL_LINKS: "websites-social-links",
  SKILLS: "skills",
  EDUCATION: "education",
} as const;

export const SECTION_DESCRIPTIONS_BY_TAG = {
  [INTERNAL_SECTION_TAGS.PROFESSIONAL_SUMMARY]:
    "Craft 2-4 short and energetic sentences to captivate your reader! Highlight your role, experience, and most importantly, your greatest achievements, best qualities, and top skills.",
  [INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY]:
    "List your key accomplishments from the past decade. Use bullet points and include specific metrics where possible (e.g., 'Increased X by Y% through Z initiative').",
} as const;
