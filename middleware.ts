export { default } from "next-auth/middleware";


export const config = {
  matcher: ["/dashboard", "/dashboard/jobs", "/dashboard/salaries", "/dashboard/jobs/add", "/dashboard/jobs/:path*"],
};
