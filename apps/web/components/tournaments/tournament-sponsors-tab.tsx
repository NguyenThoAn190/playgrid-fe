"use client";

import React, { useState } from "react";
import {
  Handshake,
  Sparkles,
  Phone,
  Mail,
  FileDown,
  CheckCircle2,
  TrendingUp,
  Users,
  Eye,
  Megaphone,
  Check,
  Send,
  Building2,
  Store,
  Tv,
  Gift,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import {
  TournamentSponsor,
  TournamentSponsorshipPackage,
} from "@/lib/tournaments-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TournamentSponsorsTabProps {
  tournamentTitle: string;
  currentSponsors?: TournamentSponsor[];
  sponsorshipPackages?: TournamentSponsorshipPackage[];
}

export function TournamentSponsorsTab({
  tournamentTitle,
  currentSponsors = [],
  sponsorshipPackages = [],
}: TournamentSponsorsTabProps) {
  // Form state
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interestType, setInterestType] = useState("Nhận diện thương hiệu độc quyền");
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !phone.trim()) return;

    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setCompanyName("");
      setContactName("");
      setPhone("");
      setEmail("");
      setMessage("");
    }, 2500);
  };

  return (
    <div className="space-y-5">
      {/* 1. Header Hero Banner */}
      <div className="rounded-2xl sm:rounded-3xl border border-primary/20 bg-primary/5 p-5 sm:p-7 shadow-2xs space-y-3">
        <div className="space-y-1.5 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Handshake className="w-3.5 h-3.5" />
            <span>Cơ hội hợp tác & tài trợ giải đấu</span>
          </div>

          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Đồng hành & nâng tầm thương hiệu cùng {tournamentTitle}
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-relaxed">
            Giải đấu là cơ hội lý tưởng để các thương hiệu tiếp cận trực tiếp hàng ngàn vận động viên, người đam mê thể thao và cộng đồng khách hàng tiềm năng năng động trên toàn quốc.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <a
            href="#sponsor-contact"
            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs sm:text-sm shadow-2xs transition-all flex items-center gap-2"
          >
            <Megaphone className="w-4 h-4" />
            <span>Liên hệ tài trợ ngay</span>
          </a>

          <a
            href="tel:0901234567"
            className="px-4 py-2.5 rounded-xl border border-border/80 bg-card hover:bg-muted text-foreground font-medium text-xs sm:text-sm transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Hotline: 0901 234 567</span>
          </a>
        </div>
      </div>

      {/* 2. Sponsorship Opportunities Overview */}
      <div className="space-y-3.5">
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground">
            Hình thức đồng hành & quyền lợi tài trợ
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
            Chúng tôi thiết kế linh hoạt các hình thức hợp tác phù hợp với mục tiêu truyền thông và ngân sách của từng doanh nghiệp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Card 1: Nhận diện thương hiệu độc quyền */}
          <div className="bg-card border border-border/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-2.5 shadow-2xs">
            <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-foreground">
              Nhận diện thương hiệu độc quyền
            </h3>
            <p className="text-xs text-muted-foreground font-normal leading-relaxed">
              Tên giải đấu gắn liền cùng thương hiệu. Logo vị trí trung tâm trên Backdrop họp báo, Sân thi đấu chính, Áo đấu VĐV và Cúp Vô Địch mạ vàng.
            </p>
            <ul className="space-y-1 text-xs text-foreground/90 font-normal pt-1">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Logo thảm thi đấu BWF & Bảng điện tử LED</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Vinh danh trao Cúp & Đại diện phát biểu khai mạc</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Gian hàng trải nghiệm & Bán hàng */}
          <div className="bg-card border border-border/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-2.5 shadow-2xs">
            <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-foreground">
              Gian hàng trưng bày & bán hàng (Booth / Pro-Shop)
            </h3>
            <p className="text-xs text-muted-foreground font-normal leading-relaxed">
              Bố trí không gian Pro-Shop và khu vực trải nghiệm sản phẩm trực tiếp từ 12m² - 24m² tại sảnh đón tiếp Nhà thi đấu đón hàng ngàn lượt khách mỗi ngày.
            </p>
            <ul className="space-y-1 text-xs text-foreground/90 font-normal pt-1">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Tương tác và dùng thử sản phẩm trực tiếp</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Phát voucher ưu đãi độc quyền cho VĐV</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Truyền thông đa kênh & Livestream */}
          <div className="bg-card border border-border/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-2.5 shadow-2xs">
            <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Tv className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-foreground">
              Truyền thông đa nền tảng & Livestream
            </h3>
            <p className="text-xs text-muted-foreground font-normal leading-relaxed">
              Chiến dịch phủ sóng truyền thông trước, trong và sau giải đấu trên hệ thống Báo chí thể thao, Fanpage, Website PlayGrid và Livestream HD các trận đấu kịch tính.
            </p>
            <ul className="space-y-1 text-xs text-foreground/90 font-normal pt-1">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Hiển thị logo góc phát sóng & TVC bình luận</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Bài viết PR độc quyền trên các kênh truyền thông</span>
              </li>
            </ul>
          </div>

          {/* Card 4: Tài trợ hiện vật & Race Kit */}
          <div className="bg-card border border-border/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-2.5 shadow-2xs">
            <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <Gift className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-foreground">
              Tài trợ hiện vật & đồng phục Race Kit
            </h3>
            <p className="text-xs text-muted-foreground font-normal leading-relaxed">
              Tài trợ nước khoáng, nước tăng lực thể thao, thực phẩm bổ sung, vợt/giày giải thưởng hoặc in ấn logo thương hiệu lên trọn bộ túi Race Kit cho tất cả VĐV.
            </p>
            <ul className="space-y-1 text-xs text-foreground/90 font-normal pt-1">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Thương hiệu hiện diện trong từng bộ vật phẩm VĐV</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Tiết kiệm ngân sách với hình thức đổi hiện vật</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. Contact & Inquiry Section */}
      <div id="sponsor-contact" className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xs space-y-5">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-primary flex items-center gap-1.5">
            <Handshake className="w-3.5 h-3.5" />
            <span>Liên hệ hợp tác tài trợ</span>
          </div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-foreground tracking-tight">
            Đăng ký tư vấn & nhận hồ sơ Proposal
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
            Để lại thông tin hoặc liên hệ trực tiếp với Ban Vận Động Tài Trợ để nhận tài liệu quyền lợi chi tiết và bảng dự toán hợp tác.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Direct Contact Info Box (Span 5) */}
          <div className="lg:col-span-5 bg-muted/30 border border-border/70 rounded-xl sm:rounded-2xl p-5 sm:p-6 space-y-5">
            <h3 className="font-semibold text-sm sm:text-base text-foreground">
              Ban Vận Động Tài Trợ Giải Đấu
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-muted-foreground font-normal text-xs">Hotline Tài Trợ (24/7)</div>
                  <a href="tel:0901234567" className="font-bold text-sm sm:text-base text-foreground hover:text-primary transition-colors block">
                    0901 234 567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-muted-foreground font-normal text-xs">Email Tiếp Nhận Hồ Sơ</div>
                  <a href="mailto:sponsorship@playgrid.vn" className="font-semibold text-xs sm:text-sm text-foreground hover:text-primary transition-colors block">
                    sponsorship@playgrid.vn
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-muted-foreground font-normal text-xs">Đơn Vị Phụ Trách</div>
                  <div className="font-medium text-foreground text-xs sm:text-sm leading-snug">
                    Liên đoàn Cầu Lông Hà Nội & PlayGrid Vietnam
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border/50 flex flex-col gap-2.5">
              <a
                href="https://zalo.me/0901234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 px-4 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Nhắn tin Zalo Ban Tài Trợ</span>
              </a>

              <Button
                type="button"
                variant="outline"
                onClick={() => alert("Hồ sơ tài trợ (Proposal PDF) đang được tải về máy của bạn...")}
                className="w-full h-11 rounded-xl text-xs sm:text-sm font-semibold gap-2 border-border/80"
              >
                <FileDown className="w-4 h-4 text-primary" />
                <span>Tải Hồ Sơ Proposal (PDF)</span>
              </Button>
            </div>
          </div>

          {/* Right Column: Inquiry Form (Span 7) */}
          <div className="lg:col-span-7">
            {formSuccess ? (
              <div className="p-8 sm:p-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2.5 text-foreground">
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600" />
                <h4 className="font-bold text-base sm:text-lg">Gửi Yêu Cầu Thành Công!</h4>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  Cảm ơn Quý doanh nghiệp đã quan tâm. Ban Tài Trợ giải đấu sẽ liên hệ lại qua điện thoại và gửi hồ sơ chi tiết trong vòng 24h làm việc.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4 sm:space-y-5">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-foreground block">
                    Tên Doanh Nghiệp / Thương Hiệu <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    required
                    placeholder="VD: Công ty TNHH Thể Thao ABC"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="h-11 px-4 rounded-xl text-xs sm:text-sm bg-muted/20 border-border/70 focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-foreground block">
                    Người Đại Diện Liên Hệ <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    required
                    placeholder="VD: Nguyễn Văn B (Marketing Manager)"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="h-11 px-4 rounded-xl text-xs sm:text-sm bg-muted/20 border-border/70 focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-foreground block">
                    Số Điện Thoại / Zalo <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    required
                    placeholder="VD: 0988 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 px-4 rounded-xl text-xs sm:text-sm bg-muted/20 border-border/70 focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-foreground block">
                    Email Doanh Nghiệp
                  </label>
                  <Input
                    type="email"
                    placeholder="VD: partner@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 px-4 rounded-xl text-xs sm:text-sm bg-muted/20 border-border/70 focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-foreground block">
                    Hình Thức Tài Trợ Quan Tâm
                  </label>
                  <select
                    value={interestType}
                    onChange={(e) => setInterestType(e.target.value)}
                    className="w-full h-11 rounded-xl border border-border/70 px-4 bg-muted/20 text-foreground text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Nhận diện thương hiệu độc quyền">Nhận diện thương hiệu độc quyền (Title / Diamond / Gold)</option>
                    <option value="Gian hàng trưng bày & Bán hàng (Booth)">Gian hàng trưng bày & Bán hàng (Booth / Pro-Shop)</option>
                    <option value="Truyền thông Livestream & Báo chí">Truyền thông Livestream & Báo chí</option>
                    <option value="Tài trợ hiện vật / Race Kit">Tài trợ hiện vật (Nước uống, Vợt, Giày, Race Kit)</option>
                    <option value="Hợp tác khác">Hình thức hợp tác khác</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-semibold text-foreground block">
                    Nội Dung / Yêu Cầu Cụ Thể
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ghi chú về nhu cầu tài trợ, ngân sách dự kiến hoặc câu hỏi của doanh nghiệp..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-border/70 p-3.5 bg-muted/20 text-foreground text-xs sm:text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto h-11 rounded-xl px-7 text-xs sm:text-sm bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi yêu cầu tư vấn tài trợ</span>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
