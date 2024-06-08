import { type NavigationMenuItem } from "@/lib/types";

export const ROUTES = {
  HOME: "/home",
  LOGIN: "/login",
  "SIGN-UP": "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
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
        href: "/jobs/history",
      },
      {
        title: "Bookmarked",
        description: "Check out your bookmarked job postings.",
        href: "/jobs/bookmarked",
      },
      {
        title: "My Applications",
        description: "Take a look at your job applications.",
        href: "/user/applications",
      },
      {
        title: "Unfinished Applications",
        description: "Complete your unfinished job applications",
        href: "/user/applications?unfinished=true",
      },
    ],
  },
  {
    triggerLabel: "Tools",
    linkItems: [
      {
        title: "CV Builder",
        href: "/tools/cv-builder",
        description: "Visually craft your CV. Add custom sections or use a template.",
      },
      {
        title: "Salaries",
        href: "/data/salaries",
        description: "Curious about the salary of a profession? Take a look at our insights.",
      },
      {
        title: "Interview Prep.",
        href: "/interview-prep",
        description: "Take a look at useful materials that can help you during the interview process.",
      },
      {
        title: "Blog",
        href: "/blog",
        description: "Check out useful blog posts curated by the Jobly team to help you in your job search.",
      },
    ],
  },
];
