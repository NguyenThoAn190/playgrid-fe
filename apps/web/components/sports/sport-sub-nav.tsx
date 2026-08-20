"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import {
  ChevronDown,
  LayoutGrid,
  MapPin,
  Users,
  Trophy,
  UserCheck,
  BarChart3,
  Circle,
} from "lucide-react";

export interface SportSubNavProps {
  currentSport: string;
}

const SPORTS_LIST = [
  { id: "badminton", name: "Cầu lông", imageSrc: "/images/herobanner/gily-badminton.avif" },
  { id: "pickleball", name: "Pickleball", imageSrc: "/images/herobanner/gily-pickellbal.avif" },
  { id: "football", name: "Bóng đá", imageSrc: null },
  { id: "tennis", name: "Tennis", imageSrc: null },
];

const SUB_NAV_TABS = [
  { id: "overview", label: "Tổng quan", icon: LayoutGrid },
  { id: "courts", label: "Sân bãi", icon: MapPin },
  { id: "matches", label: "Kèo ghép", icon: Users },
  { id: "tournaments", label: "Giải đấu", icon: Trophy },
  { id: "clubs", label: "Câu lạc bộ", icon: UserCheck },
  { id: "leaderboard", label: "Bảng xếp hạng", icon: BarChart3 },
];

export function SportSubNav({ currentSport }: SportSubNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("overview");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMainNavVisible, setIsMainNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Sync active tab with current pathname / hash
  useEffect(() => {
    if (pathname.includes("/venue")) {
      setActiveTab("courts");
    } else if (pathname.includes("/matches")) {
      setActiveTab("matches");
    } else if (pathname.includes("/tournaments")) {
      setActiveTab("tournaments");
    } else if (pathname.includes("/clubs")) {
      setActiveTab("clubs");
    } else if (pathname.includes("/leaderboard")) {
      setActiveTab("leaderboard");
    } else if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (SUB_NAV_TABS.some((t) => t.id === hash)) {
        setActiveTab(hash);
      }
    } else {
      setActiveTab("overview");
    }
  }, [pathname]);

  // Scroll handler for hiding/showing navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 20) {
        setIsMainNavVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setIsMainNavVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsMainNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const selectedSportObj =
    SPORTS_LIST.find((s) => s.id === currentSport) || SPORTS_LIST[0];

  const getTabHref = (tabId: string) => {
    if (tabId === "courts") {
      return `/${currentSport}/venue`;
    }
    if (tabId === "matches") {
      return `/${currentSport}/matches`;
    }
    if (tabId === "tournaments") {
      return `/${currentSport}/tournaments`;
    }
    if (tabId === "clubs") {
      return `/${currentSport}/clubs`;
    }
    if (tabId === "leaderboard") {
      return `/${currentSport}/leaderboard`;
    }
    if (tabId === "overview") {
      return `/${currentSport}`;
    }
    return `/${currentSport}#${tabId}`;
  };

  const handleTabClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: string) => {
    setActiveTab(tabId);

    // Clicking "Sân bãi" (courts), "Kèo ghép" (matches), "Giải đấu" (tournaments), "Câu lạc bộ" (clubs), or "Bảng xếp hạng" (leaderboard) navigates to full listing page
    if (
      tabId === "courts" ||
      tabId === "matches" ||
      tabId === "tournaments" ||
      tabId === "clubs" ||
      tabId === "leaderboard"
    ) {
      return;
    }

    const element = document.getElementById(tabId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSportChange = (targetSportId: string) => {
    setIsDropdownOpen(false);

    // Extract current sub-path after currentSport slug (e.g. "/venue")
    let subPath = "";
    const currentSportSegment = `/${currentSport}`;
    const sportIndex = pathname.indexOf(currentSportSegment);
    if (sportIndex !== -1) {
      subPath = pathname.substring(sportIndex + currentSportSegment.length);
    }

    if (subPath) {
      router.push(`/${targetSportId}${subPath}`);
    } else {
      router.push(`/${targetSportId}`);
    }
  };

  return (
    <div
      className={`sticky z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
        isMainNavVisible
          ? "top-[56px] lg:top-[64px]"
          : "top-0 shadow-sm"
      }`}
    >
      <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Sub Nav Tabs (Scrollable on mobile) */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-1 min-w-0 flex-1">
          {SUB_NAV_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const href = getTabHref(tab.id);

            return (
              <Link
                key={tab.id}
                href={href}
                onClick={(e) => handleTabClick(e, tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right: Sport Switcher Dropdown */}
        <div className="relative shrink-0 pl-2 border-l border-border/50">
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1 sm:gap-1.5 rounded-xl border border-primary/20 bg-primary/10 px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold text-primary hover:bg-primary/15 transition-all cursor-pointer"
          >
            {selectedSportObj?.imageSrc ? (
              <Image
                src={selectedSportObj.imageSrc}
                alt={selectedSportObj.name}
                width={20}
                height={20}
                className="w-5 h-5 object-contain rounded-sm"
              />
            ) : (
              <Circle className="w-4 h-4 text-muted-foreground" />
            )}
            <span className="hidden sm:inline">{selectedSportObj?.name}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu Popup */}
          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-50"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 mt-2 z-50 w-44 rounded-2xl border border-border bg-card/95 backdrop-blur-md p-1.5 shadow-sm animate-in fade-in zoom-in-95">
                <div className="px-2 py-1 text-[11px] font-medium text-muted-foreground">
                  Chuyển bộ môn
                </div>
                {SPORTS_LIST.map((sport) => (
                  <button
                    key={sport.id}
                    type="button"
                    onClick={() => handleSportChange(sport.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer text-left ${
                      sport.id === currentSport
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {sport.imageSrc ? (
                      <Image
                        src={sport.imageSrc}
                        alt={sport.name}
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain rounded-sm"
                      />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span>{sport.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
