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
      className="bg-card border border-border/80 rounded-3xl p-4 sm:p-5 space-y-3.5"
      itemScope
      itemType="https://schema.org/SportsEvent"
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border/60 pb-3">
        <h2
          id="event-overview-title"
          className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2"
        >
          <Trophy className="size-4.5 text-amber-500 shrink-0" />
          <span itemProp="name">
            {isEn ? "Event Overview" : "Tổng quan sự kiện"}
          </span>
        </h2>
        <span className="text-[11px] font-semibold text-muted-foreground hidden sm:inline-flex items-center gap-1">
          <CheckCircle2 className="size-3.5 text-emerald-500" />
          {isEn ? "100% Official Event" : "Thông tin xác thực"}
        </span>
      </header>

      {/* Description Content */}
      <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
        <p
          className="text-foreground/90 font-normal text-xs sm:text-sm leading-relaxed"
          itemProp="description"
        >
          {event.description}
        </p>

        {/* Highlights & Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-muted/30 border border-border/60">
            <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-foreground">
                {isEn ? "Official Guarantee" : "Cam kết bảo mật & Chính hãng"}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                {isEn ? "100% authentic registered tickets" : "Vé điện tử chính hãng từ ban tổ chức 100%"}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-muted/30 border border-border/60">
            <Ticket className="h-4.5 w-4.5 text-brand-blue dark:text-brand-green shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-foreground">
                {isEn ? "Instant Confirmation" : "Xác nhận tức thì"}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                {isEn ? "QR Code E-Ticket via email & SMS" : "Mã vé QR Code nhận ngay qua email & SMS"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
