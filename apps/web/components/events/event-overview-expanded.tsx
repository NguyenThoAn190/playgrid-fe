"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  Trophy,
  ShieldCheck,
  Ticket,
  ChevronDown,
  Calendar,
  Shirt,
  Map,
  FileText,
  Download,
  Sparkles,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventData, EventContentSection } from "@/lib/events-data";

interface EventOverviewExpandedProps {
  event: EventData;
}

export function EventOverviewExpanded({ event }: EventOverviewExpandedProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const locale = useLocale();
  const isEn = locale === "en";

  const sections = event.contentSections || [];

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
    <article
      id="event-overview"
      aria-labelledby="event-overview-title"
      className="bg-card border border-border/80 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3.5 overflow-hidden"
      itemScope
      itemType="https://schema.org/SportsEvent"
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border/60 pb-3">
        <h2
          id="event-overview-title"
          className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2"
        >
          <Trophy className="size-4.5 text-amber-500 shrink-0" />
          <span itemProp="name">{isEn ? "Event Overview & Full Details" : "Tổng quan sự kiện & Thông tin chi tiết"}</span>
        </h2>
        <span className="text-[11px] font-semibold text-muted-foreground hidden sm:inline-flex items-center gap-1">
          <CheckCircle2 className="size-3.5 text-emerald-500" />
          {isEn ? "100% Official Event" : "Thông tin xác thực"}
        </span>
      </header>

      {/* Main Content Area (Full DOM for SEO Crawlers with CSS Max-Height Transition) */}
      <div className="relative">
        <div
          id="event-overview-content"
          className={`space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed transition-[max-height] duration-500 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[5000px]" : "max-h-[140px] sm:max-h-[160px]"
          }`}
        >
          {/* Lead Paragraph */}
          <p
            className="text-foreground/90 font-medium text-xs sm:text-sm leading-relaxed"
            itemProp="description"
          >
            {event.description}
          </p>

          {/* Highlights & Official Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-muted/30 border border-border/60">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-foreground">
                  {isEn ? "Official Guarantee" : "Cam kết bảo mật & Chính hãng"}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {isEn ? "100% authentic registered tickets" : "Vé điện tử chính hãng từ ban tổ chức 100%"}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-muted/30 border border-border/60">
              <Ticket className="h-4.5 w-4.5 text-brand-blue dark:text-brand-green shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-foreground">
                  {isEn ? "Instant Confirmation" : "Xác nhận tức thì"}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {isEn ? "QR Code E-Ticket via email & SMS" : "Mã vé QR Code nhận ngay qua email & SMS"}
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Backend Content Sections (SEO Indexable) */}
          {sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="p-4 rounded-2xl border border-border/70 bg-muted/15 space-y-3 pt-3"
            >
              {/* Section Title */}
              <div className="flex items-center gap-2 border-b border-border/50 pb-2">
                <div className="size-7 rounded-xl bg-background border border-border/60 flex items-center justify-center shrink-0 shadow-2xs">
                  {getSectionIcon(section.type)}
                </div>
                <h3 className="font-bold text-sm text-foreground">
                  {section.title}
                </h3>
              </div>

              {/* Section Description */}
              {section.content && (
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {section.content}
                </p>
              )}

              {/* Case 1: Schedule Timeline Table */}
              {section.type === "schedule" && section.scheduleTimeline && (
                <div className="overflow-x-auto rounded-xl border border-border/60 bg-card">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-muted/50 text-[11px] font-bold text-foreground border-b border-border/60">
                      <tr>
                        <th className="p-2.5 sm:px-3.5 whitespace-nowrap">{isEn ? "Time" : "Thời gian"}</th>
                        <th className="p-2.5 sm:px-3.5">{isEn ? "Activity" : "Hoạt động & Lịch trình"}</th>
                        <th className="p-2.5 sm:px-3.5 hidden sm:table-cell">{isEn ? "Location" : "Địa điểm"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {section.scheduleTimeline.map((item, idx) => (
                        <tr key={idx} className="hover:bg-muted/20 transition-colors">
                          <td className="p-2.5 sm:px-3.5 font-semibold text-brand-blue dark:text-brand-green whitespace-nowrap align-top">
                            <time>{item.time}</time>
                          </td>
                          <td className="p-2.5 sm:px-3.5 text-foreground align-top">
                            <div className="font-medium">{item.activity}</div>
                            {item.note && (
                              <div className="text-[10.5px] text-muted-foreground mt-0.5">
                                {item.note}
                              </div>
                            )}
                            <div className="sm:hidden text-[10.5px] text-muted-foreground mt-0.5 flex items-center gap-1">
                              <MapPin className="w-3 h-3 shrink-0" /> {item.location}
                            </div>
                          </td>
                          <td className="p-2.5 sm:px-3.5 text-muted-foreground align-top hidden sm:table-cell">
                            {item.location}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Case 2: Shirt Size Chart Table & Image */}
              {section.type === "size_chart" && (
                <div className="space-y-3">
                  {section.sizeChart && (
                    <div className="overflow-x-auto rounded-xl border border-border/60 bg-card">
                      <table className="w-full text-center text-xs">
                        <thead className="bg-muted/50 text-[11px] font-bold text-foreground border-b border-border/60">
                          <tr>
                            <th className="p-2 sm:px-3">{isEn ? "Size" : "Kích cỡ"}</th>
                            <th className="p-2 sm:px-3">{isEn ? "Chest" : "Vòng ngực"}</th>
                            <th className="p-2 sm:px-3">{isEn ? "Height" : "Chiều cao"}</th>
                            <th className="p-2 sm:px-3">{isEn ? "Weight" : "Cân nặng"}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                          {section.sizeChart.map((row) => (
                            <tr key={row.size} className="hover:bg-muted/20 transition-colors">
                              <td className="p-2 sm:px-3 font-bold text-brand-blue dark:text-brand-green">
                                {row.size}
                              </td>
                              <td className="p-2 sm:px-3 text-muted-foreground">{row.chest}</td>
                              <td className="p-2 sm:px-3 text-muted-foreground">{row.height}</td>
                              <td className="p-2 sm:px-3 text-muted-foreground">{row.weight}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {section.imageUrl && (
                    <figure className="relative aspect-[16/7] w-full rounded-xl overflow-hidden border border-border/60 bg-slate-950">
                      <Image
                        src={section.imageUrl}
                        alt={section.imageAlt || section.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      {section.imageCaption && (
                        <figcaption className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md text-[10.5px] font-medium bg-background/90 text-foreground border border-border">
                          {section.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </div>
              )}

              {/* Case 3: Rules & Maps */}
              {section.type === "rules" && (
                <div className="space-y-2.5">
                  <ul className="space-y-1.5 text-xs text-foreground/80">
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Bắt buộc sử dụng <strong>Phao bơi an toàn (Safety Buoy)</strong> cho mọi cự ly bơi biển.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Đeo <strong>Mũ bơi chính thức</strong> do BTC cung cấp (màu sắc theo từng cự ly).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Gắn <strong>Timing Chip</strong> ở cổ chân trái trong suốt thời gian thi đấu để tính thành tích.</span>
                    </li>
                  </ul>

                  {section.imageUrl && (
                    <figure className="relative aspect-[16/8] w-full rounded-xl overflow-hidden border border-border/60 bg-slate-950">
                      <Image
                        src={section.imageUrl}
                        alt={section.imageAlt || section.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                      {section.imageCaption && (
                        <figcaption className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md text-[10.5px] font-medium bg-background/90 text-foreground border border-border">
                          {section.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </div>
              )}

              {/* Case 4: Downloadable Attachments */}
              {section.type === "files" && section.attachments && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {section.attachments.map((file) => (
                    <a
                      key={file.id}
                      href={file.url}
                      className="p-3 rounded-xl border border-border/70 bg-card hover:border-brand-blue/60 transition-all flex items-center justify-between gap-2 group cursor-pointer"
                      title={`Tải xuống ${file.name}`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
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
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card via-card/85 to-transparent pointer-events-none"
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
          aria-controls="event-overview-content"
          className="h-8.5 px-4 rounded-xl border-border/80 text-xs font-bold text-brand-blue dark:text-brand-green hover:bg-muted/70 cursor-pointer transition-all shadow-2xs hover:border-brand-blue/40"
        >
          <span>
            {isExpanded
              ? isEn
                ? "Collapse event details"
                : "Thu gọn thông tin sự kiện"
              : isEn
              ? "Read more about this event"
              : "Xem thêm chi tiết sự kiện"}
          </span>
          <ChevronDown
            className={`size-3.5 ml-1.5 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>
    </article>
  );
}
