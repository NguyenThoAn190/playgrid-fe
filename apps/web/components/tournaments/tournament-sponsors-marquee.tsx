"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { TournamentSponsor } from "@/lib/tournaments-data";
import { ShieldCheck } from "lucide-react";

interface TournamentSponsorsMarqueeProps {
  sponsors: TournamentSponsor[];
}

export function TournamentSponsorsMarquee({
  sponsors,
}: TournamentSponsorsMarqueeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  // Duplicate sponsors for seamless infinite scrolling
  const infiniteSponsors = useMemo(() => {
    if (!sponsors || sponsors.length === 0) return [];
    return [
      ...sponsors,
      ...sponsors,
      ...sponsors,
      ...sponsors,
      ...sponsors,
      ...sponsors,
    ];
  }, [sponsors]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId: number;

    const step = () => {
      if (!isHoveredRef.current && container) {
        container.scrollLeft += 0.8;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft -= container.scrollWidth / 4;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!sponsors || sponsors.length === 0) return null;

  return (
    <div className="bg-card border border-border/80 rounded-2xl p-3.5 sm:p-4 shadow-2xs overflow-hidden space-y-2.5">
      <div className="flex items-center justify-between px-1">
        <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>Nhà tài trợ & Đối tác đồng hành chính thức</span>
        </div>
        <span className="text-xs text-muted-foreground font-normal hidden sm:inline">
          Bảo trợ và tài trợ bởi các thương hiệu thể thao hàng đầu
        </span>
      </div>

      <div
        className="relative overflow-hidden w-full"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        onTouchStart={() => {
          isHoveredRef.current = true;
        }}
        onTouchEnd={() => {
          isHoveredRef.current = false;
        }}
      >
        {/* Subtle gradient edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex items-center gap-2.5 sm:gap-3 overflow-x-hidden whitespace-nowrap scrollbar-none select-none py-0.5"
        >
          {infiniteSponsors.map((sponsor, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-muted/50 border border-border/60 text-xs font-medium text-foreground shrink-0 shadow-2xs hover:bg-muted transition-colors cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span className="whitespace-nowrap font-medium text-foreground">{sponsor.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
