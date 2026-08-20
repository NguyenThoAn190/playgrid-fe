"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { MapPin, Navigation, Clock, Building2 } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

type OfficeLocation = "hcm" | "hn";

export function ContactMap() {
  const t = useTranslations("contact_page");
  const [activeOffice, setActiveOffice] = useState<OfficeLocation>("hcm");

  const offices = {
    hcm: {
      name: t("map.tab_hcm"),
      address: t("channels.hcm_address"),
      mapQuery: "PlayGrid+Tower+Nguyen+Thi+Thap+Quan+7+Ho+Chi+Minh",
      directionsUrl: "https://maps.google.com/?q=PlayGrid+Tower+Nguyen+Thi+Thap+Quan+7+Ho+Chi+Minh",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.954067345686!2d106.70231267480436!3d10.738023489408223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f7f329bb63d%3A0x6e7e4526d17b2b62!2zTmd1eeG7hW4gVGjhu4sgVGjhuq1wLCBUw6JuIFBow7osIFF14bqtbiA3LCBI4buTIENow60gTWluaA!5e0!3m2!1svi!2svn!4v1716000000000!5m2!1svi!2svn",
    },
    hn: {
      name: t("map.tab_hn"),
      address: t("channels.hn_address"),
      mapQuery: "Landmark+Building+Duy+Tan+Cau+Giay+Ha+Noi",
      directionsUrl: "https://maps.google.com/?q=Duy+Tan+Cau+Giay+Ha+Noi",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8638558813977!2d105.78201267503164!3d21.03813358061352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab354920c233%3A0x5d0313a3bf4f3e3f!2zUGjhu5EgRHV5IFTDom4sIEPhuqd1IEdp4bqleSwgSMOgIE7hu5lp!5e0!3m2!1svi!2svn!4v1716000000000!5m2!1svi!2svn",
    },
  };

  const current = offices[activeOffice];

  return (
    <div className="space-y-6 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
            <Building2 className="size-3.5" />
            <span>Văn phòng đại diện</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            {t("map.title")}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal">
            {t("map.subtitle")}
          </p>
        </div>

        {/* Office Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-muted/60 border border-border/80 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveOffice("hcm")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeOffice === "hcm"
                ? "bg-card text-foreground shadow-xs border border-border/60"
                : "text-muted-foreground hover:text-foreground font-medium"
            }`}
          >
            TP. Hồ Chí Minh
          </button>
          <button
            type="button"
            onClick={() => setActiveOffice("hn")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeOffice === "hn"
                ? "bg-card text-foreground shadow-xs border border-border/60"
                : "text-muted-foreground hover:text-foreground font-medium"
            }`}
          >
            Hà Nội
          </button>
        </div>
      </div>

      {/* Map Card Container */}
      <div className="rounded-3xl border border-border/80 bg-card overflow-hidden shadow-md">
        {/* Top Info Bar */}
        <div className="p-4 sm:p-5 border-b border-border/60 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue dark:bg-brand-green/15 dark:text-brand-green shrink-0">
              <MapPin className="size-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-foreground">
                {current.name}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5 font-normal">
                {current.address}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground font-normal">
              <Clock className="size-3.5" />
              <span>{t("map.open_hours")}</span>
            </div>

            <a
              href={current.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 rounded-xl text-xs font-semibold gap-1.5 border-brand-blue/30 dark:border-brand-green/30 text-brand-blue dark:text-brand-green hover:bg-brand-blue/10 dark:hover:bg-brand-green/10 cursor-pointer"
              >
                <Navigation className="size-3.5" />
                <span>{t("map.directions_btn")}</span>
              </Button>
            </a>
          </div>
        </div>

        {/* Google Maps Iframe */}
        <div className="relative w-full h-[320px] sm:h-[400px] bg-muted">
          <iframe
            title={current.name}
            src={current.mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[20%] contrast-[105%] dark:invert-[90%] dark:hue-rotate-180 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
}
