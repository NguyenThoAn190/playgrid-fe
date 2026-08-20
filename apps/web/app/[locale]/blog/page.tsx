"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Sparkles, BookOpen, ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { BlogCard, BlogPostData } from "@/components/blog/blog-card";
import { JsonLdScript, getBlogListJsonLd, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { Button } from "@workspace/ui/components/button";

const CATEGORIES = ["Tất cả", "Kỹ năng", "Mẹo tập luyện", "Dinh dưỡng", "Tin tức thể thao"];

const FEATURED_ARTICLE: BlogPostData = {
  id: "drop-shot-technique",
  title: "Kỹ thuật drop shot tinh tế để kiểm soát trận đấu cầu lông",
  excerpt: "Bí quyết thực hiện cú bỏ nhỏ hiểm hóc làm đối thủ mất đà và giành thế chủ động trên sân. Khám phá quy trình 4 bước tập luyện cùng các vận động viên chuyên nghiệp.",
  category: "KỸ NĂNG",
  imageUrl: "/images/blogs/drop-shot-skill.png",
  publishDate: "16/05/2024",
  readTime: "4 phút đọc",
  author: {
    name: "HLV Nguyễn Văn Hùng",
  },
};

const ALL_BLOG_POSTS: BlogPostData[] = [
  FEATURED_ARTICLE,
  {
    id: "agile-footwork",
    title: "Cách di chuyển linh hoạt trên sân cầu lông",
    excerpt: "Hướng dẫn 6 bước bộ chân cơ bản và nâng cao giúp bạn bao sân cực tốt mà không tốn quá nhiều sức.",
    category: "Kỹ năng",
    imageUrl: "/images/blogs/footwork-skill.png",
    publishDate: "14/05/2024",
    readTime: "6 phút đọc",
  },
  {
    id: "speed-reaction-drills",
    title: "Tăng tốc độ phản xạ với 5 bài tập đơn giản",
    excerpt: "Cải thiện phản xạ mắt và cổ tay để đỡ những cú smash uy lực từ đối phương hiệu quả hơn.",
    category: "Mẹo tập luyện",
    imageUrl: "/images/activities/badminton-banner.png",
    publishDate: "12/05/2024",
    readTime: "5 phút đọc",
  },
  {
    id: "serve-technique-guide",
    title: "Kỹ thuật phát cầu: Cao tay và thấp tay",
    excerpt: "Phân tích điểm khác biệt giữa giao cầu ngắn sát lưới và giao cầu sâu về cuối sân cho người mới chơi.",
    category: "Kỹ năng",
    imageUrl: "/images/activities/pickleball-banner.png",
    publishDate: "10/05/2024",
    readTime: "3 phút đọc",
  },
  {
    id: "pickleball-dink-mastery",
    title: "Bí kíp làm chủ kỹ thuật Dink trong Pickleball",
    excerpt: "Kiểm soát khu vực Kitchen và tạo cơ hội tấn công bất ngờ với những cú chạm bóng tinh tế.",
    category: "Kỹ năng",
    imageUrl: "/images/activities/tennis-banner.png",
    publishDate: "08/05/2024",
    readTime: "5 phút đọc",
  },
  {
    id: "nutrition-for-badminton",
    title: "Chế độ dinh dưỡng trước và sau khi thi đấu",
    excerpt: "Bổ sung năng lượng và điện giải đúng cách giúp cơ thể phục hồi nhanh chóng sau những trận cầu nảy lửa.",
    category: "Dinh dưỡng",
    imageUrl: "/images/activities/football-banner.png",
    publishDate: "05/05/2024",
    readTime: "7 phút đọc",
  },
];

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = ALL_BLOG_POSTS.filter((post) => {
    const postCategories = post.categories || (post.category ? [post.category] : []);
    const matchesCategory =
      selectedCategory === "Tất cả" ||
      postCategories.some((cat) => cat.toLowerCase() === selectedCategory.toLowerCase());
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const locale = useLocale();
  const blogListSchema = getBlogListJsonLd(ALL_BLOG_POSTS, locale);
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Blog & Tin tức", url: `/${locale}/blog` },
  ]);

  return (
    <div className="w-full min-h-screen bg-background text-foreground py-8 sm:py-12">
      <JsonLdScript data={[blogListSchema, breadcrumbSchema]} />
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent border border-border/80 px-3.5 py-1 text-xs font-semibold text-accent-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            <span>PlayGrid Blog & Kiến Thức</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
            Kỹ Năng & Kinh Nghiệm Thể Thao
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            Tổng hợp bài viết hướng dẫn kỹ thuật, mẹo tập luyện và kiến thức thể thao từ các chuyên gia hàng đầu.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-b border-border/50 pb-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <form
              onSubmit={(e) => e.preventDefault()}
              toolname="search_blog_articles"
              tooldescription="Search sports articles, tournament news, player guidelines, and coaching tips on PlayGrid blog."
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="blog-search-query"
                  name="query"
                  type="text"
                  placeholder="Tìm kiếm bài viết..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  toolparamdescription="Article keyword or topic to search"
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-border/70 bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Hero Featured Article (Only visible when no search query and "Tất cả") */}
        {selectedCategory === "Tất cả" && !searchQuery && (
          <div className="relative overflow-hidden rounded-3xl bg-card border border-border/60 shadow-md group hover:border-primary/30 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Cover Image 12:5 ratio container */}
              <div className="lg:col-span-7 relative aspect-[12/5] w-full overflow-hidden bg-muted">
                <Image
                  src={FEATURED_ARTICLE.imageUrl}
                  alt={FEATURED_ARTICLE.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center rounded-xl bg-accent border border-border/80 px-3 py-1 text-xs font-semibold text-accent-foreground shadow-2xs">
                    Bài Viết Nổi Bật
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="text-xs font-medium text-primary">
                    {FEATURED_ARTICLE.category}
                  </span>
                  <Link href={`/blog/${FEATURED_ARTICLE.id}`}>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                      {FEATURED_ARTICLE.title}
                    </h2>
                  </Link>
                  <p className="text-muted-foreground text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {FEATURED_ARTICLE.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {FEATURED_ARTICLE.publishDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {FEATURED_ARTICLE.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${FEATURED_ARTICLE.id}`}>
                    <Button className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-xs cursor-pointer">
                      <span>Đọc ngay</span>
                      <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold">
              {selectedCategory === "Tất cả" ? "Tất cả bài viết" : `Chủ đề: ${selectedCategory}`}
            </h2>
            <span className="text-xs text-muted-foreground font-medium">
              {filteredPosts.length} bài viết
            </span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-3 bg-card rounded-2xl border border-border/50">
              <BookOpen className="h-10 w-10 text-muted-foreground mx-auto" />
              <p className="text-sm font-semibold text-muted-foreground">
                Không tìm thấy bài viết phù hợp.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
