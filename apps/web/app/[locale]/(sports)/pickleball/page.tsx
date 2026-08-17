"use client";

import React from "react";
import { SportSubNav } from "@/components/sports/sport-sub-nav";
import { SportHero } from "@/components/sports/sport-hero";
import { SportCourtsGrid } from "@/components/sports/sport-courts-grid";
import { SportMatchesSection } from "@/components/sports/sport-matches-section";
import { SportTournamentsClubs } from "@/components/sports/sport-tournaments-clubs";
import { SportLeaderboard } from "@/components/sports/sport-leaderboard";

import { useLocale } from "next-intl";
import { JsonLdScript, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export default function PickleballPage() {
  const locale = useLocale();
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Pickleball", url: `/${locale}/pickleball` },
  ]);

  return (
    <main className="w-full flex flex-col min-h-screen bg-background text-foreground">
      <JsonLdScript data={breadcrumbSchema} />
      {/* 2-Tier Sub Navigation Bar */}
      <SportSubNav currentSport="pickleball" />

      {/* Sport Hero Banner & Real-time Stats */}
      <SportHero sportName="Pickleball" />

      {/* Courts Finder Grid */}
      <SportCourtsGrid sportName="Pickleball" />

      {/* Open Matchmaking Section */}
      <SportMatchesSection sportName="Pickleball" />

      {/* Tournaments & Clubs Section */}
      <SportTournamentsClubs sportName="Pickleball" />

      {/* Leaderboard Section */}
      <SportLeaderboard sportName="Pickleball" />
    </main>
  );
}
