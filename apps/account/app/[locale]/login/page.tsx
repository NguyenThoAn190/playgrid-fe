"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { setAuthCookies, isUserAuthenticated, getAuthToken } from "@workspace/shared/utils/sso";
import { APP_DOMAINS } from "@workspace/shared/constants/domains";

function getTargetRedirectUrl(paramFallback: string): string {
  if (typeof window === "undefined") return paramFallback;

  try {
    const params = new URLSearchParams(window.location.search);
    let target =
      params.get("redirect_uri") ||
      params.get("return_url") ||
      params.get("continue") ||
      paramFallback ||
      "";

    if (target) {
      while (target.includes("%3A") || target.includes("%2F") || target.includes("%26")) {
        try {
          const decoded = decodeURIComponent(target);
          if (decoded === target) break;
          target = decoded;
        } catch {
          break;
        }
      }
      return target;
    }
  } catch {}

  return paramFallback || "";
}

function LoginForm() {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const isEn = locale === "en";

  const rawRedirectParam = searchParams.get("redirect_uri") || searchParams.get("return_url") || "";

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [error, setError] = useState("");

  const performRedirect = (
    targetUrl: string,
    authData?: { token: string; refreshToken?: string; role?: string; email?: string }
  ) => {
    const destination = targetUrl || APP_DOMAINS.WEB;
    let finalUrl = destination;

    if (authData) {
      try {
        const isAbsolute = destination.startsWith("http://") || destination.startsWith("https://");
        const base = isAbsolute
          ? destination
          : `${APP_DOMAINS.WEB}${destination.startsWith("/") ? "" : "/"}${destination}`;
        const urlObj = new URL(base);

        // Route through /auth/callback on the target app to sync cookies
        if (!urlObj.pathname.includes("/auth/callback")) {
          const originalTarget = urlObj.pathname + urlObj.search;
          urlObj.pathname = `/${locale}/auth/callback`;
          urlObj.searchParams.set("redirect_to", originalTarget);
        }

        urlObj.searchParams.set("token", authData.token);
        if (authData.refreshToken) urlObj.searchParams.set("refreshToken", authData.refreshToken);
        if (authData.role) urlObj.searchParams.set("role", authData.role);
        if (authData.email) urlObj.searchParams.set("email", authData.email);

        finalUrl = urlObj.toString();
      } catch {
        finalUrl = destination;
      }
    }

    if (finalUrl.startsWith("http://") || finalUrl.startsWith("https://")) {
      window.location.replace(finalUrl);
    } else {
      window.location.replace(`${APP_DOMAINS.WEB}${finalUrl.startsWith("/") ? "" : "/"}${finalUrl}`);
    }
  };

  // Auto redirect if user is already authenticated
  useEffect(() => {
    const target = getTargetRedirectUrl(rawRedirectParam);
    if (isUserAuthenticated()) {
      const currentToken = getAuthToken();
      if (currentToken) {
        performRedirect(target, { token: currentToken });
      } else {
        performRedirect(target);
      }
    } else {
      setIsCheckingAuth(false);
    }
  }, [rawRedirectParam]);

  const handleLoginSuccess = (userEmail: string) => {
    setIsLoading(true);
    setError("");

    const tokenData = {
      token: `pg_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      refreshToken: `pg_refresh_${Date.now()}`,
      role: "user",
      email: userEmail,
    };

    setAuthCookies(tokenData);

    const target = getTargetRedirectUrl(rawRedirectParam);

    setTimeout(() => {
      performRedirect(target, tokenData);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) {
      setError(isEn ? "Please enter your email or phone" : "Vui lòng nhập email hoặc số điện thoại");
      return;
    }
    if (!password) {
      setError(isEn ? "Please enter your password" : "Vui lòng nhập mật khẩu");
      return;
    }
    handleLoginSuccess(identifier.includes("@") ? identifier : `${identifier}@playgrid.vn`);
  };

  const handleQuickDemoLogin = () => {
    handleLoginSuccess("alex.runner@playgrid.vn");
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="size-6 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row items-stretch bg-background">
      {/* Left Column: 100% Full-Screen Mascot Image without any padding or margin */}
      <div className="hidden lg:block lg:w-1/2 relative h-screen overflow-hidden select-none bg-muted/40">
        <Image
          src="/images/login/grily-wellcome-login.png"
          alt="PlayGrid Mascot Grily"
          fill
          priority
          unoptimized
          className="object-cover"
        />
      </div>

      {/* Right Column: Full-Height Clean & Spacious Auth Container (50% Width) */}
      <div className="w-full lg:w-1/2 min-h-screen flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 xl:p-16 bg-card border-t lg:border-t-0 lg:border-l border-border/60 overflow-y-auto">
        <div className="w-full max-w-[480px] xl:max-w-[500px] space-y-5 my-auto">
          {/* 1-Click Demo Testing Badge/Button */}
          <div className="flex items-center justify-between pb-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleQuickDemoLogin}
              disabled={isLoading}
              className="h-8.5 rounded-full border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-1.5 px-3.5 shadow-2xs cursor-pointer active:scale-95 transition-all w-full justify-center"
            >
              <Zap className="size-3.5 fill-emerald-500" />
              <span>{isEn ? "⚡ 1-Click Instant Demo Login" : "⚡ Đăng nhập thử nghiệm 1-chạm (Demo User)"}</span>
            </Button>
          </div>

          {/* Title & Subtitle */}
          <div className="text-center space-y-1.5">
            <h1 className="text-2xl sm:text-3xl xl:text-[32px] font-extrabold tracking-tight text-foreground">
              {isEn ? "Sign in to Play" : "Đăng nhập Play"}
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Grid
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal">
              {isEn ? "Welcome back!" : "Chào mừng bạn quay trở lại!"}
            </p>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium text-center">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email or Phone Input */}
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 size-4.5 text-muted-foreground pointer-events-none" />
              <Input
                type="text"
                placeholder={isEn ? "Email or phone number" : "Email hoặc số điện thoại"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={isLoading}
                className="h-11.5 rounded-xl bg-background border border-border/80 pl-10.5 pr-3 text-xs sm:text-sm placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-brand-blue/30"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 size-4.5 text-muted-foreground pointer-events-none" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder={isEn ? "Password" : "Mật khẩu"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="h-11.5 rounded-xl bg-background border border-border/80 pl-10.5 pr-11 text-xs sm:text-sm placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-brand-blue/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4.5" />
                ) : (
                  <Eye className="size-4.5" />
                )}
              </button>
            </div>

            {/* Options Row: Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 text-foreground/80 font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="size-4 rounded-md border-border/80 text-brand-blue focus:ring-brand-blue/20 cursor-pointer accent-brand-blue"
                />
                <span>{isEn ? "Remember login" : "Ghi nhớ đăng nhập"}</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-brand-blue dark:text-brand-green font-medium hover:underline"
              >
                {isEn ? "Forgot password?" : "Quên mật khẩu?"}
              </Link>
            </div>

            {/* Main Submit Button (Gradient from brand-blue to brand-green) */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-green hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-sm active:scale-[0.99] transition-all cursor-pointer mt-1 border-0"
            >
              {isLoading
                ? isEn
                  ? "Signing in..."
                  : "Đang đăng nhập..."
                : isEn
                ? "Sign in"
                : "Đăng nhập"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-1">
            <div className="border-t border-border/60 w-full" />
            <span className="bg-card dark:bg-background px-3 text-[11px] text-muted-foreground font-medium whitespace-nowrap">
              {isEn ? "Or sign in with" : "Hoặc đăng nhập với"}
            </span>
          </div>

          {/* 3 Social Login Buttons Row */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {/* Google Button */}
            <button
              type="button"
              onClick={() => handleLoginSuccess("google.user@gmail.com")}
              className="h-11 rounded-xl border border-border/80 bg-background hover:bg-muted/40 font-semibold text-xs sm:text-[13px] text-foreground flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <svg className="size-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            {/* Facebook Button */}
            <button
              type="button"
              onClick={() => handleLoginSuccess("fb.user@facebook.com")}
              className="h-11 rounded-xl border border-border/80 bg-background hover:bg-muted/40 font-semibold text-xs sm:text-[13px] text-foreground flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <svg className="size-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </button>

            {/* Apple Button */}
            <button
              type="button"
              onClick={() => handleLoginSuccess("apple.user@icloud.com")}
              className="h-11 rounded-xl border border-border/80 bg-background hover:bg-muted/40 font-semibold text-xs sm:text-[13px] text-foreground flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <svg className="size-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.12.65-2.79 1.43-.59.68-1.11 1.74-1.01 2.79 1.07.08 2.18-.6 2.79-1.35z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          {/* Register Prompt */}
          <div className="text-center text-xs sm:text-[13px] text-muted-foreground pt-1">
            <span>{isEn ? "Don't have an account? " : "Chưa có tài khoản? "}</span>
            <Link
              href={`/register${rawRedirectParam ? `?redirect_uri=${encodeURIComponent(rawRedirectParam)}` : ""}`}
              className="font-bold text-brand-blue dark:text-brand-green hover:underline"
            >
              {isEn ? "Register now" : "Đăng ký ngay"}
            </Link>
          </div>

          {/* Bottom 3 Trust Badges (Responsive: 1 column on mobile, 3 columns on tablet/desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-4 sm:pt-5 border-t border-border/50 text-left">
            {/* Badge 1 */}
            <div className="flex items-center sm:items-start gap-2.5 sm:gap-2 p-2 sm:p-0 rounded-xl bg-muted/25 sm:bg-transparent">
              <div className="size-7.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="size-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs sm:text-[11px] md:text-xs font-bold text-foreground leading-tight">
                  {isEn ? "High Security" : "Bảo mật tuyệt đối"}
                </div>
                <div className="text-[11px] sm:text-[9.5px] md:text-[10px] text-muted-foreground leading-tight">
                  {isEn ? "End-to-end encrypted" : "Thông tin của bạn được mã hóa an toàn"}
                </div>
              </div>
            </div>

            {/* Badge 2 */}
            <div className="flex items-center sm:items-start gap-2.5 sm:gap-2 p-2 sm:p-0 rounded-xl bg-muted/25 sm:bg-transparent">
              <div className="size-7.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <RefreshCw className="size-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs sm:text-[11px] md:text-xs font-bold text-foreground leading-tight">
                  {isEn ? "Sync Everywhere" : "Đồng bộ mọi nơi"}
                </div>
                <div className="text-[11px] sm:text-[9.5px] md:text-[10px] text-muted-foreground leading-tight">
                  {isEn ? "Access on all devices" : "Truy cập trên mọi thiết bị, dữ liệu luôn được đồng bộ"}
                </div>
              </div>
            </div>

            {/* Badge 3 */}
            <div className="flex items-center sm:items-start gap-2.5 sm:gap-2 p-2 sm:p-0 rounded-xl bg-muted/25 sm:bg-transparent">
              <div className="size-7.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="size-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs sm:text-[11px] md:text-xs font-bold text-foreground leading-tight">
                  {isEn ? "100% Free" : "Hoàn toàn miễn phí"}
                </div>
                <div className="text-[11px] sm:text-[9.5px] md:text-[10px] text-muted-foreground leading-tight">
                  {isEn ? "Full platform access" : "Trải nghiệm đầy đủ các tính năng của PlayGrid"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="size-6 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
