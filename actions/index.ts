"use server";
import { ApplicationStatus, JobApplication, JobType } from "@prisma/client";
import prisma from "../libs/prismadb";
import {
  APPLICATION_STATUS_OPTIONS,
  JOB_TYPE_OPTIONS,
  capitalizeJobTypeParams,
  convertResponseData,
  mapTotalApplicationStatsToStatusCounts,
} from "@/lib/utils";
import { redirect } from "next/navigation";
import { IJobSearchFormValues } from "@/app/dashboard/jobs/JobSearchForm";
import { createGenericWithCurrentUser, updateGeneric } from "@/lib/generic";
import { revalidatePath } from "next/cache";
import { handleJobFormSubmitParams } from "@/lib/types";
import { currentUser as getCurrentUser } from "@clerk/nextjs";

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
    `/dashboard/jobs?search=${searchTerm}&company=${companySearchTerm}&status=${applicationStatus}&jobType=${jobType}&sort=${sortTerm}&page=1`,
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
  pageNumber = 1,
  searchParam = "",
  companySearchParam = "",
  statusParam = "",
  jobTypeParam = "",
  sortParam = "desc",
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return {
      error: "You must be logged in to use this service.",
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }

  const pageSize = 12;

  const skipAmount = (pageNumber - 1) * pageSize;

  const mappedStatusParam = Object.entries(APPLICATION_STATUS_OPTIONS).find(
    ([key, value]) => value === statusParam,
  )?.[0];

  const mappedJobTypeParam = Object.entries(JOB_TYPE_OPTIONS).find(
    ([key, value]) => value === capitalizeJobTypeParams(jobTypeParam),
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

export const handleJobFormSubmit = async ({ mode, jobId, data }: handleJobFormSubmitParams) => {
  const processResult = async (result: any) => {
    if (result?.error) {
      return {
        error: result.error,
      };
    } else {
      revalidatePath("/dashboard/jobs");
      revalidatePath("/dashboard");
    }
  };

  if (mode === "edit") {
    const result = await updateGeneric<JobApplication>({
      tableName: "jobApplication",
      data,
      whereCondition: { id: jobId },
    });
    return processResult(result);
  } else {
    const result = await createGenericWithCurrentUser<JobApplication>({ tableName: "jobApplication", data });
    return processResult(result);
  }
};

export const searchSalaryDataset = async (
  pageParam: string = "1",
  sortParam: string = "desc",
  searchParam: string = "",
  citySearchParam: string = "",
) => {
  const pageSize = 10;
  const pageNumber = parseInt(pageParam);

  const skipAmount = (pageNumber - 1) * pageSize;

  const [salaryData, salaryDataCount] = await Promise.all([
    prisma.salaryEstimationDataset.findMany({
      skip: skipAmount,
      take: pageSize,
      where: {
        jobTitle: {
          contains: searchParam,
        },
        location: {
          contains: citySearchParam,
        },
      },
      orderBy: {
        salary_estimate: sortParam as "asc" | "desc",
      },
      select: {
        id: true,
        jobTitle: true,
        location: true,
        salary_estimate: true,
      },
    }),
    prisma.salaryEstimationDataset.count({
      where: {
        jobTitle: {
          contains: searchParam,
        },
        location: {
          contains: citySearchParam,
        },
      },
    }),
  ]);

  return {
    salaryData,
    hasNextPage: salaryData.length === pageSize,
    hasPreviousPage: pageNumber > 1,
    currentPage: pageNumber,
    totalPages: Math.ceil(salaryDataCount / pageSize),
  };
};
