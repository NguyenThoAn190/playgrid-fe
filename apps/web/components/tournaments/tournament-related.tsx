"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "@/i18n/navigation";
import { Trophy, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { TOURNAMENTS_DATA } from "@/lib/tournaments-data";
import { EventCard, EventData } from "@/components/events/event-card";

interface TournamentRelatedProps {
  currentTournamentId: string;
  sport?: string;
}

export function TournamentRelated({
  currentTournamentId,
  sport,
}: TournamentRelatedProps) {
  const otherTournaments = TOURNAMENTS_DATA.filter(
    (t) => t.id !== currentTournamentId
  );

  const eventCardsData: EventData[] = otherTournaments.map((t) => ({
    id: t.id,
    title: t.title,
    category: t.sportLabel,
    distanceText: `Giải thưởng: ${t.totalPrizePool}`,
    badge: t.badge
      ? {
          type: t.badge.type === "closing_soon" ? "hot" : t.badge.type,
          text: t.badge.text,
        }
      : undefined,
    date: t.date,
    location: t.location,
    price: t.priceFrom,
    priceSubtext: "Lệ phí từ",
    imageUrl: t.bannerImage,
    buttonText: "Đăng ký",
  }));

  const infiniteCards = [...eventCardsData, ...eventCardsData, ...eventCardsData];

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isResettingRef = useRef(false);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollLeft = container.scrollWidth / 3;
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (isResettingRef.current || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const singleSetWidth = container.scrollWidth / 3;

    if (container.scrollLeft >= singleSetWidth * 2) {
      isResettingRef.current = true;
      container.scrollLeft -= singleSetWidth;
      setTimeout(() => {
        isResettingRef.current = false;
      }, 50);
    } else if (container.scrollLeft <= 20) {
      isResettingRef.current = true;
      container.scrollLeft += singleSetWidth;
      setTimeout(() => {
        isResettingRef.current = false;
      }, 50);
    }
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.firstElementChild?.clientWidth || 340;
      const gap = 12;
      const scrollAmount = cardWidth + gap;

      if (direction === "right") {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  }, []);

  if (otherTournaments.length === 0) return null;

  return (
    <section className="w-full pt-8 pb-4 border-t border-border/50 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-0.5 min-w-0">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground flex items-center gap-2 truncate">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-primary shrink-0" />
            <span>Các giải đấu khác đang mở đơn</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
            Khám phá thêm các giải đấu phong trào và bán chuyên hấp dẫn trên PlayGrid.
          </p>
        </div>

        <Link
          href="/tournaments"
          className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary hover:underline transition-colors shrink-0"
        >
          <span>Xem tất cả giải</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Tournaments Slider: 3-Card Standard */}
      <div
        className="relative group/carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-background/90 border border-border shadow-md text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex items-stretch overflow-x-auto scrollbar-none snap-x snap-mandatory gap-3 pt-1 pb-1 px-1"
        >
          {infiniteCards.map((event, index) => (
            <div
              key={`${event.id}-related-${index}`}
              className="w-[80vw] sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-24px)/3)] shrink-0 snap-start"
            >
              <EventCard event={event} className="h-full" />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-background/90 border border-border shadow-md text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100 sm:opacity-100"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </section>
  );
}
