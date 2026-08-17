"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "next-intl";
import {
  Ticket,
  X,
  Check,
  AlertCircle,
  Clock,
  Sparkles,
  Gift,
  Tag,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  VoucherItem,
  MOCK_USER_VOUCHERS,
  calculateVoucherDiscount,
} from "@/lib/voucher-data";

interface VoucherWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSubtotal: number;
  category?: "event" | "venue" | "all";
  selectedVoucherCode?: string;
  onSelectVoucher: (voucher: VoucherItem, discountAmount: number) => void;
}

export function VoucherWalletModal({
  isOpen,
  onClose,
  currentSubtotal,
  category = "all",
  selectedVoucherCode,
  onSelectVoucher,
}: VoucherWalletModalProps) {
  const [mounted, setMounted] = useState(false);
  const [customCode, setCustomCode] = useState("");
  const [customError, setCustomError] = useState("");
  const locale = useLocale();
  const isEn = locale === "en";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  // Filter vouchers by category
  const filteredVouchers = MOCK_USER_VOUCHERS.filter((v) => {
    if (category !== "all" && v.applicableCategory !== "all" && v.applicableCategory !== category) {
      return false;
    }
    return true;
  });

  const eligibleVouchers = filteredVouchers.filter((v) => currentSubtotal >= v.minOrderValue);
  const ineligibleVouchers = filteredVouchers.filter((v) => currentSubtotal < v.minOrderValue);

  const handleApplyCustomCode = () => {
    setCustomError("");
    const trimmed = customCode.trim().toUpperCase();
    if (!trimmed) {
      setCustomError(isEn ? "Please enter a voucher code" : "Vui lòng nhập mã ưu đãi");
      return;
    }

    const found = MOCK_USER_VOUCHERS.find((v) => v.code === trimmed);
    if (!found) {
      setCustomError(isEn ? "Invalid or expired voucher code" : "Mã không hợp lệ hoặc đã hết hạn");
      return;
    }

    if (currentSubtotal < found.minOrderValue) {
      const diff = found.minOrderValue - currentSubtotal;
      setCustomError(
        isEn
          ? `Min. order ${found.minOrderValue.toLocaleString("en-US")}đ (need +${diff.toLocaleString(
              "en-US"
            )}đ)`
          : `Đơn tối thiểu ${found.minOrderValue.toLocaleString("vi-VN")}đ (cần thêm ${diff.toLocaleString(
              "vi-VN"
            )}đ)`
      );
      return;
    }

    const discount = calculateVoucherDiscount(found, currentSubtotal);
    onSelectVoucher(found, discount);
    onClose();
  };

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case "HOT DEAL":
      case "MỚI NHẬN":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      case "VIP ONLY":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "SẮP HẾT HẠN":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
      default:
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-card border-t sm:border border-border/80 rounded-t-3xl sm:rounded-3xl max-w-md w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Pull Handle (Mobile) */}
        <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Modal Header */}
        <div className="shrink-0 px-4 py-3 border-b border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-xl bg-gradient-primary text-white flex items-center justify-center shadow-2xs">
              <Gift className="size-3.5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5 leading-none">
                <span>{isEn ? "PlayGrid Voucher Wallet" : "Ví Voucher PlayGrid"}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-brand-blue/10 text-brand-blue dark:text-brand-green">
                  {eligibleVouchers.length} {isEn ? "available" : "khả dụng"}
                </span>
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="size-7 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            <X className="size-3.5" />
          </button>
        </div>

        {/* Promo Code Input Field */}
        <div className="shrink-0 px-4 py-3 border-b border-border/50 bg-muted/15 space-y-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleApplyCustomCode();
            }}
            toolname="apply_voucher_code"
            tooldescription="Apply a promo voucher code in the user wallet to unlock discounts."
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                id="voucher-custom-code"
                name="customCode"
                placeholder={isEn ? "Enter promo code..." : "Nhập mã voucher khác..."}
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                toolparamdescription="Voucher promo code string"
                className="pl-8.5 h-10 rounded-xl text-xs uppercase placeholder:normal-case font-semibold bg-background shadow-2xs"
              />
            </div>
            <Button
              type="submit"
              className="h-10 px-4 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-2xs border-0 cursor-pointer active:scale-95"
            >
              {isEn ? "Apply" : "Áp dụng"}
            </Button>
          </form>
          {customError && (
            <p className="text-[10px] text-rose-500 flex items-center gap-1">
              <AlertCircle className="size-2.5 shrink-0" />
              {customError}
            </p>
          )}
        </div>

        {/* Scrollable Voucher Tickets List */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-3.5 space-y-2.5">
          {/* Eligible Vouchers */}
          {eligibleVouchers.length === 0 && (
            <div className="p-4 rounded-2xl border border-dashed border-border/80 text-center text-muted-foreground text-xs">
              {isEn ? "No vouchers match your current subtotal." : "Chưa có mã ưu đãi nào khả dụng cho đơn này."}
            </div>
          )}

          {eligibleVouchers.map((voucher) => {
            const discount = calculateVoucherDiscount(voucher, currentSubtotal);
            const isSelected = selectedVoucherCode === voucher.code;

            return (
              <div
                key={voucher.id}
                onClick={() => {
                  onSelectVoucher(voucher, discount);
                  onClose();
                }}
                className={`relative rounded-2xl border transition-all flex items-stretch cursor-pointer active:scale-[0.99] ${
                  isSelected
                    ? "border-brand-blue dark:border-brand-green bg-brand-blue/[0.04] dark:bg-brand-green/[0.04] ring-1 ring-brand-blue/30"
                    : "border-border/80 bg-card hover:border-border hover:shadow-xs"
                }`}
              >
                {/* Top Notch with matching inward border */}
                <div
                  className={`absolute -top-2 left-20 sm:left-22 -translate-x-1/2 size-4 rounded-full bg-card z-10 border-b transition-colors ${
                    isSelected
                      ? "border-brand-blue dark:border-brand-green"
                      : "border-border/80"
                  }`}
                />
                {/* Bottom Notch with matching inward border */}
                <div
                  className={`absolute -bottom-2 left-20 sm:left-22 -translate-x-1/2 size-4 rounded-full bg-card z-10 border-t transition-colors ${
                    isSelected
                      ? "border-brand-blue dark:border-brand-green"
                      : "border-border/80"
                  }`}
                />

                {/* Left Ticket Stub: Discount Tag */}
                <div className="w-20 sm:w-22 bg-gradient-to-br from-brand-blue/15 to-brand-green/15 dark:from-brand-blue/25 dark:to-brand-green/25 border-r border-dashed border-border/70 p-2 flex flex-col items-center justify-center shrink-0 text-center relative rounded-l-[15px]">
                  <span className="font-extrabold text-sm sm:text-base text-brand-blue dark:text-brand-green leading-none">
                    {voucher.discountType === "percentage"
                      ? `-${voucher.discountValue}%`
                      : `-${Math.round(voucher.discountValue / 1000)}k`}
                  </span>
                  <span className="text-[9px] font-semibold text-muted-foreground mt-1">
                    {voucher.discountType === "percentage" ? "GIẢM GIÁ" : "VOUCHER"}
                  </span>
                </div>

                {/* Right Ticket Body */}
                <div className="flex-1 p-2.5 sm:p-3 min-w-0 flex items-center justify-between gap-2 rounded-r-[15px]">
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-mono text-[10px] font-bold text-foreground bg-muted/60 px-1.5 py-0.2 rounded border border-border/50">
                        {voucher.code}
                      </span>
                      {voucher.badge && (
                        <span
                          className={`inline-flex items-center px-1.5 py-0.2 rounded text-[8.5px] font-bold border ${getBadgeStyle(
                            voucher.badge
                          )}`}
                        >
                          {voucher.badge}
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-xs text-foreground leading-tight truncate">
                      {voucher.title}
                    </h4>

                    <div className="text-[10px] text-muted-foreground flex items-center gap-1.5">
                      <span>Đơn từ {Math.round(voucher.minOrderValue / 1000)}k</span>
                      <span>•</span>
                      <span>HSD: {voucher.expiryDate}</span>
                    </div>
                  </div>

                  {/* Radio / Selection Circle */}
                  <div className="shrink-0 pl-1">
                    <div
                      className={`size-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-gradient-primary text-white shadow-2xs scale-105"
                          : "border-2 border-muted-foreground/30 hover:border-brand-blue"
                      }`}
                    >
                      {isSelected && <Check className="size-3.5 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Ineligible Vouchers Section */}
          {ineligibleVouchers.length > 0 && (
            <div className="pt-2 space-y-2">
              <div className="text-[10.5px] font-bold text-muted-foreground">
                {isEn ? "Locked Vouchers" : "Chưa đủ điều kiện"} ({ineligibleVouchers.length})
              </div>

              {ineligibleVouchers.map((voucher) => {
                const diff = voucher.minOrderValue - currentSubtotal;

                return (
                  <div
                    key={voucher.id}
                    className="relative rounded-2xl border border-border/50 bg-muted/20 flex items-stretch opacity-60"
                  >
                    {/* Top & Bottom Notches for Locked Vouchers */}
                    <div className="absolute -top-2 left-20 -translate-x-1/2 size-4 rounded-full bg-card z-10 border-b border-border/50" />
                    <div className="absolute -bottom-2 left-20 -translate-x-1/2 size-4 rounded-full bg-card z-10 border-t border-border/50" />

                    <div className="w-20 bg-muted/40 border-r border-dashed border-border/50 p-2 flex flex-col items-center justify-center shrink-0 text-center rounded-l-[15px]">
                      <span className="font-bold text-xs text-muted-foreground leading-none">
                        {voucher.discountType === "percentage"
                          ? `-${voucher.discountValue}%`
                          : `-${Math.round(voucher.discountValue / 1000)}k`}
                      </span>
                    </div>

                    <div className="flex-1 p-2.5 min-w-0 space-y-0.5 rounded-r-[15px]">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[9.5px] text-muted-foreground bg-muted/60 px-1.5 rounded">
                          {voucher.code}
                        </span>
                        <h4 className="font-semibold text-xs text-foreground/80 truncate">
                          {voucher.title}
                        </h4>
                      </div>

                      <div className="text-[9.5px] text-amber-600 dark:text-amber-400 font-medium">
                        {isEn
                          ? `Add ${Math.round(diff / 1000)}k to use`
                          : `Mua thêm ${Math.round(diff / 1000)}k để mở khóa`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
