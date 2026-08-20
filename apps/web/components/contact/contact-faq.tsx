"use client";

import React, { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  HelpCircle,
  Search,
  X,
  ChevronDown,
  Sparkles,
  Compass,
  Trophy,
  Building2,
  CreditCard,
  Smartphone,
  Users,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
} from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { CONTACT_FAQS, ContactFAQItem } from "@/data/contact-faqs";

type FAQCategory = "all" | "booking" | "matchmaking" | "partner" | "tournament" | "payment" | "tech";

export function ContactFAQ() {
  const t = useTranslations("contact_page");
  const locale = useLocale();
  const isEn = locale === "en";

  const [selectedCategory, setSelectedCategory] = useState<FAQCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(["faq-booking-1"]);

  const categoryList: { id: FAQCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "all", label: isEn ? "All FAQs" : "Tất cả câu hỏi", icon: Sparkles },
    { id: "booking", label: isEn ? "Players & Booking" : "Người chơi & Đặt sân", icon: Compass },
    { id: "matchmaking", label: isEn ? "Matchmaking & Rank" : "Ghép kèo & Rank ELO", icon: Users },
    { id: "partner", label: isEn ? "Venue Owners & POS" : "Chủ sân & Đối tác POS", icon: Building2 },
    { id: "tournament", label: isEn ? "Tournaments & Events" : "Giải đấu & Doanh nghiệp", icon: Trophy },
    { id: "payment", label: isEn ? "Payment & Refunds" : "Thanh toán & Hoàn tiền", icon: CreditCard },
    { id: "tech", label: isEn ? "PWA App & Security" : "Ứng dụng PWA & Bảo mật", icon: Smartphone },
  ];

  // Count items per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: CONTACT_FAQS.length };
    CONTACT_FAQS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter FAQs by Category and Search Term
  const filteredFaqs = useMemo(() => {
    return CONTACT_FAQS.filter((item) => {
      const matchCat = selectedCategory === "all" || item.category === selectedCategory;

      if (!searchQuery.trim()) return matchCat;

      const q = isEn ? item.qEn.toLowerCase() : item.qVi.toLowerCase();
      const a = isEn ? item.aEn.toLowerCase() : item.aVi.toLowerCase();
      const s = searchQuery.toLowerCase().trim();

      return matchCat && (q.includes(s) || a.includes(s));
    });
  }, [selectedCategory, searchQuery, isEn]);

  const toggleAccordion = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExpandAll = () => {
    setOpenFaqIds(filteredFaqs.map((f) => f.id));
  };

  const handleCollapseAll = () => {
    setOpenFaqIds([]);
  };

  // Structured Data (Schema.org FAQPage) for Generative Engine Optimization (GEO) & Google Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": CONTACT_FAQS.map((faq) => ({
      "@type": "Question",
      "name": isEn ? faq.qEn : faq.qVi,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": isEn ? faq.aEn : faq.aVi,
      },
    })),
  };

  return (
    <div id="faq" className="space-y-8 pt-8 scroll-mt-20">
      {/* Inject Structured Data Schema JSON-LD for AI Search Engines & Google Bot (GEO / SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header Section */}
      <div className="text-center space-y-2 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-accent-foreground bg-accent border border-border/80 shadow-2xs">
          <HelpCircle className="size-3.5" />
          <span>{isEn ? "Knowledge Base & AI GEO FAQ" : "Trung Tâm Giải Đáp & Kiến Thức PlayGrid"}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          {isEn ? "Frequently Asked Questions" : "Câu Hỏi Thường Gặp (FAQ)"}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal max-w-2xl mx-auto leading-relaxed">
          {isEn
            ? "Quick answers and detailed guides for players, venue partners, tournament organizers, and corporate teams across Vietnam."
            : "Giải đáp nhanh 40 thắc mắc phổ biến nhất dành cho người chơi, chủ sân, ban tổ chức giải đấu và doanh nghiệp trên toàn quốc."}
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-2xl mx-auto px-4">
        <form
          onSubmit={(e) => e.preventDefault()}
          toolname="search_help_faq"
          tooldescription="Search PlayGrid frequently asked questions, customer support guides, court booking policies, and partner documentation."
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-muted-foreground pointer-events-none" />
            <Input
              id="faq-search-query"
              name="query"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isEn
                  ? "Search by keyword (e.g., refund, badminton court, POS, ELO rank, invoice)..."
                  : "Tìm nhanh theo từ khóa (ví dụ: hoàn tiền, đặt sân cầu lông, POS chủ sân, rank ELO, hóa đơn VAT)..."
              }
              toolparamdescription="Search keyword or question about PlayGrid features and policies"
              className="w-full h-12 pl-11 pr-10 rounded-2xl bg-card border border-border shadow-xs text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-brand-blue/30"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </form>

        {/* Live Search Match Info */}
        {searchQuery.trim() && (
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 px-1">
            <span>
              {isEn
                ? `Found ${filteredFaqs.length} results matching "${searchQuery}"`
                : `Tìm thấy ${filteredFaqs.length} câu hỏi phù hợp với "${searchQuery}"`}
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-brand-blue dark:text-brand-green font-medium hover:underline cursor-pointer"
            >
              {isEn ? "Reset search" : "Xem tất cả"}
            </button>
          </div>
        )}
      </div>

      {/* Category Filter Tabs (Wrappable & Clean Responsive Layout) */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {categoryList.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-gradient-primary text-white border-transparent shadow-sm scale-102"
                    : "bg-card hover:bg-muted border-border/80 text-foreground/80 hover:text-foreground active:scale-95"
                }`}
              >
                <Icon className={`size-3.5 ${isSelected ? "text-white" : "text-brand-blue dark:text-brand-green"}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls Bar: Results count & Expand/Collapse All */}
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between text-xs text-muted-foreground border-b border-border/60 pb-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">
            {isEn ? `Showing ${filteredFaqs.length} of ${CONTACT_FAQS.length} questions` : `Hiển thị ${filteredFaqs.length} / ${CONTACT_FAQS.length} câu hỏi`}
          </span>
        </div>
        <div className="flex items-center gap-3 font-medium">
          <button
            type="button"
            onClick={handleExpandAll}
            className="hover:text-brand-blue dark:hover:text-brand-green hover:underline cursor-pointer"
          >
            {isEn ? "Expand all" : "Mở tất cả"}
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={handleCollapseAll}
            className="hover:text-brand-blue dark:hover:text-brand-green hover:underline cursor-pointer"
          >
            {isEn ? "Collapse all" : "Thu gọn"}
          </button>
        </div>
      </div>

      {/* Borderless Minimalist Clean FAQ List */}
      <div className="max-w-4xl mx-auto px-4 divide-y divide-border/60">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-border bg-card/40 space-y-3">
            <HelpCircle className="size-10 text-muted-foreground/60 mx-auto" />
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-foreground">
                {isEn ? "No matching questions found" : "Không tìm thấy câu hỏi phù hợp"}
              </h4>
              <p className="text-xs text-muted-foreground">
                {isEn
                  ? "Try adjusting your search terms or select another category."
                  : "Vui lòng thử tìm với từ khóa khác hoặc liên hệ trực tiếp với bộ phận hỗ trợ."}
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="rounded-xl text-xs cursor-pointer"
            >
              {isEn ? "View all 40 FAQs" : "Xem toàn bộ 40 câu hỏi"}
            </Button>
          </div>
        ) : (
          filteredFaqs.map((item, index) => {
            const isOpen = openFaqIds.includes(item.id);
            const question = isEn ? item.qEn : item.qVi;
            const answer = isEn ? item.aEn : item.aVi;
            const categoryLabel = isEn ? item.categoryLabelEn : item.categoryLabelVi;

            return (
              <div
                key={item.id}
                className="py-4 sm:py-5 transition-colors group"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between text-left cursor-pointer gap-3 sm:gap-4 py-1"
                >
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                    <span className={`flex size-6 sm:size-6.5 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors mt-0.5 ${
                      isOpen
                        ? "bg-brand-blue text-white dark:bg-brand-green dark:text-background"
                        : "bg-muted text-muted-foreground group-hover:bg-brand-blue/10 group-hover:text-brand-blue dark:group-hover:text-brand-green"
                    }`}>
                      {index + 1}
                    </span>
                    <div className="space-y-1">
                      <div className="text-[11px] font-medium text-primary">
                        {categoryLabel}
                      </div>
                      <span className={`text-xs sm:text-sm sm:leading-relaxed font-semibold transition-colors block ${
                        isOpen ? "text-brand-blue dark:text-brand-green" : "text-foreground group-hover:text-brand-blue dark:group-hover:text-brand-green"
                      }`}>
                        {question}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`size-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 mt-1 ${
                      isOpen
                        ? "rotate-180 bg-brand-blue/10 text-brand-blue dark:bg-brand-green/10 dark:text-brand-green"
                        : "bg-muted/60 text-muted-foreground group-hover:bg-muted group-hover:text-foreground"
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-3 pb-1 pl-9 sm:pl-10.5 pr-2 sm:pr-8 text-xs sm:text-[13px] text-muted-foreground font-normal leading-relaxed animate-in fade-in-50 duration-200">
                    <p className="whitespace-pre-line text-foreground/90 leading-relaxed">{answer}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions CTA Banner */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-brand-blue/5 via-background to-brand-green/5 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <CheckCircle2 className="size-4 text-brand-green" />
              <h4 className="font-bold text-sm sm:text-base text-foreground">
                {isEn ? "Still have questions or need custom assistance?" : "Vẫn chưa tìm thấy câu trả lời cho thắc mắc của bạn?"}
              </h4>
            </div>
            <p className="text-xs text-muted-foreground max-w-xl">
              {isEn
                ? "Our sports specialists and technical support team are ready 24/7 to assist venue owners, players, and tournament organizers."
                : "Đội ngũ chuyên viên thể thao và kỹ thuật PlayGrid luôn sẵn sàng hỗ trợ trực tiếp 24/7."}
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="tel:19006868"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-primary text-white shadow-xs hover:opacity-95 transition-all cursor-pointer active:scale-95"
            >
              <PhoneCall className="size-3.5" />
              <span>1900 6868</span>
            </a>
            <a
              href="#contact-form"
              onClick={(e) => {
                const el = document.getElementById("contact-form");
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-card border border-border hover:bg-muted text-foreground transition-all cursor-pointer"
            >
              <MessageSquare className="size-3.5" />
              <span>{isEn ? "Send Message" : "Gửi tin nhắn"}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
