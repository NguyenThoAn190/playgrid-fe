"use client";

import React, { useState, useEffect } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import Cookies from "js-cookie";
import { CookiesContains } from "@workspace/shared/constants/cookies";
import { getLogoutUrl, clearAuthCookies } from "@workspace/shared/utils/sso";
import tokenManager from "@workspace/shared/services/utils/tokenManager";
import { Button } from "@workspace/ui/components/button";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { ThemeToggle } from "@workspace/ui/components/theme-toggle";
import {
  Home,
  Compass,
  Plus,
  Activity,
  User,
  X,
  Moon,
  Sun,
  Globe,
  LogOut,
  Settings,
  ChevronRight,
  Trophy,
  Users,
  Newspaper,
  MapPin,
  UserPlus,
  LogIn,
} from "lucide-react";

export function MobileBottomNav() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const token =
        Cookies.get("token") ||
        Cookies.get("accessToken") ||
        Cookies.get(CookiesContains.TOKEN) ||
        Cookies.get("refresh_token") ||
        Cookies.get(CookiesContains.EMAIL);
      setIsAuthenticated(Boolean(token));
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    clearAuthCookies();
    Cookies.remove("token");
    Cookies.remove("accessToken");
    Cookies.remove("refresh_token");
    Cookies.remove(CookiesContains.EMAIL);
    Cookies.remove(CookiesContains.ROLE);
    tokenManager.removeTokens();
    setIsAuthenticated(false);
    setIsDrawerOpen(false);
    if (typeof window !== "undefined") {
      window.location.href = getLogoutUrl(window.location.href, locale);
    }
  };

  const toggleLanguage = (nextLocale: "vi" | "en") => {
    if (nextLocale !== locale) {
      router.replace(pathname, { locale: nextLocale });
    }
  };

  const navLinks = [
    { href: "/", label: t("home"), icon: Home },
    { href: "/explore", label: t("explore"), icon: Compass },
    { href: "/courts", label: t("courts"), icon: MapPin },
    { href: "/tournaments", label: t("tournaments"), icon: Trophy },
    { href: "/clubs", label: t("clubs"), icon: Users },
    { href: "/activities", label: t("activities"), icon: Activity },
    { href: "/blog", label: t("blog"), icon: Newspaper },
  ];

  const bottomItems = [
    { href: "/", label: t("home"), icon: Home },
    { href: "/explore", label: t("explore"), icon: Compass },
    { href: "/create", label: "", isCenterAction: true },
    { href: "/activities", label: t("activities"), icon: Activity },
    { isDrawerTrigger: true, label: t("profile"), icon: User },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-border/80 bg-background/95 pb-safe backdrop-blur-md lg:hidden">
        {bottomItems.map((item, idx) => {
          if (item.isCenterAction) {
            return (
              <button
                key="center-action"
                aria-label={t("create_new")}
                className="relative -top-4 flex size-12 items-center justify-center rounded-full bg-gradient-primary text-white shadow-lg shadow-glow-primary border-4 border-background transition-transform active:scale-90 hover:scale-105"
              >
                <Plus className="size-6 stroke-[3]" />
              </button>
            );
          }

          if (item.isDrawerTrigger) {
            const Icon = item.icon!;
            const isActive = isDrawerOpen || pathname.startsWith("/profile") || pathname.startsWith("/settings");

            return (
              <button
                key="drawer-trigger"
                onClick={() => setIsDrawerOpen(true)}
                className={`flex flex-col items-center justify-center gap-1 py-1 px-3 text-[11px] font-medium transition-colors ${
                  isActive
                    ? "font-semibold text-brand-blue dark:text-brand-green"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon
                  className={`size-5 transition-transform ${
                    isActive ? "scale-110 text-brand-blue dark:text-brand-green" : ""
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          }

          const Icon = item.icon!;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href!);

          return (
            <Link
              key={item.href || idx}
              href={item.href!}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-3 text-[11px] font-medium transition-colors ${
                isActive
                  ? "font-semibold text-brand-blue dark:text-brand-green"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon
                className={`size-5 transition-transform ${
                  isActive ? "scale-110 text-brand-blue dark:text-brand-green" : ""
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Slide-over Mobile Menu Drawer (Sidebar) */}
      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Container Panel */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col bg-background shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
          <div className="flex items-center gap-2">
            <img
              src="/logo/logo-nav-playgrid-black.avif"
              alt="PlayGrid Logo"
              className="h-6 w-auto object-contain dark:hidden"
            />
            <img
              src="/logo/logo-nav-playgrid-white.avif"
              alt="PlayGrid Logo"
              className="hidden h-6 w-auto object-contain dark:block"
            />
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close menu"
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Drawer Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {/* Auth Status Banner Card */}
          {isAuthenticated ? (
            <div className="rounded-2xl border border-border/80 bg-muted/40 p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="size-12 border-2 border-brand-blue/30 dark:border-brand-green/30">
                  <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" />
                  <AvatarFallback className="bg-brand-blue/10 text-brand-blue font-bold">
                    PG
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold text-sm text-foreground">Tài khoản PlayGrid</h4>
                  <p className="text-xs text-muted-foreground">Thành viên chính thức</p>
                </div>
              </div>
              <div className="pt-2 flex gap-2">
                <Link
                  href="/profile"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-background border border-border shadow-2xs hover:bg-muted transition-colors"
                >
                  <User className="size-3.5 text-brand-blue dark:text-brand-green" />
                  <span>Trang cá nhân</span>
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl bg-background border border-border shadow-2xs hover:bg-muted transition-colors"
                >
                  <Settings className="size-3.5 text-muted-foreground" />
                  <span>Cài đặt</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-brand-blue/20 dark:border-brand-green/20 bg-gradient-to-br from-brand-blue/5 to-brand-green/5 p-4 space-y-3">
              <h4 className="font-bold text-sm text-foreground">Chào mừng tới PlayGrid!</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Đăng nhập để đặt sân, tham gia giải đấu và kết nối với hàng ngàn người chơi.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Link
                  href="/auth/login"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1"
                >
                  <Button className="w-full rounded-xl font-semibold text-xs py-2 bg-gradient-primary text-white shadow-sm hover:opacity-95 transition-all">
                    <LogIn className="size-3.5 mr-1" />
                    {t("login")}
                  </Button>
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsDrawerOpen(false)}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full rounded-xl font-semibold text-xs py-2 transition-all">
                    <UserPlus className="size-3.5 mr-1" />
                    Đăng ký
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Quick Preferences & Tools Section */}
          <div className="space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-1">
              Cài đặt & Tiện ích
            </h5>
            <div className="rounded-2xl border border-border/80 bg-background overflow-hidden divide-y divide-border/50">
              {/* Darkmode Toggle */}
              <div className="flex items-center justify-between p-3.5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-muted text-brand-blue dark:text-brand-green">
                    <Sun className="hidden dark:block size-4" />
                    <Moon className="block dark:hidden size-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold block">Giao diện</span>
                    <span className="text-[11px] text-muted-foreground">Chế độ Tối / Sáng</span>
                  </div>
                </div>
                <ThemeToggle />
              </div>

              {/* Language Switcher */}
              <div className="flex items-center justify-between p-3.5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-muted text-brand-blue dark:text-brand-green">
                    <Globe className="size-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold block">Ngôn ngữ</span>
                    <span className="text-[11px] text-muted-foreground">
                      {locale === "vi" ? "Tiếng Việt 🇻🇳" : "English 🇬🇧"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleLanguage("vi")}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                      locale === "vi"
                        ? "bg-gradient-primary text-white"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    VI
                  </button>
                  <button
                    onClick={() => toggleLanguage("en")}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                      locale === "en"
                        ? "bg-gradient-primary text-white"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Full Navigation Links */}
          <div className="space-y-3">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-1">
              Khám phá PlayGrid
            </h5>
            <div className="rounded-2xl border border-border/80 bg-background overflow-hidden divide-y divide-border/50">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsDrawerOpen(false)}
                    className={`flex items-center justify-between p-3.5 text-xs font-medium transition-colors hover:bg-muted/50 ${
                      isActive
                        ? "font-bold text-brand-blue dark:text-brand-green bg-brand-blue/5 dark:bg-brand-green/5"
                        : "text-foreground/90"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`size-4 ${isActive ? "text-brand-blue dark:text-brand-green" : "text-muted-foreground"}`} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground/60" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Logout Button if Logged In */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-3 text-xs font-bold text-destructive rounded-2xl border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="size-4" />
              <span>{t("logout")}</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
