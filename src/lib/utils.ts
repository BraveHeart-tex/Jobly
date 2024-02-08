import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApplicationStatusCount, ResponseData, TotalApplicationStat } from "./types";
import { FiTrendingUp, FiPhoneCall, FiCalendar } from "react-icons/fi";
import { BiDollar } from "react-icons/bi";
import { BsClipboardPlus } from "react-icons/bs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapTotalApplicationStatsToStatusCounts(
  totalApplicationStats: TotalApplicationStat[]
): ApplicationStatusCount[] {
  return totalApplicationStats.map(({ _count, applicationStatus }) => ({
    status: applicationStatus.toLowerCase(),
    count: _count.applicationStatus,
  }));
}

export const MONTH_MAP: { [key: string]: string } = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

export function convertResponseData(data: ResponseData): ResponseData {
  const formattedData: ResponseData = {
    formattedMonthlyApplications: [],
  };

  const monthCounts: { [key: string]: number } = {};

  for (const application of data.formattedMonthlyApplications) {
    const date = new Date(application.date);
    const month = `${MONTH_MAP[String(date.getMonth() + 1).padStart(2, "0")]}`;
    const year = `${date.getFullYear()}`;

    const formattedDate = `${month} ${year}`;

    if (formattedDate in monthCounts) {
      monthCounts[formattedDate] += application.count;
    } else {
      monthCounts[formattedDate] = application.count;
    }
  }

  for (const [date, count] of Object.entries(monthCounts)) {
    formattedData.formattedMonthlyApplications.push({
      date,
      count,
    });
  }

  formattedData.formattedMonthlyApplications.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  return formattedData;
}

export function deepEqual(obj1: any, obj2: any, ignoreFields?: string[]): boolean {
  if (ignoreFields && ignoreFields.length > 0) {
    ignoreFields.forEach((field) => {
      if (field in obj1) delete obj1[field];
      if (field in obj2) delete obj2[field];
    });
  }

  if (obj1 === obj2) {
    return true; // Same object reference, no need to compare further
  }

  if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) {
    return obj1 === obj2; // Compare primitive types
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false; // Different number of properties
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false; // Properties don't match or deep comparison fails
    }
  }

  return true;
}

export const sortByDate = (a: any, b: any, sortBy: string, direction: "asc" | "desc" = "desc") => {
  const dateA = new Date(a[sortBy]);
  const dateB = new Date(b[sortBy]);

  if (direction === "asc") {
    return dateA.getTime() - dateB.getTime();
  }

  return dateB.getTime() - dateA.getTime();
};

export const APPLICATION_STATUS_OPTIONS = {
  PENDING: "Pending",
  REJECTED: "Rejected",
  INTERVIEW: "Interview",
  OFFER: "Offer",
};

export const formatDate = (date: Date) => {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const JOB_TYPE_OPTIONS = {
  FULL_TIME: "Full-Time",
  PART_TIME: "Part-Time",
  CONTRACT: "Contract",
  TEMPORARY: "Temporary",
  VOLUNTEER: "Volunteer",
  INTERNSHIP: "Internship",
};

export function capitalizeJobTypeParams(value: string) {
  if (value === "part-time" || value === "Part-time") {
    return "Part-Time";
  }

  if (value === "full-time" || value === "Full-time") {
    return "Full-Time";
  }

  return value;
}

export const LINK_ITEMS = [
  { name: "Application Stats", href: "/dashboard", icon: FiTrendingUp },
  { name: "Jobs List", href: "/dashboard/jobs", icon: FiPhoneCall },
  { name: "Planner", href: "/dashboard/planner", icon: FiCalendar },
  { name: "Salary Estimations", href: "/dashboard/salaries", icon: BiDollar },
  { name: "Add Job Info", href: "/dashboard/jobs/add", icon: BsClipboardPlus },
];
