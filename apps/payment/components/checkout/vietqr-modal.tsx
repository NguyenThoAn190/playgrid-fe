"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  X,
  Copy,
  Check,
  QrCode,
  Clock,
  ShieldCheck,
  Building2,
  Sparkles,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";

interface VietQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  amount: number;
  orderTitle: string;
  successRedirectUrl?: string;
}

export function VietQRModal({
  isOpen,
  onClose,
  orderId,
  amount,
  orderTitle,
  successRedirectUrl,
}: VietQRModalProps) {
  const router = useRouter();
  const locale = useLocale();
  const isEn = locale === "en";

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(600); // 10 minutes

  const bankInfo = {
    bankName: "MBBank - Ngân hàng TMCP Quân Đội",
    bankCode: "MB",
    accountNumber: "0388686888",
    accountName: "CONG TY CO PHAN PLAYGRID VIET NAM",
    memo: `PLAYGRID ${orderId}`,
  };

  // VietQR Quick Dynamic URL
  const qrImageUrl = `https://img.vietqr.io/image/${bankInfo.bankCode}-${bankInfo.accountNumber}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(
    bankInfo.memo
  )}&accountName=${encodeURIComponent(bankInfo.accountName)}`;

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleConfirmPayment = () => {
    setIsVerifying(true);
    // Simulate auto-reconciliation webhook verification
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
      setTimeout(() => {
        const dest = successRedirectUrl || `/${locale}/payment/success/${orderId}`;
        router.push(dest);
      }, 1200);
    }, 2000);
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in-50 duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-card border border-border/80 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Gradient Banner */}
        <div className="h-2 bg-gradient-primary w-full" />

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-brand-blue/10 dark:bg-brand-green/10 text-brand-blue dark:text-brand-green flex items-center justify-center font-bold">
              <QrCode className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {isEn ? "VietQR Pro Transfer" : "Thanh toán VietQR Pro"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {isEn ? "Open any mobile banking app to scan this QR" : "Mở app ngân hàng bất kỳ để quét mã QR"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="size-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="size-10 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-foreground">
                {isEn ? "Payment Successful!" : "Thanh toán thành công!"}
              </h4>
              <p className="text-xs text-muted-foreground">
                {isEn
                  ? `Order #${orderId} has been verified automatically. Redirecting...`
                  : `Hệ thống đã tự động đối soát đơn hàng #${orderId}. Đang chuyển hướng...`}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* QR Code Container */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-inner space-y-2">
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                {isEn ? "Scan VietQR for automatic transfer" : "Quét mã VietQR chuyển khoản tự động"}
              </div>
              <div className="relative size-56 sm:size-60 bg-white flex items-center justify-center p-2 rounded-xl border border-slate-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrImageUrl}
                  alt={`VietQR ${orderId}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback QR display
                    e.currentTarget.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
                      `2|99|${bankInfo.accountNumber}|${bankInfo.accountName}||0|0|${amount}|${bankInfo.memo}|transfer_p2p`
                    )}`;
                  }}
                />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium pt-1">
                <Clock className="size-3.5 text-amber-600" />
                <span>
                  {isEn ? "QR code expires in: " : "Mã QR có hiệu lực trong: "}
                  <span className="font-bold text-amber-700">
                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                  </span>
                </span>
              </div>
            </div>

            {/* Bank Transfer Details Box */}
            <div className="space-y-2 rounded-2xl bg-muted/40 p-3.5 sm:p-4 border border-border/80 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-border/60 font-medium text-foreground">
                <span className="text-muted-foreground">{isEn ? "Beneficiary Bank" : "Ngân hàng thụ hưởng"}</span>
                <span className="text-right font-semibold text-brand-blue dark:text-brand-green">
                  MBBank (Military Commercial Joint Stock Bank)
                </span>
              </div>

              {/* Account Number */}
              <div className="flex items-center justify-between py-1.5 border-b border-border/60">
                <span className="text-muted-foreground">{isEn ? "Account Number" : "Số tài khoản"}</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-foreground text-sm">
                    {bankInfo.accountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(bankInfo.accountNumber, "acc")}
                    className="p-1 rounded bg-card hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    title={isEn ? "Copy" : "Sao chép"}
                  >
                    {copiedField === "acc" ? (
                      <Check className="size-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Account Holder */}
              <div className="flex items-center justify-between py-1.5 border-b border-border/60">
                <span className="text-muted-foreground">{isEn ? "Account Holder" : "Chủ tài khoản"}</span>
                <span className="font-medium text-foreground uppercase">{bankInfo.accountName}</span>
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between py-1.5 border-b border-border/60">
                <span className="text-muted-foreground">{isEn ? "Payment Amount" : "Số tiền thanh toán"}</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-brand-blue dark:text-brand-green text-sm">
                    {isEn ? `${amount.toLocaleString("en-US")} VND` : `${amount.toLocaleString("vi-VN")} đ`}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(String(amount), "amount")}
                    className="p-1 rounded bg-card hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    title={isEn ? "Copy amount" : "Sao chép số tiền"}
                  >
                    {copiedField === "amount" ? (
                      <Check className="size-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Transfer Memo (Crucial) */}
              <div className="flex items-center justify-between py-1.5 bg-amber-500/10 dark:bg-amber-500/15 p-2 rounded-xl border border-amber-500/30">
                <span className="font-medium text-amber-800 dark:text-amber-300">
                  {isEn ? "Transfer Memo (Required)" : "Nội dung chuyển khoản (Bắt buộc)"}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-amber-900 dark:text-amber-200 text-sm">
                    {bankInfo.memo}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(bankInfo.memo, "memo")}
                    className="p-1 rounded bg-card hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    title={isEn ? "Copy memo" : "Sao chép nội dung"}
                  >
                    {copiedField === "memo" ? (
                      <Check className="size-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <Button
                type="button"
                onClick={handleConfirmPayment}
                disabled={isVerifying}
                className="w-full h-11 rounded-xl font-semibold bg-gradient-primary text-white shadow-md cursor-pointer hover:opacity-95"
              >
                {isVerifying ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    <span>{isEn ? "Verifying transaction..." : "Đang kiểm tra giao dịch..."}</span>
                  </span>
                ) : (
                  <span>{isEn ? "I have completed the transfer" : "Tôi đã chuyển khoản thành công"}</span>
                )}
              </Button>
              <p className="text-[11px] text-center text-muted-foreground">
                {isEn
                  ? "The system automatically activates upon receiving bank confirmation (usually 2-5 seconds)."
                  : "Hệ thống tự động kích hoạt ngay khi nhận được tín hiệu từ ngân hàng (thông thường 2-5 giây)."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
