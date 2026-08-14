"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  Calendar,
  Shirt,
  Map,
  FileText,
  Download,
  Sparkles,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventContentSection } from "@/lib/events-data";

interface EventDynamicSectionsProps {
  sections?: EventContentSection[];
}

export function EventDynamicSections({ sections = [] }: EventDynamicSectionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const locale = useLocale();
  const isEn = locale === "en";

  if (!sections || sections.length === 0) return null;

  const getSectionIcon = (type: EventContentSection["type"]) => {
    switch (type) {
      case "schedule":
        return <Calendar className="size-4 text-brand-blue dark:text-brand-green" />;
      case "size_chart":
        return <Shirt className="size-4 text-amber-500" />;
      case "map":
      case "rules":
        return <Map className="size-4 text-emerald-500" />;
      case "files":
        return <FileText className="size-4 text-rose-500" />;
      default:
        return <Sparkles className="size-4 text-brand-blue" />;
    }
  };

  return (
    <div className="space-y-3">
      {/* Container with CSS Max-Height Transition & Gradient Fade (100% SEO Crawlable) */}
      <div className="relative">
        <div
          id="event-dynamic-sections-content"
          className={`space-y-3 transition-[max-height] duration-500 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[5000px]" : "max-h-[220px] sm:max-h-[260px]"
          }`}
        >
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="bg-card border border-border/80 rounded-3xl p-4 sm:p-5 space-y-3.5"
            >
              {/* Section Header */}
              <header className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-xl bg-muted/60 border border-border/60 flex items-center justify-center shrink-0 shadow-2xs">
                    {getSectionIcon(section.type)}
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-foreground">
                    {section.title}
                  </h2>
                </div>
              </header>

              {/* Section Description Content */}
              {section.content && (
                <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                  {section.content}
                </p>
              )}

              {/* 1. Schedule Timeline Table */}
              {section.type === "schedule" && section.scheduleTimeline && (
                <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted/40 text-[10.5px] font-medium text-muted-foreground uppercase tracking-wider border-b border-border/50">
                      <tr>
                        <th className="p-2.5 sm:px-3.5 whitespace-nowrap">{isEn ? "Time" : "Thời gian"}</th>
                        <th className="p-2.5 sm:px-3.5">{isEn ? "Activity" : "Hoạt động & Lịch trình"}</th>
                        <th className="p-2.5 sm:px-3.5 hidden sm:table-cell">{isEn ? "Location" : "Địa điểm"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {section.scheduleTimeline.map((item, idx) => (
                        <tr key={idx} className="hover:bg-muted/15 transition-colors">
                          <td className="p-2.5 sm:px-3.5 font-medium text-brand-blue dark:text-brand-green whitespace-nowrap align-top font-mono">
                            <time>{item.time}</time>
                          </td>
                          <td className="p-2.5 sm:px-3.5 text-foreground align-top">
                            <div className="font-medium text-xs text-foreground/90">{item.activity}</div>
                            {item.note && (
                              <div className="text-[10.5px] text-muted-foreground font-normal mt-0.5">
                                {item.note}
                              </div>
                            )}
                            <div className="sm:hidden text-[10.5px] text-muted-foreground font-normal mt-0.5">
                              📍 {item.location}
                            </div>
                          </td>
                          <td className="p-2.5 sm:px-3.5 text-muted-foreground font-normal align-top hidden sm:table-cell">
                            {item.location}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 2. Shirt Size Chart Table & Image */}
              {section.type === "size_chart" && (
                <div className="space-y-3.5">
                  {section.sizeChart && (
                    <div className="overflow-x-auto rounded-2xl border border-border/60 bg-card">
                      <table className="w-full text-center text-xs">
                        <thead className="bg-muted/40 text-[10.5px] font-medium text-muted-foreground uppercase tracking-wider border-b border-border/50">
                          <tr>
                            <th className="p-2 sm:px-3">{isEn ? "Size" : "Kích cỡ"}</th>
                            <th className="p-2 sm:px-3">{isEn ? "Chest" : "Vòng ngực"}</th>
                            <th className="p-2 sm:px-3">{isEn ? "Height" : "Chiều cao"}</th>
                            <th className="p-2 sm:px-3">{isEn ? "Weight" : "Cân nặng"}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                          {section.sizeChart.map((row) => (
                            <tr key={row.size} className="hover:bg-muted/15 transition-colors">
                              <td className="p-2 sm:px-3 font-semibold text-brand-blue dark:text-brand-green font-mono">
                                {row.size}
                              </td>
                              <td className="p-2 sm:px-3 text-muted-foreground font-normal">{row.chest}</td>
                              <td className="p-2 sm:px-3 text-muted-foreground font-normal">{row.height}</td>
                              <td className="p-2 sm:px-3 text-muted-foreground font-normal">{row.weight}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {section.imageUrl && (
                    <figure className="relative aspect-[16/7] w-full rounded-2xl overflow-hidden border border-border/70 bg-slate-950">
                      <Image
                        src={section.imageUrl}
                        alt={section.imageAlt || section.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      {section.imageCaption && (
                        <figcaption className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md text-[10.5px] font-medium bg-background/90 text-foreground border border-border shadow-xs">
                          {section.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </div>
              )}

              {/* 3. Rules & Guidelines */}
              {section.type === "rules" && (
                <div className="space-y-3">
                  <ul className="space-y-2 text-xs sm:text-sm text-foreground/85">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Bắt buộc sử dụng <strong>Phao bơi an toàn (Safety Buoy)</strong> cho mọi cự ly bơi biển.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Đeo <strong>Mũ bơi chính thức</strong> do BTC cung cấp (màu sắc theo từng cự ly).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Gắn <strong>Timing Chip</strong> ở cổ chân trái trong suốt thời gian thi đấu để tính thành tích.</span>
                    </li>
                  </ul>

                  {section.imageUrl && (
                    <figure className="relative aspect-[16/8] w-full rounded-2xl overflow-hidden border border-border/70 bg-slate-950">
                      <Image
                        src={section.imageUrl}
                        alt={section.imageAlt || section.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      {section.imageCaption && (
                        <figcaption className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md text-[10.5px] font-medium bg-background/90 text-foreground border border-border shadow-xs">
                          {section.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </div>
              )}

              {/* 4. Downloadable Attachments */}
              {section.type === "files" && section.attachments && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {section.attachments.map((file) => (
                    <a
                      key={file.id}
                      href={file.url}
                      className="p-3 rounded-2xl border border-border/70 bg-card hover:border-brand-blue/60 transition-all flex items-center justify-between gap-2 group cursor-pointer shadow-2xs"
                      title={`Tải xuống ${file.name}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                          <FileText className="size-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-xs text-foreground group-hover:text-brand-blue truncate">
                            {file.name}
                          </div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">
                            {file.size} • PDF Document
                          </div>
                        </div>
                      </div>

                      <div className="size-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-brand-blue group-hover:text-white transition-all shrink-0">
                        <Download className="size-3.5" />
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Bottom Fade Gradient when collapsed */}
        {!isExpanded && (
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/85 to-transparent pointer-events-none"
          />
        )}
      </div>

      {/* Expand / Collapse Action Button */}
      <div className="pt-1 text-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls="event-dynamic-sections-content"
          className="h-9 px-5 rounded-full border-border/80 bg-card hover:bg-muted/70 text-xs font-bold text-brand-blue dark:text-brand-green hover:text-brand-blue cursor-pointer transition-all shadow-xs hover:border-brand-blue/40 flex items-center gap-1.5 mx-auto"
        >
          <span>
            {isExpanded
              ? isEn
                ? "Collapse event details"
                : "Thu gọn thông tin sự kiện"
              : isEn
              ? "Read more event details & schedule"
              : "Xem thêm chi tiết sự kiện & lịch trình"}
          </span>
          <ChevronDown
            className={`size-3.5 ml-1 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>
    </div>
  );
}
