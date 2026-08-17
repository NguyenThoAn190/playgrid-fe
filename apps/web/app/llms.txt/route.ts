import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "llms.txt");
    const content = fs.readFileSync(filePath, "utf8");

    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
      },
    });
  } catch {
    const fallbackContent = `# PlayGrid - Sports Venue Booking & Community Platform

> PlayGrid is Vietnam's leading sports venue booking and tournament management platform.

- [Home](https://playgrid.vn/vi): Main Portal
- [Badminton](https://playgrid.vn/vi/badminton/venue): Book Badminton Courts
- [Pickleball](https://playgrid.vn/vi/pickleball/venue): Book Pickleball Courts
- [Events](https://playgrid.vn/vi/events): Tournaments & Events
- [Contact](https://playgrid.vn/vi/contact): Customer Support
`;
    return new NextResponse(fallbackContent, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}
