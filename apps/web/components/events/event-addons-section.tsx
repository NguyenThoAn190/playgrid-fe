"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Sparkles, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventAddon, MOCK_EVENT_ADDONS } from "@/lib/events-data";

interface EventAddonsSectionProps {
  addons?: EventAddon[];
  selectedAddons: Record<string, number>;
  onToggleAddon: (addonId: string) => void;
}

export function EventAddonsSection({
  addons = MOCK_EVENT_ADDONS,
  selectedAddons,
  onToggleAddon,
}: EventAddonsSectionProps) {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <div className="bg-card border border-border/80 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
      {/* Section Header */}
      <div className="border-b border-border/60 pb-2.5 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
            <Sparkles className="size-4.5 text-brand-blue dark:text-brand-green" />
            <span>{isEn ? "Event Add-ons & Extra Services" : "Dịch vụ & Tiện ích bổ sung cho Sự kiện"}</span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isEn
              ? "Elevate your race day with official services and gear from organizers"
              : "Nâng tầm trải nghiệm thi đấu với các gói dịch vụ tiện ích chính hãng từ Ban Tổ Chức"}
          </p>
        </div>
        <span className="text-[11px] font-semibold text-brand-blue dark:text-brand-green bg-brand-blue/10 dark:bg-brand-green/10 px-2.5 py-1 rounded-full shrink-0 border border-brand-blue/20">
          {addons.length} {isEn ? "options" : "tiện ích"}
        </span>
      </div>

      {/* Add-ons Grid (12px gap) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {addons.map((addon) => {
          const isSelected = (selectedAddons[addon.id] || 0) > 0;

          return (
            <div
              key={addon.id}
              onClick={() => onToggleAddon(addon.id)}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer space-y-3 ${
                isSelected
                  ? "border-brand-blue dark:border-brand-green bg-brand-blue/[0.03] dark:bg-brand-green/[0.03] ring-1 ring-brand-blue/30 shadow-xs"
                  : "border-border/80 bg-muted/15 hover:border-border hover:bg-muted/25"
              }`}
            >
              <div className="space-y-1.5">
                {/* Header: Title + Checkbox */}
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-bold text-xs sm:text-sm text-foreground leading-snug">
                    {addon.name}
                  </h4>

                  {/* Selection Checkbox */}
                  <div
                    className={`size-5.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isSelected
                        ? "bg-gradient-primary text-white shadow-2xs scale-105"
                        : "border-2 border-muted-foreground/30 hover:border-brand-blue"
                    }`}
                  >
                    {isSelected && <Check className="size-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {addon.description}
                </p>
              </div>

              {/* Price & Toggle CTA */}
              <div className="pt-2.5 border-t border-border/40 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-extrabold text-sm sm:text-base text-brand-blue dark:text-brand-green">
                      {addon.price.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
                    </span>
                    {addon.originalPrice && (
                      <span className="text-[10.5px] text-muted-foreground line-through">
                        {addon.originalPrice.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant={isSelected ? "default" : "outline"}
                  className={`h-7.5 px-3 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                    isSelected
                      ? "bg-gradient-primary text-white border-0 shadow-2xs"
                      : "border-border/80 hover:bg-muted text-foreground"
                  }`}
                >
                  {isSelected ? (
                    <span className="flex items-center gap-1">
                      <Check className="size-3" />
                      {isEn ? "Added" : "Đã thêm"}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Plus className="size-3" />
                      {isEn ? "Add" : "Thêm"}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
