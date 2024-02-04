import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/sign-in", "/sign-up", "/privacy-policy"],
  afterAuth(auth, req, evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
    }
  },
  beforeAuth(req, evt) {
    const url = req.nextUrl.pathname;

    if (url === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
