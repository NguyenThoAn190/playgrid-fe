"use client";

import React from "react";
import { Plus, Check, Sparkles } from "lucide-react";
import { TournamentAddon } from "@/lib/tournaments-data";
import { Button } from "@/components/ui/button";

interface TournamentAddonsSectionProps {
  addons: TournamentAddon[];
  selectedAddons?: Record<string, number>;
  onToggleAddon?: (addonId: string) => void;
}

export function TournamentAddonsSection({
  addons,
  selectedAddons = {},
  onToggleAddon,
}: TournamentAddonsSectionProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (!addons || addons.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="pb-1">
        <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Dịch vụ & tiện ích bổ sung cho VĐV (Add-ons)</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
          Đăng ký thêm các gói in tên áo, chụp ảnh thi đấu hoặc dịch vụ kỹ thuật tại sân.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {addons.map((addon) => {
          const isSelected = Boolean(selectedAddons[addon.id]);
          return (
            <div
              key={addon.id}
              onClick={() => onToggleAddon && onToggleAddon(addon.id)}
              className={`group bg-card border rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-3 cursor-pointer transition-all duration-200 relative ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-2xs ring-1 ring-primary/40"
                  : "border-border/80 hover:border-primary/40 shadow-2xs"
              }`}
            >
              {addon.badge && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-lg text-[11px] font-semibold bg-amber-400 text-amber-950">
                  {addon.badge}
                </span>
              )}

              <div className="space-y-1.5 pr-14">
                <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">
                  {addon.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 font-normal">
                  {addon.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <div>
                  <span className="font-bold text-sm sm:text-base text-primary">
                    {formatCurrency(addon.price)}
                  </span>
                  {addon.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through ml-2 font-normal">
                      {formatCurrency(addon.originalPrice)}
                    </span>
                  )}
                </div>

                <Button
                  type="button"
                  size="sm"
                  variant={isSelected ? "solid" : "outline"}
                  className="rounded-xl text-xs font-semibold gap-1 pointer-events-none"
                >
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Đã chọn</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Thêm</span>
                    </>
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
