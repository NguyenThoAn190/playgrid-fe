"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "next-intl";
import {
  Clock,
  Minus,
  Plus,
  ShieldCheck,
  Ticket,
  Trophy,
  Users,
  Sparkles,
  Tag,
  CheckCircle2,
  AlertCircle,
  X,
  User,
  Mail,
  Phone,
  Shirt,
  Flame,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@/components/ui/input";
import { useHeaderVisible } from "@/hooks/use-scroll-direction";
import { EventData, EventDistanceTier, EventAddon, MOCK_EVENT_ADDONS } from "@/lib/events-data";
import {
  VoucherItem,
  MOCK_USER_VOUCHERS,
  calculateVoucherDiscount,
} from "@/lib/voucher-data";
import { VoucherWalletModal } from "@/components/vouchers/voucher-wallet-modal";
import { getPaymentUrl } from "@workspace/shared/utils/sso";

interface EventRegistrationSidebarProps {
  event: EventData;
  selectedAddons?: Record<string, number>;
}

export function EventRegistrationSidebar({
  event,
  selectedAddons = {},
}: EventRegistrationSidebarProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const isHeaderVisible = useHeaderVisible();
  const locale = useLocale();
  const isEn = locale === "en";

  const handleProceedToEventPayment = () => {
    const orderId = "PG-EVT-" + Math.floor(10000 + Math.random() * 90000);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "playgrid_event_booking",
        JSON.stringify({
          eventId: event.id,
          eventTitle: event.title,
          selectedQuantities,
          appliedDiscount,
          appliedVoucher,
          finalTotal,
        })
      );
      window.location.href = getPaymentUrl({
        type: "event",
        orderId,
        locale,
        amount: finalTotal,
        returnUrl: window.location.href,
      });
    }
  };

  const tiers: EventDistanceTier[] =
    event.distanceTiers && event.distanceTiers.length > 0
      ? event.distanceTiers
      : [
          {
            id: "default-tier-1",
            name: event.title,
            distance: event.distanceText || "Tiêu chuẩn",
            price: parseInt(event.price.replace(/\D/g, ""), 10) || 479000,
            originalPrice: (parseInt(event.price.replace(/\D/g, ""), 10) || 479000) * 1.25,
            phase: "Early Bird",
            regDeadline: "31/08/2026",
            description: "Bao gồm: Áo Finisher, Huy chương, Bib chip time, Bảo hiểm thể thao.",
            status: "available",
            availableSlots: 50,
          },
        ];

  // State: { [tierId]: quantity }
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [appliedVoucher, setAppliedVoucher] = useState<VoucherItem | null>(null);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVoucherWalletOpen, setIsVoucherWalletOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Athlete form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    idNumber: "",
    gender: "male",
    shirtSize: "L",
    clubName: "",
  });

  const handleQuantityChange = (tierId: string, delta: number, maxAvailable: number = 10) => {
    setSelectedQuantities((prev) => {
      const current = prev[tierId] || 0;
      const next = Math.max(0, Math.min(maxAvailable, current + delta));
      if (next === 0) {
        const copy = { ...prev };
        delete copy[tierId];
        return copy;
      }
      return { ...prev, [tierId]: next };
    });
  };

  // Add-ons calculations
  const allAddons = event.addons || MOCK_EVENT_ADDONS;
  const selectedAddonsList = Object.entries(selectedAddons)
    .filter(([_, qty]) => qty > 0)
    .map(([id, qty]) => {
      const addon = allAddons.find((a) => a.id === id);
      return {
        addon,
        qty,
        total: (addon?.price || 0) * qty,
      };
    })
    .filter((item): item is { addon: EventAddon; qty: number; total: number } => item.addon !== undefined);

  const totalAddonsPrice = selectedAddonsList.reduce((acc, item) => acc + item.total, 0);
  const totalAddonsCount = selectedAddonsList.reduce((acc, item) => acc + item.qty, 0);

  // Calculations
  const selectedTiersList = tiers
    .filter((t) => (selectedQuantities[t.id] || 0) > 0)
    .map((t) => ({
      tier: t,
      qty: selectedQuantities[t.id] || 0,
      total: t.price * (selectedQuantities[t.id] || 0),
    }));

  const totalTickets = selectedTiersList.reduce((acc, item) => acc + item.qty, 0);
  const rawTicketSubtotal = selectedTiersList.reduce((acc, item) => acc + item.total, 0);
  const rawSubtotal = rawTicketSubtotal + totalAddonsPrice;
  const finalTotal = Math.max(0, rawSubtotal - (totalTickets > 0 || totalAddonsCount > 0 ? appliedDiscount : 0));

  const handleApplyPromo = () => {
    setPromoError("");
    setPromoSuccess("");
    const cleaned = promoCode.trim().toUpperCase();
    if (!cleaned) return;

    const found = MOCK_USER_VOUCHERS.find((v) => v.code === cleaned);
    if (found) {
      if (rawSubtotal < found.minOrderValue) {
        const diff = found.minOrderValue - rawSubtotal;
        setPromoError(
          isEn
            ? `Order must be at least ${found.minOrderValue.toLocaleString("en-US")}đ (need +${diff.toLocaleString(
                "en-US"
              )}đ)`
            : `Đơn tối thiểu ${found.minOrderValue.toLocaleString("vi-VN")}đ (cần thêm ${diff.toLocaleString(
                "vi-VN"
              )}đ)`
        );
        return;
      }
      const discount = calculateVoucherDiscount(found, rawSubtotal);
      setAppliedDiscount(discount);
      setAppliedVoucher(found);
      setPromoSuccess(
        isEn
          ? `Applied ${found.code} (-${discount.toLocaleString("en-US")}đ)!`
          : `Áp dụng thành công mã ${found.code} (-${discount.toLocaleString("vi-VN")}đ)!`
      );
    } else {
      setPromoError(isEn ? "Invalid discount code" : "Mã giảm giá không hợp lệ hoặc đã hết hạn");
    }
  };

  const handleSelectVoucherFromWallet = (voucher: VoucherItem, discountAmount: number) => {
    setPromoCode(voucher.code);
    setAppliedDiscount(discountAmount);
    setAppliedVoucher(voucher);
    setPromoError("");
    setPromoSuccess(
      isEn
        ? `Applied voucher ${voucher.code} (-${discountAmount.toLocaleString("en-US")}đ)!`
        : `Đã áp dụng mã ưu đãi ${voucher.code} (-${discountAmount.toLocaleString("vi-VN")}đ)!`
    );
  };

  const handleRemoveVoucher = () => {
    setPromoCode("");
    setAppliedDiscount(0);
    setAppliedVoucher(null);
    setPromoSuccess("");
    setPromoError("");
  };

  const getPhaseBadgeStyle = (phase: string) => {
    switch (phase) {
      case "Super Early Bird":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";
      case "Early Bird":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30";
      case "Regular":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30";
      case "Late":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Lock document body scroll when mobile drawer or modal is open
  useEffect(() => {
    if (isMobileDrawerOpen || isModalOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isMobileDrawerOpen, isModalOpen]);

  return (
    <>
      {/* 1. Desktop Registration Sidebar */}
      <div
        className={`hidden lg:block sticky ${
          isHeaderVisible ? "top-20" : "top-3"
        } transition-[top] duration-300 ease-in-out bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 space-y-4 shadow-2xs`}
      >
        {/* Sidebar Header */}
        <div className="border-b border-border/50 pb-3 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-primary" />
              <span>{isEn ? "Select Category & Tickets" : "Chọn cự ly & Đăng ký"}</span>
            </h3>
            <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
              {isEn ? "Direct Ticket" : "Vé chính hãng"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-normal">
            {isEn ? "Choose your distance and quantity below" : "Bấm chọn số lượng vé cho từng cự ly bên dưới"}
          </p>
        </div>

        {/* List of Distance Tiers with Embedded Quantity Selectors */}
        <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
          {tiers.map((tier) => {
            const qty = selectedQuantities[tier.id] || 0;
            const isSoldOut = tier.status === "sold_out";

            return (
              <div
                key={tier.id}
                className={`p-3.5 rounded-xl sm:rounded-2xl border transition-all space-y-2.5 bg-muted/20 ${
                  qty > 0
                    ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                    : "border-border/70 hover:border-border"
                }`}
              >
                {/* Header: Name + Phase Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getPhaseBadgeStyle(
                          tier.phase
                        )}`}
                      >
                        {tier.phase}
                      </span>
                      <span className="text-xs font-medium text-muted-foreground">
                        • {tier.distance}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-foreground leading-snug mt-1 line-clamp-1">
                      {tier.name}
                    </h4>
                  </div>
                </div>

                {/* Deadline & Price & Selector Row */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/50">
                  <div>
                    <div className="text-sm font-bold text-primary">
                      {tier.price.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 font-normal">
                      <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                      <span>
                        {isEn ? "Deadline: " : "Hạn: "}
                        <strong className="font-semibold text-foreground/90">{tier.regDeadline}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controller */}
                  {isSoldOut ? (
                    <span className="text-[11px] font-semibold text-rose-500 bg-rose-500/10 px-2.5 py-0.5 rounded-md">
                      {isEn ? "Sold Out" : "Hết vé"}
                    </span>
                  ) : (
                    <div className="flex items-center gap-1.5 bg-background border border-border/80 rounded-xl p-0.5">
                      <button
                        type="button"
                        onClick={() => handleQuantityChange(tier.id, -1)}
                        disabled={qty === 0}
                        className="size-7 rounded-lg flex items-center justify-center text-foreground hover:bg-muted active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-all"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <span className="w-6 text-center font-bold text-xs text-foreground">
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleQuantityChange(tier.id, 1, tier.availableSlots || 10)}
                        disabled={qty >= (tier.availableSlots || 10)}
                        className="size-7 rounded-lg bg-gradient-primary text-white flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs"
                        aria-label="Increase quantity"
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

        {/* Promo Code Input & Voucher Wallet Trigger */}
        <div className="space-y-2 pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-primary" />
              <span>{isEn ? "Voucher / Promo Code" : "Mã ưu đãi & Voucher"}</span>
            </span>
            <button
              type="button"
              onClick={() => setIsVoucherWalletOpen(true)}
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer transition-all active:scale-95"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>{isEn ? `Wallet (${MOCK_USER_VOUCHERS.length})` : `Ví voucher (${MOCK_USER_VOUCHERS.length})`}</span>
            </button>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder={isEn ? "Enter code..." : "Nhập mã..."}
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="pl-8 h-9 rounded-xl text-xs uppercase placeholder:normal-case font-semibold"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleApplyPromo}
              className="h-9 px-3.5 text-xs font-semibold rounded-xl"
            >
              {isEn ? "Apply" : "Áp dụng"}
            </Button>
          </div>

          {/* Applied Voucher Pill */}
          {appliedDiscount > 0 && totalTickets > 0 && (
            <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs">
              <span className="font-semibold flex items-center gap-1.5 truncate">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{appliedVoucher ? appliedVoucher.title : promoCode}: -{appliedDiscount.toLocaleString(isEn ? "en-US" : "vi-VN")}đ</span>
              </span>
              <button
                type="button"
                onClick={handleRemoveVoucher}
                className="size-4 rounded-full hover:bg-emerald-500/20 flex items-center justify-center cursor-pointer shrink-0 ml-1"
                aria-label="Remove voucher"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {promoError && (
            <p className="text-xs text-rose-500 flex items-center gap-1 font-normal">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {promoError}
            </p>
          )}
        </div>

        {/* Price Calculation Box */}
        <div className="space-y-1.5 pt-2 border-t border-border/50 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>{isEn ? "Selected tickets" : "Số lượng vé"}:</span>
            <span className="font-semibold text-foreground">
              {totalTickets} {isEn ? "tickets" : "vé"} ({rawTicketSubtotal.toLocaleString(isEn ? "en-US" : "vi-VN")}đ)
            </span>
          </div>

          {totalAddonsCount > 0 && (
            <div className="flex justify-between text-primary font-medium">
              <span>{isEn ? `Add-on services (${totalAddonsCount})` : `Dịch vụ bổ sung (${totalAddonsCount})`}:</span>
              <span>+{totalAddonsPrice.toLocaleString(isEn ? "en-US" : "vi-VN")}đ</span>
            </div>
          )}

          <div className="flex justify-between text-muted-foreground">
            <span>{isEn ? "Subtotal" : "Tạm tính"}:</span>
            <span>{rawSubtotal.toLocaleString(isEn ? "en-US" : "vi-VN")}đ</span>
          </div>

          {appliedDiscount > 0 && (totalTickets > 0 || totalAddonsCount > 0) && (
            <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
              <span>{isEn ? "Discount" : "Giảm giá"}:</span>
              <span>-{appliedDiscount.toLocaleString(isEn ? "en-US" : "vi-VN")}đ</span>
            </div>
          )}

          <div className="flex justify-between items-baseline pt-2 border-t border-border/60">
            <span className="font-bold text-foreground text-xs sm:text-sm">
              {isEn ? "Total" : "Tổng thanh toán"}:
            </span>
            <span className="text-xl sm:text-2xl font-bold text-foreground">
              {finalTotal.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
            </span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          type="button"
          disabled={totalTickets === 0}
          onClick={handleProceedToEventPayment}
          className="w-full h-11 rounded-2xl bg-gradient-primary text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95 active:scale-98 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border-0"
        >
          {totalTickets === 0
            ? isEn
              ? "Select distance above"
              : "Chọn số lượng vé ở trên"
            : isEn
            ? `Register Now (${totalTickets} tickets)`
            : `Đăng ký ngay (${totalTickets} vé)`}
        </Button>

        {/* Trust Badges */}
        <div className="space-y-1.5 pt-1 text-xs text-muted-foreground font-normal">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{isEn ? "100% Guaranteed Athlete Slot" : "Đảm bảo 100% giữ slot thi đấu"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{isEn ? "QR Code E-Ticket via email & SMS" : "Nhận vé điện tử QR Code tức thì"}</span>
          </div>
        </div>
      </div>

      {/* 2. Mobile Sticky Floating Bottom Bar (Visible on Mobile lg:hidden, positioned above bottom nav bottom-16) */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/80 px-4 py-2.5 shadow-2xl lg:hidden flex items-center justify-between animate-in slide-in-from-bottom duration-300 gap-3">
        <div
          className="flex flex-col min-w-0 pr-2 cursor-pointer"
          onClick={() => setIsMobileDrawerOpen(true)}
        >
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-normal">
            <Ticket className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="font-semibold text-foreground truncate">
              {totalTickets > 0
                ? isEn
                  ? `Selected (${totalTickets})`
                  : `Đã chọn (${totalTickets} vé)`
                : isEn
                ? "Starting from"
                : "Giá vé từ"}
            </span>
          </div>
          <div className="text-sm sm:text-base font-bold text-foreground tracking-tight leading-none mt-0.5">
            {totalTickets > 0
              ? `${finalTotal.toLocaleString(isEn ? "en-US" : "vi-VN")}đ`
              : event.price}
          </div>
        </div>

        <Button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className="h-9 px-4 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-sm border-0 outline-none shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
        >
          <span>
            {totalTickets > 0
              ? isEn
                ? `Book (${totalTickets})`
                : `Đăng ký (${totalTickets})`
              : isEn
              ? "Select Tier"
              : "Chọn cự ly"}
          </span>
          <Sparkles className="w-3.5 h-3.5" />
        </Button>
      </div>

      {/* 3. Mobile Slide-up Full Screen View (Portal to document.body with z-[999]) */}
      {mounted &&
        isMobileDrawerOpen &&
        createPortal(
          <div className="fixed inset-0 z-[999] bg-background flex flex-col lg:hidden animate-in slide-in-from-bottom duration-300">
            {/* Full Screen Header */}
            <div className="shrink-0 px-4 py-3 border-b border-border/80 bg-card flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Ticket className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base text-foreground leading-tight truncate">
                    {isEn ? "Select Category & Tickets" : "Chọn cự ly & Hạng vé"}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate font-normal">
                    {event.title}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="size-8 rounded-full bg-muted/70 hover:bg-muted flex items-center justify-center text-foreground cursor-pointer shrink-0 transition-transform active:scale-90"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Categories Body */}
            <div className="overflow-y-auto overscroll-contain flex-1 min-h-0 p-4 space-y-3">
              {tiers.map((tier) => {
                const qty = selectedQuantities[tier.id] || 0;
                const isSoldOut = tier.status === "sold_out";

                return (
                  <div
                    key={tier.id}
                    className={`p-3.5 rounded-xl sm:rounded-2xl border transition-all space-y-2.5 bg-card/60 ${
                      qty > 0
                        ? "border-primary bg-primary/5 ring-1 ring-primary/40"
                        : "border-border/80 shadow-2xs"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getPhaseBadgeStyle(
                              tier.phase
                            )}`}
                          >
                            {tier.phase}
                          </span>
                          <span className="text-xs font-medium text-muted-foreground">
                            • {tier.distance}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs sm:text-sm text-foreground leading-snug mt-1">
                          {tier.name}
                        </h4>
                        {tier.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed font-normal">
                            {tier.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-border/50">
                      <div>
                        <div className="text-sm font-bold text-primary">
                          {tier.price.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5 font-normal">
                          <Clock className="w-3 h-3 text-amber-500" />
                          <span>{isEn ? "Deadline: " : "Hạn: "}{tier.regDeadline}</span>
                        </div>
                      </div>

                      {isSoldOut ? (
                        <span className="text-[11px] font-semibold text-rose-500 bg-rose-500/10 px-2.5 py-0.5 rounded-md">
                          {isEn ? "Sold Out" : "Hết vé"}
                        </span>
                      ) : (
                        <div className="flex items-center gap-2 bg-muted/40 border border-border/80 rounded-xl p-0.5">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(tier.id, -1)}
                            disabled={qty === 0}
                            className="size-7.5 rounded-lg bg-background flex items-center justify-center text-foreground hover:bg-muted active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs border border-border/50"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          <span className="w-7 text-center font-bold text-xs sm:text-sm text-foreground">
                            {qty}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleQuantityChange(tier.id, 1, tier.availableSlots || 10)}
                            disabled={qty >= (tier.availableSlots || 10)}
                            className="size-7.5 rounded-lg bg-gradient-primary text-white flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Fixed Bottom Payment Bar */}
            <div className="shrink-0 p-4 pb-safe pb-6 border-t border-border/80 bg-card space-y-3 shadow-lg">
              {/* Promo Code Input & Voucher Wallet Trigger */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-primary" />
                    <span>{isEn ? "Voucher / Promo Code" : "Mã ưu đãi & Voucher"}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsVoucherWalletOpen(true)}
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>{isEn ? `Wallet (${MOCK_USER_VOUCHERS.length})` : `Ví voucher (${MOCK_USER_VOUCHERS.length})`}</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input
                      placeholder={isEn ? "Enter code..." : "Nhập mã..."}
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="pl-8 h-9 rounded-xl text-xs uppercase placeholder:normal-case font-semibold"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleApplyPromo}
                    className="h-9 px-4 text-xs font-semibold rounded-xl"
                  >
                    {isEn ? "Apply" : "Áp dụng"}
                  </Button>
                </div>

                {/* Applied Voucher Pill in Mobile */}
                {appliedDiscount > 0 && totalTickets > 0 && (
                  <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs">
                    <span className="font-semibold flex items-center gap-1.5 truncate">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{appliedVoucher ? appliedVoucher.title : promoCode}: -{appliedDiscount.toLocaleString(isEn ? "en-US" : "vi-VN")}đ</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveVoucher}
                      className="size-4 rounded-full hover:bg-emerald-500/20 flex items-center justify-center cursor-pointer shrink-0 ml-1"
                      aria-label="Remove voucher"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {promoError && (
                  <p className="text-xs text-rose-500 flex items-center gap-1 font-normal">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {promoError}
                  </p>
                )}
              </div>

              {/* Calculation Summary Row */}
              <div className="flex items-center justify-between text-xs pt-2 border-t border-border/50">
                <div className="text-muted-foreground">
                  <span>{isEn ? "Total (" : "Tổng ("}{totalTickets} {isEn ? "tickets):" : "vé):"} </span>
                  {appliedDiscount > 0 && totalTickets > 0 && (
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold ml-1">
                      (-{appliedDiscount.toLocaleString(isEn ? "en-US" : "vi-VN")}đ)
                    </span>
                  )}
                </div>
                <span className="text-xl sm:text-2xl font-bold text-foreground">
                  {finalTotal.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
                </span>
              </div>

              {/* Action CTA Button */}
              <Button
                type="button"
                disabled={totalTickets === 0}
                onClick={() => {
                  setIsMobileDrawerOpen(false);
                  handleProceedToEventPayment();
                }}
                className="w-full h-11 rounded-2xl bg-gradient-primary text-white font-bold text-xs sm:text-sm shadow-md active:scale-98 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border-0"
              >
                {totalTickets === 0
                  ? isEn
                    ? "Please select distance above"
                    : "Vui lòng chọn số lượng vé ở trên"
                  : isEn
                  ? `Proceed to Register (${totalTickets} tickets) • ${finalTotal.toLocaleString(
                      "en-US"
                    )}đ`
                  : `Tiến hành đăng ký (${totalTickets} vé) • ${finalTotal.toLocaleString(
                      "vi-VN"
                    )}đ`}
              </Button>
            </div>
          </div>,
          document.body
        )}

      {/* Athlete Registration Form Modal (Portal to document.body with z-[1000]) */}
      {mounted &&
        isModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto overscroll-contain">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-foreground">
                    {isEn ? "Athlete Registration Form" : "Thông tin Vận Động Viên"}
                  </h3>
                  <p className="text-xs text-muted-foreground font-normal">
                    {event.title} • {totalTickets} {isEn ? "tickets" : "vé"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="size-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="size-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-lg text-foreground">
                    {isEn ? "Registration Successful!" : "Đăng Ký Thành Công!"}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto font-normal">
                    {isEn
                      ? "Your athlete slot has been reserved. Please check your email for QR code and race schedule."
                      : "Slot thi đấu của bạn đã được ghi nhận. Hệ thống đã gửi mã vé QR Code và lịch thi đấu chi tiết về email của bạn."}
                  </p>
                  <Button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setIsSubmitted(false);
                      setSelectedQuantities({});
                    }}
                    className="rounded-xl bg-gradient-primary text-white font-semibold text-xs px-6"
                  >
                    {isEn ? "Done" : "Hoàn tất"}
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsModalOpen(false);
                    handleProceedToEventPayment();
                  }}
                  toolname="confirm_event_booking"
                  tooldescription="Review and confirm event tickets, race add-ons, and athlete information before proceeding to payment."
                  className="space-y-3 text-xs sm:text-sm"
                >
                  {/* Selected Tickets & Add-ons Summary in Modal */}
                  <div className="p-3.5 rounded-xl sm:rounded-2xl bg-muted/30 border border-border/60 space-y-2">
                    <div className="font-bold text-foreground text-xs sm:text-sm flex items-center justify-between">
                      <span>{isEn ? "Order Summary:" : "Chi tiết đơn đăng ký:"}</span>
                      <span className="font-bold text-primary text-sm">
                        {finalTotal.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
                      </span>
                    </div>

                    {selectedTiersList.map(({ tier, qty, total }) => (
                      <div key={tier.id} className="flex justify-between text-xs text-muted-foreground font-normal">
                        <span>{qty}x {tier.name}</span>
                        <span className="font-semibold text-foreground">{total.toLocaleString(isEn ? "en-US" : "vi-VN")}đ</span>
                      </div>
                    ))}

                    {selectedAddonsList.map(({ addon, qty, total }) => (
                      <div key={addon.id} className="flex justify-between text-xs text-primary font-medium">
                        <span>+{qty}x {addon.name}</span>
                        <span className="font-semibold">+{total.toLocaleString(isEn ? "en-US" : "vi-VN")}đ</span>
                      </div>
                    ))}

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-xs text-emerald-600 dark:text-emerald-400 border-t border-border/40 pt-1.5 font-medium">
                        <span>{isEn ? "Voucher Discount" : "Giảm giá voucher"}:</span>
                        <span>-{appliedDiscount.toLocaleString(isEn ? "en-US" : "vi-VN")}đ</span>
                      </div>
                    )}
                  </div>

                  {/* Full name */}
                  <div className="space-y-1">
                    <label htmlFor="sidebar-athlete-fullName" className="font-semibold text-foreground text-xs">
                      {isEn ? "Full Name (as in ID/Passport)" : "Họ và tên VĐV (theo CCCD/Hộ chiếu)"} *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <Input
                        id="sidebar-athlete-fullName"
                        name="fullName"
                        required
                        placeholder="NGUYEN VAN A"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        toolparamdescription="Full legal name of the athlete"
                        className="pl-9 h-10 rounded-xl uppercase text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="sidebar-athlete-email" className="font-semibold text-foreground text-xs">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <Input
                          id="sidebar-athlete-email"
                          name="email"
                          required
                          type="email"
                          placeholder="athlete@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          toolparamdescription="Athlete email address for notifications"
                          className="pl-9 h-10 rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="sidebar-athlete-phone" className="font-semibold text-foreground text-xs">
                        {isEn ? "Phone Number" : "Số điện thoại"} *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <Input
                          id="sidebar-athlete-phone"
                          name="phone"
                          required
                          type="tel"
                          placeholder="0912 345 678"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          toolparamdescription="Contact phone number"
                          className="pl-9 h-10 rounded-xl text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* DOB & ID Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="sidebar-athlete-dob" className="font-semibold text-foreground text-xs">
                        {isEn ? "Date of Birth" : "Ngày sinh"} *
                      </label>
                      <Input
                        id="sidebar-athlete-dob"
                        name="dob"
                        required
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        toolparamdescription="Date of birth in YYYY-MM-DD"
                        className="h-10 rounded-xl text-xs sm:text-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="sidebar-athlete-idNumber" className="font-semibold text-foreground text-xs">
                        {isEn ? "ID / Passport No." : "Số CCCD / Hộ chiếu"} *
                      </label>
                      <Input
                        id="sidebar-athlete-idNumber"
                        name="idNumber"
                        required
                        placeholder="001234567890"
                        value={formData.idNumber}
                        onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                        toolparamdescription="National Citizen ID or Passport number"
                        className="h-10 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Gender & Shirt Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="sidebar-athlete-gender" className="font-semibold text-foreground text-xs">
                        {isEn ? "Gender" : "Giới tính"} *
                      </label>
                      <select
                        id="sidebar-athlete-gender"
                        name="gender"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        toolparamdescription="Athlete gender ('male' or 'female')"
                        className="w-full h-10 px-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm cursor-pointer"
                      >
                        <option value="male">{isEn ? "Male" : "Nam"}</option>
                        <option value="female">{isEn ? "Female" : "Nữ"}</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="sidebar-athlete-shirtSize" className="font-semibold text-foreground flex items-center gap-1 text-xs">
                        <Shirt className="w-3.5 h-3.5 text-primary" />
                        <span>{isEn ? "Finisher Shirt Size" : "Size áo Finisher"} *</span>
                      </label>
                      <select
                        id="sidebar-athlete-shirtSize"
                        name="shirtSize"
                        value={formData.shirtSize}
                        onChange={(e) => setFormData({ ...formData, shirtSize: e.target.value })}
                        toolparamdescription="Running shirt size (XS, S, M, L, XL, 2XL)"
                        className="w-full h-10 px-3 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm font-semibold cursor-pointer"
                      >
                        <option value="XS">XS (Dưới 50kg)</option>
                        <option value="S">S (50 - 58kg)</option>
                        <option value="M">M (59 - 68kg)</option>
                        <option value="L">L (69 - 76kg)</option>
                        <option value="XL">XL (77 - 85kg)</option>
                        <option value="2XL">2XL (Trên 85kg)</option>
                      </select>
                    </div>
                  </div>

                  {/* Club */}
                  <div className="space-y-1">
                    <label htmlFor="sidebar-athlete-clubName" className="font-semibold text-foreground text-xs">
                      {isEn ? "Club / Team (Optional)" : "Câu lạc bộ / Đội thi đấu (Không bắt buộc)"}
                    </label>
                    <Input
                      id="sidebar-athlete-clubName"
                      name="clubName"
                      placeholder="PlayGrid Athletes Team"
                      value={formData.clubName}
                      onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                      toolparamdescription="Club or team name"
                      className="h-10 rounded-xl text-xs sm:text-sm"
                    />
                  </div>

                  {/* Modal Footer */}
                  <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-xs text-muted-foreground block font-normal">
                        {isEn ? "Total Payment" : "Tổng thanh toán"}
                      </span>
                      <span className="text-base font-bold text-primary">
                        {finalTotal.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setIsModalOpen(false)}
                        className="rounded-xl h-10 px-4 text-xs font-semibold"
                      >
                        {isEn ? "Cancel" : "Hủy"}
                      </Button>
                      <Button
                        type="submit"
                        size="sm"
                        className="rounded-xl bg-gradient-primary text-white font-bold h-10 px-5 border-0 text-xs sm:text-sm"
                      >
                        {isEn ? "Confirm & Pay" : "Xác nhận & Thanh toán"}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>,
          document.body
        )}

      {/* 5. PlayGrid Voucher Wallet Modal */}
      <VoucherWalletModal
        isOpen={isVoucherWalletOpen}
        onClose={() => setIsVoucherWalletOpen(false)}
        currentSubtotal={rawSubtotal}
        category="event"
        selectedVoucherCode={appliedVoucher ? appliedVoucher.code : promoCode}
        onSelectVoucher={handleSelectVoucherFromWallet}
      />
    </>
  );
}
