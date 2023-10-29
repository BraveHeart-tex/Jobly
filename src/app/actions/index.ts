"use server";
import prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { convertResponseData, mapTotalApplicationStatsToStatusCounts } from "@/lib/utils";

export const getTotalJobStats = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      error: "You must be logged in to use this service.",
    };
  }

  const applicationStats = await prisma.jobApplication.groupBy({
    by: ["applicationStatus"],
    _count: {
      applicationStatus: true,
    },
    where: {
      userId: currentUser.id,
    },
  });

  const totalApplicationStats = mapTotalApplicationStatsToStatusCounts(applicationStats);

  console.log(totalApplicationStats);

  return {
    totalApplicationStats,
  };
};

export const getMonthlyChartData = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      error: "You must be logged in to use this service.",
    };
  }

  const monthlyApplications = await prisma.jobApplication.groupBy({
    by: ["createdAt"],
    _count: {
      createdAt: true,
    },
    where: {
      userId: currentUser.id,
    },
  });

  const formattedMonthlyApplications = monthlyApplications.map((entry) => ({
    date: entry.createdAt.toISOString(),
    count: entry._count.createdAt,
  }));

  const transformedFinalData = convertResponseData({
    formattedMonthlyApplications,
  });

  return {
    monthlyApplicationsData: transformedFinalData.formattedMonthlyApplications,
  };
};