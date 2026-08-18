"use client";

import React from "react";
import Image from "next/image";
import { Clock, Calendar } from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { Link } from "@/i18n/navigation";
import { getSportColor } from "@/lib/sports-colors";

export interface BlogPostData {
  id: string;
  title: string;
  excerpt?: string;
  category?: string;
  categories?: string[];
  imageUrl: string;
  publishDate: string;
  readTime: string;
  author?: {
    name: string;
    avatarUrl?: string;
  };
}

export interface BlogCardProps {
  post: BlogPostData;
  className?: string;
}

const FALLBACK_BLOG_IMAGE = "/images/activities/badminton-banner.png";

export function BlogCard({ post, className = "" }: BlogCardProps) {
  // Normalize tags array (support both single category string or multiple categories array)
  const tags = post.categories && post.categories.length > 0
    ? post.categories
    : post.category
      ? [post.category]
      : [];

  return (
    <Card className={`group relative overflow-hidden rounded-2xl bg-card text-card-foreground border border-border/60 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between p-0 ${className}`}>
      <div>
        {/* Cover Image - Strict 12/5 Aspect Ratio */}
        <div
          className="relative w-full aspect-[12/5] overflow-hidden bg-muted shrink-0"
          style={{ aspectRatio: "12 / 5" }}
        >
          <Image
            src={post.imageUrl || FALLBACK_BLOG_IMAGE}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Card Content Body */}
        <div className="p-3 sm:p-3.5 space-y-1.5 flex flex-col justify-between flex-1">
          <div className="space-y-1.5">
            {/* Multiple Tags / Categories Row */}
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5 min-h-[1.5rem]">
                {tags.map((tag) => {
                  const sportTheme = getSportColor(tag);
                  return (
                    <span
                      key={tag}
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold ${sportTheme.tagBg}`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Title - Fixed min-height for uniform alignment */}
            <Link href={`/blog/${post.id}`} className="block min-h-[2.4rem] sm:min-h-[2.6rem]">
              <h3 className="font-bold text-xs sm:text-sm md:text-base text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                {post.title}
              </h3>
            </Link>

            {/* Optional Excerpt */}
            {post.excerpt && (
              <p className="text-xs text-muted-foreground line-clamp-2 font-normal">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Card Footer: Date (Left) & Reading Time (Right) - No border line, tight top spacing */}
          <div className="pt-1.5 flex items-center justify-between text-[11px] sm:text-xs text-muted-foreground font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground/70" />
              <span>{post.publishDate}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-muted-foreground/70" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
