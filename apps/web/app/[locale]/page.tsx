"use client";

import { HeroBanner } from "@/components/home/hero/hero-banner";
import { FeaturedCourtsSection } from "@/components/home/sections/featured-courts-section";
import { ExploreSportsSection } from "@/components/home/sections/explore-sports-section";
import { FindPlayersSection } from "@/components/home/sections/find-players-section";
import { TournamentsSection } from "@/components/home/sections/tournaments-section";
import { FeaturedLeaderboardSection } from "@/components/home/sections/featured-leaderboard-section";
import { FeaturedCommunitySection } from "@/components/home/sections/featured-community-section";
import { FeaturedClubsSection } from "@/components/home/sections/featured-clubs-section";
import { FeaturedBlogsSection } from "@/components/home/sections/featured-blogs-section";

export default function Home() {
  return (
    <main className="w-full flex flex-col items-center">
      <HeroBanner />
      <ExploreSportsSection />
      <FeaturedCourtsSection />
      <FindPlayersSection />
      <TournamentsSection />
      <FeaturedLeaderboardSection />
      <FeaturedCommunitySection />
      <FeaturedClubsSection />
      <FeaturedBlogsSection />
    </main>
  );
}
