import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const pageNumber = 2;
  const pageSize = 10;

  const skipAmount = (pageNumber - 1) * pageSize;

  const salaryData = await prisma.salaryEstimateDataset.findMany({
    skip: skipAmount,
    take: pageSize,
  });

  return NextResponse.json(salaryData);
}
