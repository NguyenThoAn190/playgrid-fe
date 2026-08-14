"use client";

import React, { useState } from "react";
import {
  X,
  CheckCircle,
  ShieldCheck,
  CreditCard,
  QrCode,
  Wallet,
  Smartphone,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Download,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Badge } from "@workspace/ui/components/badge";
import { VenueDetailData } from "@/lib/venue-data";
import { SelectedBookingSlot } from "./venue-booking-section";
import { SelectedAddonItem } from "./venue-booking-sidebar";

interface VenueCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  venue: VenueDetailData;
  selectedSlots: SelectedBookingSlot[];
  selectedDate: string;
  selectedAddons: SelectedAddonItem[];
  bookingType: string;
}

export function VenueCheckoutModal({
  isOpen,
  onClose,
  venue,
  selectedSlots,
  selectedDate,
  selectedAddons,
  bookingType,
}: VenueCheckoutModalProps) {
  const [fullName, setFullName] = useState("Nguyễn Văn An");
  const [phone, setPhone] = useState("0908 789 999");
  const [email, setEmail] = useState("an.nguyen@example.com");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"vietqr" | "wallet" | "momo" | "card">("vietqr");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const courtSubtotal = selectedSlots.reduce((sum, slot) => sum + slot.price, 0);
  const addonsSubtotal = selectedAddons.reduce((sum, item) => {
    const addon = venue.addons.find((a) => a.id === item.addonId);
    return sum + (addon ? addon.price * item.quantity : 0);
  }, 0);
  const grandTotal = courtSubtotal + addonsSubtotal;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  const bookingCode = "PG-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div
      className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-background border border-border shadow-2xl overflow-hidden my-6 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="size-5" />
        </button>

        {!isSuccess ? (
          /* Step 1: Checkout Form */
          <form onSubmit={handleConfirmBooking} className="p-5 sm:p-6 space-y-5">
            <div>
              <span className="text-xs font-bold tracking-wider text-brand-blue dark:text-brand-green">
                Xác nhận đặt sân
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mt-0.5">
                Thông tin & Thanh toán
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {venue.name} • {selectedDate}
              </p>
            </div>

            {/* Selected Slots Preview Badge */}
            <div className="p-3 rounded-2xl bg-muted/30 border border-border/60 space-y-2">
              <div className="text-xs font-bold text-foreground">
                Danh sách khung giờ đặt ({selectedSlots.length} slot):
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {selectedSlots.map((slot) => (
                  <span
                    key={slot.courtId + slot.slotId}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-background border border-border/80 text-[11px] font-semibold"
                  >
                    <Clock className="size-3 text-brand-blue" />
                    <strong>{slot.courtName}</strong>: {slot.time}
                  </span>
                ))}
              </div>
            </div>

            {/* Customer Information Inputs */}
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-wider text-muted-foreground">
                Thông tin người đặt
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Họ và tên *</label>
                  <Input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Văn An"
                    className="h-9 rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-foreground">Số điện thoại *</label>
                  <Input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0908 123 456"
                    className="h-9 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Email nhận vé điện tử</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="an.nguyen@example.com"
                  className="h-9 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Ghi chú cho ban quản lý sân</label>
                <Input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Vui lòng chuẩn bị sân gần quạt mát..."
                  className="h-9 rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold tracking-wider text-muted-foreground">
                Phương thức thanh toán
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: "vietqr",
                    label: "Chuyển khoản VietQR 24/7",
                    desc: "Tự động xác nhận trong 3 giây",
                    icon: QrCode,
                  },
                  {
                    id: "wallet",
                    label: "Ví PlayGrid Pay",
                    desc: "Số dư: 500.000đ",
                    icon: Wallet,
                  },
                  {
                    id: "momo",
                    label: "Ví MoMo / ZaloPay",
                    desc: "Thanh toán quét mã ví",
                    icon: Smartphone,
                  },
                  {
                    id: "card",
                    label: "Thẻ ATM / Visa / Master",
                    desc: "Cổng thanh toán bảo mật",
                    icon: CreditCard,
                  },
                ].map((item) => {
                  const isSelected = paymentMethod === item.id;
                  const Icon = item.icon;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setPaymentMethod(item.id as any)}
                      className={`flex items-start gap-2.5 p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-brand-blue/5 border-brand-blue dark:border-brand-green ring-1 ring-brand-blue dark:ring-brand-green"
                          : "bg-muted/20 border-border/60 hover:bg-muted/40"
                      }`}
                    >
                      <div
                        className={`size-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-brand-blue text-white dark:bg-brand-green dark:text-slate-950"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-foreground truncate">
                          {item.label}
                        </div>
                        <div className="text-[10px] text-muted-foreground truncate">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total Payment & Submit CTA */}
            <div className="pt-3 border-t border-border/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-muted-foreground block">Tổng thanh toán:</span>
                <span className="text-xl font-black bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">
                  {grandTotal.toLocaleString("vi-VN")}đ
                </span>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 px-6 rounded-xl bg-gradient-primary text-white font-extrabold text-sm shadow-md hover:opacity-95 cursor-pointer"
              >
                {isLoading ? "Đang xử lý..." : "Xác nhận & Thanh toán"}
              </Button>
            </div>
          </form>
        ) : (
          /* Step 2: Booking Success State */
          <div className="p-6 text-center space-y-5 animate-in zoom-in-95">
            <div className="size-16 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
              <CheckCircle className="size-9" />
            </div>

            <div className="space-y-1">
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Đặt sân thành công!
              </Badge>
              <h3 className="text-2xl font-black text-foreground">
                Mã đặt sân: {bookingCode}
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Vé điện tử đã được gửi tới email <strong>{email}</strong> và số điện thoại <strong>{phone}</strong>.
              </p>
            </div>

            {/* Ticket Card Summary with simulated QR code */}
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-border/60 pb-2.5">
                <div>
                  <h4 className="font-extrabold text-sm text-foreground">{venue.name}</h4>
                  <p className="text-[11px] text-muted-foreground">{venue.address}</p>
                </div>
                <div className="p-1.5 bg-white rounded-lg border shadow-xs">
                  {/* Visual simulated QR */}
                  <QrCode className="size-10 text-slate-900" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground text-[11px]">Ngày chơi:</span>
                  <div className="font-bold text-foreground">{selectedDate}</div>
                </div>
                <div>
                  <span className="text-muted-foreground text-[11px]">Người đặt:</span>
                  <div className="font-bold text-foreground">{fullName}</div>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground text-[11px]">Khung giờ:</span>
                  <div className="font-bold text-foreground">
                    {selectedSlots.map((s) => `${s.courtName} (${s.time})`).join(", ")}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 h-10 rounded-xl font-bold text-xs"
              >
                Đóng
              </Button>
              <Button
                onClick={onClose}
                className="flex-1 h-10 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-md"
              >
                <Download className="size-3.5 mr-1.5" />
                Tải vé điện tử (PDF)
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
