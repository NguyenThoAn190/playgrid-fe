"use client";

import * as React from "react";
import Cookies from "js-cookie";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { CookiesContains } from "@workspace/shared/constants/cookies";
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

import { useHeaderVisible } from "@/hooks/use-scroll-direction";

export function DesktopNavbar() {
  const t = useTranslations("navbar");
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
    Cookies.remove("token");
    Cookies.remove("accessToken");
    Cookies.remove("refresh_token");
    Cookies.remove(CookiesContains.EMAIL);
    Cookies.remove(CookiesContains.ROLE);
    tokenManager.removeTokens();
    setIsAuthenticated(false);
    window.location.reload();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId?: string) => {
    const isHomePage = pathname === "/" || pathname === "/vi" || pathname === "/en";
    if (sectionId && isHomePage) {
      const target = document.getElementById(sectionId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const navItems = [
    { href: "/", label: t("home"), sectionId: undefined },
    { href: "/#explore-sports", label: t("explore"), sectionId: "explore-sports" },
    { href: "/courts", label: t("courts"), sectionId: undefined },
    { href: "/tournaments", label: t("tournaments"), sectionId: undefined },
    { href: "/clubs", label: t("clubs"), sectionId: undefined },
    { href: "/activities", label: t("activities"), sectionId: undefined },
    { href: "/blog", label: t("blog"), sectionId: undefined },
  ];

  return (
    <div>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <div className="flex items-center shrink-0">
          <Logo />
        </div>

        {/* Center: Main Navigation Menu */}
        <nav className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 mx-4">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/" || pathname === "/vi" || pathname === "/en"
                : pathname.startsWith(item.href.replace("/#", "/"));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.sectionId)}
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
    </div>
  );
}

