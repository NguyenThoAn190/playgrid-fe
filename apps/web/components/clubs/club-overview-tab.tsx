"use client";

import React from "react";
import Image from "next/image";
import {
  FileText,
  Shield,
  Sparkles,
  CheckCircle2,
  MapPin,
  Clock,
  Award,
  Users,
} from "lucide-react";
import { ClubDetailData } from "@/lib/clubs-data";

export interface ClubOverviewTabProps {
  club: ClubDetailData;
}

export function ClubOverviewTab({ club }: ClubOverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* 1. Giới thiệu câu lạc bộ */}
      <section className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary shrink-0" />
          <span>Giới Thiệu Câu Lạc Bộ</span>
        </h2>

        <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed space-y-3 font-normal">
          {club.fullBio && club.fullBio.length > 0 ? (
            club.fullBio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))
          ) : (
            <p>{club.description}</p>
          )}
        </div>

        {/* 3 Core Values Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              01
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">Gắn Kết & Bình Đẳng</h4>
            <p className="text-xs text-muted-foreground font-normal">
              Chào đón mọi lông thủ từ trình độ nhập môn đến VĐV thi đấu, tôn trọng và hỗ trợ lẫn nhau.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
              02
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">Nâng Cao Kỹ Năng</h4>
            <p className="text-xs text-muted-foreground font-normal">
              Có giáo án tập luyện bài bản, sửa dáng kỹ thuật và thi đấu tính điểm Elo xếp hạng hàng tuần.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 space-y-1.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs">
              03
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-foreground">Cọ Xát Giải Đấu</h4>
            <p className="text-xs text-muted-foreground font-normal">
              Tài trợ và tổ chức các đội tuyển tham dự giải đấu lớn của Liên đoàn và PlayGrid.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Tiện ích & Cơ sở vật chất sân nhà */}
      {club.venueDetails && (
        <section className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary shrink-0" />
              <span>Sân Nhà & Tiện Ích Sinh Hoạt</span>
            </h2>
            <span className="text-xs text-muted-foreground font-semibold">
              {club.venueDetails.name}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground font-normal">
            Địa chỉ: <strong className="text-foreground">{club.venueDetails.address}</strong>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
            {club.venueDetails.amenities.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/40 border border-border/50 text-xs sm:text-sm text-foreground font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Hình ảnh hoạt động (Gallery Grid) */}
      {club.gallery && club.gallery.length > 0 && (
        <section className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
            <span>Hình Ảnh Hoạt Động & Giao Lưu</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {club.gallery.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-video rounded-xl overflow-hidden bg-muted group border border-border/60"
              >
                <Image
                  src={img}
                  alt={`${club.name} photo ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
