"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  Calendar,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@/components/ui/input";
import { EventData, EventDistanceTier } from "@/lib/events-data";

interface EventRegistrationSectionProps {
  event: EventData;
}

export function EventRegistrationSection({ event }: EventRegistrationSectionProps) {
  const locale = useLocale();
  const isEn = locale === "en";

  const tiers: EventDistanceTier[] = event.distanceTiers && event.distanceTiers.length > 0
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
          imageUrl: event.imageUrl,
          description: "Bao gồm: Áo Finisher cao cấp, Huy chương kim loại, Bib gắn chip time, Bộ Race kit và Bảo hiểm thể thao.",
          status: "available",
          availableSlots: 50,
        },
      ];

  // State: { [tierId]: quantity }
  const [selectedQuantities, setSelectedQuantities] = useState<Record<string, number>>({});
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form registration state
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

  const handleApplyPromo = () => {
    setPromoError("");
    setPromoSuccess("");
    const cleaned = promoCode.trim().toUpperCase();
    if (!cleaned) return;

    if (cleaned === "PLAYGRID50" || cleaned === "PLAYGRID") {
      setAppliedDiscount(50000);
      setPromoSuccess(isEn ? "Applied voucher -50,000đ!" : "Áp dụng thành công mã giảm 50.000đ!");
    } else if (cleaned === "EARLYBIRD") {
      setAppliedDiscount(100000);
      setPromoSuccess(isEn ? "Applied voucher -100,000đ!" : "Áp dụng mã EARLYBIRD giảm 100.000đ!");
    } else {
      setPromoError(isEn ? "Invalid discount code" : "Mã giảm giá không hợp lệ hoặc đã hết hạn");
    }
  };

  // Calculations
  const selectedTiersList = tiers
    .filter((t) => (selectedQuantities[t.id] || 0) > 0)
    .map((t) => ({
      tier: t,
      qty: selectedQuantities[t.id] || 0,
      total: t.price * (selectedQuantities[t.id] || 0),
    }));

  const totalTickets = selectedTiersList.reduce((acc, item) => acc + item.qty, 0);
  const rawSubtotal = selectedTiersList.reduce((acc, item) => acc + item.total, 0);
  const finalTotal = Math.max(0, rawSubtotal - (totalTickets > 0 ? appliedDiscount : 0));

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

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-3.5">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Ticket className="size-5 text-brand-blue dark:text-brand-green" />
            <span>{isEn ? "Race Distances & Ticket Tiers" : "Danh sách cự ly & Hạng vé"}</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {isEn
              ? "Select your preferred distance category and quantity to register"
              : "Chọn cự ly thi đấu phù hợp và số lượng vé để tiếp tục đăng ký"}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 font-medium shrink-0 self-start sm:self-auto">
          <ShieldCheck className="size-4 shrink-0" />
          <span>{isEn ? "Official Direct Ticket" : "Vé chính hãng Ban Tổ Chức"}</span>
        </div>
      </div>

      {/* 2. Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Tiers List (Span 8) */}
        <div className="lg:col-span-8 space-y-4">
          {tiers.map((tier) => {
            const qty = selectedQuantities[tier.id] || 0;
            const isSoldOut = tier.status === "sold_out";

            return (
              <div
                key={tier.id}
                className={`rounded-2xl border transition-all duration-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 bg-card ${
                  qty > 0
                    ? "border-brand-blue dark:border-brand-green bg-brand-blue/[0.02] shadow-sm ring-1 ring-brand-blue/30 dark:ring-brand-green/30"
                    : "border-border/80 hover:border-brand-blue/40 dark:hover:border-brand-green/40 hover:shadow-2xs"
                }`}
              >
                {/* Distance / Medal Image Thumbnail */}
                {tier.imageUrl && (
                  <div className="relative w-full sm:w-32 sm:h-32 aspect-[16/10] sm:aspect-square rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-border/50">
                    <Image
                      src={tier.imageUrl}
                      alt={tier.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 sm:hidden">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border backdrop-blur-md ${getPhaseBadgeStyle(
                          tier.phase
                        )}`}
                      >
                        {tier.phase}
                      </span>
                    </div>
                  </div>
                )}

                {/* Content Body */}
                <div className="flex-1 flex flex-col justify-between space-y-3 min-w-0">
                  <div className="space-y-1.5">
                    {/* Phase Badge & Distance Badge */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`hidden sm:inline-flex px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold border ${getPhaseBadgeStyle(
                          tier.phase
                        )}`}
                      >
                        <Sparkles className="size-3 mr-1" />
                        {tier.phase}
                      </span>

                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold bg-muted text-muted-foreground border border-border/60">
                        <Trophy className="size-3 text-amber-500" />
                        {tier.distance}
                      </span>

                      {tier.status === "selling_fast" && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                          <Flame className="size-3 text-rose-500" />
                          {isEn ? "Selling Fast" : "Sắp hết vé"}
                        </span>
                      )}
                    </div>

                    {/* Tier Name */}
                    <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">
                      {tier.name}
                    </h3>

                    {/* Registration Deadline & Conditions */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5 text-brand-green shrink-0" />
                        <span>
                          {isEn ? "Deadline" : "Hạn đăng ký"}: <strong className="text-foreground/90">{tier.regDeadline}</strong>
                        </span>
                      </span>
                      {tier.minAge && (
                        <span>
                          {isEn ? "Age" : "Độ tuổi"}: <strong>{tier.minAge}+</strong>
                        </span>
                      )}
                    </div>

                    {/* Description / Race Kit details */}
                    {tier.description && (
                      <p className="text-xs text-muted-foreground/90 leading-relaxed line-clamp-2">
                        {tier.description}
                      </p>
                    )}
                  </div>

                  {/* Pricing & Quantity Action Row */}
                  <div className="pt-2 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
                    {/* Price Display */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg sm:text-xl font-extrabold text-brand-blue dark:text-brand-green">
                        {tier.price.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
                      </span>
                      {tier.originalPrice && tier.originalPrice > tier.price && (
                        <span className="text-xs text-muted-foreground line-through">
                          {tier.originalPrice.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
                        </span>
                      )}
                    </div>

                    {/* Quantity Selector */}
                    {isSoldOut ? (
                      <Badge variant="secondary" className="px-3 py-1 text-xs text-muted-foreground">
                        {isEn ? "Sold Out" : "Đã hết vé"}
                      </Badge>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(tier.id, -1)}
                          disabled={qty === 0}
                          className="size-8 rounded-lg border border-border/80 flex items-center justify-center text-foreground hover:bg-muted active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3.5" />
                        </button>

                        <span className="w-8 text-center font-bold text-sm text-foreground">
                          {qty}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleQuantityChange(tier.id, 1, tier.availableSlots || 10)}
                          disabled={qty >= (tier.availableSlots || 10)}
                          className="size-8 rounded-lg bg-gradient-primary text-white flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all shadow-xs"
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Checkout Summary Sidebar (Span 4) */}
        <div className="lg:col-span-4 bg-muted/25 border border-border/80 rounded-3xl p-4 sm:p-5 space-y-4 shadow-sm sticky top-20">
          <div className="border-b border-border/60 pb-3">
            <h3 className="text-sm sm:text-base font-bold text-foreground flex items-center gap-2">
              <Ticket className="size-4 text-brand-blue dark:text-brand-green" />
              <span>{isEn ? "Registration Summary" : "Tóm tắt đơn đăng ký"}</span>
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {event.title}
            </p>
          </div>

          {/* Selected Tiers List */}
          {selectedTiersList.length === 0 ? (
            <div className="py-6 text-center space-y-2 border border-dashed border-border/80 rounded-2xl p-4 bg-background/50">
              <Ticket className="size-8 text-muted-foreground/40 mx-auto" />
              <p className="text-xs text-muted-foreground font-medium">
                {isEn ? "No distance selected yet" : "Chưa chọn cự ly nào"}
              </p>
              <p className="text-[11px] text-muted-foreground/80">
                {isEn
                  ? "Please select quantity on the left to proceed"
                  : "Vui lòng bấm (+) chọn số lượng vé cự ly bên trái"}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {selectedTiersList.map(({ tier, qty, total }) => (
                <div
                  key={tier.id}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-background border border-border/60 text-xs"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-foreground truncate">{tier.name}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {qty} x {tier.price.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
                    </div>
                  </div>
                  <div className="font-bold text-brand-blue dark:text-brand-green shrink-0">
                    {total.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Promo Code Input */}
          <div className="space-y-1.5 pt-1 border-t border-border/40">
            <div className="flex gap-1.5">
              <div className="relative flex-1">
                <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <Input
                  placeholder={isEn ? "Promo code (PLAYGRID50)" : "Mã ưu đãi (PLAYGRID50)"}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="pl-8 h-8.5 rounded-xl text-xs uppercase"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleApplyPromo}
                className="h-8.5 px-3 text-xs font-semibold rounded-xl"
              >
                {isEn ? "Apply" : "Áp dụng"}
              </Button>
            </div>

            {promoError && (
              <p className="text-[11px] text-rose-500 flex items-center gap-1">
                <AlertCircle className="size-3" />
                {promoError}
              </p>
            )}
            {promoSuccess && (
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="size-3" />
                {promoSuccess}
              </p>
            )}
          </div>

          {/* Price Calculation Box */}
          <div className="space-y-1.5 pt-2 border-t border-border/50 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>{isEn ? "Tickets count" : "Tổng số vé"}:</span>
              <span className="font-semibold text-foreground">{totalTickets} {isEn ? "tickets" : "vé"}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>{isEn ? "Subtotal" : "Tạm tính"}:</span>
              <span>{rawSubtotal.toLocaleString(isEn ? "en-US" : "vi-VN")}đ</span>
            </div>
            {appliedDiscount > 0 && totalTickets > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                <span>{isEn ? "Discount" : "Giảm giá"}:</span>
                <span>-{appliedDiscount.toLocaleString(isEn ? "en-US" : "vi-VN")}đ</span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-2 border-t border-border/60">
              <span className="font-bold text-foreground text-sm">{isEn ? "Total" : "Tổng thanh toán"}:</span>
              <span className="text-xl font-extrabold bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                {finalTotal.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
              </span>
            </div>
          </div>

          {/* Submit Action Button */}
          <Button
            type="button"
            disabled={totalTickets === 0}
            onClick={() => setIsModalOpen(true)}
            className="w-full h-11 rounded-xl bg-gradient-primary text-white font-bold text-xs sm:text-sm shadow-md hover:opacity-95 active:scale-98 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {totalTickets === 0
              ? isEn ? "Select Category to Continue" : "Vui lòng chọn cự ly"
              : isEn ? `Proceed to Register (${totalTickets} tickets)` : `Đăng ký ngay (${totalTickets} vé)`}
          </Button>

          {/* Trust Guarantees */}
          <div className="space-y-1.5 pt-1 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
              <span>{isEn ? "100% Guaranteed Athlete Slot" : "Đảm bảo 100% giữ slot VĐV"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="size-3 text-blue-500 shrink-0" />
              <span>{isEn ? "E-Ticket QR code delivered via SMS & Email" : "Vé điện tử QR code gửi ngay qua Email"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Athlete Registration Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-foreground">
                  {isEn ? "Athlete Information" : "Thông tin Vận Động Viên"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isEn ? "Fill in details to complete ticket registration" : "Vui lòng điền thông tin để xuất vé điện tử"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="size-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="size-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="size-8" />
                </div>
                <h4 className="font-bold text-lg text-foreground">
                  {isEn ? "Registration Successful!" : "Đăng Ký Thành Công!"}
                </h4>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  {isEn
                    ? "Your athlete slot has been reserved. Please check your email for QR code and payment instructions."
                    : "Slot thi đấu của bạn đã được ghi nhận. Hệ thống đã gửi mã QR Code và hướng dẫn thanh toán tới email của bạn."}
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
                  setIsSubmitted(true);
                }}
                className="space-y-3.5 text-xs"
              >
                {/* Full name */}
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">
                    {isEn ? "Full Name (as in ID/Passport)" : "Họ và tên (theo CCCD/Hộ chiếu)"} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                    <Input
                      required
                      placeholder="NGUYEN VAN A"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="pl-9 h-9 rounded-xl uppercase"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                      <Input
                        required
                        type="email"
                        placeholder="athlete@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-9 h-9 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">{isEn ? "Phone Number" : "Số điện thoại"} *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                      <Input
                        required
                        type="tel"
                        placeholder="0912 345 678"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-9 h-9 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* DOB & ID Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">{isEn ? "Date of Birth" : "Ngày sinh"} *</label>
                    <Input
                      required
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="h-9 rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">{isEn ? "ID / Passport No." : "Số CCCD / Hộ chiếu"} *</label>
                    <Input
                      required
                      placeholder="001234567890"
                      value={formData.idNumber}
                      onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                      className="h-9 rounded-xl"
                    />
                  </div>
                </div>

                {/* Gender & Shirt Size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-foreground">{isEn ? "Gender" : "Giới tính"} *</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full h-9 px-3 rounded-xl bg-background border border-border text-foreground text-xs"
                    >
                      <option value="male">{isEn ? "Male" : "Nam"}</option>
                      <option value="female">{isEn ? "Female" : "Nữ"}</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-foreground flex items-center gap-1">
                      <Shirt className="size-3.5 text-brand-blue" />
                      <span>{isEn ? "Finisher Shirt Size" : "Size áo Finisher"} *</span>
                    </label>
                    <select
                      value={formData.shirtSize}
                      onChange={(e) => setFormData({ ...formData, shirtSize: e.target.value })}
                      className="w-full h-9 px-3 rounded-xl bg-background border border-border text-foreground text-xs font-semibold"
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

                {/* Club / Running team */}
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">{isEn ? "Club / Team (Optional)" : "Câu lạc bộ / Đội thi đấu (Không bắt buộc)"}</label>
                  <Input
                    placeholder="PlayGrid Running Club"
                    value={formData.clubName}
                    onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                    className="h-9 rounded-xl"
                  />
                </div>

                {/* Modal Footer */}
                <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-muted-foreground block">{isEn ? "Total Payment" : "Tổng thanh toán"}</span>
                    <span className="text-base font-extrabold text-brand-blue dark:text-brand-green">
                      {finalTotal.toLocaleString(isEn ? "en-US" : "vi-VN")}đ
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-xl h-9"
                    >
                      {isEn ? "Cancel" : "Hủy"}
                    </Button>
                    <Button
                      type="submit"
                      size="sm"
                      className="rounded-xl bg-gradient-primary text-white font-bold h-9 px-5"
                    >
                      {isEn ? "Confirm & Pay" : "Xác nhận & Thanh toán"}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
