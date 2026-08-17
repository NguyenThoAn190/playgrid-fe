import Cookies from "js-cookie";
import { CookiesContains } from "../constants/cookies";
import { getAppUrls } from "../constants/domains";

/**
 * Reads current theme from localStorage, Cookie or document class
 */
export function getCurrentTheme(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const local = localStorage.getItem("playgrid_theme");
    if (local === "dark" || local === "light") return local;
    const cookie = Cookies.get("playgrid_theme");
    if (cookie === "dark" || cookie === "light") return cookie;
    if (document.documentElement.classList.contains("dark")) return "dark";
    if (document.documentElement.classList.contains("light")) return "light";
  } catch {}
  return undefined;
}

/**
 * Helper to check if current runtime should use same-origin relative auth URLs
 */
function shouldUseSameOrigin(options?: { sameOrigin?: boolean }): boolean {
  if (typeof options?.sameOrigin === "boolean") return options.sameOrigin;
  if (typeof window === "undefined") return false;

  const { web } = getAppUrls();
  try {
    const currentOrigin = window.location.origin;
    if (web && currentOrigin === web) return true;
    if (window.location.host.includes("web") || window.location.port === "3000") return true;
  } catch {}

  return false;
}

/**
 * Generates the SSO Login URL with return_url / redirect_uri and theme sync
 */
export function getLoginUrl(
  returnUrl?: string,
  locale: string = "vi",
  options?: { sameOrigin?: boolean }
): string {
  const { account } = getAppUrls();
  let targetReturn = returnUrl;

  if (!targetReturn && typeof window !== "undefined") {
    targetReturn = window.location.href;
  }

  const queryParams = new URLSearchParams();
  if (targetReturn) {
    queryParams.set("redirect_uri", targetReturn);
  }

  const theme = getCurrentTheme();
  if (theme) {
    queryParams.set("theme", theme);
  }

  const queryString = queryParams.toString();
  const path = `/${locale}/login${queryString ? `?${queryString}` : ""}`;

  if (shouldUseSameOrigin(options)) {
    return path;
  }

  return `${account}${path}`;
}

/**
 * Generates the SSO Register URL with return_url / redirect_uri and theme sync
 */
export function getRegisterUrl(
  returnUrl?: string,
  locale: string = "vi",
  options?: { sameOrigin?: boolean }
): string {
  const { account } = getAppUrls();
  let targetReturn = returnUrl;

  if (!targetReturn && typeof window !== "undefined") {
    targetReturn = window.location.href;
  }

  const queryParams = new URLSearchParams();
  if (targetReturn) {
    queryParams.set("redirect_uri", targetReturn);
  }

  const theme = getCurrentTheme();
  if (theme) {
    queryParams.set("theme", theme);
  }

  const queryString = queryParams.toString();
  const path = `/${locale}/register${queryString ? `?${queryString}` : ""}`;

  if (shouldUseSameOrigin(options)) {
    return path;
  }

  return `${account}${path}`;
}

/**
 * Generates the SSO Logout URL with return_url / redirect_uri and theme sync
 */
export function getLogoutUrl(
  returnUrl?: string,
  locale: string = "vi",
  options?: { sameOrigin?: boolean }
): string {
  const { account } = getAppUrls();
  let targetReturn = returnUrl;

  if (!targetReturn && typeof window !== "undefined") {
    targetReturn = window.location.href;
  }

  const queryParams = new URLSearchParams();
  if (targetReturn) {
    queryParams.set("redirect_uri", targetReturn);
  }

  const theme = getCurrentTheme();
  if (theme) {
    queryParams.set("theme", theme);
  }

  const queryString = queryParams.toString();
  const path = `/${locale}/logout${queryString ? `?${queryString}` : ""}`;

  if (shouldUseSameOrigin(options)) {
    return path;
  }

  return `${account}${path}`;
}

/**
 * Generates the Payment Checkout URL with order/session metadata and theme sync
 */
