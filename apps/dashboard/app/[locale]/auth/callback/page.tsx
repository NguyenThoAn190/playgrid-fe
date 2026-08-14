"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { setAuthCookies } from "@workspace/shared/utils/sso";

function AuthCallbackContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const refreshToken = searchParams.get("refreshToken") || searchParams.get("refresh_token") || undefined;
    const email = searchParams.get("email") || undefined;
    const role = searchParams.get("role") || undefined;
    const rawRedirect = searchParams.get("redirect_to") || searchParams.get("redirectTo") || "/";

    if (token) {
      setAuthCookies({
        token,
        refreshToken,
        email,
        role,
      });
    }

    const redirectTo = rawRedirect.startsWith("http")
      ? rawRedirect
      : rawRedirect.startsWith("/")
        ? rawRedirect
        : `/${rawRedirect}`;

    setTimeout(() => {
      window.location.replace(redirectTo);
    }, 150);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="size-8 border-3 border-primary border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-sm font-medium text-muted-foreground animate-pulse">
        Đang đồng bộ phiên đăng nhập Dashboard...
      </p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="size-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
