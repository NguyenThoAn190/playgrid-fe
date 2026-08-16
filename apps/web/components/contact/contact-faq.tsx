"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export function ContactFAQ() {
  const t = useTranslations("contact_page");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: t("faq.q1"),
      a: t("faq.a1"),
    },
    {
      q: t("faq.q2"),
      a: t("faq.a2"),
    },
    {
      q: t("faq.q3"),
      a: t("faq.a3"),
    },
    {
      q: t("faq.q4"),
      a: t("faq.a4"),
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6 pt-6">
      <div className="text-center space-y-1 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-blue dark:text-brand-green">
          <HelpCircle className="size-3.5" />
          <span>Giải đáp nhanh</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {t("faq.title")}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal">
          {t("faq.subtitle")}
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "border-brand-blue/40 dark:border-brand-green/40 bg-card shadow-xs"
                  : "border-border/70 bg-card/60 hover:border-border"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-foreground cursor-pointer group"
              >
                <span className="pr-4">{item.q}</span>
                <ChevronDown
                  className={`size-4 text-muted-foreground transition-transform duration-200 shrink-0 ${
                    isOpen ? "rotate-180 text-brand-blue dark:text-brand-green" : "group-hover:text-foreground"
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed border-t border-border/40 pt-3 animate-in fade-in-50 duration-200">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
