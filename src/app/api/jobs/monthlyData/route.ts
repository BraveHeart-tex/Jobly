// monthly data for charts
import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

interface FormattedMonthlyApplication {
  date: string;
  count: number;
}

interface ResponseData {
  formattedMonthlyApplications: FormattedMonthlyApplication[];
}

export async function GET(request: Request) {
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

  const monthlyApplications = await prisma.jobApplication.groupBy({
    by: ['createdAt'],
    _count: {
      createdAt: true,
    },
  });

  const formattedMonthlyApplications = monthlyApplications.map((entry) => ({
    date: entry.createdAt.toISOString(),
    count: entry._count.createdAt,
  }));

  const transformedFinalData = convertResponseData({
    formattedMonthlyApplications,
  });

  return NextResponse.json(
    {
      monthlyApplicationsData:
        transformedFinalData.formattedMonthlyApplications,
    },
    {
      status: 200,
    }
  );
}

function convertResponseData(data: ResponseData): ResponseData {
  const formattedData: ResponseData = {
    formattedMonthlyApplications: [],
  };

  const monthMap: { [key: string]: string } = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };

  const monthCounts: { [key: string]: number } = {};

  for (const application of data.formattedMonthlyApplications) {
    const date = new Date(application.date);
    const month = `${monthMap[String(date.getMonth() + 1).padStart(2, '0')]}`;
    const year = `${date.getFullYear()}`;

    const formattedDate = `${month} ${year}`;

    if (formattedDate in monthCounts) {
      monthCounts[formattedDate] += application.count;
    } else {
      monthCounts[formattedDate] = application.count;
    }
  }

  for (const [date, count] of Object.entries(monthCounts)) {
    formattedData.formattedMonthlyApplications.push({
      date,
      count,
    });
  }

  formattedData.formattedMonthlyApplications.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  return formattedData;
}
