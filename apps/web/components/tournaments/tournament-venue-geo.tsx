"use client";

import React from "react";
import {
  MapPin,
  Navigation,
  Phone,
  Car,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { type TournamentVenueGeo as TournamentVenueGeoData } from "@/lib/tournaments-data";

interface TournamentVenueGeoProps {
  venue: TournamentVenueGeoData;
}

export function TournamentVenueGeo({ venue }: TournamentVenueGeoProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.name}, ${venue.address}`
  )}`;

  return (
    <div className="space-y-4">
      <div className="pb-1">
        <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <span>Địa điểm thi đấu & sơ đồ chỉ đường</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
          Thông tin chi tiết cụm sân bãi, bãi đỗ xe và chỉ đường trực tiếp đến nhà thi đấu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left Column: Venue Info Card (7 cols) */}
        <div className="lg:col-span-7 bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 shadow-2xs flex flex-col justify-between">
          <div className="space-y-3">
            <div>
              <span className="text-xs font-semibold text-primary">
                Cụm sân thi đấu chính thức
              </span>
              <h3 className="text-base sm:text-lg font-bold text-foreground pt-1">
                {venue.name}
              </h3>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-muted-foreground font-normal">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground">{venue.address}, {venue.district}, {venue.city}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>Liên hệ quản lý sân: <strong className="font-medium text-foreground">{venue.phone}</strong></span>
              </div>

              <div className="flex items-start gap-2">
                <Car className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{venue.parkingInfo}</span>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="pt-2.5 border-t border-border/50 space-y-2">
              <div className="text-xs font-semibold text-foreground">
                Tiện ích & cơ sở vật chất sân bãi:
              </div>
              <div className="flex flex-wrap gap-2">
                {venue.amenities.map((amenity, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-muted/60 border border-border/60 text-xs font-normal text-foreground flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{amenity}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-border/50">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm shadow-2xs hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Mở chỉ đường trên Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Visual Interactive Map Card (5 cols) */}
        <div className="lg:col-span-5 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-5 sm:p-6 flex flex-col justify-between shadow-2xs min-h-[280px]">
          {/* Radar background grid animation */}
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-30" />

          <div className="relative z-10 space-y-2 text-center my-auto">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto shadow-lg">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="text-white font-semibold text-sm sm:text-base">{venue.name}</h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto font-normal">
              Tọa độ GPS: {venue.coordinates.lat.toFixed(4)}, {venue.coordinates.lng.toFixed(4)}
            </p>
          </div>

          <div className="relative z-10 pt-4">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-2xs text-center block cursor-pointer transition-colors"
            >
              Xem vị trí vệ tinh trực tuyến
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
