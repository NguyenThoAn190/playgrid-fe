"use client";

import React from "react";
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

export function VenueAmenities({ venue }: VenueAmenitiesProps) {
  return (
    <Card className="rounded-3xl border border-border/80 bg-card p-4 sm:p-5 space-y-3 shadow-sm">
      <div>
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Sparkles className="size-5 text-brand-blue dark:text-brand-green" />
          Tiện ích & Cơ sở vật chất
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          Tất cả dịch vụ tiện ích phục vụ người chơi tại {venue.shortName}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {venue.amenities.map((item) => {
          const IconComponent = ICON_MAP[item.icon] || Check;

          return (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3.5 rounded-2xl bg-muted/25 border border-border/60 hover:bg-muted/40 transition-colors"
            >
              <div className="size-9.5 rounded-xl bg-brand-blue/10 dark:bg-brand-green/20 text-brand-blue dark:text-brand-green flex items-center justify-center shrink-0">
                <IconComponent className="size-5" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="font-bold text-xs sm:text-sm text-foreground leading-snug">
                  {item.label}
                </h4>
                {item.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
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
