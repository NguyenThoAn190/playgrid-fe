"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronRight, Compass } from "lucide-react";
import { useTranslations } from "next-intl";

interface SportCategoryItem {
  id: string;
  name: string;
  nameKey: string;
  gilyImage: string;
  bgImage: string;
  courtsCount: number;
  matchesCount: number;
  href: string;
  description: string;
}

const SPORTS_CATEGORIES: SportCategoryItem[] = [
  {
    id: "badminton",
    name: "Cầu lông",
    nameKey: "badminton",
    gilyImage: "/images/herobanner/gily-badminton.avif",
    bgImage: "/images/explore_sports/gridy-badminton.avif",
    courtsCount: 128,
    matchesCount: 540,
    href: "/badminton",
    description: "Bộ môn sôi nổi hàng đầu với hệ thống sân bãi hiện đại và đông đảo cộng đồng người chơi.",
  },
  {
    id: "pickleball",
    name: "Pickleball",
    nameKey: "pickleball",
    gilyImage: "/images/herobanner/gily-pickellbal.avif",
    bgImage: "/images/explore_sports/gridy-pickleball.avif",
    courtsCount: 85,
    matchesCount: 320,
    href: "/pickleball",
    description: "Môn thể thao xu hướng mới cực kỳ cuốn hút, bùng nổ sân bãi và giải đấu phong trào.",
  },
];

export function ExploreSportsSection() {
  const tExplore = useTranslations("home.explore_sports");

  const getT = (key: string, fallback: string): string => {
    try {
      const res = tExplore(key);
      if (!res || res.includes("home.explore_sports") || res === key) {
        return fallback;
      }
      return res;
    } catch {
      return fallback;
    }
  };

  return (
    <section id="explore-sports" className="w-full py-6 sm:py-8 bg-background text-foreground transition-colors border-t border-border/40 overflow-hidden scroll-mt-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary shrink-0" />
              <span>{getT("title", "Khám phá các bộ môn trên PlayGrid")}</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-0.5">
              {getT(
                "subtitle",
                "Tìm kiếm sân bãi, giải đấu và cộng đồng cho bộ môn yêu thích của bạn"
              )}
            </p>
          </div>

          <Link
            href="/badminton/venue"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline transition-colors shrink-0 self-start sm:self-auto"
          >
            <span>{getT("view_all", "Xem tất cả bộ môn")}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 2 Sports Cards Grid - Gap 12px (gap-3) - Aspect ratio 12:5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
          {SPORTS_CATEGORIES.map((sport) => (
            <Link
              key={sport.id}
              href={sport.href}
              suppressHydrationWarning
              className="group relative rounded-2xl overflow-hidden min-h-[165px] sm:min-h-0 sm:aspect-[12/5] flex flex-col justify-between p-4 sm:p-6 border border-border/60 shadow-2xs hover:shadow-md hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              {/* Background Sport Image - Full Brightness */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={sport.bgImage}
                  alt={sport.name}
                  fill
                  priority={sport.id === "badminton"}
                  fetchPriority={sport.id === "badminton" ? "high" : "auto"}
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-100"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                {/* Soft gradient overlay at bottom for optimal text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/15" />
              </div>

              {/* Top Arrow Button */}
              <div className="relative z-10 flex items-center justify-end">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-white/20 flex items-center justify-center text-slate-800 dark:text-white opacity-90 group-hover:opacity-100 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent transition-all shadow-2xs">
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </div>
              </div>

              {/* Bottom Content Info */}
              <div className="relative z-10 mt-auto space-y-1.5 sm:space-y-2 text-white">
                <div className="flex items-end justify-between gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className="text-base sm:text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors drop-shadow-sm">
                      {sport.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200 font-normal line-clamp-2 leading-relaxed drop-shadow-xs">
                      {sport.description}
                    </p>
                  </div>

                  <div className="shrink-0 self-end">
                    <span className="inline-flex items-center justify-center gap-1.5 h-8 sm:h-8.5 px-3.5 sm:px-4 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-2xs group-hover:shadow-md group-hover:scale-105 transition-all duration-200 whitespace-nowrap">
                      <span>{getT("explore_btn", "Khám phá")}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 shrink-0" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
