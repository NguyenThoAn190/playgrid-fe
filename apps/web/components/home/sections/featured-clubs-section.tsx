"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { ClubCard, ClubData } from "@/components/clubs/club-card";
import { useTranslations } from "next-intl";
import { useOptimizedCarousel } from "@/hooks/use-optimized-carousel";

const MOCK_CLUBS: ClubData[] = [
  {
    id: "tada-badminton-club",
    name: "Tada Badminton Club",
    logoText: "TADA BADMINTON",
    coverUrl: "/images/clubs/tada-club.png",
    rating: 4.9,
    reviewCount: 342,
    memberCount: 1248,
    location: "Quận 7, TP. HCM",
    sport: "Cầu lông",
    statusText: "Hoạt động hôm nay",
    isVerified: true,
    isVip: true,
  },
  {
    id: "saigon-smash",
    name: "Saigon Smash",
    logoText: "SAIGON SMASH",
    coverUrl: "/images/clubs/saigon-smash.png",
    rating: 4.8,
    reviewCount: 215,
    memberCount: 856,
    location: "Quận 1, TP. HCM",
    sport: "Pickleball",
    statusText: "Đang tuyển thành viên",
    isVerified: true,
    isVip: true,
  },
  {
    id: "district-7-players",
    name: "District 7 Players",
    logoText: "D7 PLAYERS",
    coverUrl: "/images/clubs/d7-players.png",
    rating: 4.7,
    reviewCount: 168,
    memberCount: 432,
    location: "Quận 7, TP. HCM",
    sport: "Bóng đá",
    statusText: "Hoạt động tích cực",
    isVerified: true,
    isVip: true,
  },
  {
    id: "saigon-tennis-club",
    name: "Saigon Tennis Club",
    logoText: "SAIGON TENNIS",
    coverUrl: "/images/clubs/saigon-tennis.png",
    rating: 4.9,
    reviewCount: 198,
    memberCount: 620,
    location: "Quận 2, TP. HCM",
    sport: "Tennis",
    statusText: "Hoạt động hàng tuần",
    isVerified: true,
    isVip: true,
  },
];

const INFINITE_CLUBS = MOCK_CLUBS;

export function FeaturedClubsSection() {
  const tHome = useTranslations("home.featured_clubs");
  const tCommon = useTranslations("common");
  const { scrollContainerRef, scroll, containerProps } = useOptimizedCarousel({
    autoplayInterval: 4500,
    cooldownBuffer: 4000,
    isInfinite: true,
  });

  return (
    <section id="clubs" className="w-full py-5 sm:py-7 bg-background text-foreground transition-colors overflow-hidden border-t border-border/40 scroll-mt-20">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-500 shrink-0" />
            <span>{tHome("title")}</span>
          </h2>

          <Link
            href="/clubs"
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
          >
            <span>{tCommon("view_all")}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Horizontal Infinite Slider Container */}
        <div className="relative group/carousel">
          {/* Left Navigation Arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label={tCommon("scroll_left")}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border shadow-lg text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Continuous Infinite Horizontal Scroll List */}
          <div
            ref={scrollContainerRef}
            {...containerProps}
            className="flex items-stretch overflow-x-auto scrollbar-none snap-x snap-mandatory gap-3 pt-3 pb-3 px-1 overscroll-x-contain"
          >
            {INFINITE_CLUBS.map((club, index) => (
              <div
                key={`${club.id}-infinite-${index}`}
                className="w-[80vw] sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-36px)/4)] shrink-0 snap-start"
              >
                <ClubCard club={club} className="h-full" />
              </div>
            ))}
          </div>

          {/* Right Navigation Arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label={tCommon("scroll_right")}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border shadow-lg text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100 sm:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