export function getPaymentUrl(params?: {
  orderId?: string;
  amount?: number;
  returnUrl?: string;
  locale?: string;
  sameOrigin?: boolean;
}): string {
  const { payment, web } = getAppUrls();
  const locale = params?.locale || "vi";
  const queryParams = new URLSearchParams();

  if (params?.orderId) queryParams.set("order_id", params.orderId);
  if (params?.amount) queryParams.set("amount", String(params.amount));

  const returnUrl = params?.returnUrl || (typeof window !== "undefined" ? window.location.href : web);
  if (returnUrl) queryParams.set("return_url", returnUrl);

  const token = getAuthToken();
  if (token) queryParams.set("token", token);

  const theme = getCurrentTheme();
  if (theme) queryParams.set("theme", theme);

  const queryString = queryParams.toString();
  const path = `/${locale}/payment${queryString ? `?${queryString}` : ""}`;

  if (shouldUseSameOrigin(params)) {
    return path;
  }

  return `${payment}/${locale}${queryString ? `?${queryString}` : ""}`;
}

/**
 * Checks if the current app is running in PWA standalone mode
 */
export function isPWA(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    Boolean((window.navigator as any).standalone) ||
    document.referrer.includes("android-app://")
  );
}

/**
 * Cross-Subdomain Auth Cookie Configuration
 */
export function getCookieOptions(): Cookies.CookieAttributes {
  const { cookieDomain } = getAppUrls();
  const isProd = process.env.NODE_ENV === "production";

  const options: Cookies.CookieAttributes = {
    path: "/",
    sameSite: "lax",
    expires: 30, // 30 days
  };

  // If running in production or configured with a shared domain (e.g. .playgrid.vn)
  if (cookieDomain && cookieDomain !== "localhost") {
    options.domain = cookieDomain;
  }

  if (isProd) {
    options.secure = true;
  }

  return options;
}

/**
 * Sets Authentication Cookies across subdomains
 */
export function setAuthCookies(data: {
  token: string;
  refreshToken?: string;
  role?: string;
  email?: string;
}) {
  const options = getCookieOptions();

  // Set all standard token cookie variants for cross-subdomain & cross-app compatibility
  Cookies.set(CookiesContains.TOKEN, data.token, options);
  Cookies.set("token", data.token, options);
  Cookies.set("accessToken", data.token, options);
  Cookies.set("access_token", data.token, options);

  if (data.refreshToken) {
    Cookies.set(CookiesContains.REFRESH_TOKEN, data.refreshToken, options);
    Cookies.set("refreshToken", data.refreshToken, options);
    Cookies.set("refresh_token", data.refreshToken, options);
  }
  if (data.role) {
    Cookies.set(CookiesContains.ROLE, data.role, options);
    Cookies.set("role", data.role, options);
  }
  if (data.email) {
    Cookies.set(CookiesContains.EMAIL, data.email, options);
    Cookies.set("email", data.email, options);
  }

  // Backup in localStorage for cross-tab or same origin fallback
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("token", data.token);
      localStorage.setItem("playgrid_token", data.token);
      localStorage.setItem("accessToken", data.token);
      if (data.email) localStorage.setItem("user_email", data.email);
    } catch {}
  }
}

/**
 * Clears Authentication Cookies across subdomains
 */
export function clearAuthCookies() {
  const options = getCookieOptions();

  const keys = [
    CookiesContains.TOKEN,
    CookiesContains.REFRESH_TOKEN,
    CookiesContains.ROLE,
    CookiesContains.EMAIL,
    "token",
    "accessToken",
    "access_token",
    "refreshToken",
    "refresh_token",
    "role",
    "email",
  ];

  keys.forEach((key) => {
    Cookies.remove(key, options);
    Cookies.remove(key, { path: "/" });
  });

  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("playgrid_token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user_email");
    } catch {}
  }
}

/**
 * Reads token from cookies or localStorage
 */
export function getAuthToken(): string | undefined {
  if (typeof window === "undefined") return undefined;

  return (
    Cookies.get(CookiesContains.TOKEN) ||
    Cookies.get("token") ||
    Cookies.get("accessToken") ||
    Cookies.get("access_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("playgrid_token") ||
    localStorage.getItem("accessToken") ||
    undefined
  );
}

/**
 * Checks if user is authenticated via cookie or storage
 */
export function isUserAuthenticated(): boolean {
  if (typeof window === "undefined") return false;

  const hasCookieToken = !!(
    Cookies.get(CookiesContains.TOKEN) ||
    Cookies.get("token") ||
    Cookies.get("accessToken") ||
    Cookies.get("access_token") ||
    Cookies.get(CookiesContains.EMAIL) ||
    Cookies.get("email")
  );

  if (hasCookieToken) return true;

  try {
    const hasLocalToken = !!(
      localStorage.getItem("token") ||
      localStorage.getItem("playgrid_token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("user_email")
    );
    return hasLocalToken;
  } catch {
    return false;
  }
}
