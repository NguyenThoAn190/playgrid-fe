import Cookies from "js-cookie";

// Client-side function (for Client Components)
export function getLocaleFromClientCookie(): string {
  if (typeof window === "undefined") {
    // Server-side fallback
    return "vi";
  }
  return Cookies.get("NEXT_LOCALE") || "vi";
}

// Generic function that works in both environments
export async function getLocale(): Promise<string> {
  if (typeof window !== "undefined") {
    // Client-side
    return Cookies.get("NEXT_LOCALE") || "vi";
  } else {
    // Server-side: import động next/headers
    const { cookies } = await import("next/headers");
    const cookie = await cookies();
    return cookie.get("NEXT_LOCALE")?.value || "vi";
  }
}
// Function to set locale cookie on client side
export function setLocaleCookie(locale: string): void {
  if (typeof window !== "undefined") {
    Cookies.set("NEXT_LOCALE", locale, { expires: 365 });
  }
}
