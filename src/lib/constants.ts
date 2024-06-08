import { type NavigationMenuItem } from "@/lib/types";
import {
  BarChart4,
  BookmarkIcon,
  BookOpenText,
  FileInput,
  FilePen,
  HistoryIcon,
  PencilRuler,
  Rss,
} from "lucide-react";

export const ROUTES = {
  LOGIN: "/login",
  "SIGN-UP": "/sign-up",
  HOME: "/app",
  JOBS: "/app/jobs",
  JOB_HISTORY: "/app/user/job-history",
  BOOKMARKED_JOBS: "/app/user/bookmarked-jobs",
  APPLICATIONS: "/app/user/applications",
  UNFINISHED_APPLICATIONS: "/app/user/applications?unfinished=true",
  CV_BUILDER: "/app/tools/cv-builder",
  SALARIES: "/data/salaries",
  INTERVIEW_PREP: "/interview-prep",
  BLOG: "/blog",
} as const;

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
      {
        title: "Interview Prep.",
        href: ROUTES.INTERVIEW_PREP,
        description:
          "Take a look at useful materials that can help you during the interview process.",
        icon: BookOpenText,
      },
      {
        title: "Blog",
        href: ROUTES.BLOG,
        description:
          "Check out useful blog posts curated by the Jobly team to help you in your job search.",
        icon: Rss,
      },
    ],
  },
];
