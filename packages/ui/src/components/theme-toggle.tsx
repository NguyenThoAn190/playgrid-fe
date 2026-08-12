"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      title="Đổi chế độ Sáng / Tối"
    >
      <Sun className="hidden dark:block size-4 text-brand-green transition-all" />
      <Moon className="block dark:hidden size-4 text-brand-blue transition-all" />
    </Button>
  );
}
