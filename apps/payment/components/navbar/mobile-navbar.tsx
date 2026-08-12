"use client";

import * as React from "react";
import Cookies from "js-cookie";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { User, Settings, LogOut } from "lucide-react";
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

export function MobileNavbar() {
  const t = useTranslations("navbar");
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

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-border/60 bg-background/95 px-4 backdrop-blur-md lg:hidden">
      {/* Left: Mobile Brand Logo */}
      <Logo />

      {/* Right: Quick Action Icons */}
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-0.5">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1 p-0.5 rounded-full hover:bg-muted ml-1"
                aria-label={t("profile")}
              >
                <Avatar className="size-7 border border-border">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="User Avatar"
                  />
                  <AvatarFallback className="text-[10px] bg-brand-blue/10 text-brand-blue dark:bg-brand-green/20 dark:text-brand-green font-semibold">
                    PG
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
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
          <Link href="/auth/login" className="ml-1 shrink-0">
            <Button className="rounded-xl font-semibold px-4 py-1.5 h-8 text-xs whitespace-nowrap shrink-0 bg-gradient-primary text-white shadow-xs hover:opacity-95 active:scale-95 transition-all">
              {t("login")}
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

