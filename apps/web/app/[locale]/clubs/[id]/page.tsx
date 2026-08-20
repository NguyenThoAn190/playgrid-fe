"use client";

import React, { use, useState } from "react";
import { useLocale } from "next-intl";
import { getClubById } from "@/lib/clubs-data";
import { ClubHeroBanner } from "@/components/clubs/club-hero-banner";
import { ClubHeaderCard } from "@/components/clubs/club-header-card";
import { ClubTabsNav, ClubTabKey } from "@/components/clubs/club-tabs-nav";
import { ClubOverviewTab } from "@/components/clubs/club-overview-tab";
import { ClubScheduleTab } from "@/components/clubs/club-schedule-tab";
import { ClubCoachesTab } from "@/components/clubs/club-coaches-tab";
import { ClubMembersTab } from "@/components/clubs/club-members-tab";
import { ClubAchievementsTab } from "@/components/clubs/club-achievements-tab";
import { ClubReviewsTab } from "@/components/clubs/club-reviews-tab";
import { ClubMembershipSidebar } from "@/components/clubs/club-membership-sidebar";
import { ClubJoinModal } from "@/components/clubs/club-join-modal";
import { JsonLdScript, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { Shield } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function ClubDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }> | { id: string; locale: string };
}) {
  const resolvedParams = "then" in params ? use(params) : params;
  const club = getClubById(resolvedParams.id);
  const locale = useLocale();

  const [activeTab, setActiveTab] = useState<ClubTabKey>("overview");
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  if (!club) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <Shield className="w-12 h-12 text-muted-foreground" />
        <h1 className="text-2xl font-bold text-foreground">Không tìm thấy câu lạc bộ</h1>
        <p className="text-sm text-muted-foreground max-w-md font-normal">
          Câu lạc bộ bạn đang tìm kiếm không tồn tại hoặc đã ngừng hoạt động trên hệ thống.
        </p>
        <Link href={`/${locale}/clubs`}>
          <Button variant="outline" className="rounded-xl font-semibold">
            Xem danh sách CLB
          </Button>
        </Link>
      </div>
    );
  }

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Câu lạc bộ thể thao", url: `/${locale}/clubs` },
    { name: club.name, url: `/${locale}/clubs/${club.id}` },
  ]);

  const clubSchema = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    "name": club.name,
    "image": club.coverUrl,
    "description": club.description,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": club.location,
      "addressCountry": "VN",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": club.rating,
      "reviewCount": club.reviewCount,
    },
  };

  return (
    <div className="min-h-screen bg-background pb-16 font-sans">
      <JsonLdScript data={[breadcrumbSchema, clubSchema]} />

      {/* 1. Top Panoramic Hero Banner */}
      <ClubHeroBanner club={club} />

      {/* 2. Main Content Container */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20 space-y-6">
        {/* Floating Club Profile Header Card */}
        <ClubHeaderCard
          club={club}
          onOpenJoinModal={() => setIsJoinModalOpen(true)}
        />

        {/* 2-Column Responsive Layout (Main Tabs Left + Sidebar Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Interactive Tab Panels (Span 8) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Sticky Tab Navigation */}
            <ClubTabsNav
              activeTab={activeTab}
              onTabChange={setActiveTab}
              reviewCount={club.reviewsList?.length || club.reviewCount}
              membersCount={club.memberCount}
            />

            {/* Tab 1: Overview */}
            {activeTab === "overview" && <ClubOverviewTab club={club} />}

            {/* Tab 2: Schedule & Matches */}
            {activeTab === "schedule" && (
              <ClubScheduleTab
                club={club}
                onOpenJoinModal={() => setIsJoinModalOpen(true)}
              />
            )}

            {/* Tab 3: Coaches & Leaders */}
            {activeTab === "coaches" && <ClubCoachesTab club={club} />}

            {/* Tab 4: Members & Leaderboard */}
            {activeTab === "members" && <ClubMembersTab club={club} />}

            {/* Tab 5: Achievements & Trophies */}
            {activeTab === "achievements" && <ClubAchievementsTab club={club} />}

            {/* Tab 6: Community Reviews */}
            {activeTab === "reviews" && <ClubReviewsTab club={club} />}
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar Widgets (Span 4) */}
          <aside className="lg:col-span-4 sticky top-4 space-y-4">
            <ClubMembershipSidebar
              club={club}
              onOpenJoinModal={() => setIsJoinModalOpen(true)}
            />
          </aside>
        </div>
      </div>

      {/* Interactive Join Club Modal */}
      <ClubJoinModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        club={club}
      />
    </div>
  );
}
