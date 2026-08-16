"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps, useTheme } from "next-themes";

function ThemeSyncWatcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  // 1. Initial mount: check URL search params for ?theme=dark|light or cookie
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const params = new URLSearchParams(window.location.search);
      const urlTheme = params.get("theme");
      if (urlTheme === "dark" || urlTheme === "light") {
        if (theme !== urlTheme) {
          setTheme(urlTheme);
        }
      } else {
        // Fallback: check cookie if localStorage was empty or different
        const cookieMatch = document.cookie.match(/(?:^|;\s*)playgrid_theme=([^;]*)/);
        const cookieTheme = cookieMatch ? cookieMatch[1] : null;
        if (cookieTheme === "dark" || cookieTheme === "light") {
          if (!localStorage.getItem("playgrid_theme") && theme !== cookieTheme) {
            setTheme(cookieTheme);
          }
        }
      }
    } catch {}
  }, [setTheme, theme]);

  // 2. Watch theme / resolvedTheme changes: sync to cookie & PWA meta tags
  React.useEffect(() => {
    if (typeof window === "undefined" || !theme) return;

    // Sync cookie across subdomains
    try {
      const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN;
      const domainAttr = cookieDomain && cookieDomain !== "localhost" ? `; domain=${cookieDomain}` : "";
      document.cookie = `playgrid_theme=${theme}; path=/; max-age=31536000; SameSite=Lax${domainAttr}`;
    } catch {}

    // Dynamic PWA theme-color update for status bar & navbar
    try {
      const color = resolvedTheme === "dark" ? "#12141C" : "#0363FE";
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", color);
      } else {
        metaThemeColor = document.createElement("meta");
        metaThemeColor.setAttribute("name", "theme-color");
        metaThemeColor.setAttribute("content", color);
        document.head.appendChild(metaThemeColor);
      }

      // Apple Web App Status Bar Style
      let metaStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
      const statusBarStyle = resolvedTheme === "dark" ? "black-translucent" : "default";
      if (metaStatusBar) {
        metaStatusBar.setAttribute("content", statusBarStyle);
      }
    } catch {}
  }, [theme, resolvedTheme]);

  return null;
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = true,
  storageKey = "playgrid_theme",
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      storageKey={storageKey}
      {...props}
    >
      <ThemeSyncWatcher />
      {children}
    </NextThemesProvider>
  );
}
