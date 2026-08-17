"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { EventCard, EventData } from "@/components/events/event-card";
import { useTranslations } from "next-intl";
import { useOptimizedCarousel } from "@/hooks/use-optimized-carousel";

const MOCK_EVENTS: EventData[] = [
  {
    id: "aqua-warriors-2026",
    title: "Giải Aqua Warriors Vân Đồn năm 2026",
    category: "Triathlon / Bơi biển",
    distanceText: "Bơi 3km • Aquathlon",
    badge: {
      type: "hot",
      text: "Nổi bật",
    },
    date: "12 - 13 Tháng 9, 2026",
    location: "Bãi biển Vân Đồn",
    price: "479.000đ",
    priceSubtext: "Chỉ từ",
    imageUrl: "/images/events/aqua-warriors.png",
    buttonText: "Đăng ký",
  },
  {
    id: "nghe-an-legacy-marathon-2026",
    title: "NGHỆ AN LEGACY MARATHON - VỀ MIỀN NON XANH NƯỚC BIẾC",
    category: "Marathon",
    distanceText: "5km - 10km - 21km - 42km",
    badge: {
      type: "recommended",
      text: "Đề xuất",
    },
    date: "05 - 06 Tháng 12, 2026",
    location: "Quảng trường Bình Minh, Cửa Lò, Nghệ An",
    price: "137.000đ",
    priceSubtext: "Chỉ từ",
    imageUrl: "/images/events/legacy-marathon.png",
    buttonText: "Đăng ký",
  },
  {
    id: "dak-lak-ultra-2026",
    title: "Đắk Lắk Ultra - Vietnam Backyard 2026",
    category: "Trail Running",
    distanceText: "15km - 25km - 42km - 75km",
    date: "14 - 16 Tháng 8, 2026",
    location: "Hồ du lịch sinh thái Ea Cuôr Kăp - Tỉnh Đắk Lắk",
    price: "399.000đ",
    priceSubtext: "Chỉ từ",
    imageUrl: "/images/events/daklak-ultra.png",
    buttonText: "Đăng ký",
  },
];

const INFINITE_EVENTS = MOCK_EVENTS;

export function TournamentsSection() {
  const tHome = useTranslations("home.tournaments");
  const tCommon = useTranslations("common");
  const { scrollContainerRef, scroll, containerProps } = useOptimizedCarousel({
    autoplayInterval: 4500,
    cooldownBuffer: 4000,
    isInfinite: true,
  });

  return (
    <section id="tournaments" className="w-full py-5 sm:py-7 bg-background text-foreground transition-colors overflow-hidden border-t border-border/40 scroll-mt-20">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
            <span>{tHome("title")}</span>
          </h2>

          <Link
            href="/events"
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
            {INFINITE_EVENTS.map((event, index) => (
              <div
                key={`${event.id}-infinite-${index}`}
                className="w-[80vw] sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-24px)/3)] shrink-0 snap-start"
              >
                <EventCard event={event} className="h-full" />
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
