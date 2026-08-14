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
    <div className="space-y-3 pt-2">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center gap-2">
            <Trophy className="size-5 text-brand-blue dark:text-brand-green" />
            <span>{isEn ? "Related Events & Tournaments" : "Sự kiện & Giải đấu liên quan"}</span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isEn
              ? "Discover other exciting races and championships"
              : "Khám phá thêm các giải chạy bộ, bơi biển và giải đấu thể thao hấp dẫn khác"}
          </p>
        </div>

        <Link
          href="/events"
          className="flex items-center gap-1 text-xs font-bold text-brand-blue dark:text-brand-green hover:underline shrink-0"
        >
          <span>{isEn ? "View all" : "Xem tất cả"}</span>
          <ChevronRight className="size-3.5" />
        </Link>
      </div>

      {/* Grid of Event Cards (12px gap) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {relatedEvents.map((evt) => (
          <EventCard key={evt.id} event={evt} />
        ))}
      </div>
    </div>
  );
}
