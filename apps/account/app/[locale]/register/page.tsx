"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { setAuthCookies, isUserAuthenticated, getAuthToken, getCurrentTheme } from "@workspace/shared/utils/sso";
import { APP_DOMAINS } from "@workspace/shared/constants/domains";

function getTargetRedirectUrl(paramFallback: string): string {
  if (typeof window === "undefined") return paramFallback;

  try {
    const params = new URLSearchParams(window.location.search);
    let target =
      params.get("redirect_uri") ||
      params.get("return_url") ||
      params.get("target") ||
      params.get("callbackUrl") ||
      "";

    if (!target && paramFallback) {
      target = paramFallback;
    }

    if (target.startsWith("http://") || target.startsWith("https://")) {
      return target;
    }

    if (target.startsWith("/")) {
      return target;
    }

    return APP_DOMAINS.WEB;
  } catch {
    return APP_DOMAINS.WEB;
  }
}

function RegisterForm() {
  const locale = useLocale();
  const isEn = locale === "en";
  const searchParams = useSearchParams();
  const rawRedirectParam = searchParams.get("redirect_uri") || searchParams.get("return_url") || "";

  const [fullName, setFullName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [error, setError] = useState("");

  const performRedirect = (
    targetUrl: string,
    authData?: { token: string; refreshToken?: string; role?: string; email?: string }
  ) => {
    const currentOrigin = typeof window !== "undefined" ? window.location.origin : APP_DOMAINS.WEB;
    const destination = targetUrl || currentOrigin;
    let finalUrl = destination;

    if (authData) {
      try {
        const isAbsolute = destination.startsWith("http://") || destination.startsWith("https://");
        const base = isAbsolute
          ? destination
          : `${currentOrigin}${destination.startsWith("/") ? "" : "/"}${destination}`;
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

        const currentTheme = getCurrentTheme();
        if (currentTheme) urlObj.searchParams.set("theme", currentTheme);

        finalUrl = urlObj.toString();
      } catch {
        finalUrl = destination;
      }
    }

    if (finalUrl.startsWith("http://") || finalUrl.startsWith("https://")) {
      window.location.replace(finalUrl);
    } else {
      window.location.replace(`${currentOrigin}${finalUrl.startsWith("/") ? "" : "/"}${finalUrl}`);
    }
  };

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

  const handleRegisterSuccess = (userEmail: string) => {
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
    if (!fullName) {
      setError(isEn ? "Please enter your full name" : "Vui lòng nhập họ và tên");
      return;
    }
    if (!identifier) {
      setError(isEn ? "Please enter your email or phone" : "Vui lòng nhập email hoặc số điện thoại");
      return;
    }
    if (!password) {
      setError(isEn ? "Please enter your password" : "Vui lòng nhập mật khẩu");
      return;
    }
    if (!agreeTerms) {
      setError(isEn ? "Please accept the terms of service" : "Vui lòng đồng ý với điều khoản sử dụng");
      return;
    }
    handleRegisterSuccess(identifier.includes("@") ? identifier : `${identifier}@playgrid.vn`);
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
          {/* Title & Subtitle */}
          <div className="text-center space-y-1.5">
            <h1 className="text-2xl sm:text-3xl xl:text-[32px] font-extrabold tracking-tight text-foreground">
              {isEn ? "Create Play" : "Đăng ký Play"}
              <span className="bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                Grid
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal">
              {isEn ? "Join PlayGrid sports community today" : "Tạo tài khoản để tham gia giải đấu và đặt sân"}
            </p>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium text-center">
              {error}
            </div>
          )}

          {/* Register Form */}
          <form
            onSubmit={handleSubmit}
            toolname="user_register"
            tooldescription="Create a new PlayGrid player account with full name, email/phone, and password."
            className="space-y-4"
          >
            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 size-4.5 text-muted-foreground pointer-events-none" />
              <Input
                id="register-fullName"
                name="fullName"
                type="text"
                placeholder={isEn ? "Full Name" : "Họ và tên"}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isLoading}
                toolparamdescription="Full name of user creating the account"
                className="h-11.5 rounded-xl bg-background border border-border/80 pl-10.5 pr-3 text-xs sm:text-sm placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-brand-blue/30"
              />
            </div>

            {/* Email or Phone Input */}
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 size-4.5 text-muted-foreground pointer-events-none" />
              <Input
                id="register-identifier"
                name="identifier"
                type="text"
                placeholder={isEn ? "Email or phone number" : "Email hoặc số điện thoại"}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={isLoading}
                toolparamdescription="Email address or phone number for authentication"
                className="h-11.5 rounded-xl bg-background border border-border/80 pl-10.5 pr-3 text-xs sm:text-sm placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-brand-blue/30"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 size-4.5 text-muted-foreground pointer-events-none" />
              <Input
                id="register-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={isEn ? "Password" : "Mật khẩu"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                toolparamdescription="Account password (minimum 8 characters)"
                className="h-11.5 rounded-xl bg-background border border-border/80 pl-10.5 pr-11 text-xs sm:text-sm placeholder:text-muted-foreground/70 focus-visible:ring-2 focus-visible:ring-brand-blue/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="size-4.5" />
                ) : (
                  <Eye className="size-4.5" />
                )}
              </button>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2 text-xs pt-0.5">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="size-4 rounded-md border-border/80 text-brand-blue focus:ring-brand-blue/20 cursor-pointer accent-brand-blue mt-0.5"
              />
              <label htmlFor="agree-terms" className="text-muted-foreground leading-snug cursor-pointer select-none">
                {isEn ? "I agree to PlayGrid's " : "Tôi đồng ý với "}
                <span className="text-brand-blue dark:text-brand-green font-medium hover:underline">Điều khoản dịch vụ</span> & <span className="text-brand-blue dark:text-brand-green font-medium hover:underline">Chính sách bảo mật</span>
              </label>
            </div>

            {/* Main Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-green hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-sm active:scale-[0.99] transition-all cursor-pointer mt-1 border-0"
            >
              {isLoading
                ? isEn
                  ? "Creating account..."
                  : "Đang tạo tài khoản..."
                : isEn
                ? "Sign up"
                : "Đăng ký"}
            </Button>
          </form>

          {/* Switch to Login */}
          <div className="text-center text-xs sm:text-[13px] text-muted-foreground pt-1">
            <span>{isEn ? "Already have an account? " : "Đã có tài khoản? "}</span>
            <Link
              href={`/login${rawRedirectParam ? `?redirect_uri=${encodeURIComponent(rawRedirectParam)}` : ""}`}
              className="font-bold text-brand-blue dark:text-brand-green hover:underline"
            >
              {isEn ? "Sign in" : "Đăng nhập ngay"}
            </Link>
          </div>

          {/* Bottom 3 Trust Badges (Responsive: 1 column on mobile, 3 columns on tablet/desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-4 sm:pt-5 border-t border-border/50 text-left">
            <div className="flex items-center sm:items-start gap-2.5 sm:gap-2 p-2 sm:p-0 rounded-xl bg-muted/25 sm:bg-transparent">
              <div className="size-7.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="size-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs sm:text-[11px] md:text-xs font-bold text-foreground leading-tight">
                  {isEn ? "High Security" : "Bảo mật tuyệt đối"}
                </div>
                <div className="text-[11px] sm:text-[9.5px] md:text-[10px] text-muted-foreground leading-tight">
                  {isEn ? "End-to-end encrypted" : "Thông tin được mã hóa an toàn"}
                </div>
              </div>
            </div>

            <div className="flex items-center sm:items-start gap-2.5 sm:gap-2 p-2 sm:p-0 rounded-xl bg-muted/25 sm:bg-transparent">
              <div className="size-7.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <RefreshCw className="size-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs sm:text-[11px] md:text-xs font-bold text-foreground leading-tight">
                  {isEn ? "Sync Everywhere" : "Đồng bộ mọi nơi"}
                </div>
                <div className="text-[11px] sm:text-[9.5px] md:text-[10px] text-muted-foreground leading-tight">
                  {isEn ? "Access on all devices" : "Dữ liệu luôn được đồng bộ"}
                </div>
              </div>
            </div>

            <div className="flex items-center sm:items-start gap-2.5 sm:gap-2 p-2 sm:p-0 rounded-xl bg-muted/25 sm:bg-transparent">
              <div className="size-7.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="size-4" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs sm:text-[11px] md:text-xs font-bold text-foreground leading-tight">
                  {isEn ? "100% Free" : "Hoàn toàn miễn phí"}
                </div>
                <div className="text-[11px] sm:text-[9.5px] md:text-[10px] text-muted-foreground leading-tight">
                  {isEn ? "Full platform access" : "Trải nghiệm đầy đủ tính năng"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="size-6 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
