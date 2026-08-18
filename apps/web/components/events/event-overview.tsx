"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Trophy, ShieldCheck, Ticket, CheckCircle2 } from "lucide-react";
import { EventData } from "@/lib/events-data";

interface EventOverviewProps {
  event: EventData;
}

export function EventOverview({ event }: EventOverviewProps) {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <article
      id="event-overview"
      aria-labelledby="event-overview-title"
      className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 shadow-2xs"
      itemScope
      itemType="https://schema.org/SportsEvent"
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border/50 pb-3">
        <h2
          id="event-overview-title"
          className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground flex items-center gap-2"
        >
          <Trophy className="w-5 h-5 text-primary shrink-0" />
          <span itemProp="name">
            {isEn ? "Event Overview" : "Tổng quan sự kiện"}
          </span>
        </h2>
        <span className="text-xs font-medium text-muted-foreground hidden sm:inline-flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{isEn ? "100% Official Event" : "Thông tin xác thực"}</span>
        </span>
      </header>

      {/* Description Content */}
      <div className="space-y-4 text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
        <p
          className="text-foreground/90 font-normal text-xs sm:text-sm leading-relaxed"
          itemProp="description"
        >
          {event.description}
        </p>

        {/* Highlights & Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-muted/30 border border-border/70">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                {isEn ? "Official Guarantee" : "Cam kết bảo mật & Chính hãng"}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 font-normal leading-normal">
                {isEn ? "100% authentic registered tickets" : "Vé điện tử chính hãng từ ban tổ chức 100%"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-muted/30 border border-border/70">
            <Ticket className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-foreground">
                {isEn ? "Instant Confirmation" : "Xác nhận tức thì"}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 font-normal leading-normal">
                {isEn ? "QR Code E-Ticket via email & SMS" : "Mã vé QR Code nhận ngay qua email & SMS"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
