import type { NavigationMenuItem } from "@/lib/types";
import {
  BarChart4,
  BookmarkIcon,
  FileInput,
  FilePen,
  HistoryIcon,
  PencilRuler,
} from "lucide-react";

export const ROUTES = {
  LOGIN: "/login",
  "SIGN-UP": "/sign-up",
  HOME: "/home",
  JOBS: "/home/jobs",
  JOB_HISTORY: "/home/jobs/?viewed=true",
  BOOKMARKED_JOBS: "/home/jobs/?bookmarked=true",
  APPLICATIONS: "/home/user/applications",
  UNFINISHED_APPLICATIONS: "/home/user/applications?unfinished=true",
  CV_BUILDER: "/home/tools/cv-builder",
  COVER_LETTERS: "/home/tools/cover-letters",
  SALARIES: "/data/salaries",
} as const;

export type ROUTE = (typeof ROUTES)[keyof typeof ROUTES];

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

export const EMPLOYEE_NAVIGATION_LINKS: NavigationMenuItem[] = [
  {
    triggerLabel: "Jobs",
    linkItems: [
      {
        title: "View History",
        description: "See the job posting you looked at.",
        href: ROUTES.JOB_HISTORY,
        icon: HistoryIcon,
      },
      {
        title: "Bookmarked",
        description: "Check out your bookmarked job postings.",
        href: ROUTES.BOOKMARKED_JOBS,
        icon: BookmarkIcon,
      },
      {
        title: "My Applications",
        description: "Take a look at your job applications.",
        href: ROUTES.APPLICATIONS,
        icon: FileInput,
      },
      {
        title: "Unfinished Applications",
        description: "Complete your unfinished job applications",
        href: ROUTES.UNFINISHED_APPLICATIONS,
        icon: FilePen,
      },
    ],
  },
  {
    triggerLabel: "Tools",
    linkItems: [
      {
        title: "CV Builder",
        href: ROUTES.CV_BUILDER,
        description:
          "Visually craft your CV. Add custom sections or use a template.",
        icon: PencilRuler,
      },
      {
        title: "Salaries",
        href: ROUTES.SALARIES,
        description:
          "Curious about the salary of a profession? Take a look at our insights.",
        icon: BarChart4,
      },
    ],
  },
];

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
