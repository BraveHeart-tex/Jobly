import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import ApplicationStatusOptions from '@/app/utils/ApplicationStatusOptions';
import JobTypeOptions from '@/app/utils/JobTypeOptions';
import { ApplicationStatus, JobType } from '@prisma/client';
import { NextResponse } from 'next/server';

// Get all job applications
export async function GET(request: Request) {
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

  const jobApplications = await prisma.jobApplication.findMany({
    where: {
      userId: currentUser.id,
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
  // TODO: Validate jobType and applicationStatus
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
