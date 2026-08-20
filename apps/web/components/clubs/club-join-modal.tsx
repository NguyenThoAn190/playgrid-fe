"use client";

import React, { useState } from "react";
import { X, CheckCircle2, UserPlus, Sparkles, Shield } from "lucide-react";
import { ClubDetailData } from "@/lib/clubs-data";
import { Button } from "@/components/ui/button";

export interface ClubJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  club: ClubDetailData;
}

const SKILL_LEVELS = [
  "Người mới chơi / Căn bản (Dưới 2.5)",
  "Phong trào trung bình (2.5 - 3.5)",
  "Khá / Đánh tốt (3.5 - 4.5)",
  "Bán chuyên / VĐV thi đấu (4.5+)",
];

export function ClubJoinModal({ isOpen, onClose, club }: ClubJoinModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [skillLevel, setSkillLevel] = useState(SKILL_LEVELS[1]);
  const [selectedPlanId, setSelectedPlanId] = useState(
    club.membershipPlans?.[1]?.id || club.membershipPlans?.[0]?.id || "monthly"
  );
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-card border border-border shadow-sm overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 pb-3 border-b border-border/60 bg-muted/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">
                Gia Nhập {club.name}
              </h2>
              <p className="text-xs text-muted-foreground font-normal">
                Điền thông tin để ban chủ nhiệm liên hệ xếp lịch và chuẩn bị slot trên sân.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3 my-auto">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/20 animate-in zoom-in-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Đăng Ký Thành Công!</h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal max-w-sm mx-auto">
              Ban quản trị {club.name} đã nhận được hồ sơ của bạn và sẽ liên hệ qua Zalo / Số điện thoại trong thời gian sớm nhất!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1">
            {/* Họ tên */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <span>Họ và tên của bạn</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn An"
                className="w-full px-3.5 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Số điện thoại / Zalo */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <span>Số điện thoại / Zalo</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ví dụ: 0908 123 456"
                className="w-full px-3.5 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Trình độ hiện tại */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                Trình độ chơi hiện tại của bạn
              </label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground focus:outline-none focus:border-primary"
              >
                {SKILL_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Gói thành viên mong muốn */}
            {club.membershipPlans && club.membershipPlans.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">
                  Chọn gói hội viên quan tâm
                </label>
                <div className="space-y-2">
                  {club.membershipPlans.map((plan) => (
                    <label
                      key={plan.id}
                      className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                        selectedPlanId === plan.id
                          ? "bg-primary/10 border-primary shadow-2xs"
                          : "bg-background border-border/80 hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="membershipPlan"
                          checked={selectedPlanId === plan.id}
                          onChange={() => setSelectedPlanId(plan.id)}
                          className="w-4 h-4 text-primary"
                        />
                        <span className="text-xs font-bold text-foreground">
                          {plan.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-primary">
                        {plan.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Ghi chú thêm */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">
                Ghi chú thêm (Vị trí sở trường, khung giờ rảnh...)
              </label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ví dụ: Đánh đôi lưới tốt, rảnh các tối 3-5-7..."
                className="w-full px-3.5 py-2 rounded-xl bg-background border border-border/80 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-border/60 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="rounded-xl font-semibold text-xs sm:text-sm h-9 sm:h-10 px-4 cursor-pointer"
              >
                Huỷ bỏ
              </Button>
              <Button
                type="submit"
                className="rounded-xl font-bold text-xs sm:text-sm h-9 sm:h-10 px-5 bg-gradient-primary text-white shadow-2xs cursor-pointer"
              >
                Gửi Đăng Ký
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
