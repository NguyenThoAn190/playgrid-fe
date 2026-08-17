import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except static files, api routes, _next, account-static, etc.
  matcher: ["/((?!api|_next|_vercel|account-static|.*\\..*).*)"],
};
