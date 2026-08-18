"use client";

import React, { useRef } from "react";
import { useLocale } from "next-intl";
import {
  Trophy,
  Timer,
  Camera,
  BookOpen,
  FileCheck,
  HelpCircle,
  PackagePlus,
} from "lucide-react";

export type EventTabKey = "overview" | "results" | "gallery" | "addons" | "faq" | "articles" | "rules";

interface EventTabsNavProps {
  activeTab: EventTabKey;
  onChangeTab: (tab: EventTabKey) => void;
  resultCount?: number;
  photoCount?: number;
  articleCount?: number;
  faqCount?: number;
  addonCount?: number;
}

export function EventTabsNav({
  activeTab,
  onChangeTab,
  resultCount = 850,
  photoCount = 360,
  articleCount = 3,
  faqCount = 6,
  addonCount = 5,
}: EventTabsNavProps) {
  const locale = useLocale();
  const isEn = locale === "en";

  const navRef = useRef<HTMLDivElement>(null);

  // Mouse Drag to Scroll State
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const tabs: { key: EventTabKey; label: string; icon: React.ReactNode; count?: number }[] = [
    {
      key: "overview",
      label: isEn ? "Overview" : "Tổng quan",
      icon: <Trophy className="size-3.5 shrink-0" />,
    },
    {
      key: "results",
      label: isEn ? "Results & Timing" : "Kết quả & Thành tích",
      icon: <Timer className="size-3.5 shrink-0" />,
      count: resultCount,
    },
    {
      key: "gallery",
      label: isEn ? "Photo Gallery" : "Hình ảnh giải đấu",
      icon: <Camera className="size-3.5 shrink-0" />,
      count: photoCount,
    },
    {
      key: "addons",
      label: isEn ? "Add-ons & Services" : "Dịch vụ thêm (Add-ons)",
      icon: <PackagePlus className="size-3.5 shrink-0" />,
      count: addonCount,
    },
    {
      key: "faq",
      label: isEn ? "Q&A FAQs" : "Hỏi & Đáp (Q&A)",
      icon: <HelpCircle className="size-3.5 shrink-0" />,
      count: faqCount,
    },
    {
      key: "articles",
      label: isEn ? "Guides & News" : "Cẩm nang & Tin tức",
      icon: <BookOpen className="size-3.5 shrink-0" />,
      count: articleCount,
    },
    {
      key: "rules",
      label: isEn ? "Rules & Safety" : "Điều lệ & An toàn",
      icon: <FileCheck className="size-3.5 shrink-0" />,
    },
  ];

  // Mouse Drag Handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (!navRef.current) return;
    isMouseDown.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - navRef.current.offsetLeft;
    startScrollLeft.current = navRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || !navRef.current) return;
    e.preventDefault();
    const x = e.pageX - navRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;

    if (Math.abs(walk) > 4) {
      hasDragged.current = true;
    }

    navRef.current.scrollLeft = startScrollLeft.current - walk;
  };

  const onMouseUpOrLeave = () => {
    isMouseDown.current = false;
  };

  // Wheel to horizontal scroll
  const onWheel = (e: React.WheelEvent) => {
    if (!navRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      navRef.current.scrollLeft += e.deltaY * 0.8;
    }
  };

  const handleTabClick = (key: EventTabKey, e: React.MouseEvent<HTMLButtonElement>) => {
    if (hasDragged.current) {
      return;
    }

    onChangeTab(key);
    e.currentTarget.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <nav
      role="tablist"
      aria-label="Event Navigation Tabs"
      className="relative w-full py-0.5 select-none"
    >
      {/* Clean Horizontal Scrollable Row without floating overlapping buttons */}
      <div
        ref={navRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpOrLeave}
        onMouseLeave={onMouseUpOrLeave}
        onWheel={onWheel}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1 cursor-grab active:cursor-grabbing"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              id={`tab-${tab.key}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.key}`}
              type="button"
              onClick={(e) => handleTabClick(tab.key, e)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                  : "bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted/40 font-medium"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-md font-semibold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground border border-border/60"
                  }`}
                >
                  {tab.count}+
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
