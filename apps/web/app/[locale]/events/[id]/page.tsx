"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Calendar, MapPin, Share2, Heart, ShieldCheck, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="w-full bg-background min-h-screen pb-16">
      {/* Top Banner */}
      <div className="relative w-full aspect-[12/5] max-h-[400px] overflow-hidden bg-slate-900">
        <Image
          src="/images/events/aqua-warriors.png"
          alt="Event Banner"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-black/50" />
        
        <div className="absolute top-4 left-4 sm:left-8 z-10">
          <Link href="/events">
            <Button variant="outline" size="sm" className="rounded-xl bg-background/80 backdrop-blur-xs font-semibold gap-1.5">
              <ArrowLeft className="h-4 w-4" />
              <span>Quay lại</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Detail Content */}
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 space-y-6">
        <div className="bg-card border border-border/80 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-border/60 pb-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-extrabold bg-red-500 text-white">
                🔥 Nổi bật
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Giải Aqua Warriors Vân Đồn năm 2026
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground pt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-[#002BCC]" />
                  12 - 13 Tháng 9, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#002BCC]" />
                  Bãi biển Vân Đồn, Quảng Ninh
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
              <Button variant="outline" size="icon" className="rounded-full">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Heart className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>

          {/* Description & Tickets */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Giới thiệu giải đấu</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Giải đấu Aqua Warriors Vân Đồn 2026 hội tụ hơn 2.000 vận động viên tham gia thi đấu các nội dung bơi biển cá nhân và ba môn phối hợp (Triathlon) tại vùng biển hoang sơ tuyệt đẹp Vân Đồn. Cung đường thi đấu được thiết kế chuẩn quốc tế, đảm bảo an toàn tuyệt đối với đội ngũ cứu hộ chuyên nghiệp.
              </p>
              <div className="pt-4 border-t border-border/40 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                  <ShieldCheck className="h-6 w-6 text-emerald-500 shrink-0" />
                  <div>
                    <div className="text-xs font-bold">Cam kết bảo mật</div>
                    <div className="text-[11px] text-muted-foreground">Vé chính hãng 100%</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                  <Ticket className="h-6 w-6 text-blue-500 shrink-0" />
                  <div>
                    <div className="text-xs font-bold">Xác nhận tức thì</div>
                    <div className="text-[11px] text-muted-foreground">Vé điện tử QR Code</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Pricing Box */}
            <div className="bg-muted/30 border border-border/60 rounded-xl p-5 space-y-4 h-fit">
              <div>
                <span className="text-xs text-muted-foreground">Giá vé niêm yết</span>
                <div className="text-2xl font-extrabold text-foreground">479.000đ</div>
              </div>
              <Button className="w-full h-11 rounded-xl bg-[#002BCC] hover:bg-[#0022a3] text-white font-bold text-sm">
                Đăng ký ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
