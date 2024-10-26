import { PORTAL_TYPE_QUERY_KEY } from "@/lib/constants";
import { CANDIDATE_ROUTES, EMPLOYER_ROUTES } from "@/lib/routes";
import type { NavigationMenuItem } from "@/lib/types";
import type { DBUser } from "@/server/db/schema/users";
import {
  BarChartIcon,
  BellIcon,
  BookmarkIcon,
  BriefcaseIcon,
  ClipboardList,
  ClipboardPlus,
  Clock,
  File,
  FilePen,
  FileTextIcon,
  FilesIcon,
  GitBranchIcon,
  HistoryIcon,
  Inbox,
  NotebookPenIcon,
  PencilRuler,
  PieChartIcon,
  SearchIcon,
  SettingsIcon,
  ThumbsUpIcon,
  UsersIcon,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

export const CANDIDATE_NAVIGATION_LINKS: NavigationMenuItem[] = [
  {
    triggerLabel: "Jobs",
    linkItems: [
      {
        title: "Find Jobs",
        description: "Search and explore job opportunities.",
        href: CANDIDATE_ROUTES.JOBS,
        icon: SearchIcon,
      },
      {
        title: "Recommended Jobs",
        description:
          "View job postings tailored to your profile and preferences.",
        href: CANDIDATE_ROUTES.RECOMMENDED_JOBS,
        icon: ThumbsUpIcon,
      },
      {
        title: "View History",
        description: "See the job posting you looked at.",
        href: CANDIDATE_ROUTES.JOB_HISTORY,
        icon: HistoryIcon,
      },
      {
        title: "Saved Jobs",
        description: "Access your saved job listings.",
        href: CANDIDATE_ROUTES.BOOKMARKED_JOBS,
        icon: BookmarkIcon,
      },
      {
        title: "Job Alerts",
        description: "Manage your job alert settings.",
        href: CANDIDATE_ROUTES.JOB_ALERTS,
        icon: BellIcon,
      },
      {
        title: "Job Tracker",
        description: "Track and organize your job applications and interviews.",
        href: CANDIDATE_ROUTES.JOB_TRACKER,
        icon: NotebookPenIcon,
      },
    ],
  },
  {
    triggerLabel: "Applications",
    linkItems: [
      {
        title: "My Applications",
        description: "Track your submitted job applications.",
        href: CANDIDATE_ROUTES.APPLICATIONS,
        icon: FileTextIcon,
      },
      {
        title: "Draft Applications",
        description: "Complete your unfinished job applications.",
        href: CANDIDATE_ROUTES.UNFINISHED_APPLICATIONS,
        icon: FilePen,
      },
    ],
  },
  {
    triggerLabel: "Documents",
    linkItems: [
      {
        title: "Document Builder",
        href: CANDIDATE_ROUTES.DOCUMENT_BUILDER,
        description: "Visually craft your CV or cover letter within minutes.",
        icon: PencilRuler,
      },
      {
        title: "My Documents",
        href: CANDIDATE_ROUTES.MY_DOCUMENTS,
        description: "Manage your uploaded documents.",
        icon: FilesIcon,
      },
    ],
  },
];

export const EMPLOYER_NAVIGATION_LINKS: NavigationMenuItem[] = [
  {
    triggerLabel: "Job Postings",
    linkItems: [
      {
        title: "New Job Posting",
        description: "Find top talent! Add a new job posting.",
        href: EMPLOYER_ROUTES.NEW_LISTING,
        icon: ClipboardPlus,
      },
      {
        title: "Active Listings",
        description: "Manage your current job postings.",
        href: EMPLOYER_ROUTES.PUBLISHED_LISTINGS,
        icon: ClipboardList,
      },
      {
        title: "Draft Listings",
        description: "View and edit your draft job postings.",
        href: EMPLOYER_ROUTES.DRAFT_LISTINGS,
        icon: File,
      },
      {
        title: "Expired Listings",
        description: "Review and renew past job postings.",
        href: EMPLOYER_ROUTES.EXPIRED_LISTINGS,
        icon: Clock,
      },
    ],
  },
  {
    triggerLabel: "Candidates",
    linkItems: [
      {
        title: "All Applications",
        description: "View all received job applications.",
        href: EMPLOYER_ROUTES.ALL_APPLICATIONS,
        icon: Inbox,
      },
      {
        title: "Candidate Pipeline",
        description: "Manage candidates through your hiring stages.",
        href: EMPLOYER_ROUTES.CANDIDATE_PIPELINE,
        icon: GitBranchIcon,
      },
      {
        title: "Talent Pool",
        description: "Access your saved candidate profiles.",
        href: EMPLOYER_ROUTES.TALENT_POOL,
        icon: UsersIcon,
      },
    ],
  },
  {
    triggerLabel: "Analytics",
    linkItems: [
      {
        title: "Job Posting Insights",
        description: "View statistics on your job postings.",
        href: EMPLOYER_ROUTES.JOB_POSTING_INSIGHTS,
        icon: BarChartIcon,
      },
      {
        title: "Applicant Insights",
        description: "Analyze applicant demographics and sources.",
        href: EMPLOYER_ROUTES.APPLICANT_INSIGHTS,
        icon: PieChartIcon,
      },
    ],
  },
  {
    triggerLabel: "Company",
    linkItems: [
      {
        title: "Company Profile",
        description: "Manage your company's public profile.",
        href: EMPLOYER_ROUTES.COMPANY_PROFILE,
        icon: BriefcaseIcon,
      },
      {
        title: "Account Settings",
        description: "Configure your account preferences.",
        href: EMPLOYER_ROUTES.ACCOUNT_SETTINGS,
        icon: SettingsIcon,
      },
    ],
  },
];

export const getNavigationLinksByRole = (role?: DBUser["role"]) => {
  const portalTypeParam = useSearchParams().get(
    PORTAL_TYPE_QUERY_KEY,
  ) as DBUser["role"];
  const validRoles: DBUser["role"][] = ["candidate", "employer"];

  const targetRole =
    role ||
    (validRoles.includes(portalTypeParam) ? portalTypeParam : "candidate");

  const roleToLinksMap: Record<DBUser["role"], NavigationMenuItem[]> = {
    candidate: CANDIDATE_NAVIGATION_LINKS,
    employer: EMPLOYER_NAVIGATION_LINKS,
  };

  return roleToLinksMap[targetRole] || CANDIDATE_NAVIGATION_LINKS;
};
