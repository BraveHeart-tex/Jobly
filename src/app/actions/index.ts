"use server";
import { ApplicationStatus, JobApplication, JobType, User } from "@prisma/client";
import prisma from "../libs/prismadb";
import ApplicationStatusOptions from "../utils/ApplicationStatusOptions";
import JobTypeOptions, { capitalizeJobTypeParams } from "../utils/JobTypeOptions";
import getCurrentUser from "./getCurrentUser";
import { convertResponseData, mapTotalApplicationStatsToStatusCounts } from "@/lib/utils";
import { redirect } from "next/navigation";
import { IJobSearchFormValues } from "../dashboard/jobs/JobSearchForm";
import { createGenericWithCurrentUser, updateGeneric } from "@/lib/generic";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import { handleJobFormSubmitParams } from "@/lib/types";
import { RegisterUserSchemaType } from "@/schemas/RegisterUserSchema";

export const withCurrentUser =
  (callback: (currentUser: User | null, ...args: any[]) => any) =>
  async (...args: any) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return callback(null, ...args);
    } else {
      return callback(currentUser, ...args);
    }
  };

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
export const getTotalJobStats = withCurrentUser(async (currentUser) => {
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
});

export const getMonthlyChartData = withCurrentUser(async (currentUser) => {
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
});

export const getJobApplications = withCurrentUser(
  async (
    currentUser,
    pageNumber = 1,
    searchParam = "",
    companySearchParam = "",
    statusParam = "",
    jobTypeParam = "",
    sortParam = "desc"
  ) => {
    if (!currentUser) {
      return {
        error: "You must be logged in to use this service.",
        hasNextPage: false,
        hasPreviousPage: false,
      };
    }

    console.log(searchParam);

    const pageSize = 12;

    const skipAmount = (pageNumber - 1) * pageSize;

    const mappedStatusParam = Object.entries(ApplicationStatusOptions).find(
      ([key, value]) => value === statusParam
    )?.[0];

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
  }
);

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
  citySearchParam: string = ""
) => {
  const pageSize = 10;
  const pageNumber = parseInt(pageParam);

  const skipAmount = (pageNumber - 1) * pageSize;

  const salaryData = await prisma.salaryEstimationDataset.findMany({
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
  });

  return {
    salaryData,
    hasNextPage: salaryData.length === pageSize,
    hasPreviousPage: pageNumber > 1,
  };
};

export const registerUser = async (data: RegisterUserSchemaType) => {
  const { name, email, password } = data;

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    return {
      error: `User already exists with the given email.`,
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return {
    user,
  };
};