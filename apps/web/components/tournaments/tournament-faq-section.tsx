"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface TournamentFaqSectionProps {
  faqs: { question: string; answer: string }[];
}

export function TournamentFaqSection({ faqs }: TournamentFaqSectionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="space-y-4">
      <div className="pb-1">
        <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          <span>Câu hỏi thường gặp của vận động viên (FAQs)</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
          Giải đáp các thắc mắc phổ biến về thủ tục đăng ký, check-in và quy định chuyển nhượng.
        </p>
      </div>

      <div className="space-y-2.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={idx}
              className="bg-card border border-border/80 rounded-xl sm:rounded-2xl overflow-hidden transition-all shadow-2xs"
            >
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-primary shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />
                )}
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-4 pt-2 text-xs sm:text-sm text-foreground/90 border-t border-border/50 leading-relaxed font-normal animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
