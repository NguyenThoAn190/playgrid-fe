"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { clearAuthCookies } from "@workspace/shared/utils/sso";
import { APP_DOMAINS } from "@workspace/shared/constants/domains";

function LogoutContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Wipe all cookies across root domain and current origin
    clearAuthCookies();

    // 2. Clear local and session storage
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("playgrid_token");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user_email");
        sessionStorage.clear();
      } catch {}
    }

    // 3. Determine redirect target
    const currentOrigin = typeof window !== "undefined" ? window.location.origin : APP_DOMAINS.WEB;
    const rawRedirect =
      searchParams.get("redirect_uri") ||
      searchParams.get("return_url") ||
      searchParams.get("target") ||
      currentOrigin;

    const target = rawRedirect.startsWith("http")
      ? rawRedirect
      : `${currentOrigin}${rawRedirect.startsWith("/") ? "" : "/"}${rawRedirect}`;

    setTimeout(() => {
      window.location.replace(target);
    }, 150);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="size-8 border-3 border-destructive border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm font-medium text-muted-foreground animate-pulse">
        Đang đăng xuất khỏi hệ thống PlayGrid...
      </p>
    </div>
  );
}

export default function LogoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="size-8 border-3 border-destructive border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LogoutContent />
    </Suspense>
  );
}
