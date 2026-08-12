"use client";

import * as React from "react";
import { useTranslations } from "next-intl";

export function HeroHeadline() {
  const t = useTranslations("home.hero");

  return (
    <>
      {/* Main Headline */}
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl uppercase leading-[1.18] pb-1">
        <span className="block text-foreground py-0.5">{t("title")}</span>
      </h1>

      {/* Subtitle / Description */}
      <p className="max-w-[500px] text-sm sm:text-base md:text-lg font-normal leading-relaxed text-muted-foreground">
        {t("subtitle")}
      </p>
    </>
  );
}

