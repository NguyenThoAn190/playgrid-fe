"use client";

import React from "react";
import { Check } from "lucide-react";

export interface StepItem {
  step: number;
  label: string;
  description?: string;
}

interface CheckoutStepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function CheckoutStepper({
  steps,
  currentStep,
  onStepClick,
}: CheckoutStepperProps) {
  return (
    <div className="w-full bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-sm overflow-hidden">
      <div className="max-w-md mx-auto flex items-start sm:items-center justify-between gap-1 sm:gap-3">
        {steps.map((item, index) => {
          const isCompleted = currentStep > item.step;
          const isActive = currentStep === item.step;
          const isClickable = isCompleted && onStepClick;
          const cleanLabel = item.label.replace(/^\d+\.\s*/, "");

          return (
            <React.Fragment key={item.step}>
              {/* Step Item: Dọc trên mobile (chữ xuống hàng dưới icon), Ngang trên desktop */}
              <div
                onClick={() => {
                  if (isClickable && onStepClick) {
                    onStepClick(item.step);
                  }
                }}
                className={`flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 select-none shrink-0 ${
                  isClickable ? "cursor-pointer group" : "cursor-default"
                }`}
              >
                {/* Step Circle Badge */}
                <div
                  className={`size-6 sm:size-7 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-semibold shrink-0 transition-all duration-200 border-2 ${
                    isCompleted
                      ? "bg-emerald-500 border-emerald-500 text-white shadow-xs group-hover:scale-105"
                      : isActive
                      ? "bg-brand-blue dark:bg-brand-green border-brand-blue dark:border-brand-green text-white dark:text-slate-900 shadow-sm ring-2 ring-brand-blue/20 dark:ring-brand-green/20"
                      : "bg-muted/60 border-border text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="size-3 sm:size-3.5 stroke-[2.5]" />
                  ) : (
                    <span>{item.step}</span>
                  )}
                </div>

                {/* Step Label: Xuống hàng dưới badge trên mobile, nằm ngang trên desktop */}
                <span
                  className={`text-[11px] sm:text-sm text-center sm:text-left transition-colors whitespace-nowrap ${
                    isActive
                      ? "text-brand-blue dark:text-brand-green font-semibold"
                      : isCompleted
                      ? "text-foreground group-hover:text-brand-blue dark:group-hover:text-brand-green font-medium"
                      : "text-muted-foreground font-normal"
                  }`}
                >
                  {cleanLabel}
                </span>
              </div>

              {/* Connecting line STRICTLY between badges (căn chuẩn tâm icon trên mobile mt-3) */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-[2px] min-w-[16px] sm:min-w-[24px] rounded-full bg-border/80 overflow-hidden mx-1.5 sm:mx-2.5 mt-3 sm:mt-0">
                  <div
                    className={`h-full bg-gradient-primary transition-all duration-300 ${
                      currentStep > item.step ? "w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
