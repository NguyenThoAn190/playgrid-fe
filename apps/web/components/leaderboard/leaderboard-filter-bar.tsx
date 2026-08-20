"use client";

import React from "react";
import { Search, Filter, RotateCcw, ArrowUpDown, MapPin, Trophy, Shield } from "lucide-react";
import {
  CATEGORY_TABS,
  CITIES_LIST,
  LEVEL_TIERS,
} from "@/lib/leaderboard-data";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";

export interface LeaderboardFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedLevelTier: string;
  onLevelTierChange: (tier: string) => void;
  sortBy: "elo-desc" | "winrate-desc" | "matches-desc" | "trophies-desc";
  onSortByChange: (sort: "elo-desc" | "winrate-desc" | "matches-desc" | "trophies-desc") => void;
  onReset: () => void;
}

export function LeaderboardFilterBar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCity,
  onCityChange,
  selectedLevelTier,
  onLevelTierChange,
  sortBy,
  onSortByChange,
  onReset,
}: LeaderboardFilterBarProps) {
  return (
    <div className="bg-card border border-border/80 rounded-2xl p-3 sm:p-4 shadow-2xs space-y-3">
      {/* Top Search & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-3">
        {/* Search Bar Input */}
        <div className="relative flex-1 min-w-0 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo tên VĐV, CLB chủ quản, tỉnh thành..."
            className="w-full pl-10 pr-4 h-10 rounded-xl bg-background border border-border/70 text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Dropdowns Row */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          {/* City / Location Select */}
          <div className="flex-1 lg:flex-initial lg:w-[155px] min-w-0">
            <Select value={selectedCity} onValueChange={(val) => onCityChange(val as string)}>
              <SelectTrigger className="w-full h-10 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="truncate">{selectedCity}</span>
                </div>
              </SelectTrigger>
              <SelectContent align="end" className="w-[170px]">
                {CITIES_LIST.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Level Tier Select */}
          <div className="flex-1 lg:flex-initial lg:w-[160px] min-w-0">
            <Select value={selectedLevelTier} onValueChange={(val) => onLevelTierChange(val as string)}>
              <SelectTrigger className="w-full h-10 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 truncate">
                  <Shield className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">
                    {LEVEL_TIERS.find((l) => l.id === selectedLevelTier)?.label || "Trình độ"}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent align="end" className="w-[190px]">
                {LEVEL_TIERS.map((tier) => (
                  <SelectItem key={tier.id} value={tier.id}>
                    {tier.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort By Select */}
          <div className="flex-1 lg:flex-initial lg:w-[165px] min-w-0">
            <Select value={sortBy} onValueChange={(val) => onSortByChange(val as any)}>
              <SelectTrigger className="w-full h-10 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 truncate">
                  <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="truncate">
                    {sortBy === "elo-desc"
                      ? "Điểm Elo cao nhất"
                      : sortBy === "winrate-desc"
                      ? "Tỷ lệ thắng cao nhất"
                      : sortBy === "matches-desc"
                      ? "Số trận nhiều nhất"
                      : "Nhiều danh hiệu nhất"}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent align="end" className="w-[185px]">
                <SelectItem value="elo-desc">Điểm Elo cao nhất</SelectItem>
                <SelectItem value="winrate-desc">Tỷ lệ thắng cao nhất</SelectItem>
                <SelectItem value="matches-desc">Số trận nhiều nhất</SelectItem>
                <SelectItem value="trophies-desc">Nhiều danh hiệu nhất</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Category Tabs Row */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none pt-1 pb-0.5 border-t border-border/50">
        <span className="text-xs font-semibold text-muted-foreground shrink-0 mr-0.5">
          Hạng mục:
        </span>
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onCategoryChange(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === tab.id
                ? "bg-primary text-primary-foreground shadow-2xs"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
