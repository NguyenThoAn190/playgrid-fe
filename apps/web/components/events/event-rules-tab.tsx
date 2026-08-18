"use client";

import React from "react";
import { useLocale } from "next-intl";
import {
  FileCheck,
  ShieldAlert,
  Clock,
  HeartHandshake,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export function EventRulesTab() {
  const locale = useLocale();
  const isEn = locale === "en";

  return (
    <div className="space-y-4">
      {/* 1. Official Regulations & Requirements Card */}
      <section className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 shadow-2xs">
        <header className="flex items-center justify-between border-b border-border/50 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground">
                {isEn ? "Official Race Regulations & Safety Rules" : "Điều lệ giải đấu & quy định an toàn bắt buộc"}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
                {isEn ? "Applied for all athletes participating in Aqua Warriors" : "Áp dụng cho toàn bộ VĐV đăng ký tham gia thi đấu"}
              </p>
            </div>
          </div>
        </header>

        <div className="space-y-3.5 text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
          <div className="p-4 rounded-xl sm:rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-foreground font-semibold text-xs sm:text-sm block">
                {isEn ? "Mandatory Safety Equipment:" : "Quy định trang thiết bị an toàn bắt buộc:"}
              </span>
              <p className="text-xs text-muted-foreground font-normal mt-0.5 leading-relaxed">
                Vận động viên thi đấu các nội dung bơi biển bắt buộc phải mang <strong className="font-semibold text-foreground/90">Phao bơi cứu hộ an toàn (Safety Buoy)</strong> và đội <strong className="font-semibold text-foreground/90">Mũ bơi chính thức của BTC</strong>. Trọng tài có quyền từ chối xuất phát nếu VĐV không tuân thủ.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-4 rounded-xl sm:rounded-2xl border border-border/70 bg-muted/30 space-y-2">
              <div className="font-semibold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Độ tuổi quy định:</span>
              </div>
              <p className="text-xs text-muted-foreground font-normal leading-relaxed">
                - Triathlon Olympic (51.5km): Từ đủ 18 tuổi trở lên.<br />
                - Aquathlon Standard: Từ đủ 16 tuổi trở lên.<br />
                - Kid Warriors: Từ 6 đến 12 tuổi (có giấy bảo lãnh phụ huynh).
              </p>
            </div>

            <div className="p-4 rounded-xl sm:rounded-2xl border border-border/70 bg-muted/30 space-y-2">
              <div className="font-semibold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Giới hạn thời gian (Cut-off Time):</span>
              </div>
              <p className="text-xs text-muted-foreground font-normal leading-relaxed">
                - Bơi biển 1.5km: <span className="font-semibold text-foreground/90 font-mono">60 phút</span> (COT: 07:00).<br />
                - Tổng thời gian hoàn thành Olympic: <span className="font-semibold text-foreground/90 font-mono">4 giờ 30 phút</span>.<br />
                - Aquathlon Standard: <span className="font-semibold text-foreground/90 font-mono">2 giờ 15 phút</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BIB Transfer & Cancellation Policy */}
      <section className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 shadow-2xs">
        <header className="flex items-center gap-2.5 border-b border-border/50 pb-3">
          <div className="size-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <HeartHandshake className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground">
              {isEn ? "BIB Transfer & Cancellation Policy" : "Chính sách chuyển nhượng BIB & hoàn vé"}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
              {isEn ? "PlayGrid flexible athlete protection policies" : "Quyền lợi bảo vệ vận động viên minh bạch từ PlayGrid"}
            </p>
          </div>
        </header>

        <div className="space-y-2 text-xs sm:text-sm text-foreground/90 font-normal leading-relaxed">
          <p>
            - <strong className="font-semibold text-foreground">Chuyển nhượng BIB chính thức</strong>: Cho phép chuyển nhượng thông tin VĐV hoặc thay đổi cự ly trước ngày <strong className="font-semibold text-foreground">20/08/2026</strong> qua cổng quản lý vé PlayGrid (phí hỗ trợ 100.000đ).
          </p>
          <p>
            - <strong className="font-semibold text-foreground">Bảo hiểm thi đấu</strong>: Tất cả các gói vé đăng ký hợp lệ qua PlayGrid đều bao gồm gói <strong className="font-semibold text-foreground">Bảo hiểm tai nạn thể thao</strong> mức bồi thường tối đa 100.000.000đ/vụ.
          </p>
          <p>
            - <strong className="font-semibold text-foreground">Hủy vé do trường hợp bất khả kháng</strong>: Hoàn 100% tiền vé về Ví PlayGrid nếu giải đấu bị dời hoặc hủy do thiên tai, bão biển.
          </p>
        </div>
      </section>

      {/* 3. Frequently Asked Questions (FAQs) */}
      <section className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xs space-y-4">
        <header className="flex items-center gap-2.5 border-b border-border/50 pb-3">
          <div className="size-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground">
              {isEn ? "Frequently Asked Questions (FAQs)" : "Câu hỏi thường gặp"}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
              {isEn ? "Common questions about registration & race day" : "Giải đáp thắc mắc phổ biến trước ngày thi đấu"}
            </p>
          </div>
        </header>

        <div className="space-y-3 text-xs sm:text-sm">
          <details className="p-4 rounded-xl sm:rounded-2xl border border-border/70 bg-muted/20 group cursor-pointer">
            <summary className="font-semibold text-foreground list-none flex items-center justify-between text-xs sm:text-sm">
              <span>1. Tôi cần mang giấy tờ gì khi đến nhận Race Kit tại Expo?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform text-xs">⌄</span>
            </summary>
            <p className="text-muted-foreground font-normal mt-2 leading-relaxed text-xs">
              Bạn cần xuất trình <strong className="font-semibold text-foreground/90">Mã QR Vé điện tử</strong> (trong app PlayGrid hoặc Email xác nhận) và bản gốc <strong className="font-semibold text-foreground/90">CCCD / Hộ chiếu</strong>. Nếu nhận hộ, cần có Giấy ủy quyền có chữ ký của VĐV.
            </p>
          </details>

          <details className="p-4 rounded-xl sm:rounded-2xl border border-border/70 bg-muted/20 group cursor-pointer">
            <summary className="font-semibold text-foreground list-none flex items-center justify-between text-xs sm:text-sm">
              <span>2. Người mới tham gia bơi biển lần đầu có được cứu hộ hỗ trợ không?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform text-xs">⌄</span>
            </summary>
            <p className="text-muted-foreground font-normal mt-2 leading-relaxed text-xs">
              Đội ngũ cứu hộ chuyên nghiệp (SUP, Cano và nhân viên cứu sinh) túc trực dọc đường bơi cách mỗi 50m. Nếu bị mệt hoặc chuột rút, bạn chỉ cần bám vào phao an toàn và vẫy tay báo hiệu để được cano hỗ trợ ngay.
            </p>
          </details>

          <details className="p-4 rounded-xl sm:rounded-2xl border border-border/70 bg-muted/20 group cursor-pointer">
            <summary className="font-semibold text-foreground list-none flex items-center justify-between text-xs sm:text-sm">
              <span>3. Khi nào có kết quả chính thức và chứng nhận Finisher?</span>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform text-xs">⌄</span>
            </summary>
            <p className="text-muted-foreground font-normal mt-2 leading-relaxed text-xs">
              Ngay sau khi cán đích, thời gian Chip Time của bạn sẽ được cập nhật trực tiếp tại Tab <strong className="font-semibold text-foreground/90">Kết quả & Thành tích</strong> trên PlayGrid và chứng nhận điện tử E-Certificate sẽ sẵn sàng để tải về trong vòng 30 phút.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
