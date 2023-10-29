"use server";
import prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { mapTotalApplicationStatsToStatusCounts } from "@/lib/utils";

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
