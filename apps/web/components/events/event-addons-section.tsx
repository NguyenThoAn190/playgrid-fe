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
    <div className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xs space-y-4">
      {/* Section Header */}
      <div className="border-b border-border/50 pb-3 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>{isEn ? "Event Add-ons & Extra Services" : "Dịch vụ & tiện ích bổ sung cho sự kiện"}</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal mt-0.5">
            {isEn
              ? "Elevate your race day with official services and gear from organizers"
              : "Nâng tầm trải nghiệm thi đấu với các gói dịch vụ tiện ích chính hãng từ Ban Tổ Chức"}
          </p>
        </div>
        <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-lg shrink-0 border border-primary/20">
          {addons.length} {isEn ? "options" : "tiện ích"}
        </span>
      </div>

      {/* Add-ons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {addons.map((addon) => {
          const isSelected = (selectedAddons[addon.id] || 0) > 0;

          return (
            <div
              key={addon.id}
              onClick={() => onToggleAddon(addon.id)}
              className={`p-4 rounded-xl sm:rounded-2xl border transition-all flex flex-col justify-between cursor-pointer space-y-3 ${
                isSelected
                  ? "border-primary bg-primary/5 ring-1 ring-primary/30 shadow-2xs"
                  : "border-border/80 bg-muted/20 hover:border-border hover:bg-muted/30"
              }`}
            >
              <div className="space-y-1.5">
                {/* Header: Title + Checkbox */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">
                    {addon.name}
                  </h3>

                  {/* Selection Checkbox */}
                  <div
                    className={`size-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isSelected
                        ? "bg-gradient-primary text-white shadow-2xs scale-105"
                        : "border-2 border-muted-foreground/40 hover:border-primary"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                  {addon.description}
                </p>
              </div>

              {/* Price & Toggle CTA */}
              <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-bold text-base sm:text-lg text-primary">
                      {addon.price.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
                    </span>
                    {addon.originalPrice && (
                      <span className="text-xs text-muted-foreground line-through font-normal">
                        {addon.originalPrice.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
                      </span>
                    )}
                  </div>
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant={isSelected ? "default" : "outline"}
                  className={`h-8 px-3 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                    isSelected
                      ? "bg-gradient-primary text-white border-0 shadow-2xs"
                      : "border-border/80 hover:bg-muted text-foreground"
                  }`}
                >
                  {isSelected ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {isEn ? "Added" : "Đã thêm"}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Plus className="w-3.5 h-3.5" />
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
