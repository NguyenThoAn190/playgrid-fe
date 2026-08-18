"use client";

import React from "react";
import {
  ArrowRight,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TournamentDivision } from "@/lib/tournaments-data";

interface TournamentDivisionsTabProps {
  divisions: TournamentDivision[];
  selectedQuantities?: Record<string, number>;
  onQuantityChange?: (divisionId: string, delta: number, maxAvailable?: number) => void;
  onSelectDivision?: (divisionId: string) => void;
}

export function TournamentDivisionsTab({
  divisions,
  selectedQuantities = {},
  onQuantityChange,
  onSelectDivision,
}: TournamentDivisionsTabProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-1">
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground">
            Các hạng mục thi đấu chính thức
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
            Chọn nội dung phù hợp với trình độ để đăng ký và tranh tài nhận cúp vô địch.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {divisions.map((div) => {
          const percentFilled = Math.min(
            100,
            Math.round((div.registeredTeams / div.maxTeams) * 100)
          );
          const slotsLeft = div.maxTeams - div.registeredTeams;
          const qty = selectedQuantities[div.id] || 0;
          const isSoldOut = div.status === "sold_out";

          return (
            <div
              key={div.id}
              className={`bg-card border rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 transition-all shadow-2xs ${
                qty > 0
                  ? "border-primary ring-1 ring-primary/30 bg-primary/[0.02]"
                  : "border-border/80 hover:border-primary/50"
              }`}
            >
              {/* Top Row: Title, Format Tag, Price */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
                      {div.formatLabel}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-muted text-muted-foreground border border-border/60">
                      {div.levelRating}
                    </span>
                    {div.status === "selling_fast" && (
                      <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30">
                        Sắp hết chỗ ({slotsLeft} slot còn lại)
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground">
                    {div.name}
                  </h3>
                </div>

                {/* Price Display */}
                <div className="text-left sm:text-right shrink-0">
                  <div className="text-lg sm:text-xl font-bold text-primary">
                    {formatCurrency(div.price)}
                    <span className="text-xs font-normal text-muted-foreground"> / đội</span>
                  </div>
                  {div.originalPrice && (
                    <div className="text-xs text-muted-foreground line-through font-normal">
                      {formatCurrency(div.originalPrice)}
                    </div>
                  )}
                </div>
              </div>

              {/* Middle Row: Registration Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-muted-foreground font-normal">
                    Số đội đã đăng ký: <strong className="text-foreground font-medium">{div.registeredTeams}/{div.maxTeams} cặp</strong>
                  </span>
                  <span className={slotsLeft <= 5 ? "text-rose-600 dark:text-rose-400 font-medium" : "text-emerald-600 dark:text-emerald-400 font-medium"}>
                    {slotsLeft > 0 ? `Còn ${slotsLeft} suất` : "Đã hết chỗ"}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      percentFilled >= 80 ? "bg-rose-500" : "bg-gradient-primary"
                    }`}
                    style={{ width: `${percentFilled}%` }}
                  />
                </div>
              </div>

              {/* Prize & Benefits Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Prize Pool Box */}
                <div className="rounded-xl sm:rounded-2xl bg-muted/40 border border-border/60 p-3.5 sm:p-4 space-y-2">
                  <div className="text-xs font-semibold text-foreground">
                    Cơ cấu giải thưởng
                  </div>
                  <ul className="text-xs space-y-1.5 text-muted-foreground font-normal">
                    <li className="flex items-start gap-1.5">
                      <span className="text-primary font-medium">•</span>
                      <span><strong className="text-foreground font-medium">Giải nhất:</strong> {div.prizeStructure.first}</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-primary font-medium">•</span>
                      <span><strong className="text-foreground font-medium">Giải nhì:</strong> {div.prizeStructure.second}</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-primary font-medium">•</span>
                      <span><strong className="text-foreground font-medium">Đồng hạng ba:</strong> {div.prizeStructure.third}</span>
                    </li>
                  </ul>
                </div>

                {/* Benefits Box */}
                <div className="rounded-xl sm:rounded-2xl bg-muted/40 border border-border/60 p-3.5 sm:p-4 space-y-2">
                  <div className="text-xs font-semibold text-foreground">
                    Quyền lợi vận động viên (Race Kit)
                  </div>
                  <ul className="text-xs space-y-1.5 text-muted-foreground font-normal">
                    {div.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action Row: (+ / -) Quantity Controller */}
              <div className="pt-2 flex items-center justify-between border-t border-border/50">
                <div className="text-xs text-muted-foreground font-normal">
                  {qty > 0 ? (
                    <span className="text-primary font-semibold">
                      Đã chọn {qty} vé ({formatCurrency(div.price * qty)})
                    </span>
                  ) : (
                    <span>Hạn đăng ký: {div.regDeadline}</span>
                  )}
                </div>

                {isSoldOut ? (
                  <Button disabled variant="outline" size="sm" className="rounded-xl text-xs">
                    Đã hết vé
                  </Button>
                ) : onQuantityChange ? (
                  <div className="flex items-center gap-2 bg-muted/60 border border-border/70 rounded-xl p-1 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => onQuantityChange(div.id, -1)}
                      disabled={qty === 0}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-foreground hover:bg-background active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-all"
                      aria-label="Giảm số lượng"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>

                    <span className="w-7 text-center font-bold text-xs text-foreground">
                      {qty}
                    </span>

                    <button
                      type="button"
                      onClick={() => onQuantityChange(div.id, 1, slotsLeft > 0 ? slotsLeft : 10)}
                      disabled={qty >= (slotsLeft > 0 ? slotsLeft : 10)}
                      className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs"
                      aria-label="Tăng số lượng"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : onSelectDivision ? (
                  <Button
                    onClick={() => onSelectDivision(div.id)}
                    className="rounded-xl font-semibold text-xs sm:text-sm gap-2"
                  >
                    <span>Chọn hạng mục này</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
