"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Plus,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface CommunityPost {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  isVerified?: boolean;
  timeAgo: string;
  title: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
}

const DEFAULT_POST: CommunityPost = {
  id: "post-1",
  authorName: "Phan Hoàng Nam",
  authorHandle: "@hoangnam_badminton",
  authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  isVerified: true,
  timeAgo: "2 giờ trước",
  title: "Tuyển thêm 2 tay vợt giao lưu trình Trung bình-Khá sân Khang An tối nay!",
  content: "Nhóm mình hiện có 4 người chơi nhiệt tình, cần tìm thêm 2 bạn đánh đôi giao lưu vui vẻ. Sân thảm mới, máy lạnh thoáng mát, có sẵn cầu thi đấu tiêu chuẩn. Mọi người đăng ký tham gia ngay nhé!",
  imageUrl: "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=1200&auto=format&fit=crop&q=80",
  likes: 142,
  comments: 38,
  shares: 12,
};

const COMMUNITY_POSTS: CommunityPost[] = [
  DEFAULT_POST,
  {
    id: "post-2",
    authorName: "Lê Thanh Trúc",
    authorHandle: "@trucle_pickle",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    isVerified: true,
    timeAgo: "4 giờ trước",
    title: "Bí kíp giao bóng xoáy sâu trong Pickleball cho người mới bắt đầu",
    content: "Kỹ thuật miết mặt vợt từ dưới lên giúp bóng nảy thấp khiến đối thủ khó kiểm soát và trả gài bóng. Bạn đã thử kỹ thuật này chưa?",
    imageUrl: "https://images.unsplash.com/photo-1530915534664-4ac6423816b7?w=600&auto=format&fit=crop&q=80",
    likes: 98,
    comments: 24,
    shares: 8,
  },
  {
    id: "post-3",
    authorName: "Đăng Khoa Sport",
    authorHandle: "@dangkhoa_tennis",
    authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    isVerified: true,
    timeAgo: "6 giờ trước",
    title: "Pha cứu bóng tuyệt đỉnh ở chung kết giải Tennis Mở rộng vừa qua",
    content: "Trận đấu kịch tính đến phút cuối cùng. Cảm ơn ban tổ chức và toàn thể anh em cộng đồng đã cổ vũ hết mình!",
    imageUrl: "https://images.unsplash.com/photo-1560012057-4372e14c5085?w=600&auto=format&fit=crop&q=80",
    likes: 215,
    comments: 52,
    shares: 19,
  },
  {
    id: "post-4",
    authorName: "Nguyễn Minh Tuấn",
    authorHandle: "@tuan_badminton",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    isVerified: false,
    timeAgo: "8 giờ trước",
    title: "Cách khởi động và phòng tránh chấn thương cổ chân khi chơi thể thao",
    content: "Dành 10 phút khởi động đúng cách sẽ giúp bạn tự tin di chuyển trên sân và kéo dài phong độ bền bỉ suốt trận đấu.",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80",
    likes: 176,
    comments: 31,
    shares: 14,
  },
];

