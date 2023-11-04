"use server";
import { ApplicationStatus, JobApplication, JobType } from "@prisma/client";
import prisma from "../libs/prismadb";
import ApplicationStatusOptions from "../utils/ApplicationStatusOptions";
import JobTypeOptions, { capitalizeJobTypeParams } from "../utils/JobTypeOptions";
import getCurrentUser from "./getCurrentUser";
import { convertResponseData, mapTotalApplicationStatsToStatusCounts } from "@/lib/utils";
import { redirect } from "next/navigation";
import { IJobSearchFormValues } from "../dashboard/jobs/JobSearchForm";
// TODO: HOF => withCurrentUser

export const searchJobs = async ({
  searchTerm,
  companySearchTerm,
  applicationStatus,
  jobType,
  sortTerm,
}: IJobSearchFormValues) => {
  if (!searchTerm && !companySearchTerm && !applicationStatus && !jobType && !sortTerm) {
    return redirect("/dashboard/jobs");
  }

  redirect(
    `/dashboard/jobs?search=${searchTerm}&company=${companySearchTerm}&status=${applicationStatus}&jobType=${jobType}&sort=${sortTerm}&page=1`
  );
};
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

export const getJobApplications = async (
  pageNumber: number = 1,
  searchParam: string = "",
  companySearchParam: string = "",
  statusParam: string = "",
  jobTypeParam: string = "",
  sortParam: string = "asc"
) => {
  const currentUser = await getCurrentUser();

  console.log(pageNumber, searchParam, companySearchParam, statusParam, jobTypeParam, sortParam);

  if (!currentUser) {
    return {
      error: "You must be logged in to use this service.",
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }

  const pageSize = 12;

  const skipAmount = (pageNumber - 1) * pageSize;

  const mappedStatusParam = Object.entries(ApplicationStatusOptions).find(([key, value]) => value === statusParam)?.[0];

  const mappedJobTypeParam = Object.entries(JobTypeOptions).find(
    ([key, value]) => value === capitalizeJobTypeParams(jobTypeParam)
  )?.[0];

  const jobApplications = await prisma.jobApplication.findMany({
    skip: skipAmount,
    take: pageSize,
    where: {
      userId: currentUser.id,
      jobTitle: {
        contains: searchParam,
      },
      companyName: {
        contains: companySearchParam,
      },
      applicationStatus: {
        equals: mappedStatusParam as ApplicationStatus,
      },
      jobType: {
        equals: mappedJobTypeParam as JobType,
      },
    },
    orderBy: {
      createdAt: sortParam as "asc" | "desc",
    },
    select: {
      id: true,
      jobTitle: true,
      companyName: true,
      applicationStatus: true,
      jobType: true,
      location: true,
      comments: true,
      createdAt: true,
    },
  });

  if (jobApplications.length === 0) {
    return {
      error: "No job applications found.",
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }

  return {
    jobApplications: jobApplications as JobApplication[],
    hasNextPage: jobApplications.length === pageSize,
    hasPreviousPage: pageNumber > 1,
  };
};