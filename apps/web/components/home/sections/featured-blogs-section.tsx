"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { BlogCard, BlogPostData } from "@/components/blog/blog-card";

export const MOCK_BLOG_POSTS: BlogPostData[] = [
  {
    id: "drop-shot-technique",
    title: "Kỹ thuật drop shot tinh tế để kiểm soát trận đấu",
    excerpt: "Bí quyết thực hiện cú bỏ nhỏ hiểm hóc làm đối thủ mất đà và giành thế chủ động trên sân cầu lông.",
    category: "Kỹ năng",
    categories: ["Kỹ năng", "Cầu lông"],
    imageUrl: "/images/blogs/drop-shot-skill.png",
    publishDate: "16/05/2024",
    readTime: "4 phút đọc",
  },
  {
    id: "agile-footwork",
    title: "Cách di chuyển linh hoạt trên sân cầu lông",
    excerpt: "Hướng dẫn 6 bước bộ chân cơ bản và nâng cao giúp bạn bao sân cực tốt mà không tốn quá nhiều sức.",
    category: "Kỹ năng",
    categories: ["Kỹ năng", "Cầu lông"],
    imageUrl: "/images/blogs/footwork-skill.png",
    publishDate: "14/05/2024",
    readTime: "6 phút đọc",
  },
  {
    id: "speed-reaction-drills",
    title: "Tăng tốc độ phản xạ với 5 bài tập đơn giản",
    excerpt: "Cải thiện phản xạ mắt và cổ tay để đỡ những cú smash uy lực từ đối phương hiệu quả hơn.",
    category: "Mẹo tập luyện",
    categories: ["Mẹo tập luyện", "Cầu lông"],
    imageUrl: "/images/activities/badminton-banner.png",
    publishDate: "12/05/2024",
    readTime: "5 phút đọc",
  },
  {
    id: "serve-technique-guide",
    title: "Kỹ thuật phát cầu: Cao tay và thấp tay",
    excerpt: "Phân tích điểm khác biệt giữa giao cầu ngắn sát lưới và giao cầu sâu về cuối sân cho người mới chơi.",
    category: "Kỹ năng",
    categories: ["Kỹ năng", "Cầu lông"],
    imageUrl: "/images/activities/pickleball-banner.png",
    publishDate: "10/05/2024",
    readTime: "3 phút đọc",
  },
  {
    id: "pickleball-dink-mastery",
    title: "Bí kíp làm chủ kỹ thuật Dink trong Pickleball",
    excerpt: "Kiểm soát khu vực Kitchen và tạo cơ hội tấn công bất ngờ với những cú chạm bóng tinh tế.",
    category: "Kỹ năng",
    categories: ["Kỹ năng", "Pickleball"],
    imageUrl: "/images/activities/tennis-banner.png",
    publishDate: "08/05/2024",
    readTime: "5 phút đọc",
  },
];

// Duplicate mock posts to enable infinite smooth scrolling loop
const INFINITE_BLOGS = [...MOCK_BLOG_POSTS, ...MOCK_BLOG_POSTS, ...MOCK_BLOG_POSTS];

export function FeaturedBlogsSection() {
  const tHome = useTranslations("home.featured_blogs");
  const tCommon = useTranslations("common");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth scroll handler
  const scroll = useCallback((direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.75;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  // Infinite scroll loop reset calculation
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;

    if (currentScroll >= maxScroll - 5) {
      container.scrollLeft = container.scrollWidth / 3;
    } else if (currentScroll <= 5) {
      container.scrollLeft = container.scrollWidth / 3;
    }
  };

  // Auto scroll effect when not hovered
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const cardWidth = container.clientWidth / 3;

      container.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section id="blogs" className="w-full py-5 sm:py-7 bg-background text-foreground transition-colors overflow-hidden scroll-mt-20">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-500 shrink-0" />
            <span>{tHome("title")}</span>
          </h2>
          <Link
            href="/blog"
            className="group flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors"
          >
            <span>{tCommon("view_all")}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Blog Posts Horizontal Infinite Slider Container */}
        <div
          className="relative group/carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Scroll Navigation Buttons */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label={tCommon("scroll_left")}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border shadow-lg text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label={tCommon("scroll_right")}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border shadow-lg text-foreground transition-all hover:bg-muted active:scale-95 cursor-pointer backdrop-blur-xs opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Continuous Infinite Horizontal Scroll List */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex items-stretch overflow-x-auto scrollbar-none snap-x snap-mandatory gap-3 pt-3 pb-3 px-1"
          >
            {INFINITE_BLOGS.map((post, index) => (
              <div
                key={`${post.id}-infinite-${index}`}
                className="w-[80vw] sm:w-[calc((100%-12px)/2)] lg:w-[calc((100%-36px)/4)] shrink-0 snap-start"
              >
                <BlogCard post={post} className="h-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