export function FeaturedCommunitySection() {
  const [likedPostIds, setLikedPostIds] = useState<Record<string, boolean>>({});
  const [savedPostIds, setSavedPostIds] = useState<Record<string, boolean>>({});

  const tCommunity = useTranslations("home.community");

  const getT = (key: string, fallback: string): string => {
    try {
      const res = tCommunity(key);
      if (!res || res.includes("home.community") || res === key) {
        return fallback;
      }
      return res;
    } catch {
      return fallback;
    }
  };

  const toggleLike = (id: string) => {
    setLikedPostIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSave = (id: string) => {
    setSavedPostIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const featuredPost: CommunityPost = COMMUNITY_POSTS[0] ?? DEFAULT_POST;
  const sidePosts: CommunityPost[] = COMMUNITY_POSTS.slice(1);

  return (
    <section className="w-full py-6 sm:py-8 bg-background text-foreground transition-colors border-t border-border/40 overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-5 sm:space-y-6">

        {/* Header Row */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>{getT("title", "Cộng đồng PlayGrid")}</span>
          </h2>

          <Link
            href="/community"
            className="group flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors shrink-0"
          >
            <span>{getT("view_all", "Khám phá cộng đồng")}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Main Grid Layout: 1 Featured Large Card (Left 7 cols) + Side List (Right 5 cols) - Gap 12px (gap-3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">

          {/* FEATURED POST (#1 Large Card) */}
          <div className="lg:col-span-7 rounded-2xl bg-card border border-border/80 p-5 sm:p-6 shadow-sm flex flex-col justify-between hover:border-border transition-all">
            <div className="space-y-4">
              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-border">
                    <Image
                      src={featuredPost.authorAvatar}
                      alt={featuredPost.authorName}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm sm:text-base font-bold text-foreground">
                        {featuredPost.authorName}
                      </h4>
                      {featuredPost.isVerified && (
                        <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500/10 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {featuredPost.authorHandle} • {featuredPost.timeAgo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Title & Body Content */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                  {featuredPost.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {featuredPost.content}
                </p>
              </div>

              {/* Media Image Attachment */}
              {featuredPost.imageUrl && (
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-border/60">
                  <Image
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              )}
            </div>

            {/* Interaction Bar */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-4 sm:gap-6">
                {/* Like Button */}
                <button
                  type="button"
                  onClick={() => toggleLike(featuredPost.id)}
                  className={`flex items-center gap-1.5 transition-colors cursor-pointer ${likedPostIds[featuredPost.id]
                      ? "text-rose-500 font-bold"
                      : "hover:text-foreground"
                    }`}
                >
                  <Heart
                    className={`w-4 h-4 ${likedPostIds[featuredPost.id] ? "fill-rose-500 text-rose-500" : ""
                      }`}
                  />
                  <span>
                    {featuredPost.likes + (likedPostIds[featuredPost.id] ? 1 : 0)}
                  </span>
                </button>

                {/* Comment Button */}
                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{featuredPost.comments}</span>
                </button>

                {/* Share Button */}
                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{featuredPost.shares}</span>
                </button>
              </div>

              {/* Bookmark Save Button */}
              <button
                type="button"
                onClick={() => toggleSave(featuredPost.id)}
                className={`p-1.5 rounded-lg hover:bg-muted transition-colors cursor-pointer ${savedPostIds[featuredPost.id] ? "text-blue-600 dark:text-blue-400" : ""
                  }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${savedPostIds[featuredPost.id] ? "fill-blue-600 dark:fill-blue-400" : ""
                    }`}
                />
              </button>
            </div>
          </div>

          {/* SIDE TRENDING POSTS LIST (Right 5 cols) - Gap 12px (gap-3) */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-between">
            {sidePosts.map((post) => {
              const isLiked = !!likedPostIds[post.id];
              return (
                <div
                  key={post.id}
                  className="group rounded-2xl bg-card border border-border/80 p-4 shadow-sm hover:border-border transition-all flex flex-col justify-between space-y-3"
                >
                  {/* Top Author Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-border">
                        <Image
                          src={post.authorAvatar}
                          alt={post.authorName}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold text-foreground truncate">
                          {post.authorName}
                        </h5>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {post.timeAgo}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body Content with Thumbnail */}
                  <div className="flex items-start gap-3 justify-between">
                    <div className="space-y-1 min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-bold text-foreground line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2">
                        {post.content}
                      </p>
                    </div>

                    {post.imageUrl && (
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-border/60">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="80px"
                        />
                      </div>
                    )}
                  </div>

                  {/* Bottom Stats */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1 transition-colors cursor-pointer ${isLiked ? "text-rose-500 font-semibold" : "hover:text-foreground"
                          }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500 text-rose-500" : ""
                            }`}
                        />
                        <span>{post.likes + (isLiked ? 1 : 0)}</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{post.comments}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSave(post.id)}
                      className="hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${savedPostIds[post.id] ? "fill-blue-600 dark:fill-blue-400 text-blue-600" : ""
                          }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
