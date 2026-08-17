import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { detectBot, createBotBlockedResponse } from "@workspace/shared/middlewares/bot-detector";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // 1. Check if client previously triggered the honeypot trap
  const botFlagCookie = request.cookies.get("pg_bot_flag")?.value;
  if (botFlagCookie === "1") {
    return createBotBlockedResponse("Client previously flagged by crawler honeypot trap.");
  }

  // 2. Run anti-bot / anti-scraping checks on User-Agent and headers
  const botCheck = detectBot(request);
  if (botCheck.isBot && !botCheck.isAllowed) {
    return createBotBlockedResponse(botCheck.reason);
  }

  // 3. Normal multi-language routing
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except static files, api routes, _next, account-static, payment-static, etc.
  matcher: ["/((?!api|_next|_vercel|account-static|payment-static|.*\\..*).*)"],
};
