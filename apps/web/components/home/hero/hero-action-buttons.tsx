"use client";

import * as React from "react";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export interface HeroActionButtonsProps {
  onExploreClick?: () => void;
  onFindPlayersClick?: () => void;
}

export function HeroActionButtons({
  onExploreClick,
  onFindPlayersClick,
}: HeroActionButtonsProps) {
  const t = useTranslations("home.hero");

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onExploreClick) {
      onExploreClick();
    }
    const target = document.getElementById("explore-sports");
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3 pt-0.5 w-full sm:w-auto">
      <Link
        href="#explore-sports"
        onClick={handleExploreClick}
        className="inline-flex h-10 sm:h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00E575] px-5 sm:px-6 text-sm sm:text-base font-bold text-white transition-all hover:shadow-md hover:shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
      >
        <span>{t("book_now")}</span>
        <ChevronRight className="h-4 w-4 stroke-[2.5]" />
      </Link>

      <Link
        href="/activities"
        onClick={onFindPlayersClick}
        className="group inline-flex h-10 sm:h-12 items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/90 backdrop-blur-xs px-5 sm:px-6 text-sm sm:text-base font-bold text-foreground transition-all hover:bg-muted hover:border-slate-300 dark:hover:border-slate-700 active:scale-[0.98] cursor-pointer shadow-xs"
      >
        <span>{t("find_players")}</span>
      </Link>
    </div>
  );
}

