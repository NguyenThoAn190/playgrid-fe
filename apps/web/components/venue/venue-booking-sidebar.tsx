"use client";

import React, { useState } from "react";
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
      setCouponError("Mã giảm giá không hợp lệ hoặc đã hết lượt dùng");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
  };

  return (
    <div className="sticky top-24 space-y-3">
      {/* Booking Summary Card */}
      <Card className="rounded-3xl border border-border/80 bg-card p-4 sm:p-5 space-y-3 shadow-lg shadow-black/5">
        {/* Header with Venue Info */}
        <div className="border-b border-border/60 pb-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">
              Tóm tắt đơn đặt sân
            </span>
            <Badge variant="outline" className="text-[10px] font-bold px-2 py-0.5 rounded-full">
              {bookingType === "recurring" ? "Đặt cố định" : bookingType === "matchmaking" ? "Ghép kèo" : "Đặt lẻ"}
            </Badge>
          </div>
          <h3 className="font-bold text-base sm:text-lg text-foreground mt-1 truncate">
            {venue.name}
          </h3>
          <p className="text-xs text-muted-foreground truncate">{venue.address}</p>
        </div>

        {/* Selected Slots List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-foreground">
            <span className="flex items-center gap-1">
              <Clock className="size-3.5 text-brand-blue" />
              Khung giờ đã chọn ({selectedSlots.length})
            </span>
            <span className="text-[11px]">Ngày: {selectedDate}</span>
          </div>

          {selectedSlots.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 p-4 text-center space-y-1">
              <p className="text-xs font-medium text-foreground">Chưa có khung giờ nào được chọn</p>
              <p className="text-[11px] text-muted-foreground">
                Vui lòng bấm chọn khung giờ trên bảng ma trận bên trái để tiếp tục.
              </p>
            </div>
          ) : (
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {selectedSlots.map((slot) => (
                <div
                  key={slot.courtId + slot.slotId + slot.date}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 border border-border/60 text-xs"
                >
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <div className="font-bold text-foreground truncate">{slot.courtName}</div>
                    <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <span>{slot.time}</span>
                      {slot.isPeak && (
                        <span className="text-rose-500 font-semibold">• Giờ vàng</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-extrabold text-foreground">
                      {slot.price.toLocaleString("vi-VN")}đ
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemoveSlot(slot)}
                      className="p-1 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                      aria-label="Xóa slot"
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
        <div className="space-y-2 pt-2 border-t border-border/60">
          <form onSubmit={handleApplyCoupon} className="flex gap-1.5">
            <div className="relative flex-1">
              <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Mã giảm giá (PLAYGRID20)"
                className="h-8 pl-8 text-xs uppercase rounded-xl border-border/80 font-semibold"
              />
            </div>
            <Button
              type="submit"
              size="sm"
              variant="outline"
              className="h-8 px-3 text-xs font-bold rounded-xl"
            >
              Áp dụng
            </Button>
          </form>

          {couponError && <p className="text-[11px] text-rose-500 font-medium">{couponError}</p>}

          {appliedCoupon && (
            <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300">
              <span className="font-bold flex items-center gap-1">
                <CheckCircle className="size-3.5 text-emerald-500" />
                Mã {appliedCoupon.code} (-{appliedCoupon.discountPercent}%)
              </span>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-[11px] text-muted-foreground hover:text-destructive underline cursor-pointer"
              >
                Gỡ bỏ
              </button>
            </div>
          )}
        </div>

        {/* Price Breakdown Calculation */}
        <div className="space-y-2 pt-2 border-t border-border/60 text-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Tiền thuê sân ({selectedSlots.length} slot)</span>
            <span className="font-medium text-foreground">
              {courtSubtotal.toLocaleString("vi-VN")}đ
            </span>
          </div>

          {bookingType === "recurring" && recurringDiscount > 0 && (
            <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
              <span>Ưu đãi đặt cố định (-10%)</span>
              <span className="font-bold">-{recurringDiscount.toLocaleString("vi-VN")}đ</span>
            </div>
          )}

          {couponDiscount > 0 && (
            <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
              <span>Mã giảm giá ({appliedCoupon?.code})</span>
              <span className="font-bold">-{couponDiscount.toLocaleString("vi-VN")}đ</span>
            </div>
          )}

          {/* Grand Total */}
          <div className="flex items-baseline justify-between pt-2 border-t border-border/80">
            <div>
              <span className="text-sm font-extrabold text-foreground block">Tổng thanh toán:</span>
              <span className="text-[10px] text-muted-foreground">(Đã bao gồm VAT & phí dịch vụ)</span>
            </div>
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                {grandTotal.toLocaleString("vi-VN")}đ
              </span>
            </div>
          </div>
        </div>

        {/* Proceed to Booking CTA Button */}
        <Button
          type="button"
          disabled={selectedSlots.length === 0}
          onClick={onProceedCheckout}
          className="w-full h-12 rounded-2xl bg-gradient-primary text-white font-extrabold text-sm shadow-sm hover:opacity-95 active:scale-98 transition-all disabled:opacity-50 border-0 outline-none focus:outline-none ring-0 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Đặt sân</span>
          {selectedSlots.length > 0 && <span>({selectedSlots.length} slot)</span>}
          <ArrowRight className="size-4" />
        </Button>

        {/* Guarantees & Trust Badges */}
        <div className="pt-2 border-t border-border/40 space-y-1.5 text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-emerald-500 shrink-0" />
            <span>Đảm bảo 100% giữ sân sau khi thanh toán</span>
          </div>
          <div className="flex items-center gap-2">
            <HelpCircle className="size-3.5 text-blue-500 shrink-0" />
            <span>Miễn phí hủy / dời lịch trước 06 tiếng</span>
          </div>
          <div className="flex items-center gap-2">
            <Headphones className="size-3.5 text-amber-500 shrink-0" />
            <span>Hotline hỗ trợ PlayGrid: <strong>1900 6868</strong></span>
          </div>
        </div>
      </Card>
    </div>
  );
}
