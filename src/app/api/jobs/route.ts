import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import ApplicationStatusOptions from '@/app/utils/ApplicationStatusOptions';
import JobTypeOptions, {
  capitalizeJobTypeParams,
} from '@/app/utils/JobTypeOptions';
import { ApplicationStatus, JobType } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

// Get all job applications
export async function GET(request: NextRequest) {
  const pageParam = request.nextUrl.searchParams.get('page') || '1';

  const searchParam = request.nextUrl.searchParams.get('search') || '';
  const companySearchParam = request.nextUrl.searchParams.get('company') || '';
  const statusParam = request.nextUrl.searchParams.get('status') || '';
  const jobTypeParam = request.nextUrl.searchParams.get('jobType') || '';
  const sortParam = request.nextUrl.searchParams.get('sort') || 'desc';

  const pageSize = 10;
  const pageNumber = parseInt(pageParam);

  const skipAmount = (pageNumber - 1) * pageSize;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      {
        message: 'You must be logged in to register your job application.',
      },
      {
        status: 401,
      }
    );
  }

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

  return NextResponse.json(
    {
      jobApplications,
    },
    { status: 200 }
  );
}

// Create a job application
export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      {
        message: 'You must be logged in to register your job application.',
      },
      {
        status: 401,
      }
    );
  }

  const {
    jobTitle,
    companyName,
    applicationStatus,
    jobType,
    jobLocation,
    comments,
  } = await request.json();

  if (
    !jobTitle ||
    !companyName ||
    !applicationStatus ||
    !jobType ||
    !jobLocation
  ) {
    return NextResponse.json(
      {
        message: 'You must provide all required fields.',
      },
      {
        status: 400,
      }
    );
  }

  const mappedJobType = Object.entries(JobTypeOptions).find(
    ([key, value]) => value === jobType
  )?.[0];
  const mappedApplicationStatus = Object.entries(ApplicationStatusOptions).find(
    ([key, value]) => value === applicationStatus
  )?.[0];

  const jobApplication = await prisma.jobApplication.create({
    data: {
      jobTitle,
      companyName,
      applicationStatus: mappedApplicationStatus as ApplicationStatus,
      jobType: mappedJobType as JobType,
      location: jobLocation,
      comments,
      User: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });

  return NextResponse.json(
    {
      jobApplication,
    },
    {
      status: 201,
    }
  );
}
