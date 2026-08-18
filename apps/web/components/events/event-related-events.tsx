"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ChevronRight, Trophy, Sparkles } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { EVENTS_DATA } from "@/lib/events-data";

interface EventRelatedEventsProps {
  currentEventId: string;
  category?: string;
}

export function EventRelatedEvents({ currentEventId, category }: EventRelatedEventsProps) {
  const locale = useLocale();
  const isEn = locale === "en";

  // Filter out current event and get top 3 related events
  const relatedEvents = EVENTS_DATA.filter((e) => e.id !== currentEventId).slice(0, 3);

  return (
    <div className="space-y-4 pt-2">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span>{isEn ? "Related Events & Tournaments" : "Sự kiện & giải đấu liên quan"}</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal mt-0.5">
            {isEn
              ? "Discover other exciting races and championships"
              : "Khám phá thêm các giải chạy bộ, bơi biển và giải đấu thể thao hấp dẫn khác"}
          </p>
        </div>

        <Link
          href="/events"
          className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-primary hover:underline shrink-0"
        >
          <span>{isEn ? "View all" : "Xem tất cả"}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of Event Cards */}
      <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {relatedEvents.map((evt) => (
          <EventCard key={evt.id} event={evt} />
        ))}
      </div>
    </div>
  );
}
