import { HeroBanner } from "@/components/home/hero/hero-banner";
import { FeaturedCourtsSection } from "@/components/home/sections/featured-courts-section";
import { ExploreSportsSection } from "@/components/home/sections/explore-sports-section";
import { FindPlayersSection } from "@/components/home/sections/find-players-section";
import { TournamentsSection } from "@/components/home/sections/tournaments-section";
import { FeaturedLeaderboardSection } from "@/components/home/sections/featured-leaderboard-section";
import { FeaturedCommunitySection } from "@/components/home/sections/featured-community-section";
import { FeaturedClubsSection } from "@/components/home/sections/featured-clubs-section";
import { FeaturedBlogsSection } from "@/components/home/sections/featured-blogs-section";
import { JsonLdScript } from "@/lib/seo/json-ld";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const sportsListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Các bộ môn thể thao chính trên PlayGrid",
    "description": "Nền tảng đặt sân và ghép kèo cho các môn Cầu lông, Pickleball, Tennis và Bóng đá.",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Cầu Lông",
        "url": `https://playgrid.vn/${locale}/badminton`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Pickleball",
        "url": `https://playgrid.vn/${locale}/pickleball`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Giải đấu & Sự kiện",
        "url": `https://playgrid.vn/${locale}/events`,
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Blog & Kiến thức",
        "url": `https://playgrid.vn/${locale}/blog`,
      },
    ],
  };

  return (
    <main className="w-full flex flex-col items-center">
      <JsonLdScript data={sportsListSchema} />
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
