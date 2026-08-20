"use client";

import React, { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import { SportSubNav } from "@/components/sports/sport-sub-nav";
import {
  BADMINTON_LEADERBOARD_DATA,
  LeaderboardPlayer,
} from "@/lib/leaderboard-data";
import { LeaderboardHeroHeader } from "@/components/leaderboard/leaderboard-hero-header";
import { LeaderboardPodium } from "@/components/leaderboard/leaderboard-podium";
import { LeaderboardFilterBar } from "@/components/leaderboard/leaderboard-filter-bar";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { LeaderboardSidebar } from "@/components/leaderboard/leaderboard-sidebar";
import { JsonLdScript, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export default function BadmintonLeaderboardPage() {
  const locale = useLocale();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCity, setSelectedCity] = useState("Tất cả địa điểm");
  const [selectedLevelTier, setSelectedLevelTier] = useState("all");
  const [sortBy, setSortBy] = useState<"elo-desc" | "winrate-desc" | "matches-desc" | "trophies-desc">("elo-desc");

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedCity("Tất cả địa điểm");
    setSelectedLevelTier("all");
    setSortBy("elo-desc");
  };

  const filteredPlayers = useMemo(() => {
    return BADMINTON_LEADERBOARD_DATA.filter((player) => {
      // 1. Search Query
      if (
        searchQuery &&
        !player.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !player.clubName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !player.city.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // 2. Category
      if (selectedCategory !== "all" && player.category !== selectedCategory) {
        return false;
      }

      // 3. City
      if (selectedCity !== "Tất cả địa điểm" && !player.city.includes(selectedCity)) {
        return false;
      }

      // 4. Level Tier
      if (selectedLevelTier !== "all" && player.levelTier !== selectedLevelTier) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "elo-desc") return b.eloPoints - a.eloPoints;
      if (sortBy === "winrate-desc") return b.winRate - a.winRate;
      if (sortBy === "matches-desc") return b.matchesPlayed - a.matchesPlayed;
      if (sortBy === "trophies-desc") return b.trophiesCount - a.trophiesCount;
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedCity, selectedLevelTier, sortBy]);

  const categoryTitleMap: Record<string, string> = {
    all: "Toàn Quốc",
    singles_men: "Đơn Nam",
    singles_women: "Đơn Nữ",
    doubles_men: "Đôi Nam",
    doubles_mixed: "Đôi Nam Nữ",
    teams: "Câu Lạc Bộ / Đội",
  };

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Cầu lông", url: `/${locale}/badminton` },
    { name: "Bảng xếp hạng Cầu Lông", url: `/${locale}/badminton/leaderboard` },
  ]);

  const leaderboardSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Bảng Xếp Hạng Cầu Lông Việt Nam - PlayGrid Elo",
    "description": "Bảng xếp hạng điểm Elo chính thức các tay vợt cầu lông phong trào và bán chuyên hàng đầu Việt Nam.",
    "itemListElement": filteredPlayers.slice(0, 10).map((p, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Person",
        "name": p.name,
        "description": `${p.level} - ${p.clubName} - ${p.eloPoints} Elo`,
      },
    })),
  };

  return (
    <main className="w-full flex flex-col min-h-screen bg-background text-foreground">
      <JsonLdScript data={[breadcrumbSchema, leaderboardSchema]} />

      {/* 2-Tier Sub Navigation Bar */}
      <SportSubNav currentSport="badminton" />

      {/* Main Content Area */}
      <section className="w-full pt-5 sm:pt-7 pb-16 bg-background flex-1">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-5">
          {/* Header Banner */}
          <LeaderboardHeroHeader
            sportName="Cầu Lông"
            totalPlayers={12450}
            totalMatches={38900}
            currentSeason="Mùa Giải Mùa Thu 2026"
          />

          {/* 3D Top 3 Podium Cards */}
          <LeaderboardPodium
            topPlayers={filteredPlayers}
            categoryTitle={categoryTitleMap[selectedCategory] || "Toàn Quốc"}
          />

          {/* Search, Category Tabs & Dropdowns Filter Bar */}
          <LeaderboardFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
            selectedLevelTier={selectedLevelTier}
            onLevelTierChange={setSelectedLevelTier}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            onReset={handleReset}
          />

          {/* 2-Column Responsive Layout (Leaderboard Table Left + Sidebar Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Table Area (Span 8/9) */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs sm:text-sm text-muted-foreground font-normal">
                  Hiển thị <strong className="text-primary font-bold">{filteredPlayers.length}</strong> vận động viên / đội xếp hạng
                </span>
                {(searchQuery || selectedCategory !== "all" || selectedCity !== "Tất cả địa điểm" || selectedLevelTier !== "all") && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                  >
                    Xoá bộ lọc
                  </button>
                )}
              </div>

              <LeaderboardTable players={filteredPlayers} />
            </div>

            {/* Sidebar (Span 4/3) */}
            <aside className="lg:col-span-4 xl:col-span-3 sticky top-4 space-y-4">
              <LeaderboardSidebar sportSlug="badminton" sportName="Cầu Lông" />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
