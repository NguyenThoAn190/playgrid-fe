"use client";

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { BookOpen, ChevronRight, Clock, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { EventData, EventArticle, MOCK_EVENT_ARTICLES } from "@/lib/events-data";

interface EventArticlesProps {
  event: EventData;
}

export function EventArticles({ event }: EventArticlesProps) {
  const locale = useLocale();
  const isEn = locale === "en";

  const articles: EventArticle[] =
    event.articles && event.articles.length > 0 ? event.articles : MOCK_EVENT_ARTICLES;

  return (
    <section
      id="event-articles"
      aria-labelledby="event-articles-title"
      className="bg-card border border-border/80 rounded-3xl p-4 sm:p-5 space-y-3.5"
    >
      {/* Section Header with Crawlable View All Link */}
      <header className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-xl bg-brand-blue/10 text-brand-blue dark:text-brand-green flex items-center justify-center shrink-0">
            <BookOpen className="size-4.5" />
          </div>
          <div>
            <h2
              id="event-articles-title"
              className="text-sm sm:text-base font-semibold text-foreground"
            >
              {isEn ? "Event Guides & Expert Articles" : "Bài Viết & Cẩm Nang Giải Đấu"}
            </h2>
            <p className="text-[11px] text-muted-foreground font-normal">
              {isEn
                ? "Expert race tips, nutrition guides and tactical insights"
                : "Kinh nghiệm thi đấu, chiến thuật phân phối sức và chế độ dinh dưỡng từ chuyên gia"}
            </p>
          </div>
        </div>

        <Link
          href="/blogs"
          title={isEn ? "View all sports articles" : "Xem tất cả bài viết cẩm nang"}
          className="flex items-center gap-1 text-xs font-medium text-brand-blue dark:text-brand-green hover:underline shrink-0 cursor-pointer"
        >
          <span>{isEn ? "View all" : "Xem tất cả"}</span>
          <ChevronRight className="size-3.5" />
        </Link>
      </header>

      {/* Articles Grid with 100% Crawlable Internal Links & Semantic Microdata */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {articles.map((art) => (
          <Link
            key={art.id}
            href={`/blogs/${art.slug}`}
            title={art.title}
            className="group flex flex-col rounded-2xl overflow-hidden border border-border/60 bg-muted/15 hover:border-brand-blue/40 dark:hover:border-brand-green/40 hover:bg-muted/25 transition-all duration-200 cursor-pointer"
          >
            <article
              itemScope
              itemType="https://schema.org/BlogPosting"
              className="flex flex-col h-full"
            >
              {/* Microdata Meta Tags for Bot Crawlers */}
              <meta itemProp="headline" content={art.title} />
              <meta itemProp="description" content={art.summary} />
              <meta itemProp="datePublished" content={art.publishedDate} />
              <meta itemProp="image" content={art.imageUrl} />

              {/* Thumbnail Cover */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                <Image
                  src={art.imageUrl}
                  alt={art.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-background/90 text-foreground border border-border/70 backdrop-blur-xs">
                    {art.category}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-1 space-y-2.5">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[10.5px] text-muted-foreground font-normal">
                    <time dateTime={art.publishedDate}>{art.publishedDate}</time>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-2.5" />
                      {art.readTime}
                    </span>
                  </div>

                  <h3
                    itemProp="name"
                    className="font-semibold text-xs sm:text-[13px] text-foreground group-hover:text-brand-blue dark:group-hover:text-brand-green transition-colors line-clamp-2 leading-snug"
                  >
                    {art.title}
                  </h3>

                  <p className="text-[11px] text-muted-foreground font-normal line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                {/* Author and Read Action */}
                <div className="pt-2 border-t border-border/40 flex items-center justify-between">
                  <div
                    itemProp="author"
                    itemScope
                    itemType="https://schema.org/Person"
                    className="flex items-center gap-2 min-w-0"
                  >
                    <Avatar className="size-5.5 border border-border/60">
                      <AvatarImage src={art.author.avatar} alt={art.author.name} />
                      <AvatarFallback className="text-[9px] font-medium">
                        {art.author.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div
                        itemProp="name"
                        className="text-[11px] font-medium text-foreground truncate"
                      >
                        {art.author.name}
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand-blue dark:text-brand-green group-hover:translate-x-0.5 transition-transform shrink-0">
                    <span>{isEn ? "Read" : "Đọc bài"}</span>
                    <ArrowRight className="size-3" />
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
