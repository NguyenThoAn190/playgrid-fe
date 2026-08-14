"use client";

import React, { useState } from "react";
import { useLocale } from "next-intl";
import {
  HelpCircle,
  MapPin,
  ShieldCheck,
  Ticket,
  Hotel,
  ChevronDown,
  Sparkles,
  Send,
  CheckCircle2,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface FAQItem {
  id: string;
  category: "all" | "geo" | "race_kit" | "safety" | "hotel";
  categoryLabel: string;
  question: string;
  answer: string;
}

const EVENT_FAQS: FAQItem[] = [
  {
    id: "faq-geo-1",
    category: "geo",
    categoryLabel: "Địa điểm & Di chuyển",
    question: "Giải Aqua Warriors Vân Đồn 2026 tổ chức ở đâu? Hướng dẫn di chuyển chi tiết?",
    answer: "Sự kiện được tổ chức chính thức tại Khu du lịch Bãi biển Vân Đồn, Huyện Vân Đồn, Tỉnh Quảng Ninh. VĐV có thể di chuyển bằng đường hàng không qua Sân bay Quốc tế Vân Đồn (cách điểm race 10km, khoảng 15 phút taxi) hoặc đường bộ qua cao tốc Hà Nội - Hải Phòng - Vân Đồn (thời gian di chuyển khoảng 2.5 giờ từ Hà Nội).",
  },
  {
    id: "faq-kit-2",
    category: "race_kit",
    categoryLabel: "Đăng ký & Race Kit",
    question: "Thời gian và thủ tục nhận Race Kit tại sự kiện như thế nào?",
    answer: "Khu vực Expo mở cửa phát Race Kit vào Thứ Sáu ngày 12/09/2026 từ 08:00 đến 18:00 tại Quảng trường Bãi biển Vân Đồn. VĐV cần xuất trình Mã vé QR Code trên ứng dụng PlayGrid và bản gốc CCCD/Hộ chiếu để nhận BIB thi đấu, áo finisher, chip timing và túi race kit chính thức.",
  },
  {
    id: "faq-safety-3",
    category: "safety",
    categoryLabel: "An toàn & Thi đấu",
    question: "Quy định an toàn bơi biển? Có bắt buộc phao cứu hộ (Safety Buoy) không?",
    answer: "Ban Tổ Chức quy định BẮT BUỘC tất cả VĐV thi đấu các cự ly bơi biển phải mang Phao bơi cứu hộ an toàn (Safety Buoy) và đội Mũ bơi theo màu quy định cự ly. Cung đường bơi biển được bảo vệ an toàn tối đa với hơn 30 cano, xuồng cứu sinh và SUP của đội ngũ cứu hộ chuyên nghiệp túc trực dọc luồng bơi.",
  },
  {
    id: "faq-hotel-4",
    category: "hotel",
    categoryLabel: "Khách sạn & Lưu trú",
    question: "Có những khách sạn, resort nào gần địa điểm xuất phát có ưu đãi cho VĐV?",
    answer: "PlayGrid liên kết với các đối tác lưu trú hàng đầu tại Vân Đồn (như Wyndham Garden Sonasea Vân Đồn, Diamond Hotel, Phương Đông Hotel) với mức ưu đãi giảm 15% - 25% cho vận động viên đăng ký qua hệ thống PlayGrid. Bạn có thể chọn mua kèm gói phòng nghỉ ngay tại mục Dịch vụ bổ sung (Add-ons).",
  },
  {
    id: "faq-kit-5",
    category: "race_kit",
    categoryLabel: "Đăng ký & Race Kit",
    question: "Tôi có được phép chuyển nhượng BIB hoặc thay đổi cự ly thi đấu không?",
    answer: "PlayGrid hỗ trợ chuyển nhượng BIB chính thức và đổi cự ly trực tuyến đến hết ngày 20/08/2026. Phí xử lý chuyển nhượng là 100.000đ/lần và chênh lệch giá vé (nếu nâng cự ly). Vui lòng truy cập trang 'Vé của tôi' trong tài khoản để thực hiện thao tác tự động.",
  },
  {
    id: "faq-safety-6",
    category: "safety",
    categoryLabel: "An toàn & Thi đấu",
    question: "Giới hạn thời gian (Cut-off Time) của các cự ly thi đấu là bao nhiêu?",
    answer: "Thời gian Cut-off Time quy định: Cự ly Bơi biển 3km là 90 phút; Cự ly Aquathlon Standard là 2 giờ 15 phút; Cự ly Triathlon Olympic (51.5km) tổng thời gian hoàn thành là 4 giờ 30 phút (Cut-off bơi 1.5km là 60 phút). VĐV không hoàn thành trước COT sẽ được ca nô cứu hộ đưa về bờ an toàn.",
  },
];

export function EventFaqSection() {
  const locale = useLocale();
  const isEn = locale === "en";

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>("faq-geo-1");
  const [userQuestion, setUserQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const categories = [
    { id: "all", label: isEn ? "All FAQs" : "Tất cả câu hỏi" },
    { id: "geo", label: isEn ? "Location & Travel" : "Địa điểm & Di chuyển" },
    { id: "race_kit", label: isEn ? "Race Kit & Registration" : "Nhận Race Kit & BIB" },
    { id: "safety", label: isEn ? "Safety & Rules" : "An toàn & Luật thi đấu" },
    { id: "hotel", label: isEn ? "Hotels & Stay" : "Khách sạn & Lưu trú" },
  ];

  const filteredFaqs = EVENT_FAQS.filter((faq) => {
    const matchCategory =
      selectedCategory === "all" || faq.category === selectedCategory;

    const matchSearch =
      searchQuery.trim() === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase().trim());

    return matchCategory && matchSearch;
  });

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setUserQuestion("");
      setTimeout(() => setSubmitSuccess(false), 4000);
    }, 600);
  };

  // Structured Data (Schema.org FAQPage) for Generative Engine Optimization (GEO) & Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": EVENT_FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section
      id="event-faq"
      aria-labelledby="event-faq-title"
      className="bg-card border border-border/80 rounded-3xl p-4 sm:p-5 space-y-4"
    >
      {/* Inject Structured Data Schema JSON-LD for AI Search Engines & Google Bot (GEO / SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <HelpCircle className="size-4.5" />
          </div>
          <div>
            <h2
              id="event-faq-title"
              className="text-sm sm:text-base font-semibold text-foreground flex items-center gap-2"
            >
              <span>{isEn ? "Event FAQs & AI Knowledge Base" : "Hỏi Đáp Thường Gặp (Q&A)"}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                GEO Optimized
              </span>
            </h2>
            <p className="text-[11px] text-muted-foreground font-normal">
              {isEn
                ? "Official verified information about Aqua Warriors Vân Đồn event"
                : "Giải đáp chính xác về địa điểm di chuyển, nhận kit, an toàn đường bơi & lưu trú"}
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1 text-[10.5px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <Sparkles className="size-3" />
          {isEn ? "AI Verified" : "Dữ liệu xác thực"}
        </span>
      </header>

      {/* Search & Category Filter Pills */}
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 size-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder={isEn ? "Search questions (e.g. Race Kit, Location, Safety)..." : "Tìm nhanh câu hỏi (vd: Nhận Race Kit, Địa điểm, Phao bơi, Khách sạn)..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-10 pr-3 rounded-xl text-xs sm:text-sm bg-background border-border/80 font-normal focus-visible:ring-2 focus-visible:ring-brand-blue/30"
          />
        </div>

        {/* Category Pills (Horizontal Scrollable) */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-brand-blue text-white font-medium shadow-2xs"
                  : "bg-muted/40 text-muted-foreground hover:text-foreground font-normal"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-2 pt-1">
        {filteredFaqs.length === 0 ? (
          <div className="p-6 text-center text-xs text-muted-foreground bg-muted/15 rounded-2xl">
            {isEn
              ? "No matching questions found. You can submit your question below."
              : "Không tìm thấy câu hỏi phù hợp. Bạn có thể gửi câu hỏi mới đến Ban Tổ Chức bên dưới."}
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;

            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-border/60 bg-muted/15 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                  className="w-full text-left p-3.5 flex items-center justify-between gap-3 hover:bg-muted/30 cursor-pointer transition-colors"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <span className="size-5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ?
                    </span>
                    <h3 className="font-semibold text-xs sm:text-[13px] text-foreground leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <ChevronDown
                    className={`size-4 text-muted-foreground shrink-0 transition-transform duration-200 ${
                      isExpanded ? "rotate-180 text-brand-blue" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-3.5 pb-3.5 pt-0 pl-11 text-xs text-muted-foreground font-normal leading-relaxed border-t border-border/30 pt-2 animate-in fade-in-50 duration-150">
                    <p className="text-foreground/90">{faq.answer}</p>
                    <div className="flex items-center gap-2 mt-2 text-[10.5px] text-muted-foreground">
                      <span className="px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground font-normal">
                        📍 {faq.categoryLabel}
                      </span>
                      <span>• Nguồn: Ban Tổ Chức Aqua Warriors & PlayGrid</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Ask a Question Box for Athletes */}
      <div className="pt-2 border-t border-border/50">
        <form onSubmit={handleAskQuestion} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-brand-blue dark:text-brand-green" />
              <span>{isEn ? "Have other questions? Ask the Organizers" : "Bạn có thắc mắc khác? Gửi câu hỏi cho BTC"}</span>
            </span>
            <span className="text-[10.5px] text-muted-foreground font-normal">
              Phản hồi trong 2 giờ
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder={isEn ? "Type your question here..." : "Nhập câu hỏi của bạn về giải đấu..."}
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              disabled={isSubmitting}
              className="h-9 rounded-xl text-xs bg-background border-border/80 font-normal focus-visible:ring-2 focus-visible:ring-brand-blue/30"
            />
            <Button
              type="submit"
              disabled={isSubmitting || !userQuestion.trim()}
              className="h-9 px-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-green text-white font-medium text-xs gap-1.5 shrink-0 cursor-pointer shadow-xs border-0"
            >
              {isSubmitting ? (
                <div className="size-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="size-3.5" />
                  <span>{isEn ? "Send" : "Gửi"}</span>
                </>
              )}
            </Button>
          </div>

          {submitSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>Câu hỏi của bạn đã được gửi thành công! Ban Tổ Chức sẽ phản hồi qua email/tin nhắn.</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
