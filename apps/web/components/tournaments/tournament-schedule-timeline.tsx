"use client";

import React from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { TournamentScheduleItem } from "@/lib/tournaments-data";

interface TournamentScheduleTimelineProps {
  schedule: TournamentScheduleItem[];
}

export function TournamentScheduleTimeline({ schedule }: TournamentScheduleTimelineProps) {
  return (
    <div className="space-y-4">
      <div className="pb-1">
        <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-primary" />
          <span>Lịch trình thi đấu chi tiết</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
          Vận động viên vui lòng theo dõi thời gian và có mặt đúng giờ để tránh bị xử thua Walkover.
        </p>
      </div>

      <div className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xs">
        <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/80">
          {schedule.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-6 sm:-left-8 top-1 w-3.5 h-3.5 rounded-full bg-primary border-2 border-background shadow-2xs group-hover:scale-125 transition-transform" />

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap font-normal">
                  <span className="text-xs font-semibold text-primary flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>{item.location}</span>
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-foreground">
                  {item.activity}
                </h3>

                {item.note && (
                  <p className="text-xs sm:text-sm text-muted-foreground font-normal">
                    {item.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
