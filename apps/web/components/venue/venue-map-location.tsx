"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Copy, Check, Phone, Clock } from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { VenueDetailData } from "@/lib/venue-data";

interface VenueMapLocationProps {
  venue: VenueDetailData;
}

export function VenueMapLocation({ venue }: VenueMapLocationProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(venue.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(venue.name + " " + venue.address)}`;

  return (
    <Card className="rounded-3xl border border-border/80 bg-card p-4 sm:p-5 space-y-3 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <MapPin className="size-5 text-brand-blue dark:text-brand-green" />
            Vị trí & Chỉ đường
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Dễ dàng di chuyển từ các quận lân cận
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyAddress}
            className="h-8 px-3 text-xs font-semibold rounded-xl border-border/80"
          >
            {copied ? (
              <>
                <Check className="size-3.5 mr-1 text-emerald-500" />
                <span>Đã chép địa chỉ</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5 mr-1" />
                <span>Sao chép địa chỉ</span>
              </>
            )}
          </Button>

          <a href={mapUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              className="h-8 px-3 text-xs font-semibold rounded-xl bg-gradient-primary text-white"
            >
              <Navigation className="size-3.5 mr-1" />
              <span>Mở Google Maps</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Map visual card + Contact info (Equal height flex/grid layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-stretch">
        {/* Map Preview Frame - Stretches h-full to match right column height */}
        <div className="lg:col-span-2 relative min-h-[260px] sm:min-h-[290px] h-full w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-border/60">
          <iframe
            title="Google Map Location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://maps.google.com/maps?q=${venue.coordinates.lat},${venue.coordinates.lng}&hl=vi&z=15&output=embed`}
            className="w-full h-full grayscale-[20%] dark:invert-[90%] dark:hue-rotate-180 min-h-[260px]"
          />

          {/* Floating Map Pin Badge */}
          <div className="absolute bottom-3 left-3 z-10 bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border/80 shadow-md text-xs">
            <div className="font-bold text-foreground truncate max-w-[240px]">{venue.shortName}</div>
            <div className="text-[11px] text-muted-foreground">{venue.distance}</div>
          </div>
        </div>

        {/* Contact & Hours Info Column */}
        <div className="space-y-3 p-4 rounded-2xl bg-muted/30 border border-border/60 flex flex-col justify-between h-full">
          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <MapPin className="size-3.5 text-brand-blue" />
                Địa chỉ chính xác
              </span>
              <p className="text-xs font-medium text-foreground leading-relaxed">
                {venue.address}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Clock className="size-3.5 text-brand-green" />
                Thời gian mở cửa
              </span>
              <p className="text-xs font-semibold text-foreground leading-snug">
                05:00 - 23:00 <span className="text-muted-foreground font-normal">• Hằng ngày (Thứ 2 - CN)</span>
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                <Phone className="size-3.5 text-amber-500" />
                Hotline đặt sân
              </span>
              <p className="text-xs font-bold text-foreground">
                {venue.phone}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-border/60">
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              💡 <strong>Chỉ dẫn cổng vào:</strong> Cổng 2 Lữ Gia hoặc Cổng chính Lý Thường Kiệt (Bảo vệ hướng dẫn đậu ô tô).
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
