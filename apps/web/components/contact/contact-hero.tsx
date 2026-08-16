"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { MessageSquare, Zap, Building2, Users, Star, Sparkles } from "lucide-react";

export function ContactHero() {
  const t = useTranslations("contact_page");

  const trustStats = [
    {
      icon: Zap,
      value: t("stats.response_time"),
      label: t("stats.response_time_desc"),
      color: "text-amber-500 bg-amber-500/10 dark:bg-amber-500/15",
    },
    {
      icon: Building2,
      value: t("stats.venues"),
      label: t("stats.venues_desc"),
      color: "text-brand-blue bg-brand-blue/10 dark:bg-brand-blue/15",
    },
    {
      icon: Users,
      value: t("stats.players"),
      label: t("stats.players_desc"),
      color: "text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/15",
    },
    {
      icon: Star,
      value: t("stats.satisfaction"),
      label: t("stats.satisfaction_desc"),
      color: "text-rose-500 bg-rose-500/10 dark:bg-rose-500/15",
    },
  ];

  return (
    <div className="relative overflow-hidden py-10 sm:py-16">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-brand-blue/15 dark:bg-brand-blue/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 translate-x-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-brand-green/15 dark:bg-brand-green/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="space-y-6 text-center max-w-3xl mx-auto px-4">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-primary/10 border border-brand-blue/20 dark:border-brand-green/20 px-3.5 py-1 text-xs font-semibold text-brand-blue dark:text-brand-green shadow-2xs">
          <Sparkles className="size-3.5" />
          <span>{t("badge")}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground leading-[1.2]">
          {t("title")}
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-xs sm:text-sm sm:leading-relaxed max-w-2xl mx-auto font-normal">
          {t("subtitle")}
        </p>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
          {trustStats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-card border border-border/70 shadow-xs hover:border-border transition-all group"
              >
                <div className={`p-2 rounded-xl mb-2 ${item.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="size-4 sm:size-5" />
                </div>
                <span className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                  {item.value}
                </span>
                <span className="text-[11px] sm:text-xs text-muted-foreground font-normal mt-0.5">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
