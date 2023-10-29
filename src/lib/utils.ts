import { AiOutlineClockCircle } from "react-icons/ai";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ApplicationStatusCount, TotalApplicationStat } from "./types";

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
