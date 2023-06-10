export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/', '/jobs', '/salaries', '/jobs/add', '/jobs/:path*'],
};
