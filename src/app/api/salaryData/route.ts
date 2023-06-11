import prisma from '@/app/libs/prismadb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const pageParam = request.nextUrl.searchParams.get('page') || '1';
  const sortParam = request.nextUrl.searchParams.get('sort') || 'desc';

  const searchParam = request.nextUrl.searchParams.get('search') || '';

  const pageSize = 20;
  const pageNumber = parseInt(pageParam);

  const skipAmount = (pageNumber - 1) * pageSize;

  const salaryData = await prisma.salaryEstimationDataset.findMany({
    skip: skipAmount,
    take: pageSize,
    where: {
      jobTitle: {
        contains: searchParam,
      },
    },
    orderBy: {
      salary_estimate: sortParam as 'asc' | 'desc',
    },

    select: {
      id: true,
      jobTitle: true,
      location: true,
      salary_estimate: true,
    },
  });

  return NextResponse.json(salaryData);
}
