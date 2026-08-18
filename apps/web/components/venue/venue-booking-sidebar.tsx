"use client";

import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Clock,
  Trash2,
  Tag,
  ShieldCheck,
  Headphones,
  CheckCircle,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { VenueDetailData } from "@/lib/venue-data";
import { SelectedBookingSlot } from "./venue-booking-section";
import { useHeaderVisible } from "@/hooks/use-scroll-direction";

export interface SelectedAddonItem {
  addonId: string;
  quantity: number;
}

interface VenueBookingSidebarProps {
  venue: VenueDetailData;
  selectedSlots: SelectedBookingSlot[];
  onRemoveSlot: (slot: SelectedBookingSlot) => void;
  selectedDate: string;
  bookingType: "single" | "recurring" | "matchmaking";
  selectedAddons: SelectedAddonItem[];
  onChangeAddonQuantity: (addonId: string, delta: number) => void;
  onProceedCheckout: () => void;
}

export function VenueBookingSidebar({
  venue,
  selectedSlots,
  onRemoveSlot,
  selectedDate,
  bookingType,
  selectedAddons,
  onChangeAddonQuantity,
  onProceedCheckout,
}: VenueBookingSidebarProps) {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);
  const [couponError, setCouponError] = useState("");

  const isHeaderVisible = useHeaderVisible();
  const tSidebar = useTranslations("venue.sidebar");
  const tBooking = useTranslations("venue.booking");
  const locale = useLocale();
  const isEn = locale === "en";

  // Calculate court subtotal
  const courtSubtotal = selectedSlots.reduce((sum, slot) => sum + slot.price, 0);

  // Recurring discount (-10% on court rental)
  const recurringDiscount = bookingType === "recurring" ? Math.round(courtSubtotal * 0.1) : 0;

  // Coupon discount
  const couponDiscount = appliedCoupon
    ? Math.round((courtSubtotal - recurringDiscount) * (appliedCoupon.discountPercent / 100))
    : 0;

  const totalDiscount = recurringDiscount + couponDiscount;
  const grandTotal = Math.max(0, courtSubtotal - totalDiscount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");

    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "PLAYGRID" || code === "PLAYGRID20" || code === "WELCOME") {
      setAppliedCoupon({ code, discountPercent: 20 });
      setCouponCode("");
    } else if (code === "BADMINTON10" || code === "SUMMER10") {
      setAppliedCoupon({ code, discountPercent: 10 });
      setCouponCode("");
    } else {
      setCouponError(tSidebar("coupon_error"));
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
  };

  return (
    <div
      className={`sticky transition-[top] duration-300 ease-in-out space-y-3 ${
        isHeaderVisible ? "top-20" : "top-3"
      }`}
    >
      {/* Booking Summary Card */}
      <Card className="rounded-2xl border border-border/80 bg-card p-3.5 sm:p-4 space-y-2.5 shadow-2xs">
        {/* Header with Venue Info */}
        <div className="border-b border-border/60 pb-2.5">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs font-semibold text-foreground truncate">
              {tSidebar("title")}
            </span>
            <Badge variant="outline" className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md shrink-0 border-border/80">
              {bookingType === "recurring"
                ? tBooking("modes.recurring")
                : bookingType === "matchmaking"
                ? tBooking("modes.matchmaking")
                : tBooking("modes.single")}
            </Badge>
          </div>
          <h2 className="font-bold text-sm sm:text-base text-foreground mt-1 truncate">
            {venue.name}
          </h2>
          <p className="text-[11px] text-muted-foreground font-normal truncate">{venue.address}</p>
        </div>

        {/* Selected Slots List */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5 text-primary" />
              {tSidebar("selected_slots")} ({selectedSlots.length})
            </span>
            <span className="text-[10px] text-muted-foreground font-normal">{tSidebar("date_label")}: {selectedDate}</span>
          </div>

          {selectedSlots.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/80 bg-muted/20 p-3 text-center space-y-0.5">
              <p className="text-xs font-medium text-foreground">{tSidebar("empty_title")}</p>
              <p className="text-[10px] text-muted-foreground font-normal leading-snug">
                {tSidebar("empty_desc")}
              </p>
            </div>
          ) : (
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {selectedSlots.map((slot) => (
                <div
                  key={slot.courtId + slot.slotId + slot.date}
                  className="flex items-center justify-between p-2 rounded-xl bg-muted/40 border border-border/60 text-xs"
                >
                  <div className="space-y-0.5 min-w-0 flex-1 pr-1">
                    <div className="font-semibold text-[11px] text-foreground truncate">{slot.courtName}</div>
                    <div className="text-[10px] text-muted-foreground font-normal flex items-center gap-1">
                      <span>{slot.time}</span>
                      {slot.isPeak && (
                        <span className="text-rose-500 font-semibold">• {tSidebar("peak_slot")}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="font-bold text-[11px] text-foreground">
                      {slot.price.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveSlot(slot)}
                      className="p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                      aria-label={tSidebar("remove")}
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Promo Code Input */}
        <div className="space-y-1.5 pt-2 border-t border-border/60">
          <form
            onSubmit={handleApplyCoupon}
            toolname="apply_venue_coupon"
            tooldescription="Apply a discount voucher or coupon code to reduce the total court booking fee."
            className="flex gap-1.5"
          >
            <div className="relative flex-1">
              <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-muted-foreground" />
              <Input
                id="venue-coupon-code"
                name="couponCode"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder={tSidebar("coupon_placeholder")}
                toolparamdescription="Discount voucher code string (e.g. PLAYGRID2026)"
                className="h-8 pl-8 text-[11px] uppercase placeholder:normal-case rounded-xl border-border/80 font-semibold"
              />
            </div>
            <Button
              type="submit"
              size="sm"
              variant="outline"
              className="h-8 px-2.5 text-[11px] font-semibold rounded-xl shrink-0 hover:bg-muted"
            >
              {tSidebar("apply")}
            </Button>
          </form>

          {couponError && <p className="text-[10px] text-rose-500 font-medium">{couponError}</p>}

          {appliedCoupon && (
            <div className="flex items-center justify-between p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-700 dark:text-emerald-300">
              <span className="font-semibold flex items-center gap-1 truncate">
                <CheckCircle className="size-3 text-emerald-500 shrink-0" />
                {tSidebar("coupon_discount_label", { code: appliedCoupon.code })} (-{appliedCoupon.discountPercent}%)
              </span>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-[10px] text-muted-foreground hover:text-destructive underline cursor-pointer shrink-0 ml-1"
              >
                {tSidebar("remove_coupon")}
              </button>
            </div>
          )}
        </div>

        {/* Price Breakdown Calculation */}
        <div className="space-y-1.5 pt-2 border-t border-border/60 text-xs">
          <div className="flex items-center justify-between text-muted-foreground text-[11px]">
            <span>{tSidebar("court_rental_fee", { count: selectedSlots.length })}</span>
            <span className="font-medium text-foreground">
              {courtSubtotal.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
            </span>
          </div>

          {bookingType === "recurring" && recurringDiscount > 0 && (
            <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 text-[11px]">
              <span>{tSidebar("recurring_discount_label")}</span>
              <span className="font-bold">-{recurringDiscount.toLocaleString(isEn ? "en-US" : "vi-VN")}đ</span>
            </div>
          )}

          {couponDiscount > 0 && (
            <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 text-[11px]">
              <span>{tSidebar("coupon_discount_label", { code: appliedCoupon?.code || "" })}</span>
              <span className="font-bold">-{couponDiscount.toLocaleString(isEn ? "en-US" : "vi-VN")}đ</span>
            </div>
          )}

          {/* Grand Total */}
          <div className="flex items-baseline justify-between pt-1.5 border-t border-border/80">
            <div>
              <span className="text-xs font-bold text-foreground block">{tSidebar("grand_total")}</span>
              <span className="text-[9px] text-muted-foreground font-normal">{tSidebar("vat_included")}</span>
            </div>
            <div className="text-right">
              <span className="text-lg sm:text-xl font-bold text-primary">
                {grandTotal.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
              </span>
            </div>
          </div>
        </div>

        {/* Proceed to Booking CTA Button */}
        <Button
          type="button"
          disabled={selectedSlots.length === 0}
          onClick={onProceedCheckout}
          className="w-full h-10 rounded-xl bg-gradient-primary text-white font-bold text-xs sm:text-sm shadow-2xs hover:opacity-95 active:scale-98 transition-all disabled:opacity-50 border-0 outline-none focus:outline-none ring-0 cursor-pointer flex items-center justify-center gap-1.5"
        >
          <span>{tSidebar("book_now")}</span>
          {selectedSlots.length > 0 && <span>({selectedSlots.length} slot)</span>}
          <ArrowRight className="size-3.5" />
        </Button>

        {/* Guarantees & Trust Badges */}
        <div className="pt-2 border-t border-border/40 space-y-1 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="size-3 text-emerald-500 shrink-0" />
            <span className="truncate">{tSidebar("guarantee_slot")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HelpCircle className="size-3 text-primary shrink-0" />
            <span className="truncate">{tSidebar("free_cancellation")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Headphones className="size-3 text-amber-500 shrink-0" />
            <span className="truncate">{tSidebar("support_hotline")}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
