"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  FileText,
  Users,
  UserCheck,
  UserPlus,
  Handshake,
  BarChart3,
  Trophy,
  GitFork,
  CalendarDays,
  MapPin,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type TournamentTabKey =
  | "overview"
  | "divisions"
  | "players"
  | "find-partner"
  | "sponsors"
  | "stats"
  | "brackets"
  | "faqs";

interface TournamentTabsNavProps {
  activeTab: TournamentTabKey;
  onChangeTab: (tab: TournamentTabKey) => void;
  divisionCount?: number;
  athleteCount?: number;
  partnerRequestCount?: number;
  sponsorshipPackageCount?: number;
  bracketMatchCount?: number;
}

export function TournamentTabsNav({
  activeTab,
  onChangeTab,
  divisionCount = 4,
  athleteCount = 16,
  partnerRequestCount = 5,
  sponsorshipPackageCount = 4,
  bracketMatchCount = 5,
}: TournamentTabsNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Mouse drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const hasDragged = useRef(false);

  const tabs: {
    key: TournamentTabKey;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    count?: number;
  }[] = [
    { key: "overview", label: "Tổng quan", icon: FileText },
    { key: "divisions", label: "Hạng mục thi đấu", icon: Users, count: divisionCount },
    { key: "players", label: "Vận động viên", icon: UserCheck, count: athleteCount },
    { key: "find-partner", label: "Tìm bạn chơi", icon: UserPlus, count: partnerRequestCount },
    { key: "sponsors", label: "Tài trợ & Đồng hành", icon: Handshake },
    { key: "stats", label: "Thống kê đăng ký", icon: BarChart3 },
    { key: "brackets", label: "Nhánh đấu", icon: GitFork, count: bracketMatchCount },
    { key: "faqs", label: "Hỏi đáp", icon: HelpCircle },
  ];

  const checkScrollability = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  }, []);

  useEffect(() => {
    checkScrollability();
    const el = scrollRef.current;
    if (!el) return;

    const handleResize = () => checkScrollability();
    window.addEventListener("resize", handleResize);
    el.addEventListener("scroll", checkScrollability);

    return () => {
      window.removeEventListener("resize", handleResize);
      el.removeEventListener("scroll", checkScrollability);
    };
  }, [checkScrollability]);

  // Scroll active tab into view
  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeTab]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -220 : 220;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Convert vertical mouse wheel to horizontal scroll
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
    }
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeftStart.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 4) {
      hasDragged.current = true;
    }
    el.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative bg-card border border-border/80 rounded-2xl p-1.5 shadow-2xs group">
      {/* Left Scroll Chevron Button */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => handleScroll("left")}
          className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-xl bg-card/95 backdrop-blur-md border border-border/80 shadow-md flex items-center justify-center text-foreground hover:bg-muted hover:text-primary transition-all cursor-pointer"
          aria-label="Cuộn sang trái"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Right Scroll Chevron Button */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => handleScroll("right")}
          className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-xl bg-card/95 backdrop-blur-md border border-border/80 shadow-md flex items-center justify-center text-foreground hover:bg-muted hover:text-primary transition-all cursor-pointer"
          aria-label="Cuộn sang phải"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Left Fade Mask */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none rounded-l-2xl" />
      )}

      {/* Right Fade Mask */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none rounded-r-2xl" />
      )}

      {/* Scrollable Tabs Track */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 px-0.5 select-none scroll-smooth cursor-grab active:cursor-grabbing"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              ref={isActive ? activeTabRef : null}
              type="button"
              onClick={() => {
                if (!hasDragged.current) {
                  onChangeTab(tab.key);
                }
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/70 font-medium"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
              {typeof tab.count === "number" && tab.count > 0 && (
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full font-semibold leading-none ${
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-muted text-muted-foreground border border-border/50"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
