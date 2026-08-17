"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { FindPlayerCard, ActivityData } from "@/components/activities/find-player-card";
import { useTranslations } from "next-intl";
import { useOptimizedCarousel } from "@/hooks/use-optimized-carousel";

const MOCK_ACTIVITIES: ActivityData[] = [
  {
    id: "doubles-casual",
    title: "Đánh đôi giao lưu",
    sport: "Cầu lông",
    statusBadge: "Còn chỗ",
    statusType: "available",
    level: "Trình 3.0 - 3.5",
    price: "50.000đ",
    date: "Hôm nay",
    time: "19:00",
    location: "ABC Badminton Club",
    imageUrl: "/images/activities/badminton-banner.png",
    joinedCount: 4,
    maxCount: 6,
    participants: [
      { id: "u1", name: "Minh", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      { id: "u2", name: "Nam", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
      { id: "u3", name: "Hùng", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "evening-partner",
    title: "Tìm bạn đánh tối",
    sport: "Pickleball",
    statusBadge: "Sắp bắt đầu",
    statusType: "starting_soon",
    level: "Trình 2.5 - 3.0",
    price: "60.000đ",
    date: "Hôm nay",
    time: "20:00",
    location: "Khang An Court",
    imageUrl: "/images/activities/pickleball-banner.png",
    joinedCount: 3,
    maxCount: 4,
    participants: [
      { id: "u4", name: "Tuấn", avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80" },
      { id: "u5", name: "Đạt", avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80" },
      { id: "u6", name: "Quang", avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "advanced-doubles",
    title: "Đôi nam nâng cao",
    sport: "Bóng đá",
    statusBadge: "Còn chỗ",
    statusType: "available",
    level: "Trình 3.5+",
    price: "70.000đ",
    date: "Ngày mai",
    time: "18:30",
    location: "Tada Badminton Center",
    imageUrl: "/images/activities/football-banner.png",
    joinedCount: 2,
    maxCount: 4,
    participants: [
      { id: "u7", name: "Dũng", avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80" },
      { id: "u8", name: "Phong", avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" },
    ],
  },
  {
    id: "weekend-doubles",
    title: "Đánh đôi cuối tuần",
    sport: "Tennis",
    statusBadge: "Còn chỗ",
    statusType: "available",
    level: "Trình 3.0 - 3.5",
    price: "50.000đ",
    date: "Ngày mai",
    time: "09:00",
    location: "VNB Sports Center",
    imageUrl: "/images/activities/tennis-banner.png",
    joinedCount: 5,
    maxCount: 8,
    participants: [
      { id: "u9", name: "Bảo", avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" },
      { id: "u10", name: "Lâm", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" },
      { id: "u11", name: "Việt", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" },
    ],
  },
];

const INFINITE_ACTIVITIES = MOCK_ACTIVITIES;

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
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-600" />
            <span>{tHome("title")}</span>
          </h2>

          <Link
            href="/activities"
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-orange-700 dark:text-orange-400 hover:text-orange-800 hover:underline transition-colors"
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
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border shadow-lg text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100 sm:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
