"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Car,
  ShowerHead,
  Coffee,
  Wifi,
  Wrench,
  Sun,
  Wind,
  Armchair,
  Check,
  Sparkles,
} from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { VenueDetailData } from "@/lib/venue-data";

interface VenueAmenitiesProps {
  venue: VenueDetailData;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Car,
  ShowerHead,
  Coffee,
  Wifi,
  Wrench,
  Sun,
  Wind,
  Armchair,
};

const AMENITY_EN_MAP: Record<string, { label: string; description: string }> = {
  "Bãi đậu xe ô tô & xe máy": {
    label: "Car & Motorbike Parking",
    description: "Free spacious covered parking area with 24/7 security",
  },
  "Phòng thay đồ & Tắm nóng lạnh": {
    label: "Showers & Changing Rooms",
    description: "Clean private shower stalls with hot water and lockers",
  },
  "Căng-tin & Nước giải khát": {
    label: "Canteen & Refreshments",
    description: "Cold drinks, mineral water, energy drinks, and snacks available",
  },
  "Wifi miễn phí": {
    label: "Free High-Speed Wi-Fi",
    description: "High-speed internet coverage across all courts",
  },
  "Cho thuê & Căng vợt cầu lông": {
    label: "Racket Stringing & Rental",
    description: "Yonex, Victor racket rental and express stringing service on-site",
  },
  "Hệ thống quạt làm mát": {
    label: "Industrial Cooling Fans",
    description: "High-capacity ventilation system keeping courts cool and airy",
  },
};

export function VenueAmenities({ venue }: VenueAmenitiesProps) {
  const tAmenities = useTranslations("venue.amenities");
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <Card className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 space-y-3 shadow-2xs">
      <div>
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          {tAmenities("title")}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal mt-0.5">
          {tAmenities("subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {venue.amenities.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || Check;
          const enTranslation = AMENITY_EN_MAP[item.label];

          const label = isEn && enTranslation ? enTranslation.label : item.label;
          const description = isEn && enTranslation ? enTranslation.description : item.description;

          return (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/25 border border-border/60 hover:bg-muted/40 transition-colors"
            >
              <div className="size-9.5 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <IconComponent className="size-5" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h3 className="font-semibold text-xs sm:text-sm text-foreground leading-snug">
                  {label}
                </h3>
                {description && (
                  <p className="text-xs text-muted-foreground font-normal leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
