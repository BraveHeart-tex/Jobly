import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface TotalApplicationStat {
  _count: {
    applicationStatus: number;
  };
  applicationStatus: string;
}

interface DefaultStats {
  pending: number;
  interview: number;
  declined: number;
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
  });

  const totalApplicationStats =
    mapTotalApplicationStatsToDefaultStats(applicationStats);

  return NextResponse.json(
    {
      totalApplicationStats,
    },
    {
      status: 200,
    }
  );
}

function mapTotalApplicationStatsToDefaultStats(
  totalApplicationStats: TotalApplicationStat[]
): DefaultStats {
  return totalApplicationStats.reduce(
    (stats, { _count, applicationStatus }) => {
      switch (applicationStatus) {
        case 'PENDING':
          stats.pending = _count.applicationStatus;
          break;
        case 'INTERVIEW':
          stats.interview = _count.applicationStatus;
          break;
        case 'DECLINED':
          stats.declined = _count.applicationStatus;
          break;
        default:
          break;
      }
      return stats;
    },
    { pending: 0, interview: 0, declined: 0 }
  );
}
