"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./button";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);

    // Sync theme across subdomains & ports via cookie
    try {
      const cookieDomain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN;
      const domainAttr = cookieDomain ? `; domain=${cookieDomain}` : "";
      document.cookie = `playgrid_theme=${nextTheme}; path=/; max-age=31536000; SameSite=Lax${domainAttr}`;
    } catch {
      // Ignore cookie errors in restricted environments
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label="Toggle theme"
      title="Đổi chế độ Sáng / Tối"
      className={className}
    >
      {mounted ? (
        <>
          <Sun className="hidden dark:block size-4 text-brand-green transition-all" />
          <Moon className="block dark:hidden size-4 text-brand-blue transition-all" />
        </>
      ) : (
        <span className="size-4 opacity-0" />
      )}
    </Button>
  );
}
