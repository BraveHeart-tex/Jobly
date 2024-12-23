import type { ButtonVariant } from "@/components/ui/button";
import type { ColumnId } from "@/lib/stores/useJobTrackerBoardStore";
import type { InferValueTypeFromConst } from "@/lib/types";
import {
  BriefcaseBusinessIcon,
  CircleCheckIcon,
  ContactIcon,
  HeartIcon,
  FileImage,
  FileText,
  type LucideIcon,
  XIcon,
} from "lucide-react";
import {
  FileExcel,
  FilePdf,
  FilePowerpoint,
  FileRich,
  FileWord,
} from "@/components/icons/FileExtensionIcons";

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

export const ASYNC_SELECT_OPTIONS_LIMIT = 10 as const;

export const DEFAULT_AVATAR_URL = "/images/default-avatar.svg";

export const TWO_FACTOR_AUTH_METHODS = ["email", "auth_app"] as const;

export const documentTypeOptions = [
  {
    label: "Resume",
    value: "resume",
  },
  {
    label: "Cover Letter",
    value: "cover_letter",
  },
];

export const mimeTypeToExtension = {
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "pptx",
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow":
    "pps",
  "image/bmp": "bmp",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/png": "png",
  "application/pdf": "pdf",
  "text/plain": "txt",
  "application/rtf": "rtf",
} as const;

export const mimeTypeToIcon = {
  "application/vnd.ms-excel": FileExcel,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    FileExcel,
  "application/msword": FileWord,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    FileWord,
  "application/vnd.ms-powerpoint": FilePowerpoint,
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    FilePowerpoint,
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow":
    FilePowerpoint,
  "image/bmp": FileImage,
  "image/jpeg": FileImage,
  "image/gif": FileImage,
  "image/png": FileImage,
  "application/pdf": FilePdf,
  "text/plain": FileText,
  "application/rtf": FileRich,
};
