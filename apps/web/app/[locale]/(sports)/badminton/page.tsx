"use client";

import React from "react";
import { SportSubNav } from "@/components/sports/sport-sub-nav";
import { SportHero } from "@/components/sports/sport-hero";
import { SportCourtsGrid } from "@/components/sports/sport-courts-grid";
import { SportMatchesSection } from "@/components/sports/sport-matches-section";
import { SportTournamentsClubs } from "@/components/sports/sport-tournaments-clubs";
import { SportLeaderboard } from "@/components/sports/sport-leaderboard";

export default function BadmintonPage() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-background text-foreground">
      {/* 2-Tier Sub Navigation Bar */}
      <SportSubNav currentSport="badminton" />

      {/* Sport Hero Banner & Real-time Stats */}
      <SportHero sportName="Cầu Lông" />

      {/* Badminton Courts Finder Grid */}
      <SportCourtsGrid sportName="Cầu Lông" />

      {/* Badminton Open Matchmaking Section */}
      <SportMatchesSection sportName="Cầu Lông" />

      {/* Badminton Tournaments & Clubs Section */}
      <SportTournamentsClubs sportName="Cầu Lông" />

      {/* Badminton Leaderboard Section */}
      <SportLeaderboard sportName="Cầu Lông" />
    </main>
  );
}
