import { useCurrentUserStore } from "@/lib/stores/useCurrentUserStore";
import type { NavigationMenuItem } from "@/lib/types";
import {
  AwardIcon,
  BarChartIcon,
  BellIcon,
  BookmarkIcon,
  BriefcaseIcon,
  CalendarIcon,
  ClipboardList,
  Clock,
  File,
  FilePen,
  FileTextIcon,
  FilesIcon,
  FilterIcon,
  GitBranchIcon,
  HistoryIcon,
  Inbox,
  LockIcon,
  NotebookPenIcon,
  PencilRuler,
  PieChartIcon,
  SearchIcon,
  SettingsIcon,
  ThumbsUpIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { EMPLOYEE_ROUTES, EMPLOYER_ROUTES } from "./routes";

export const EMPLOYEE_NAVIGATION_LINKS: NavigationMenuItem[] = [
  {
    triggerLabel: "Jobs",
    linkItems: [
      {
        title: "Find Jobs",
        description: "Search and explore job opportunities.",
        href: EMPLOYEE_ROUTES.JOBS,
        icon: SearchIcon,
      },
      {
        title: "Recommended Jobs",
        description: "View jobs tailored to your profile and preferences.",
        href: EMPLOYEE_ROUTES.RECOMENDED_JOBS,
        icon: ThumbsUpIcon,
      },
      {
        title: "View History",
        description: "See the job posting you looked at.",
        href: EMPLOYEE_ROUTES.JOB_HISTORY,
        icon: HistoryIcon,
      },
      {
        title: "Saved Jobs",
        description: "Access your saved job listings.",
        href: EMPLOYEE_ROUTES.BOOKMARKED_JOBS,
        icon: BookmarkIcon,
      },
      {
        title: "Job Alerts",
        description: "Manage your job alert settings.",
        href: EMPLOYEE_ROUTES.JOB_ALERTS,
        icon: BellIcon,
      },
      {
        title: "Job Tracker",
        description: "Track and organiza your job applications and interviews.",
        href: EMPLOYEE_ROUTES.JOB_TRACKER,
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
        href: EMPLOYEE_ROUTES.APPLICATIONS,
        icon: FileTextIcon,
      },
      {
        title: "Draft Applications",
        description: "Complete your unfinished job applications.",
        href: EMPLOYEE_ROUTES.UNFINISHED_APPLICATIONS,
        icon: FilePen,
      },
      {
        title: "Interviews",
        description: "Manage your upcoming interviews.",
        href: EMPLOYEE_ROUTES.INTERVIEWS,
        icon: CalendarIcon,
      },
    ],
  },
  {
    triggerLabel: "Profile",
    linkItems: [
      {
        title: "Edit Profile",
        description: "Update your professional profile.",
        href: EMPLOYEE_ROUTES.EDIT_PROFILE,
        icon: UserIcon,
      },

      {
        title: "Privacy Settings",
        description: "Manage your account privacy and visibility.",
        href: EMPLOYEE_ROUTES.PRIVACY_SETTINGS,
        icon: LockIcon,
      },
      {
        title: "Document Builder",
        href: EMPLOYEE_ROUTES.DOCUMENT_BUILDER,
        description: "Visually craft your CV or cover letter within minutes.",
        icon: PencilRuler,
      },
      {
        title: "My Documents",
        href: EMPLOYEE_ROUTES.MY_DOCUMENTS,
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
        title: "Active Listings",
        description: "Manage your current job postings.",
        href: EMPLOYER_ROUTES.ACTIVE_LISTINGS,
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
        href: EMPLOYER_ROUTES.ALL_APLICATIONS,
        icon: Inbox,
      },
      {
        title: "Candidate Pipeline",
        description: "Manage candidates through your hiring stages.",
        href: EMPLOYER_ROUTES.CANDIDATE_PIPELINE,
        icon: GitBranchIcon,
      },
      {
        title: "Interviews",
        description: "Schedule and manage candidate interviews.",
        href: EMPLOYER_ROUTES.INTERVIEWS,
        icon: CalendarIcon,
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
        title: "Job Performance",
        description: "View statistics on your job postings.",
        href: EMPLOYER_ROUTES.JOB_PERFORMANCE,
        icon: BarChartIcon,
      },
      {
        title: "Applicant Insights",
        description: "Analyze applicant demographics and sources.",
        href: EMPLOYER_ROUTES.APPLICANT_INSIGHTS,
        icon: PieChartIcon,
      },
      {
        title: "Hiring Funnel",
        description: "Track candidates through your hiring process.",
        href: EMPLOYER_ROUTES.HIRING_FUNNEL,
        icon: FilterIcon,
      },
      {
        title: "Reports",
        description: "Generate custom reports on your hiring activities.",
        href: EMPLOYER_ROUTES.REPORTS,
        icon: FileTextIcon,
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
        title: "Team Management",
        description: "Manage your recruiting team and permissions.",
        href: EMPLOYER_ROUTES.TEAM_MANAGEMENT,
        icon: UsersIcon,
      },
      // Thumbnails etc, provided by your company...
      {
        title: "Employer Branding",
        description: "Customize your employer branding materials.",
        href: EMPLOYER_ROUTES.EMPLOYER_BRANDING,
        icon: AwardIcon,
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

export const useNavigationLinks = () => {
  const userRole = useCurrentUserStore((state) => state?.user?.role);

  if (userRole === "candidate") {
    return EMPLOYEE_NAVIGATION_LINKS;
  }

  if (userRole === "employer") {
    return EMPLOYER_NAVIGATION_LINKS;
  }

  return EMPLOYEE_NAVIGATION_LINKS;
};
