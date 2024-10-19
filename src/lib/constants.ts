import type { ButtonVariant } from "@/components/ui/button";
import type { ColumnId } from "@/lib/stores/useJobTrackerBoardStore";
import type { DBUser } from "@/server/db/schema/users";
import {
  BriefcaseBusinessIcon,
  CircleCheckIcon,
  ContactIcon,
  HeartIcon,
  type LucideIcon,
  XIcon,
} from "lucide-react";
import type { InferValueTypeFromConst } from "./types";

export const contentByPortalType: Record<DBUser["role"], string[]> = {
  candidate: [
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
  EDUCATION: "education",
  WEBSITES_SOCIAL_LINKS: "websites-social-links",
  SKILLS: "skills",
  CUSTOM: "custom",
  INTERNSHIPS: "internships",
  EXTRA_CURRICULAR_ACTIVITIES: "extra-curricular-activities",
  HOBBIES: "hobbies",
  REFERENCES: "references",
  COURSES: "courses",
  LANGUAGES: "languages",
} as const;

export type INTERNAL_SECTION_TAG = InferValueTypeFromConst<
  typeof INTERNAL_SECTION_TAGS
>;

export const DELETABLE_INTERNAL_SECTION_TAGS = [
  INTERNAL_SECTION_TAGS.CUSTOM,
  INTERNAL_SECTION_TAGS.EXTRA_CURRICULAR_ACTIVITIES,
  INTERNAL_SECTION_TAGS.HOBBIES,
  INTERNAL_SECTION_TAGS.REFERENCES,
  INTERNAL_SECTION_TAGS.COURSES,
  INTERNAL_SECTION_TAGS.LANGUAGES,
  INTERNAL_SECTION_TAGS.INTERNSHIPS,
];

export const SECTION_DESCRIPTIONS_BY_TAG = {
  [INTERNAL_SECTION_TAGS.PROFESSIONAL_SUMMARY]:
    "Grab the reader's attention with 2-4 snappy lines showcasing your role, top wins, best traits, and key skills.",
  [INTERNAL_SECTION_TAGS.EMPLOYMENT_HISTORY]:
    "List your key accomplishments from the past decade. Use bullet points and include specific metrics where possible (e.g., 'Increased X by Y% through Z initiative').",
  [INTERNAL_SECTION_TAGS.EDUCATION]:
    "Your diverse educational background highlights the unique value and skills you'll bring to the role.",
  [INTERNAL_SECTION_TAGS.WEBSITES_SOCIAL_LINKS]:
    "Feel free to include links to websites you'd like hiring managers to visit, such as your portfolio, LinkedIn profile, or personal website.",
  [INTERNAL_SECTION_TAGS.SKILLS]:
    "Select five key skills that demonstrate your suitability for the position. Ensure they align with the essential skills listed in the job description. (Particularly when applying through an online system.)",
} as const;

export const FIELDS_DND_INDEX_PREFIXES = {
  EMPLOYMENT: "employment",
  EDUCATION: "education",
  WEBSITES_AND_LINKS: "websitesAndLinks",
  SKILLS: "skills",
  CUSTOM: "custom",
  INTERNSHIPS: "internships",
  EXTRA_CURRICULAR_ACTIVITIES: "extraCurricularActivities",
  REFERENCES: "references",
  COURSES: "courses",
  LANGUAGES: "languages",
} as const;

export type FIELD_DND_INDEX_PREFIX = InferValueTypeFromConst<
  typeof FIELDS_DND_INDEX_PREFIXES
>;

export const JOB_TRACKER_COLUMN_TO_ICON_MAP: Record<ColumnId, LucideIcon> = {
  applied: BriefcaseBusinessIcon,
  interview: ContactIcon,
  offer: CircleCheckIcon,
  rejected: XIcon,
  shortlist: HeartIcon,
};

export const AUTH_COOKIE_NAME = "auth-session" as const;

export const PORTAL_TYPE_QUERY_KEY = "portalType" as const;

export const ISO_8601_DATE_TIME_REGEX =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}(?:[+-]\d{2}:\d{2}|Z)$/;

export const URL_REGEX =
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export const ISO_DATE_FORMAT_REGEX =
  /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

export const CONTROL_BUTTON_VARIANT: ButtonVariant = "secondary";

export const LOG_COLORS = {
  RESET: "\x1b[0m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  RED: "\x1b[31m",
  CYAN: "\x1b[36m",
  BLUE: "\x1b[34m",
};

export const EMPLOYMENT_TYPES = [
  "full-time",
  "part-time",
  "contract",
  "internship",
  "temporary",
  "volunteer",
  "other",
] as const;

export const WORK_TYPES = ["office", "remote", "hybrid", "other"] as const;

export const SESSION_CACHE_TTL_SECONDS = 30 * 60 * 24 * 1000; // 30 days

export const MAX_VISIBLE_EXPERIENCE_DESCRIPTION_CHARACTERS = 120 as const;

export const ASYNC_SELECT_OPTIONS_LIMIT = 10 as const;
