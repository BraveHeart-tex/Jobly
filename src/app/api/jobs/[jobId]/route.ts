import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import JobTypeOptions from '@/app/utils/JobTypeOptions';
import ApplicationStatusOptions from '@/app/utils/ApplicationStatusOptions';
import { ApplicationStatus, JobType } from '@prisma/client';

interface IParams {
  jobId: string;
}

// Get a job application by id
export async function GET(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      {
        message: 'You must be logged in to do that.',
      },
      {
        status: 401,
      }
    );
  }
  const { jobId } = params;

  if (!jobId || typeof jobId !== 'string') {
    return NextResponse.json(
      {
        message: 'You must provide a valid job id.',
      },
      {
        status: 400,
      }
    );
  }

  const job = await prisma.jobApplication.findUnique({
    where: {
      id: parseInt(jobId),
    },
  });

  if (!job) {
    return NextResponse.json(
      {
        message: 'Job not found with the provided id.',
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      job,
    },
    {
      status: 200,
    }
  );
}

// Update a job application by id
export async function PUT(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      {
        message: 'You must be logged in to do that.',
      },
      {
        status: 401,
      }
    );
  }
  const { jobId } = params;

  if (!jobId || typeof jobId !== 'string') {
    return NextResponse.json(
      {
        message: 'You must provide a valid job id.',
      },
      {
        status: 400,
      }
    );
  }

  const job = await prisma.jobApplication.findUnique({
    where: {
      id: parseInt(jobId),
    },
  });

  if (!job) {
    return NextResponse.json(
      {
        message: 'Job not found with the provided id.',
      },
      {
        status: 404,
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

  const updatedJob = await prisma.jobApplication.update({
    where: {
      id: parseInt(jobId),
    },
    data: {
      jobTitle,
      companyName,
      applicationStatus: mappedApplicationStatus as ApplicationStatus,
      jobType: mappedJobType as JobType,
      location: jobLocation,
      comments,
    },
  });

  return NextResponse.json(
    {
      job: updatedJob,
    },
    {
      status: 200,
    }
  );
}

// Delete a job application by id
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      {
        message: 'You must be logged in to do that.',
      },
      {
        status: 401,
      }
    );
  }
  const { jobId } = params;

  if (!jobId || typeof jobId !== 'string') {
    return NextResponse.json(
      {
        message: 'You must provide a valid job id.',
      },
      {
        status: 400,
      }
    );
  }

  const job = await prisma.jobApplication.findUnique({
    where: {
      id: parseInt(jobId),
    },
  });

  if (!job) {
    return NextResponse.json(
      {
        message: 'Job not found with the provided id.',
      },
      {
        status: 404,
      }
    );
  }

  await prisma.jobApplication.delete({
    where: {
      id: parseInt(jobId),
    },
  });

  return NextResponse.json(
    {
      message: 'Job application deleted successfully.',
    },
    {
      status: 200,
    }
  );
}
