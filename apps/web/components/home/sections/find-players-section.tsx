"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { FindPlayerCard, ActivityData } from "@/components/activities/find-player-card";
import { useTranslations } from "next-intl";
import { useOptimizedCarousel } from "@/hooks/use-optimized-carousel";

import { ACTIVITIES_DATA } from "@/lib/activities-data";

const INFINITE_ACTIVITIES = ACTIVITIES_DATA;

export function FindPlayersSection() {
  const tHome = useTranslations("home.find_players");
  const tCommon = useTranslations("common");
  const { scrollContainerRef, scroll, containerProps } = useOptimizedCarousel({
    autoplayInterval: 4500,
    cooldownBuffer: 4000,
    isInfinite: true,
  });

  return (
    <section id="find-players" className="relative w-full py-5 sm:py-7 bg-background text-foreground transition-colors overflow-hidden border-t border-border/40 scroll-mt-20">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-600 dark:text-orange-400 shrink-0" />
              <span>{tHome("title")}</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-0.5">
              {tHome("subtitle")}
            </p>
          </div>

          <Link
            href="/activities"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:underline transition-colors shrink-0 self-start sm:self-auto"
          >
            <span>{tCommon("view_all")}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Horizontal Infinite Slider Container */}
        <div className="relative group/carousel">
          {/* Left Navigation Arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label={tCommon("scroll_left")}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border/80 shadow-2xs text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Continuous Infinite Horizontal Scroll List */}
          <div
            ref={scrollContainerRef}
            {...containerProps}
            className="flex items-stretch overflow-x-auto scrollbar-none snap-x snap-mandatory gap-3 pt-3 pb-3 px-1 overscroll-x-contain"
          >
            {INFINITE_ACTIVITIES.map((activity, index) => (
              <div
                key={`${activity.id}-infinite-${index}`}
                className="w-[80vw] sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-36px)/4)] shrink-0 snap-start"
              >
                <FindPlayerCard activity={activity} className="h-full" />
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label={tCommon("scroll_right")}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border/80 shadow-2xs text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100 sm:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
