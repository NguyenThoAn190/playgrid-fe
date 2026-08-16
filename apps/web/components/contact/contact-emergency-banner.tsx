"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { PhoneCall, MessageCircle, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

export function ContactEmergencyBanner() {
  const t = useTranslations("contact_page");

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-blue/90 via-brand-blue to-emerald-600 dark:from-[#0a192f] dark:via-[#0f283d] dark:to-[#0d3b2b] p-6 sm:p-10 text-white shadow-xl border border-white/10">
      {/* Decorative background glow circles */}
      <div className="absolute -top-16 -right-16 size-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 size-48 rounded-full bg-brand-green/20 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[11px] sm:text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
            <AlertCircle className="size-3.5" />
            <span>{t("emergency.badge")}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
            {t("emergency.title")}
          </h3>
          <p className="text-xs sm:text-sm text-white/85 font-normal leading-relaxed">
            {t("emergency.subtitle")}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <a href="tel:19006868">
            <Button
              className="w-full sm:w-auto h-11 px-5 rounded-2xl bg-white text-brand-blue hover:bg-white/90 font-semibold text-xs sm:text-sm shadow-md cursor-pointer active:scale-95 transition-transform"
            >
              <PhoneCall className="size-4 mr-2" />
              <span>{t("emergency.call_btn")}</span>
            </Button>
          </a>

          <a href="https://zalo.me" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="w-full sm:w-auto h-11 px-5 rounded-2xl border-white/30 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm backdrop-blur-xs cursor-pointer active:scale-95 transition-transform"
            >
              <MessageCircle className="size-4 mr-2" />
              <span>{t("emergency.zalo_btn")}</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
