"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { MapPin, Navigation, Copy, Check, Phone, Clock } from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { VenueDetailData } from "@/lib/venue-data";

interface VenueMapLocationProps {
  venue: VenueDetailData;
}

export function VenueMapLocation({ venue }: VenueMapLocationProps) {
  const [copied, setCopied] = useState(false);

  const tLoc = useTranslations("venue.location");
  const locale = useLocale();

  const handleCopyAddress = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(venue.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(venue.name + " " + venue.address)}`;

  return (
    <Card className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 space-y-3 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <MapPin className="size-5 text-primary" />
            {tLoc("title")}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-0.5">
            {tLoc("subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyAddress}
            className="h-8 px-3 text-xs font-semibold rounded-xl border-border/80 hover:bg-muted"
          >
            {copied ? (
              <>
                <Check className="size-3.5 mr-1 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">{tLoc("copied")}</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 mr-1" />
                <span>{tLoc("copy_address")}</span>
              </>
            )}
          </Button>

          <a href={mapUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              className="h-8 px-3 text-xs font-bold rounded-xl bg-gradient-primary text-white shadow-2xs hover:shadow-md"
            >
              <Navigation className="size-3.5 mr-1" />
              <span>{tLoc("open_maps")}</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Map visual card + Contact info (Equal height flex/grid layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-stretch">
        {/* Map Preview Frame - Stretches h-full to match right column height */}
        <div className="lg:col-span-2 relative min-h-[260px] sm:min-h-[290px] h-full w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-border/60">
          <iframe
            title="Google Map Location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${venue.coordinates.lat},${venue.coordinates.lng}&hl=${locale}&z=15&output=embed`}
            className="w-full h-full grayscale-[20%] dark:invert-[90%] dark:hue-rotate-180 min-h-[260px]"
          />

          {/* Floating Map Pin Badge */}
          <div className="absolute bottom-3 left-3 z-10 bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border/80 shadow-2xs text-xs">
            <div className="font-semibold text-foreground truncate max-w-[240px]">{venue.shortName}</div>
            <div className="text-[11px] text-muted-foreground">{venue.distance}</div>
          </div>
        </div>

        {/* Contact & Hours Info Column */}
        <div className="space-y-3 p-4 rounded-xl bg-muted/30 border border-border/60 flex flex-col justify-between h-full">
          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <MapPin className="size-3.5 text-primary" />
                {tLoc("exact_address")}
              </span>
              <p className="text-xs font-normal text-foreground/90 leading-relaxed">
                {venue.address}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Clock className="size-3.5 text-primary" />
                {tLoc("open_hours_title")}
              </span>
              <p className="text-xs font-semibold text-foreground leading-snug">
                05:00 - 23:00 <span className="text-muted-foreground font-normal">• {tLoc("everyday")}</span>
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Phone className="size-3.5 text-amber-500" />
                {tLoc("hotline")}
              </span>
              <p className="text-xs font-bold text-foreground">
                {venue.phone}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-border/60">
            <p className="text-[11px] text-muted-foreground font-normal leading-relaxed">
              💡 <strong>{tLoc("entrance_hint")}</strong> {tLoc("entrance_hint_desc")}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
