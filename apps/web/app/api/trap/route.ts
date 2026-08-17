import { NextRequest, NextResponse } from "next/server";

/**
 * Honeypot Trap Route
 * Real human users will never navigate to this endpoint.
 * Automated bots that crawl every link in the DOM will trigger this endpoint.
 */
export async function GET(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";

  // Log bot trap trigger for security monitoring
  console.warn(`[Anti-Bot Honeypot Triggered] IP: ${ip} | UA: ${userAgent} | Path: ${request.nextUrl.pathname}`);

  return new NextResponse(
    JSON.stringify({
      statusCode: 403,
      error: "Forbidden",
      message: "Access Denied: Crawler honeypot triggered.",
      flaggedIp: ip,
    }),
    {
      status: 403,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
        "Set-Cookie": "pg_bot_flag=1; Path=/; Max-Age=86400; HttpOnly; SameSite=Lax",
      },
    }
  );
}

export async function POST(request: NextRequest) {
  return GET(request);
}
