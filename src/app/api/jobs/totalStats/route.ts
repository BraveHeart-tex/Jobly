import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface TotalApplicationStat {
  _count: {
    applicationStatus: number;
  };
  applicationStatus: string;
}

interface ApplicationStatusCount {
  status: string;
  count: number;
}

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

  const applicationStats = await prisma.jobApplication.groupBy({
    by: ['applicationStatus'],
    _count: {
      applicationStatus: true,
    },
    where: {
      userId: currentUser.id,
    },
  });

  const totalApplicationStats =
    mapTotalApplicationStatsToStatusCounts(applicationStats);

  return NextResponse.json(
    {
      totalApplicationStats,
    },
    {
      status: 200,
    }
  );
}

function mapTotalApplicationStatsToStatusCounts(
  totalApplicationStats: TotalApplicationStat[]
): ApplicationStatusCount[] {
  return totalApplicationStats.map(({ _count, applicationStatus }) => ({
    status: applicationStatus.toLowerCase(),
    count: _count.applicationStatus,
  }));
}
