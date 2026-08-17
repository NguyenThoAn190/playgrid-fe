"use client";

import * as React from "react";
import {
  MapPin,
  Calendar,
  Search,
  ChevronDown,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@workspace/ui/components/dropdown-menu";
import Image from "next/image";
import { useTranslations } from "next-intl";

export interface SearchFilters {
  sport: string;
  location: string;
  date: string;
}

export interface HeroSearchBarProps {
  onSearchSubmit?: (filters: SearchFilters) => void;
  selectedSport?: string;
  onSportChange?: (sport: string) => void;
  className?: string;
}

export function HeroSearchBar({
  onSearchSubmit,
  selectedSport: externalSport,
  onSportChange,
  className = ""
}: HeroSearchBarProps) {
  const t = useTranslations("home.hero");
  const [internalSport, setInternalSport] = React.useState("Cầu lông");
  const [selectedLocationKey, setSelectedLocationKey] = React.useState("default");
  const [selectedDateKey, setSelectedDateKey] = React.useState("today");

  const currentSport = externalSport !== undefined ? externalSport : internalSport;

  const sportsOptions = [
    { value: "Cầu lông", label: t("sports.badminton"), status: "⚡" },
    { value: "Pickleball", label: t("sports.pickleball"), status: "⚡" },
    { value: "Tất cả môn", label: t("sports.all"), status: "" },
  ];

  const locationOptions = [
    { key: "default", label: t("search_location_default") },
    { key: "hanoi", label: "Hà Nội" },
    { key: "hcm", label: "TP. Hồ Chí Minh" },
    { key: "danang", label: "Đà Nẵng" },
    { key: "binhduong", label: "Bình Dương" },
    { key: "cantho", label: "Cần Thơ" },
  ];

  const dateOptions = [
    { key: "today", label: t("search_time_today") },
    { key: "tomorrow", label: t("search_time_tomorrow") },
    { key: "weekend", label: t("search_time_weekend") },
  ];

  const currentLocationLabel = locationOptions.find((l) => l.key === selectedLocationKey)?.label || t("search_location_default");
  const currentDateLabel = dateOptions.find((d) => d.key === selectedDateKey)?.label || t("search_time_today");

  const handleSportSelect = (val: string) => {
    if (onSportChange) {
      onSportChange(val);
    } else {
      setInternalSport(val);
    }
  };

  const getSportDisplayLabel = (sportVal: string) => {
    if (sportVal === "Cầu lông") return t("sports.badminton");
    if (sportVal === "Pickleball") return t("sports.pickleball");
    if (sportVal === "Tất cả môn") return t("sports.all");
    return sportVal || t("sports.all");
  };

  const handleSearch = () => {
    if (onSearchSubmit) {
      onSearchSubmit({
        sport: currentSport,
        location: currentLocationLabel,
        date: currentDateLabel,
      });
    } else {
      console.log("Searching for:", { currentSport, currentLocationLabel, currentDateLabel });
    }
  };

  return (
    <div className={`w-full z-40 relative ${className}`}>
      <div className="w-full rounded-2xl bg-card text-card-foreground border border-border/80 p-3 sm:p-3.5 shadow-xs backdrop-blur-md transition-all">

        {/* Header Title inside Search Bar */}
        <div className="mb-2 px-1 text-foreground font-bold text-xs sm:text-sm">
          <span>{t("search_btn")}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-1 md:gap-0">

          {/* Field 1: Bạn muốn chơi gì? / Chọn môn thể thao */}
          <div className="relative md:col-span-4 border-b md:border-b-0 md:border-r border-border/60">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-3.5 px-3.5 py-2.5 sm:py-2 rounded-xl hover:bg-muted/60 transition-colors cursor-pointer w-full text-left outline-none bg-transparent border-0"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden">
                    <Image src="/images/herobanner/gily-badminton.avif" alt={getSportDisplayLabel(currentSport)} width={36} height={36} className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {t("search_sport_label")}
                    </span>
                    <span className="block text-sm font-bold text-foreground truncate">
                      {getSportDisplayLabel(currentSport)}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="bottom" className="w-60 p-1.5 rounded-2xl shadow-2xl border-border bg-background/95 backdrop-blur-md">
                <DropdownMenuLabel className="text-[11px] font-bold text-muted-foreground uppercase px-2 py-1">
                  {t("search_sport_label")}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {sportsOptions.map((item) => {
                  const isSelected = currentSport === item.value;
                  return (
                    <DropdownMenuItem
                      key={item.value}
                      onClick={() => handleSportSelect(item.value)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${isSelected ? "bg-primary/10 text-primary font-bold" : ""
                        }`}
                    >
                      <span>{item.label}</span>
                      {isSelected ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        item.status && (
                          <span className="text-[10px] font-normal text-muted-foreground">
                            {item.status}
                          </span>
                        )
                      )}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Field 2: Ở đâu? / Vị trí của bạn */}
          <div className="relative md:col-span-4 border-b md:border-b-0 md:border-r border-border/60">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-3.5 px-3.5 py-2.5 sm:py-2 rounded-xl hover:bg-muted/60 transition-colors cursor-pointer w-full text-left outline-none bg-transparent border-0"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-border/60">
                    <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {t("search_location_label")}
                    </span>
                    <span className="block text-sm font-bold text-foreground truncate">
                      {currentLocationLabel}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="bottom" className="w-56 p-1.5 rounded-2xl shadow-2xl border-border bg-background/95 backdrop-blur-md">
                <DropdownMenuLabel className="text-[11px] font-bold text-muted-foreground uppercase px-2 py-1">
                  {t("search_location_label")}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {locationOptions.map((loc) => {
                  const isSelected = selectedLocationKey === loc.key;
                  return (
                    <DropdownMenuItem
                      key={loc.key}
                      onClick={() => setSelectedLocationKey(loc.key)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${isSelected ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold" : ""
                        }`}
                    >
                      <span>{loc.label}</span>
                      {isSelected && <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Field 3: Khi nào? & Search Button */}
          <div className="relative md:col-span-4 flex flex-col md:flex-row md:items-center justify-between gap-1.5 md:gap-3 p-1 md:p-0 md:pl-2 md:pr-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-3.5 px-3.5 py-2.5 sm:py-2 rounded-xl hover:bg-muted/60 transition-colors cursor-pointer w-full text-left outline-none bg-transparent border-0 flex-1 min-w-0"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-border/60">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {t("search_time_label")}
                    </span>
                    <span className="block text-sm font-bold text-foreground truncate">
                      {currentDateLabel}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="bottom" className="w-52 p-1.5 rounded-2xl shadow-2xl border-border bg-background/95 backdrop-blur-md">
                <DropdownMenuLabel className="text-[11px] font-bold text-muted-foreground uppercase px-2 py-1">
                  {t("search_time_label")}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dateOptions.map((d) => {
                  const isSelected = selectedDateKey === d.key;
                  return (
                    <DropdownMenuItem
                      key={d.key}
                      onClick={() => setSelectedDateKey(d.key)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${isSelected ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold" : ""
                        }`}
                    >
                      <span>{d.label}</span>
                      {isSelected && <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Action Button */}
            <Button
              onClick={handleSearch}
              className="w-full md:w-auto h-11 md:h-12 px-6 rounded-xl bg-gradient-to-r from-[#0052FF] to-[#00E575] hover:opacity-95 active:scale-95 text-white font-bold text-sm shadow-md hover:shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 border-0 mt-1 md:mt-0 md:mr-1"
            >
              <Search className="h-4 w-4 stroke-[2.5]" />
              <span>{t("search_btn")}</span>
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HeroSearchBar;
