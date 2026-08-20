"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "next-intl";
import {
  Ticket,
  ShieldCheck,
  Tag,
  CheckCircle2,
  AlertCircle,
  X,
  Clock,
  Minus,
  Plus,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHeaderVisible } from "@/hooks/use-scroll-direction";
import {
  TournamentData,
} from "@/lib/tournaments-data";
import {
  VoucherItem,
  MOCK_USER_VOUCHERS,
  calculateVoucherDiscount,
} from "@/lib/voucher-data";
import { VoucherWalletModal } from "@/components/vouchers/voucher-wallet-modal";
import { getPaymentUrl } from "@workspace/shared/utils/sso";

interface TournamentRegistrationSidebarProps {
  tournament: TournamentData;
  selectedAddons?: Record<string, number>;
  selectedQuantities?: Record<string, number>;
  onQuantityChange?: (divisionId: string, delta: number, maxAvailable?: number) => void;
}

export function TournamentRegistrationSidebar({
  tournament,
  selectedAddons = {},
  selectedQuantities: externalQuantities,
  onQuantityChange: externalOnQuantityChange,
}: TournamentRegistrationSidebarProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isHeaderVisible = useHeaderVisible();
  const locale = useLocale();
  const isEn = locale === "en";

  // Internal state if external is not provided
  const [internalQuantities, setInternalQuantities] = useState<Record<string, number>>(() => {
    const firstAvailable = tournament.divisions.find((d) => d.status !== "sold_out");
    return firstAvailable ? { [firstAvailable.id]: 1 } : {};
  });

  const selectedQuantities = externalQuantities || internalQuantities;

  const handleQuantityChange = (divisionId: string, delta: number, maxAvailable: number = 10) => {
    if (externalOnQuantityChange) {
      externalOnQuantityChange(divisionId, delta, maxAvailable);
    } else {
      setInternalQuantities((prev) => {
        const current = prev[divisionId] || 0;
        const next = Math.max(0, Math.min(maxAvailable, current + delta));
        if (next === 0) {
          const copy = { ...prev };
          delete copy[divisionId];
          return copy;
        }
        return { ...prev, [divisionId]: next };
      });
    }
  };

  // Voucher state
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState<VoucherItem | null>(null);
  const [voucherCodeInput, setVoucherCodeInput] = useState("");
  const [voucherError, setVoucherError] = useState("");

  // Mobile modal expansion
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  // Calculations
  const selectedDivisionsList = tournament.divisions
    .filter((d) => (selectedQuantities[d.id] || 0) > 0)
    .map((d) => ({
      division: d,
      qty: selectedQuantities[d.id] || 0,
      total: d.price * (selectedQuantities[d.id] || 0),
    }));

  const totalTickets = selectedDivisionsList.reduce((acc, item) => acc + item.qty, 0);
  const rawTicketSubtotal = selectedDivisionsList.reduce((acc, item) => acc + item.total, 0);

  const addonsTotal = tournament.addons.reduce((sum, addon) => {
    if (selectedAddons[addon.id]) {
      return sum + addon.price;
    }
    return sum;
  }, 0);

  const subtotal = rawTicketSubtotal + addonsTotal;
  const appliedDiscount = appliedVoucher
    ? calculateVoucherDiscount(appliedVoucher, subtotal)
    : 0;
  const finalTotal = Math.max(0, subtotal - (totalTickets > 0 ? appliedDiscount : 0));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleApplyManualVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError("");
    const code = voucherCodeInput.trim().toUpperCase();
    if (!code) return;

    const matched = MOCK_USER_VOUCHERS.find(
      (v) => v.code.toUpperCase() === code
    );

    if (matched) {
      if (matched.minOrderValue && subtotal < matched.minOrderValue) {
        setVoucherError(`Đơn hàng tối thiểu ${formatCurrency(matched.minOrderValue)}`);
        return;
      }
      setAppliedVoucher(matched);
      setVoucherCodeInput("");
    } else {
      setVoucherError("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
    }
  };

  const handleProceedToPayment = () => {
    if (totalTickets === 0) {
      alert("Vui lòng chọn ít nhất 1 vé / hạng mục thi đấu!");
      return;
    }

    const orderId = "PG-TOUR-" + Math.floor(10000 + Math.random() * 90000);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "playgrid_tournament_booking",
        JSON.stringify({
          tournamentId: tournament.id,
          tournamentTitle: tournament.title,
          selectedDivisions: selectedDivisionsList,
          totalTickets,
          selectedAddons,
          appliedDiscount,
          appliedVoucher,
          finalTotal,
        })
      );
      window.location.href = getPaymentUrl({
        type: "tournament",
        orderId,
        locale,
        amount: finalTotal,
        returnUrl: window.location.href,
      });
    }
  };

  const RegistrationFormContent = () => (
    <div className="space-y-3.5">
      {/* 1. List of Divisions with Embedded Quantity Selectors (+ / -) */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-foreground flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Ticket className="w-3.5 h-3.5 text-primary" />
            <span>Chọn hạng mục & số lượng vé</span>
          </span>
          <span className="text-xs text-muted-foreground font-normal">
            {totalTickets > 0 ? `Đã chọn: ${totalTickets} vé` : "Chưa chọn vé"}
          </span>
        </label>

        <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
          {tournament.divisions.map((div) => {
            const qty = selectedQuantities[div.id] || 0;
            const isSoldOut = div.status === "sold_out";
            const slotsLeft = div.maxTeams - div.registeredTeams;

            return (
              <div
                key={div.id}
                className={`p-3 rounded-xl sm:rounded-2xl border transition-all space-y-2 bg-muted/20 ${
                  qty > 0
                    ? "border-primary bg-primary/[0.04] ring-1 ring-primary/30"
                    : "border-border/80 hover:border-primary/50"
                }`}
              >
                {/* Header: Name + Format Tag + Rating */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-semibold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-lg">
                        {div.formatLabel}
                      </span>
                      <span className="text-xs font-normal text-muted-foreground">
                        ({div.levelRating})
                      </span>
                    </div>
                    <h4 className="font-semibold text-xs sm:text-sm text-foreground leading-snug truncate">
                      {div.name}
                    </h4>
                  </div>
                </div>

                {/* Deadline & Price & Quantity Selector Row */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-border/50">
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-primary">
                      {formatCurrency(div.price)}
                      <span className="text-xs font-normal text-muted-foreground"> / đội</span>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 font-normal">
                      <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                      <span>Hạn: <strong className="font-medium text-foreground">{div.regDeadline}</strong></span>
                    </div>
                  </div>

                  {/* Quantity Controller */}
                  {isSoldOut ? (
                    <span className="text-[11px] font-semibold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-md">
                      Hết vé
                    </span>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-background border border-border/80 rounded-xl p-0.5 shadow-2xs">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(div.id, -1)}
                        disabled={qty === 0}
                        className="w-6.5 h-6.5 rounded-lg flex items-center justify-center text-foreground hover:bg-muted active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-all"
                        aria-label="Giảm số lượng"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <span className="w-6 text-center font-bold text-xs text-foreground">
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleQuantityChange(div.id, 1, slotsLeft > 0 ? slotsLeft : 10)}
                        disabled={qty >= (slotsLeft > 0 ? slotsLeft : 10)}
                        className="w-6.5 h-6.5 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs"
                        aria-label="Tăng số lượng"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Voucher & Promo Code Bar */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-primary" />
            <span>Mã giảm giá / Voucher</span>
          </span>
          <button
            type="button"
            onClick={() => setIsVoucherModalOpen(true)}
            className="text-primary hover:underline font-medium text-xs cursor-pointer"
          >
            Chọn từ Ví ({MOCK_USER_VOUCHERS.length})
          </button>
        </div>

        {appliedVoucher ? (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Đã áp dụng: {appliedVoucher.code} (-{formatCurrency(appliedDiscount)})</span>
            </div>
            <button
              type="button"
              onClick={() => setAppliedVoucher(null)}
              className="text-muted-foreground hover:text-rose-500 font-medium ml-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyManualVoucher} className="flex gap-2">
            <Input
              placeholder="Nhập mã ưu đãi..."
              value={voucherCodeInput}
              onChange={(e) => {
                setVoucherCodeInput(e.target.value);
                setVoucherError("");
              }}
              className="h-9 text-xs rounded-xl font-normal bg-muted/20 border-border/70 focus-visible:ring-primary"
            />
            <Button
              type="submit"
              size="sm"
              variant="outline"
              className="rounded-xl text-xs font-medium shrink-0 h-9"
            >
              Áp dụng
            </Button>
          </form>
        )}

        {voucherError && (
          <div className="text-xs text-rose-500 font-normal flex items-center gap-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{voucherError}</span>
          </div>
        )}
      </div>

      {/* 3. Price Breakdown Summary */}
      <div className="rounded-xl sm:rounded-2xl border border-border/80 bg-muted/30 p-3.5 space-y-2 text-xs">
        <div className="flex items-center justify-between text-muted-foreground font-normal">
          <span>Lệ phí giải đấu ({totalTickets} vé):</span>
          <span className="font-medium text-foreground">{formatCurrency(rawTicketSubtotal)}</span>
        </div>

        {addonsTotal > 0 && (
          <div className="flex items-center justify-between text-muted-foreground font-normal">
            <span>Dịch vụ Add-ons bổ sung:</span>
            <span className="font-medium text-foreground">+{formatCurrency(addonsTotal)}</span>
          </div>
        )}

        {appliedDiscount > 0 && (
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-normal">
            <span>Giảm giá Voucher:</span>
            <span>-{formatCurrency(appliedDiscount)}</span>
          </div>
        )}

        <div className="pt-2 border-t border-border/60 flex items-center justify-between font-semibold text-sm sm:text-base text-foreground">
          <span>Tổng thanh toán:</span>
          <span className="text-primary font-bold text-base sm:text-lg">{formatCurrency(finalTotal)}</span>
        </div>
      </div>

      {/* 4. Checkout Action Button */}
      <Button
        type="button"
        size="hero"
        onClick={handleProceedToPayment}
        className="w-full rounded-2xl font-bold text-sm sm:text-base bg-gradient-primary text-white shadow-md hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer gap-2"
      >
        <span>Xác nhận & mua vé ({totalTickets} vé)</span>
        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
      </Button>

      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground text-center font-normal">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>Bảo mật thanh toán 100% • Vé chính hãng PlayGrid</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar Card */}
      <aside
        className={`hidden lg:block bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4.5 shadow-2xs sticky transition-all duration-300 ${
          isHeaderVisible ? "top-20" : "top-4"
        }`}
      >
        <div className="space-y-3.5">
          <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
            <div>
              <span className="text-xs font-semibold text-primary">
                Mua vé & đăng ký
              </span>
              <h3 className="font-bold text-sm sm:text-base text-foreground">
                {tournament.shortTitle}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground block font-normal">Hạn đăng ký</span>
              <span className="text-xs font-semibold text-rose-500">{tournament.regDeadline}</span>
            </div>
          </div>

          <RegistrationFormContent />
        </div>
      </aside>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border p-3 shadow-xs">
        <div className="flex items-center justify-between gap-3 max-w-[500px] mx-auto">
          <div>
            <span className="text-xs text-muted-foreground block font-normal">Tổng ({totalTickets} vé)</span>
            <span className="text-base font-bold text-primary">{formatCurrency(finalTotal)}</span>
          </div>

          <Button
            type="button"
            onClick={() => setIsMobileModalOpen(true)}
            className="rounded-xl px-5 font-semibold text-xs sm:text-sm bg-gradient-primary text-white shadow-xs cursor-pointer"
          >
            <span>Mua vé ngay</span>
          </Button>
        </div>
      </div>

      {/* Mobile Registration Drawer Modal */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileModalOpen(false)}
          />
          <div className="relative bg-card rounded-t-3xl border-t border-border p-5 max-h-[85vh] overflow-y-auto space-y-4 z-10 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-border/50 pb-2">
              <h3 className="font-bold text-sm sm:text-base text-foreground">
                Mua vé giải đấu {tournament.shortTitle}
              </h3>
              <button
                type="button"
                onClick={() => setIsMobileModalOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <RegistrationFormContent />
          </div>
        </div>
      )}

      {/* Voucher Wallet Modal */}
      {mounted &&
        createPortal(
          <VoucherWalletModal
            isOpen={isVoucherModalOpen}
            onClose={() => setIsVoucherModalOpen(false)}
            currentSubtotal={subtotal}
            category="event"
            selectedVoucherCode={appliedVoucher?.code}
            onSelectVoucher={(voucher) => {
              setAppliedVoucher(voucher);
              setIsVoucherModalOpen(false);
            }}
          />,
          document.body
        )}
    </>
  );
}
