/**
 * Domain & App URLs Configuration for PlayGrid Monorepo Ecosystem
 */
export const APP_DOMAINS = {
  WEB: process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000",
  DASHBOARD: process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001",
  ADMIN: process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3002",
  ACCOUNT: process.env.NEXT_PUBLIC_ACCOUNT_URL || "http://localhost:3003",
  PAYMENT: process.env.NEXT_PUBLIC_PAYMENT_URL || "http://localhost:3004",
  API: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  COOKIE_DOMAIN: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined,
};

export const getAppUrls = () => ({
  web: process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000",
  dashboard: process.env.NEXT_PUBLIC_DASHBOARD_URL || "http://localhost:3001",
  admin: process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3002",
  account: process.env.NEXT_PUBLIC_ACCOUNT_URL || "http://localhost:3003",
  payment: process.env.NEXT_PUBLIC_PAYMENT_URL || "http://localhost:3004",
  api: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  cookieDomain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || undefined,
});
