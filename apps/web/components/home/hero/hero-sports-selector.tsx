"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export interface HeroSportsSelectorProps {
  selectedSport: string;
  onSportSelect: (sport: string) => void;
}

export function HeroSportsSelector({
  selectedSport,
  onSportSelect,
}: HeroSportsSelectorProps) {
  const t = useTranslations("home.hero");

  return (
    <div className="w-full pt-4 sm:pt-6 border-t border-border/60 mt-3 sm:mt-4 space-y-2.5 sm:space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {t("search_sport_label")}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 max-w-sm">
        {/* 1. Cầu lông */}
        <button
          type="button"
          onClick={() => onSportSelect("Cầu lông")}
          className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 rounded-2xl border transition-all cursor-pointer text-left min-w-0 ${selectedSport === "Cầu lông"
            ? "bg-gradient-to-r from-[#0052FF] to-[#0080FF] text-white border-transparent shadow-md shadow-blue-500/20 scale-[1.02]"
            : "bg-card text-card-foreground border-border hover:bg-muted/80 shadow-2xs"
            }`}
        >
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center overflow-hidden">
            <Image
              src="/image/herobanner/gily-badminton.avif"
              alt={t("sports.badminton")}
              width={40}
              height={40}
              unoptimized
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-xs sm:text-base font-bold truncate">{t("sports.badminton")}</span>
          </div>
        </button>

        {/* 2. Pickleball */}
        <button
          type="button"
          onClick={() => onSportSelect("Pickleball")}
          className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 rounded-2xl border transition-all cursor-pointer text-left min-w-0 ${selectedSport === "Pickleball"
            ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-md shadow-emerald-500/20 scale-[1.02]"
            : "bg-card text-card-foreground border-border hover:bg-muted/80 shadow-2xs"
            }`}
        >
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center overflow-hidden">
            <Image
              src="/image/herobanner/gily-pickellbal.avif"
              alt={t("sports.pickleball")}
              width={40}
              height={40}
              unoptimized
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-xs sm:text-base font-bold truncate">{t("sports.pickleball")}</span>
          </div>
        </button>
      </div>
    </div>
  );
}

