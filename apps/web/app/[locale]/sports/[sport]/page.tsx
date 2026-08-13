"use client";

import React from "react";
import { useParams } from "next/navigation";
import { SportSubNav } from "@/components/sports/sport-sub-nav";
import { SportHero } from "@/components/sports/sport-hero";
import { SportCourtsGrid } from "@/components/sports/sport-courts-grid";
import { SportMatchesSection } from "@/components/sports/sport-matches-section";
import { SportTournamentsClubs } from "@/components/sports/sport-tournaments-clubs";
import { SportLeaderboard } from "@/components/sports/sport-leaderboard";

const SPORT_NAMES: Record<string, string> = {
  badminton: "Cầu Lông",
  pickleball: "Pickleball",
  football: "Bóng Đá",
  tennis: "Tennis",
};

export default function SportDetailPage() {
  const params = useParams();
  const rawSport = (params?.sport as string) || "badminton";
  const sportKey = rawSport.toLowerCase();
  const sportName = SPORT_NAMES[sportKey] || "Cầu Lông";

  return (
    <main className="w-full flex flex-col min-h-screen bg-background text-foreground">
      {/* 2-Tier Sub Navigation Bar */}
      <SportSubNav currentSport={sportKey} />

      {/* Sport Hero Banner & Real-time Stats */}
      <SportHero
        sportName={sportName}
        heroImage={sportKey === "badminton" ? "/images/badminton/herobanner/gridy-badminton.avif" : undefined}
      />

      {/* Badminton Courts Finder Grid */}
      <SportCourtsGrid sportName={sportName} />

      {/* Badminton Open Matchmaking Section */}
      <SportMatchesSection sportName={sportName} />

      {/* Badminton Tournaments & Clubs Section */}
      <SportTournamentsClubs sportName={sportName} />

      {/* Badminton Leaderboard Section */}
      <SportLeaderboard sportName={sportName} />
    </main>
  );
}
