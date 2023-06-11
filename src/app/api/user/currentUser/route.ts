import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

// GET Current User
export async function GET(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json(
      {
        message: 'Not authenticated',
      },
      {
        status: 401,
      }
    );
  }

  return NextResponse.json(
    {
      currentUser,
    },
    {
      status: 200,
    }
  );
}
