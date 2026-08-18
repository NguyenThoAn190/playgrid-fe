"use client";

import React, { use, useState } from "react";
import { useLocale } from "next-intl";
import { getTournamentById } from "@/lib/tournaments-data";
import { TournamentGeoStructuredData } from "@/components/tournaments/tournament-geo-structured-data";
import { TournamentHeroBanner } from "@/components/tournaments/tournament-hero-banner";
import { TournamentHeaderCard } from "@/components/tournaments/tournament-header-card";
import { TournamentSponsorsMarquee } from "@/components/tournaments/tournament-sponsors-marquee";
import { TournamentTabsNav, TournamentTabKey } from "@/components/tournaments/tournament-tabs-nav";
import { TournamentOverview } from "@/components/tournaments/tournament-overview";
import { TournamentDivisionsTab } from "@/components/tournaments/tournament-divisions-tab";
import { TournamentPlayersTab } from "@/components/tournaments/tournament-players-tab";
import { TournamentPartnerFindingTab } from "@/components/tournaments/tournament-partner-finding-tab";
import { TournamentSponsorsTab } from "@/components/tournaments/tournament-sponsors-tab";
import { TournamentStatsTab } from "@/components/tournaments/tournament-stats-tab";
import { TournamentBracketVisualizer } from "@/components/tournaments/tournament-bracket-visualizer";
import { TournamentVenueGeo } from "@/components/tournaments/tournament-venue-geo";
import { TournamentFaqSection } from "@/components/tournaments/tournament-faq-section";
import { TournamentRegistrationSidebar } from "@/components/tournaments/tournament-registration-sidebar";
import { TournamentRelated } from "@/components/tournaments/tournament-related";

