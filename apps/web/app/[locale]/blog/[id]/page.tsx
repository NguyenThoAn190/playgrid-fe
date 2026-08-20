"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, Share2, ThumbsUp, Bookmark, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/blog-card";
import { MOCK_BLOG_POSTS } from "@/components/home/sections/featured-blogs-section";
import { JsonLdScript, getBlogPostingJsonLd, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export interface BlogDetailPageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default function BlogDetailPage() {
  const locale = useLocale();
  const post = MOCK_BLOG_POSTS[0]!;

  const blogPostingSchema = getBlogPostingJsonLd(post, locale);
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Blog & Tin tức", url: `/${locale}/blog` },
    { name: post.title, url: `/${locale}/blog/${post.id}` },
  ]);

  return (
    <div className="w-full min-h-screen bg-background text-foreground py-6 sm:py-10">
      <JsonLdScript data={[blogPostingSchema, breadcrumbSchema]} />
      <div className="mx-auto w-full max-w-[1000px] px-4 sm:px-6 space-y-8">
        {/* Top Back Navigation */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại danh sách Blog</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-xl bg-accent border border-border/80 px-3 py-1 text-xs font-semibold text-accent-foreground">
            {post.category}
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight leading-tight text-foreground">
            {post.title}
          </h1>

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-border/50 pb-6 text-xs sm:text-sm text-muted-foreground font-medium">
            <div className="flex items-center gap-4">
              <span className="font-bold text-foreground">
                Tác giả: HLV Nguyễn Văn Hùng
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground/80" />
                {post.publishDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground/80" />
                {post.readTime}
              </span>
            </div>

            {/* Action icons */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 px-2.5 rounded-lg text-muted-foreground hover:text-foreground">
                <ThumbsUp className="h-4 w-4 mr-1.5" />
                <span>Yêu thích</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 px-2.5 rounded-lg text-muted-foreground hover:text-foreground">
                <Share2 className="h-4 w-4 mr-1.5" />
                <span>Chia sẻ</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Cover Banner Photo (12:5 Aspect Ratio) */}
        <div
          className="relative w-full aspect-[12/5] overflow-hidden rounded-3xl bg-muted shadow-md"
          style={{ aspectRatio: "12 / 5" }}
        >
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Article Main Body Content */}
        <article className="prose dark:prose-invert max-w-none space-y-6 text-foreground text-sm sm:text-base leading-relaxed">
          <p className="text-base sm:text-lg font-medium text-muted-foreground leading-relaxed border-l-4 border-primary pl-4 py-1">
            {post.excerpt}
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4">
            1. Khái niệm và tầm quan trọng của cú Drop Shot
          </h2>
          <p>
            Trong bộ môn cầu lông, cú bỏ nhỏ (Drop shot) là một trong những kỹ thuật kiểm soát nhịp độ trận đấu lợi hại nhất. Khác với những cú đập cầu (Smash) uy lực hướng thẳng về phía cuối sân, cú Drop shot yêu cầu sự khéo léo tối đa của cổ tay nhằm đưa quả cầu rơi sát mép lưới bên phía đối phương.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4">
            2. Các bước thực hiện chuẩn kỹ thuật
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Tư thế chuẩn bị:</strong> Giống hệt tư thế chuẩn bị cho một cú đập cầu để đánh lừa đối thủ.
            </li>
            <li>
              <strong>Điểm tiếp xúc cầu:</strong> Tiếp xúc cầu phía trước trán, góc vợt hơi nghiêng về phía trước.
            </li>
            <li>
              <strong>Lực miết cổ tay:</strong> Giảm lực ở cẳng tay và dùng cổ tay miết nhẹ vào quả cầu thay vì vung lực hết sức.
            </li>
            <li>
              <strong>Thu hồi vợt:</strong> Hoàn thành động tác mở vợt tự nhiên và nhanh chóng trở về vị trí trung tâm sân.
            </li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold text-foreground pt-4">
            3. Những lỗi thường gặp khi mới tập luyện
          </h2>
          <p>
            Nhiều người chơi thường mắc lỗi nhấc khuỷu tay quá thấp khiến cầu đi cao quá lưới, tạo cơ hội cho đối phương vồ lưới tấn công. Hãy đảm bảo giữ khuỷu tay cao và duy trì nhịp thở đều đặn khi tiếp xúc cầu.
          </p>

          {/* Key Takeaways Highlight Box */}
          <div className="my-6 p-4 sm:p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
            <div className="flex items-center gap-2 font-bold text-primary">
              <Sparkles className="h-5 w-5" />
              <span>Lời khuyên từ Huấn luyện viên</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
              Dành 15 phút mỗi buổi tập chỉ để thực hiện các bài tập thả cầu gần lưới. Sự cảm giác cầu tinh tế từ cổ tay sẽ nâng tầm trình độ của bạn đáng kể!
            </p>
          </div>
        </article>

        {/* Related Articles Section */}
        <div className="pt-10 border-t border-border/50 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold">Bài viết liên quan</h2>
            <Link href="/blog" className="text-xs sm:text-sm font-bold text-primary hover:underline">
              Xem tất cả bài viết →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_BLOG_POSTS.slice(1, 4).map((relatedPost) => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
