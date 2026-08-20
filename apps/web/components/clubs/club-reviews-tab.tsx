"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, CheckCircle2, MessageSquare, ThumbsUp, Send } from "lucide-react";
import { ClubDetailData, ClubReview } from "@/lib/clubs-data";
import { Button } from "@/components/ui/button";

export interface ClubReviewsTabProps {
  club: ClubDetailData;
}

export function ClubReviewsTab({ club }: ClubReviewsTabProps) {
  const reviews = club.reviewsList || [];
  const [userRating, setUserRating] = useState(5);
  const [commentText, setCommentText] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState<ClubReview[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newRev: ClubReview = {
      id: `rev-user-${Date.now()}`,
      authorName: "Bạn (Hội viên PlayGrid)",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      rating: userRating,
      date: "Vừa xong",
      comment: commentText,
      verifiedMember: true,
    };

    setSubmittedReviews([newRev, ...submittedReviews]);
    setCommentText("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const allReviews = [...submittedReviews, ...reviews];

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border/80 rounded-2xl p-4 sm:p-6 shadow-2xs space-y-6">
        {/* Rating Overview Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" />
              <span>Đánh Giá Từ Cộng Đồng & Hội Viên</span>
            </h2>
            <p className="text-xs text-muted-foreground font-normal mt-0.5">
              Tất cả đánh giá được gửi từ các hội viên đã từng tham gia sinh hoạt thực tế tại CLB.
            </p>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
            <div className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400">
              {club.rating.toFixed(1)}
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-500" />
                ))}
              </div>
              <div className="text-[11px] text-muted-foreground font-medium">
                {club.reviewCount} lượt đánh giá
              </div>
            </div>
          </div>
        </div>

        {/* Submit Review Form */}
        <form
          onSubmit={handleSubmitReview}
          className="p-4 rounded-2xl bg-muted/40 border border-border/70 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-foreground">
              Viết nhận xét của bạn
            </h3>
            {/* Star Selector */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setUserRating(star)}
                  className="p-1 cursor-pointer hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= userRating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <textarea
            rows={2}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Chia sẻ cảm nhận của bạn về chất lượng sân bãi, không khí giao lưu hoặc ban chủ nhiệm..."
            className="w-full px-3.5 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
          />

          <div className="flex items-center justify-between pt-1">
            {showSuccess ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Cảm ơn bạn đã gửi đánh giá!</span>
              </span>
            ) : (
              <span className="text-[11px] text-muted-foreground font-normal">
                Đánh giá của bạn sẽ được hiển thị công khai.
              </span>
            )}

            <Button
              type="submit"
              className="h-9 px-4 rounded-xl bg-gradient-primary text-white font-bold text-xs shadow-2xs hover:opacity-95 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 mr-1" />
              <span>Gửi Đánh Giá</span>
            </Button>
          </div>
        </form>

        {/* Reviews List */}
        <div className="space-y-3 pt-2">
          {allReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 rounded-2xl bg-muted/20 border border-border/60 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-border">
                    <Image
                      src={rev.authorAvatar}
                      alt={rev.authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-bold text-foreground">
                        {rev.authorName}
                      </span>
                      {rev.verifiedMember && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground">
                      {rev.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-foreground/90 font-normal leading-relaxed pl-10">
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
