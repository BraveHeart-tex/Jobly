export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  "SIGN-UP": "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
} as const;

export const contentByPortalType = {
  employee: [
    "Find your dream job with just one click",
    "Discover endless opportunities aligned with your passions",
    "Land interviews and secure your dream job",
  ],
  employer: [
    "Discover the ideal talent the right way",
    "Build your dream team effortlessly",
    "Transform hiring with tools that prioritize talent and humanity",
  ],
};
