import { verifyRequestOrigin } from "lucia";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.nextUrl.href);

  if (request.method === "GET") {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  const originHeader = request.headers.get("Origin");
  const hostHeader = request.headers.get("Host");
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/app/:path*",
    "/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
