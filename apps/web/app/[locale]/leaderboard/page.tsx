"use client";

import React, { useState, useMemo } from "react";
import { useLocale } from "next-intl";
import {
  BADMINTON_LEADERBOARD_DATA,
} from "@/lib/leaderboard-data";
import { LeaderboardHeroHeader } from "@/components/leaderboard/leaderboard-hero-header";
import { LeaderboardPodium } from "@/components/leaderboard/leaderboard-podium";
import { LeaderboardFilterBar } from "@/components/leaderboard/leaderboard-filter-bar";
import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import { LeaderboardSidebar } from "@/components/leaderboard/leaderboard-sidebar";
import { JsonLdScript, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export default function GlobalLeaderboardPage() {
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
      if (
        searchQuery &&
        !player.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !player.clubName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !player.city.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (selectedCategory !== "all" && player.category !== selectedCategory) {
        return false;
      }
      if (selectedCity !== "Tất cả địa điểm" && !player.city.includes(selectedCity)) {
        return false;
      }
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

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Bảng xếp hạng thể thao", url: `/${locale}/leaderboard` },
  ]);

  return (
    <main className="w-full flex flex-col min-h-screen bg-background text-foreground">
      <JsonLdScript data={[breadcrumbSchema]} />

      <section className="w-full pt-6 sm:pt-10 pb-16 bg-background flex-1">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-5">
          <LeaderboardHeroHeader
            sportName="Thể Thao Đa Năng"
            totalPlayers={21350}
            totalMatches={63400}
            currentSeason="PlayGrid National Ranking 2026"
          />

          <LeaderboardPodium
            topPlayers={filteredPlayers}
            categoryTitle="Bảng Xếp Hạng Toàn Quốc"
          />

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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-8 xl:col-span-9 space-y-4">
              <LeaderboardTable players={filteredPlayers} />
            </div>
            <aside className="lg:col-span-4 xl:col-span-3 sticky top-4 space-y-4">
              <LeaderboardSidebar sportSlug="badminton" sportName="Cầu Lông" />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
