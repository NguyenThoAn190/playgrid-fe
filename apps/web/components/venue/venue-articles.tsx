"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { BookOpen, ChevronRight, Clock, ArrowRight, Calendar } from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { VenueDetailData, VenueArticle } from "@/lib/venue-data";

interface VenueArticlesProps {
  venue: VenueDetailData;
}

const DEFAULT_ARTICLES: VenueArticle[] = [
  {
    id: "art-default-1",
    slug: "review-mat-tham-yonex-tieu-chuan",
    title: "Review chi tiết trải nghiệm mặt thảm Yonex chuẩn BWF chống trơn trượt",
    summary: "Đánh giá chân thực về độ nảy cầu, độ bám sân và trải nghiệm thi đấu thực tế trên các cụm sân chất lượng cao.",
    category: "Đánh giá sân",
    publishedDate: "12/08/2026",
    readTime: "4 phút đọc",
    imageUrl: "/images/activities/badminton-banner.png",
    author: {
      name: "Trần Minh Quân",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      role: "HLV Thể Thao",
    },
    tags: ["Review", "Thảm Yonex", "Chất lượng"],
  },
  {
    id: "art-default-2",
    slug: "bi-quyet-chon-vot-va-giay-chong-lat-co-chan",
    title: "Bí quyết chọn giày thể thao đế bám, chống lật cổ chân khi thi đấu sân trong nhà",
    summary: "Hướng dẫn chọn size giày, công nghệ đệm Power Cushion và các lưu ý bắt buộc khi mang giày vào sân thể thao.",
    category: "Kỹ thuật & Mẹo",
    publishedDate: "08/08/2026",
    readTime: "5 phút đọc",
    imageUrl: "/images/explore_sports/gridy-badminton.avif",
    author: {
      name: "Nguyễn Hà Linh",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      role: "Chuyên gia sức khỏe",
    },
    tags: ["Kỹ thuật", "Giày thể thao", "Bảo hộ"],
  },
  {
    id: "art-default-3",
    slug: "khoi-tranh-giai-dau-phong-trao-playgrid-cup",
    title: "Khởi tranh giải đấu Phong Trào PlayGrid Open Cup Mùa Hè 2026",
    summary: "Tổng giá trị giải thưởng lên đến 50.000.000đ quy tụ hơn 64 cặp VĐV phong trào toàn thành phố tham gia tranh tài sôi nổi.",
    category: "Giải đấu & Sự kiện",
    publishedDate: "01/08/2026",
    readTime: "3 phút đọc",
    imageUrl: "/images/explore_sports/gridy-pickleball.avif",
    author: {
      name: "Ban Tổ Chức PlayGrid",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
      role: "PlayGrid Team",
    },
    tags: ["Giải đấu", "Sự kiện", "Open Cup"],
  },
];

export function VenueArticles({ venue }: VenueArticlesProps) {
  const tArticles = useTranslations("venue.articles");
  const articles = venue.articles && venue.articles.length > 0 ? venue.articles : DEFAULT_ARTICLES;

  return (
    <Card className="rounded-3xl border border-border/80 bg-card p-4 sm:p-5 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="size-5 text-brand-blue dark:text-brand-green" />
            {tArticles("title")}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {tArticles("subtitle")}
          </p>
        </div>

        <Link
          href="/badminton/news"
          className="flex items-center gap-1 text-xs font-bold text-brand-blue dark:text-brand-green hover:underline shrink-0"
        >
          <span>{tArticles("view_all")}</span>
          <ChevronRight className="size-3.5" />
        </Link>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {articles.map((art) => (
          <article
            key={art.id}
            className="group flex flex-col rounded-2xl overflow-hidden border border-border/60 bg-muted/20 hover:border-brand-blue/40 dark:hover:border-brand-green/40 hover:bg-muted/40 transition-all duration-300 shadow-2xs hover:shadow-md"
          >
            {/* Thumbnail Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
              <Image
                src={art.imageUrl}
                alt={art.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

              {/* Category Badge */}
              <Badge className="absolute top-2.5 left-2.5 bg-background/90 backdrop-blur-md text-foreground border-border text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-xs">
                {art.category}
              </Badge>
            </div>

            {/* Content Body */}
            <div className="p-3.5 flex flex-col justify-between flex-1 space-y-2.5">
              <div className="space-y-1.5">
                {/* Meta info (Date & Read time) */}
                <div className="flex items-center gap-2 text-[10.5px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3 text-brand-blue" />
                    {art.publishedDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3 text-brand-green" />
                    {art.readTime}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-bold text-xs sm:text-sm text-foreground line-clamp-2 group-hover:text-brand-blue dark:group-hover:text-brand-green transition-colors leading-snug">
                  {art.title}
                </h4>

                {/* Summary snippet */}
                <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              {/* Author & Read Action */}
              <div className="pt-2 border-t border-border/40 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2 min-w-0">
                  <Avatar className="size-5 border border-border shrink-0">
                    <AvatarImage src={art.author.avatar} alt={art.author.name} />
                    <AvatarFallback className="text-[9px] font-bold">
                      {art.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-[10.5px] font-medium text-foreground truncate">
                    {art.author.name}
                  </span>
                </div>

                <span className="text-[11px] font-bold text-brand-blue dark:text-brand-green flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform shrink-0">
                  <span>{tArticles("read_more")}</span>
                  <ArrowRight className="size-3" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}
