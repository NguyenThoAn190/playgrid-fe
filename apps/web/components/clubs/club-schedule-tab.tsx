"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  CheckCircle2,
  Trophy,
  Plus,
} from "lucide-react";
import { ClubDetailData, ClubScheduleSession } from "@/lib/clubs-data";
import { Button } from "@/components/ui/button";

export interface ClubScheduleTabProps {
  club: ClubDetailData;
  onOpenJoinModal: () => void;
}

export function ClubScheduleTab({ club, onOpenJoinModal }: ClubScheduleTabProps) {
  const [joinedSessions, setJoinedSessions] = useState<string[]>([]);

  const handleRegisterSlot = (sessionId: string) => {
    if (joinedSessions.includes(sessionId)) {
      setJoinedSessions(joinedSessions.filter((id) => id !== sessionId));
    } else {
      setJoinedSessions([...joinedSessions, sessionId]);
    }
  };

  const schedules = club.schedules || [];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary shrink-0" />
              <span>Lịch Sinh Hoạt Cố Định Hàng Tuần</span>
            </h2>
            <p className="text-xs text-muted-foreground font-normal mt-0.5">
              Hội viên có thể đăng ký giữ chỗ trước mỗi buổi để đảm bảo số lượng người chơi cân bằng trên sân.
            </p>
          </div>
        </div>

        {schedules.length > 0 ? (
          <div className="space-y-3 pt-1">
            {schedules.map((session) => {
              const isJoined = joinedSessions.includes(session.id);
              const slotsLeft = session.slotsTotal - session.slotsBooked - (isJoined ? 1 : 0);
              const percentFilled = Math.min(
                100,
                Math.round(((session.slotsBooked + (isJoined ? 1 : 0)) / session.slotsTotal) * 100)
              );

              return (
                <div
                  key={session.id}
                  className="p-4 sm:p-5 rounded-2xl bg-muted/30 border border-border/70 hover:border-primary/40 transition-all space-y-3.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary font-bold text-xs border border-primary/20">
                          {session.dayOfWeek}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground font-semibold">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          <span>{session.time}</span>
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-foreground">
                        {session.activityType}
                      </h3>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <div className="text-sm sm:text-base font-bold text-primary">
                        {session.feePerSession}
                      </div>
                      <div className="text-[11px] text-muted-foreground font-medium">
                        {session.levelRequirement}
                      </div>
                    </div>
                  </div>

                  {/* Court & Slot Progress */}
                  <div className="space-y-1.5 pt-1 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                        <span className="truncate">{session.court}</span>
                      </span>
                      <span className="font-semibold text-foreground shrink-0">
                        {session.slotsBooked + (isJoined ? 1 : 0)} / {session.slotsTotal} slots
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 rounded-full ${
                          percentFilled >= 90 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${percentFilled}%` }}
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-xs text-muted-foreground">
                      {slotsLeft > 0 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          Còn {slotsLeft} chỗ trống
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">Đã đủ chỗ</span>
                      )}
                    </div>

                    <Button
                      type="button"
                      onClick={() => handleRegisterSlot(session.id)}
                      className={`h-9 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isJoined
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-gradient-primary text-white shadow-2xs hover:opacity-95"
                      }`}
                    >
                      {isJoined ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          <span>Đã Giữ Slot (Hủy)</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-1" />
                          <span>Đăng Ký Slot Buổi Này</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Chưa có lịch sinh hoạt công khai. Vui lòng liên hệ ban chủ nhiệm CLB.
          </div>
        )}
      </div>
    </div>
  );
}
