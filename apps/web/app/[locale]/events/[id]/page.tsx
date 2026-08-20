"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Share2,
  Heart,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getEventById } from "@/lib/events-data";
import { EventRegistrationSidebar } from "@/components/events/event-registration-sidebar";
import { EventAddonsSection } from "@/components/events/event-addons-section";
import { EventOverview } from "@/components/events/event-overview";
import { EventDynamicSections } from "@/components/events/event-dynamic-sections";
import { EventArticles } from "@/components/events/event-articles";
import { EventRelatedEvents } from "@/components/events/event-related-events";
import { EventTabsNav, EventTabKey } from "@/components/events/event-tabs-nav";
import { EventResultsTab } from "@/components/events/event-results-tab";
import { EventGalleryTab } from "@/components/events/event-gallery-tab";
import { EventRulesTab } from "@/components/events/event-rules-tab";
import { EventFaqSection } from "@/components/events/event-faq-section";
import { EventGeoStructuredData } from "@/components/events/event-geo-structured-data";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }> | { id: string; locale: string };
}) {
  // Support async params in Next.js 15+
  const resolvedParams = "then" in params ? use(params) : params;
  const event = getEventById(resolvedParams.id);
  const locale = useLocale();
  const isEn = locale === "en";

  const [activeTab, setActiveTab] = useState<EventTabKey>("overview");
  const [selectedAddons, setSelectedAddons] = useState<Record<string, number>>({});

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
    <div className="w-full bg-background min-h-screen pb-24 lg:pb-20">
      {/* 0. Full GEO & SEO Structured Data JSON-LD (SportsEvent, Offers, SubEvents, Breadcrumbs) */}
      <EventGeoStructuredData event={event} />

      {/* 1. Top Hero Banner Container */}
      <div className="relative w-full aspect-[16/7] sm:aspect-[16/6] md:aspect-[16/5] max-h-[440px] overflow-hidden bg-slate-950">
        <Image
          src={event.imageUrl}
          alt={event.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/60" />

        {/* Floating Top Actions Bar Aligned with Navbar Container (max-w-[1440px]) */}
        <div className="absolute top-4 sm:top-6 left-0 right-0 z-10">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link href="/events">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl bg-background/90 backdrop-blur-md border-border/80 text-foreground font-medium gap-1.5 shadow-sm hover:bg-background cursor-pointer text-xs"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{isEn ? "Back to Events" : "Quay lại danh sách"}</span>
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="size-8 sm:size-8.5 rounded-xl bg-background/90 backdrop-blur-md border-border/80 hover:bg-background text-foreground shadow-sm cursor-pointer"
                title={isEn ? "Share" : "Chia sẻ"}
              >
                <Share2 className="h-3.5 w-3.5 text-foreground" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8 sm:size-8.5 rounded-xl bg-background/90 backdrop-blur-md border-border/80 hover:bg-background text-foreground shadow-sm cursor-pointer"
                title={isEn ? "Save" : "Yêu thích"}
              >
                <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500/20" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Detail Content Container */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-12 relative z-20 space-y-6">
        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Event Tabs & Content (Span 8) */}
          <div className="lg:col-span-8 space-y-5">
            {/* Event Header Card */}
            <div className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-3 shadow-2xs">
              {/* Category & Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 rounded-lg px-2.5 py-0.5 text-[11px] font-semibold bg-rose-500 text-white shadow-2xs">
                  <Flame className="w-3 h-3" /> {event.badge?.text || (isEn ? "Featured" : "Nổi bật")}
                </span>
                <span className="inline-flex items-center rounded-lg px-2.5 py-0.5 text-[11px] font-semibold bg-muted text-muted-foreground border border-border/60">
                  {event.category}
                </span>
                {event.distanceText && (
                  <span className="inline-flex items-center rounded-lg px-2.5 py-0.5 text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
                    {event.distanceText}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-tight">
                {event.title}
              </h1>

              {/* Date & Location */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs sm:text-sm text-muted-foreground pt-2 border-t border-border/50">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  <span>{event.date}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span>{event.location}</span>
                </span>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <EventTabsNav
              activeTab={activeTab}
              onChangeTab={setActiveTab}
              resultCount={850}
              photoCount={360}
              articleCount={event.articles?.length || 3}
            />

            {/* TAB 1: OVERVIEW PANEL */}
            <div
              role="tabpanel"
              id="panel-overview"
              aria-labelledby="tab-overview"
              className={activeTab === "overview" ? "block space-y-4" : "hidden"}
            >
              {/* Event Overview Card */}
              <EventOverview event={event} />

              {/* Dynamic Backend Content Sections as Standalone Sibling Cards */}
              <EventDynamicSections sections={event.contentSections} />

              {/* Event Add-ons & Extra Services Section */}
              <EventAddonsSection
                addons={event.addons}
                selectedAddons={selectedAddons}
                onToggleAddon={handleToggleAddon}
              />

              {/* Event Related Articles Preview */}
              <EventArticles event={event} />

              {/* Event Q&A & GEO Knowledge Base FAQ Section */}
              <EventFaqSection />
            </div>

            {/* TAB 2: RESULTS & TIMING LEADERBOARD PANEL (Full DOM for SEO) */}
            <div
              role="tabpanel"
              id="panel-results"
              aria-labelledby="tab-results"
              className={activeTab === "results" ? "block" : "hidden"}
            >
              <EventResultsTab />
            </div>

            {/* TAB 3: PHOTO GALLERY PANEL (Full DOM for SEO) */}
            <div
              role="tabpanel"
              id="panel-gallery"
              aria-labelledby="tab-gallery"
              className={activeTab === "gallery" ? "block" : "hidden"}
            >
              <EventGalleryTab />
            </div>

            {/* TAB 4: ADD-ONS & SERVICES PANEL (Full DOM for SEO) */}
            <div
              role="tabpanel"
              id="panel-addons"
              aria-labelledby="tab-addons"
              className={activeTab === "addons" ? "block" : "hidden"}
            >
              <EventAddonsSection
                addons={event.addons}
                selectedAddons={selectedAddons}
                onToggleAddon={handleToggleAddon}
              />
            </div>

            {/* TAB 5: Q&A FAQS PANEL (Full DOM for SEO & GEO) */}
            <div
              role="tabpanel"
              id="panel-faq"
              aria-labelledby="tab-faq"
              className={activeTab === "faq" ? "block" : "hidden"}
            >
              <EventFaqSection />
            </div>

            {/* TAB 5: ARTICLES & GUIDES PANEL (Full DOM for SEO) */}
            <div
              role="tabpanel"
              id="panel-articles"
              aria-labelledby="tab-articles"
              className={activeTab === "articles" ? "block" : "hidden"}
            >
              <EventArticles event={event} />
            </div>

            {/* TAB 6: RULES & SAFETY PANEL (Full DOM for SEO) */}
            <div
              role="tabpanel"
              id="panel-rules"
              aria-labelledby="tab-rules"
              className={activeTab === "rules" ? "block" : "hidden"}
            >
              <EventRulesTab />
            </div>
          </div>

          {/* Right Column: Instant Registration Sidebar (Span 4) */}
          <div className="lg:col-span-4 h-full">
            <EventRegistrationSidebar
              event={event}
              selectedAddons={selectedAddons}
            />
          </div>
        </div>

        {/* 3. Related Events & Tournaments Section (Full Width, Like VenueRelatedCourts) */}
        <EventRelatedEvents
          currentEventId={event.id}
          category={event.category}
        />
      </div>
    </div>
  );
}
