"use client";

import React from "react";
import Image from "next/image";
import { Award, Star, CheckCircle2, Calendar, Shield } from "lucide-react";
import { ClubDetailData, ClubCoach } from "@/lib/clubs-data";

export interface ClubCoachesTabProps {
  club: ClubDetailData;
}

export function ClubCoachesTab({ club }: ClubCoachesTabProps) {
  const coaches = club.coaches || [];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500 shrink-0" />
            <span>Ban Chủ Nhiệm & Đội Ngũ Huấn Luyện Viên</span>
          </h2>
          <p className="text-xs text-muted-foreground font-normal mt-0.5">
            Đội ngũ HLV có chứng chỉ quốc tế BWF và kiện tướng thể thao trực tiếp theo sát, hướng dẫn hội viên.
          </p>
        </div>

        {coaches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {coaches.map((coach) => (
              <div
                key={coach.id}
                className="p-4 sm:p-5 rounded-2xl bg-muted/30 border border-border/70 space-y-3.5 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-muted shrink-0 border-2 border-primary/20 shadow-xs">
                      <Image
                        src={coach.avatarUrl}
                        alt={coach.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-foreground truncate">
                        {coach.name}
                      </h3>
                      <p className="text-xs text-primary font-semibold truncate">
                        {coach.role}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium pt-0.5">
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span>{coach.rating.toFixed(1)}</span>
                        </span>
                        <span>•</span>
                        <span>{coach.experienceYears} năm kinh nghiệm</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground/85 font-normal leading-relaxed">
                    {coach.bio}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-border/50">
                  <h4 className="text-[11px] font-bold text-muted-foreground tracking-wider">
                    CHỨNG CHỈ & THÀNH TÍCH
                  </h4>
                  <div className="space-y-1">
                    {coach.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-foreground/90 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Thông tin ban huấn luyện đang được cập nhật.
          </div>
        )}
      </div>
    </div>
  );
}
