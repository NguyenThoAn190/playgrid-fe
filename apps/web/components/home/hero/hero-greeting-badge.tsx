"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Sunrise, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function HeroGreetingBadge() {
  const [timeState, setTimeState] = useState<"morning" | "afternoon" | "evening">("morning");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setTimeState("morning");
    } else if (hour >= 12 && hour < 18) {
      setTimeState("afternoon");
    } else {
      setTimeState("evening");
    }
  }, []);

  let tHero: (key: string) => string;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    tHero = useTranslations("home.hero");
  } catch {
    tHero = (key: string) => key;
  }

  const getT = (key: string, fallback: string): string => {
    try {
      if (typeof tHero === "function" && "has" in tHero && typeof (tHero as any).has === "function") {
        if (!(tHero as any).has(key)) {
          return fallback;
        }
      }
      const res = tHero(key);
      if (!res || res.includes("home.hero") || res === key) {
        return fallback;
      }
      return res;
    } catch {
      return fallback;
    }
  };

  const getGreetingText = () => {
    switch (timeState) {
      case "morning":
        return getT("greeting_morning", "Chào buổi sáng! 🌅");
      case "afternoon":
        return getT("greeting_afternoon", "Chào buổi chiều! ☀️");
      case "evening":
        return getT("greeting_evening", "Chào buổi tối! 🌙");
    }
  };

  const getGreetingIcon = () => {
    switch (timeState) {
      case "morning":
        return <Sunrise className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case "afternoon":
        return <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case "evening":
        return <Moon className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
    }
  };

  return (
    <div
      suppressHydrationWarning
      className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 dark:bg-blue-500/15 px-3.5 py-1 text-xs sm:text-sm font-bold text-[#0052FF] dark:text-blue-400 shadow-2xs backdrop-blur-xs"
    >
      {mounted ? getGreetingIcon() : <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
      <span>{mounted ? getGreetingText() : "Chào mừng đến với PlayGrid thể thao!"}</span>
    </div>
  );
}
