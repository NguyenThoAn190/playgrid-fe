import { routing } from "../i18n/routing";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
export default function middleware(request: NextRequest) {
  // Auth check
  const token = request.cookies.get("token");
  if (!token && !request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // next-intl middleware
  return createMiddleware(routing)(request);
}
