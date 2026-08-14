"use client";

import * as React from "react";
import Cookies from "js-cookie";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { CookiesContains } from "@workspace/shared/constants/cookies";
import { clearAuthCookies, getLogoutUrl } from "@workspace/shared/utils/sso";
import tokenManager from "@workspace/shared/services/utils/tokenManager";

import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "@workspace/ui/components/theme-toggle";
import { Button } from "@workspace/ui/components/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@workspace/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";

export function DesktopNavbar() {
  const t = useTranslations("navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  React.useEffect(() => {
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
    if (typeof window !== "undefined") {
      window.location.href = getLogoutUrl(window.location.href, locale);
    }
  };

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/explore", label: t("explore") },
    { href: "/courts", label: t("courts") },
    { href: "/tournaments", label: t("tournaments") },
    { href: "/clubs", label: t("clubs") },
    { href: "/activities", label: t("activities") },
    { href: "/blog", label: t("blog") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <div className="flex items-center shrink-0">
          <Logo />
        </div>

        {/* Center: Main Navigation Menu */}
        <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 mx-4">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-5 px-2 xl:px-3 text-xs xl:text-sm font-medium whitespace-nowrap transition-colors hover:text-brand-blue dark:hover:text-brand-green shrink-0 ${
                  isActive
                    ? "font-semibold text-brand-blue dark:text-brand-green"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 xl:left-3 xl:right-3 h-[2.5px] rounded-full bg-gradient-primary transition-all" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions & Tools */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Controls: Theme & Language */}
          <div className="flex items-center gap-0.5">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {/* Auth Handling: Login button or Avatar */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-1.5 p-1 rounded-full hover:bg-muted"
                  aria-label={t("profile")}
                >
                  <Avatar className="size-8 border border-border">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      alt="User Avatar"
                    />
                    <AvatarFallback className="bg-brand-blue/10 text-brand-blue dark:bg-brand-green/20 dark:text-brand-green font-semibold">
                      PG
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="font-semibold">
                  Tài khoản của tôi
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0">
                  <Link href="/profile" className="flex items-center gap-2 w-full px-2 py-1.5 cursor-pointer">
                    <User className="size-4 text-muted-foreground" />
                    <span>{t("profile")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                  <Link href="/settings" className="flex items-center gap-2 w-full px-2 py-1.5 cursor-pointer">
                    <Settings className="size-4 text-muted-foreground" />
                    <span>{t("settings")}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="size-4" />
                  <span>{t("logout")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login" className="shrink-0">
              <Button className="rounded-xl font-semibold px-5 py-2 h-9 text-xs sm:text-sm whitespace-nowrap shrink-0 bg-gradient-primary text-white shadow-sm hover:opacity-95 active:scale-95 transition-all">
                {t("login")}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

