import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { detectBot, createBotBlockedResponse } from "@workspace/shared/middlewares/bot-detector";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // 1. Run anti-bot / anti-scraping checks
  const botCheck = detectBot(request);
  if (botCheck.isBot && !botCheck.isAllowed) {
    return createBotBlockedResponse(botCheck.reason);
  }

  // 2. Normal multi-language routing
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except static files, api routes, _next, account-static, etc.
  matcher: ["/((?!api|_next|_vercel|account-static|.*\\..*).*)"],
};
