import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

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

// TODO: Update a job application by id
export async function PUT(request: Request) {}

// TODO: Delete a job application by id
export async function DELETE(request: Request) {}