export default function TournamentDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }> | { id: string; locale: string };
}) {
  const resolvedParams = "then" in params ? use(params) : params;
  const tournament = getTournamentById(resolvedParams.id);
  const locale = useLocale();

  const [activeTab, setActiveTab] = useState<TournamentTabKey>("overview");
  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>({});

  // Ticket quantities state: { [divisionId]: quantity }
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (divisionId: string, quantity: number) => {
    setSelectedQuantities((prev) => {
      if (quantity <= 0) {
        const next = { ...prev };
        delete next[divisionId];
        return next;
      }
      return { ...prev, [divisionId]: quantity };
    });
  };

  const handleSelectDivision = (divisionId: string) => {
    setSelectedQuantities((prev) => ({
      ...prev,
      [divisionId]: (prev[divisionId] || 0) + 1,
    }));
  };

  if (!tournament) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Không tìm thấy giải đấu</h1>
        <p className="text-sm text-muted-foreground max-w-md">
          Giải đấu bạn đang tìm kiếm không tồn tại hoặc đã kết thúc thời gian hiển thị.
        </p>
      </div>
    );
  }

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => {
      const current = prev[addonId] || 0;
      if (current > 0) {
        const copy = { ...prev };
        delete copy[addonId];
        return copy;
      }
      return { ...prev, [addonId]: 1 };
    });
  };

  return (
    <div className="min-h-screen bg-background pb-16 font-sans">
      {/* 1. SEO Structured Data */}
      <TournamentGeoStructuredData tournament={tournament} />

      {/* 2. Top Hero Visual Banner */}
      <TournamentHeroBanner tournament={tournament} />

      {/* Main Content Area (Aligned 100% with Navbar max-w-7xl) */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20 space-y-6">
        {/* Header Key Info Card */}
        <TournamentHeaderCard tournament={tournament} />

        {/* Top Sponsors Marquee (List trượt nhà tài trợ ngay dưới header giải đấu) */}
        {tournament.sponsors && tournament.sponsors.length > 0 && (
          <TournamentSponsorsMarquee sponsors={tournament.sponsors} />
        )}

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Tab Panels (Span 8) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Sticky/Smooth Tabs Navigation Bar */}
            <TournamentTabsNav
              activeTab={activeTab}
              onChangeTab={setActiveTab}
              divisionCount={tournament.divisions.length}
              athleteCount={tournament.athletes?.length || 0}
              partnerRequestCount={tournament.partnerRequests?.filter(r => r.status === "open").length || 0}
              sponsorshipPackageCount={tournament.sponsorshipPackages?.length || 0}
              bracketMatchCount={tournament.brackets.length}
            />

            {/* TAB 1: OVERVIEW PANEL */}
            <div
              role="tabpanel"
              id="panel-overview"
              aria-labelledby="tab-overview"
              className={activeTab === "overview" ? "block space-y-4" : "hidden"}
            >
              <TournamentOverview tournament={tournament} />
              <TournamentVenueGeo venue={tournament.venueDetails} />
              <TournamentFaqSection faqs={tournament.faqs} />
            </div>

            {/* TAB 2: DIVISIONS PANEL */}
            <div
              role="tabpanel"
              id="panel-divisions"
              aria-labelledby="tab-divisions"
              className={activeTab === "divisions" ? "block" : "hidden"}
            >
              <TournamentDivisionsTab
                divisions={tournament.divisions}
                selectedQuantities={selectedQuantities}
                onQuantityChange={handleQuantityChange}
                onSelectDivision={handleSelectDivision}
              />
            </div>

            {/* TAB 3: PLAYERS PANEL */}
            <div
              role="tabpanel"
              id="panel-players"
              aria-labelledby="tab-players"
              className={activeTab === "players" ? "block" : "hidden"}
            >
              <TournamentPlayersTab
                athletes={tournament.athletes || []}
                divisions={tournament.divisions}
              />
            </div>

            {/* TAB 4: FIND PARTNER PANEL */}
            <div
              role="tabpanel"
              id="panel-find-partner"
              aria-labelledby="tab-find-partner"
              className={activeTab === "find-partner" ? "block" : "hidden"}
            >
              <TournamentPartnerFindingTab
                partnerRequests={tournament.partnerRequests || []}
                divisions={tournament.divisions}
              />
            </div>

            {/* TAB 5: SPONSORS PANEL */}
            <div
              role="tabpanel"
              id="panel-sponsors"
              aria-labelledby="tab-sponsors"
              className={activeTab === "sponsors" ? "block" : "hidden"}
            >
              <TournamentSponsorsTab
                sponsorshipPackages={tournament.sponsorshipPackages || []}
                currentSponsors={tournament.sponsors}
                tournamentTitle={tournament.title}
              />
            </div>

            {/* TAB 6: STATS PANEL */}
            <div
              role="tabpanel"
              id="panel-stats"
              aria-labelledby="tab-stats"
              className={activeTab === "stats" ? "block" : "hidden"}
            >
              <TournamentStatsTab tournament={tournament} />
            </div>

            {/* TAB 7: BRACKETS PANEL */}
            <div
              role="tabpanel"
              id="panel-brackets"
              aria-labelledby="tab-brackets"
              className={activeTab === "brackets" ? "block" : "hidden"}
            >
              <TournamentBracketVisualizer brackets={tournament.brackets} />
            </div>

            {/* TAB 5: FAQS PANEL */}
            <div
              role="tabpanel"
              id="panel-faqs"
              aria-labelledby="tab-faqs"
              className={activeTab === "faqs" ? "block" : "hidden"}
            >
              <TournamentFaqSection faqs={tournament.faqs} />
            </div>
          </div>

          {/* Right Column: Instant Ticket & Athlete Registration Sidebar (Span 4) */}
          <div className="lg:col-span-4 h-full">
            <TournamentRegistrationSidebar
              tournament={tournament}
              selectedAddons={selectedAddons}
              selectedQuantities={selectedQuantities}
              onQuantityChange={handleQuantityChange}
            />
          </div>
        </div>

        {/* 3. Related Tournaments Section (Full Width) */}
        <TournamentRelated
          currentTournamentId={tournament.id}
          sport={tournament.sport}
        />
      </div>
    </div>
  );
}
