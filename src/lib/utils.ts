import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApplicationStatusCount, ResponseData, TotalApplicationStat } from "./types";

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

export const monthMap: { [key: string]: string } = {
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

export function getKeyByValue(object: any, value: any) {
  for (const key in object) {
    if (object[key] === value) {
      return key;
    }
  }
  return null; // Return null if the value is not found in the object
}

export function convertResponseData(data: ResponseData): ResponseData {
  const formattedData: ResponseData = {
    formattedMonthlyApplications: [],
  };

  const monthCounts: { [key: string]: number } = {};

  for (const application of data.formattedMonthlyApplications) {
    const date = new Date(application.date);
    const month = `${monthMap[String(date.getMonth() + 1).padStart(2, "0")]}`;
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
