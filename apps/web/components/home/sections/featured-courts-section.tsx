"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { CourtCard, CourtData } from "@/components/courts/court-card";
import { useTranslations } from "next-intl";
import { useOptimizedCarousel } from "@/hooks/use-optimized-carousel";

const MOCK_FEATURED_COURTS: CourtData[] = [
  {
    id: "tada-badminton",
    name: "Tada Badminton Center",
    location: "Quận 7, TP. HCM",
    rating: 4.8,
    reviewsCount: 124,
    distance: "1.2 km",
    price: "180.000đ/giờ",
    badge: "Hot",
    sports: ["Cầu lông", "Pickleball"],
    imageUrl: "/images/activities/badminton-banner.png",
  },
  {
    id: "abc-badminton",
    name: "Sân ABC Badminton",
    location: "Cầu Giấy, Hà Nội",
    rating: 4.8,
    reviewsCount: 120,
    distance: "3.2 km",
    price: "180.000đ/giờ",
    badge: "Hot",
    sports: ["Cầu lông"],
    imageUrl: "/images/activities/badminton-banner.png",
  },
  {
    id: "khang-an-court",
    name: "Khang An Court",
    location: "Thủ Đức, TP. HCM",
    rating: 4.7,
    reviewsCount: 76,
    distance: "3.1 km",
    price: "160.000đ/giờ",
    badge: "Hot",
    sports: ["Pickleball", "Cầu lông"],
    imageUrl: "/images/activities/pickleball-banner.png",
  },
  {
    id: "vnb-sports-center",
    name: "VNB Sports Center",
    location: "Tân Bình, TP. HCM",
    rating: 4.5,
    reviewsCount: 64,
    distance: "4.2 km",
    price: "190.000đ/giờ",
    badge: "Hot",
    sports: ["Cầu lông", "Tennis"],
    imageUrl: "/images/activities/tennis-banner.png",
  },
  {
    id: "phu-tho-sports",
    name: "Sân Thể Thao Phú Thọ",
    location: "Quận 11, TP. HCM",
    rating: 4.9,
    reviewsCount: 210,
    distance: "5.0 km",
    price: "220.000đ/giờ",
    badge: "Hot",
    sports: ["Bóng đá", "Bóng rổ"],
    imageUrl: "/images/activities/football-banner.png",
  },
  {
    id: "pickleball-club-q2",
    name: "Pickleball Club Quận 2",
    location: "Quận 2, TP. HCM",
    rating: 4.9,
    reviewsCount: 155,
    distance: "6.3 km",
    price: "250.000đ/giờ",
    badge: "Hot",
    sports: ["Pickleball"],
    imageUrl: "/images/activities/pickleball-banner.png",
  },
];

const INFINITE_COURTS = MOCK_FEATURED_COURTS;

export function FeaturedCourtsSection() {
  const tHome = useTranslations("home.featured_courts");
  const tCommon = useTranslations("common");
  const { scrollContainerRef, scroll, containerProps } = useOptimizedCarousel({
    autoplayInterval: 4500,
    cooldownBuffer: 4000,
    isInfinite: true,
  });

  return (
    <section id="featured-courts" className="w-full py-5 sm:py-7 bg-background text-foreground transition-colors overflow-hidden scroll-mt-20">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>{tHome("title")}</span>
          </h2>
          <Link
            href="/badminton/venue"
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
          >
            <span>{tCommon("view_all")}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Courts Horizontal Infinite Slider Container */}
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
            {INFINITE_COURTS.map((court, index) => (
              <div
                key={`${court.id}-infinite-${index}`}
                className="w-[80vw] sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-36px)/4)] shrink-0 snap-start"
              >
                <CourtCard court={court} className="h-full" />
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
