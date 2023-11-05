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

export function deepEqualWithReduce(obj1: any, obj2: any, ignoreFields: string[] = []): boolean {
  const cleanedObj1 = ignoreFields.reduce((o, field) => ({ ...o, [field]: undefined }), { ...obj1 });
  const cleanedObj2 = ignoreFields.reduce((o, field) => ({ ...o, [field]: undefined }), { ...obj2 });

  if (cleanedObj1 === cleanedObj2) {
    return true;
  }

  if (
    typeof cleanedObj1 !== "object" ||
    typeof cleanedObj2 !== "object" ||
    cleanedObj1 === null ||
    cleanedObj2 === null
  ) {
    return cleanedObj1 === cleanedObj2;
  }

  const keys1 = Object.keys(cleanedObj1);
  const keys2 = Object.keys(cleanedObj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every((key) => keys2.includes(key) && deepEqualWithReduce(cleanedObj1[key], cleanedObj2[key]));
}

export const sortByDate = (a: any, b: any, sortBy: string, direction: "asc" | "desc" = "desc") => {
  const dateA = new Date(a[sortBy]);
  const dateB = new Date(b[sortBy]);

  if (direction === "asc") {
    return dateA.getTime() - dateB.getTime();
  }

  return dateB.getTime() - dateA.getTime();
};