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
