"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  UserPlus,
  Users,
  MessageCircle,
  Phone,
  MapPin,
  CheckCircle2,
  Plus,
  X,
  Clock,
} from "lucide-react";
import {
  TournamentPartnerRequest,
  TournamentDivision,
} from "@/lib/tournaments-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TournamentPartnerFindingTabProps {
  partnerRequests: TournamentPartnerRequest[];
  divisions: TournamentDivision[];
}

export function TournamentPartnerFindingTab({
  partnerRequests: initialRequests,
  divisions,
}: TournamentPartnerFindingTabProps) {
  const [requests, setRequests] = useState<TournamentPartnerRequest[]>(initialRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDivision, setSelectedDivision] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<"all" | "male" | "female">("all");
  const [openOnly, setOpenOnly] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formGender, setFormGender] = useState<"male" | "female">("male");
  const [formAge, setFormAge] = useState("25");
  const [formDivisionId, setFormDivisionId] = useState(
    divisions.find((d) => d.formatType === "doubles")?.id || divisions[0]?.id || ""
  );
  const [formSkill, setFormSkill] = useState("Trình 3.5 (Khá)");
  const [formDistrict, setFormDistrict] = useState("Cầu Giấy, Hà Nội");
  const [formPlayStyle, setFormPlayStyle] = useState("Đánh lưới & Phản tạt nhanh");
  const [formPhone, setFormPhone] = useState("");
  const [formNote, setFormNote] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);

  // Filtered requests
  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchSearch =
        req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (req.playStyle &&
          req.playStyle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        req.note.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDivision =
        selectedDivision === "all" || req.divisionId === selectedDivision;

      const matchGender =
        genderFilter === "all" || req.gender === genderFilter;

      const matchStatus = !openOnly || req.status === "open";

      return matchSearch && matchDivision && matchGender && matchStatus;
    });
  }, [requests, searchQuery, selectedDivision, genderFilter, openOnly]);

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const divObj = divisions.find((d) => d.id === formDivisionId);
    const newReq: TournamentPartnerRequest = {
      id: `req-${Date.now()}`,
      name: formName.trim(),
      gender: formGender,
      age: parseInt(formAge, 10) || 25,
      divisionId: formDivisionId,
      divisionName: divObj?.formatLabel || "Đôi Nam Nữ Open",
      skillLevel: formSkill,
      dominantHand: "right",
      playStyle: formPlayStyle,
      district: formDistrict,
      phone: formPhone,
      zalo: formPhone.replace(/\s/g, ""),
      note: formNote || "Tìm bạn đánh đôi nghiêm túc, quyết tâm thi đấu đạt thành tích cao.",
      postedAt: "Vừa xong",
      status: "open",
    };

    setRequests([newReq, ...requests]);
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setIsModalOpen(false);
      setFormName("");
      setFormPhone("");
      setFormNote("");
    }, 1200);
  };

  const doublesDivisions = divisions.filter((d) => d.formatType === "doubles");

  return (
    <div className="space-y-4">
      {/* 1. Community Hero Banner */}
      <div className="rounded-2xl sm:rounded-3xl border border-primary/20 bg-primary/5 p-4 sm:p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <div className="text-xs font-semibold text-primary flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>Cộng đồng ghép cặp thi đấu</span>
          </div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-foreground tracking-tight">
            Tìm bạn đánh đôi cùng trình độ
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
            Kết nối trực tiếp cùng các VĐV đang tìm đồng đội hoặc đăng tin ghép cặp tham gia giải đấu.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-xl px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs sm:text-sm shadow-2xs transition-all shrink-0 cursor-pointer flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Đăng tin tìm bạn</span>
        </Button>
      </div>

      {/* 2. Controls Toolbar: Search & Filters */}
      <div className="bg-card border border-border/80 rounded-2xl p-3.5 sm:p-4 space-y-3 shadow-2xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Tìm theo tên VĐV, khu vực quận, lối chơi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border-border/70 text-xs sm:text-sm bg-muted/20 focus-visible:ring-primary"
            />
          </div>

          {/* Gender Filter Pills */}
          <div className="inline-flex rounded-xl bg-muted/30 p-0.5 border border-border/70 text-xs font-medium shrink-0">
            <button
              type="button"
              onClick={() => setGenderFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                genderFilter === "all"
                  ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tất cả
            </button>
            <button
              type="button"
              onClick={() => setGenderFilter("male")}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                genderFilter === "male"
                  ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Nam
            </button>
            <button
              type="button"
              onClick={() => setGenderFilter("female")}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                genderFilter === "female"
                  ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Nữ
            </button>
          </div>

          {/* Open Only Toggle */}
          <button
            type="button"
            onClick={() => setOpenOnly(!openOnly)}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors border cursor-pointer shrink-0 ${
              openOnly
                ? "bg-primary text-primary-foreground border-primary font-semibold shadow-2xs"
                : "bg-muted/30 border-border/70 text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            <span>Đang tìm bạn ({requests.filter((r) => r.status === "open").length})</span>
          </button>
        </div>

        {/* Division Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pt-1">
          <button
            type="button"
            onClick={() => setSelectedDivision("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedDivision === "all"
                ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            Tất cả nội dung ({requests.length})
          </button>
          {doublesDivisions.map((div) => {
            const count = requests.filter((r) => r.divisionId === div.id).length;
            const isSelected = selectedDivision === div.id;
            return (
              <button
                key={div.id}
                type="button"
                onClick={() => setSelectedDivision(div.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                    : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
              >
                {div.formatLabel} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Partner Requests Stream */}
      {filteredRequests.length === 0 ? (
        <div className="bg-card border border-border/80 rounded-2xl p-8 text-center space-y-2 shadow-2xs">
          <p className="text-sm font-semibold text-foreground">
            Chưa có bài đăng tìm bạn nào phù hợp bộ lọc
          </p>
          <p className="text-xs text-muted-foreground font-normal">
            Hãy là người đầu tiên đăng tin tìm bạn đánh đôi để kết nối cùng các VĐV khác!
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl text-xs font-semibold gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Đăng tin ngay</span>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRequests.map((req) => {
            const isMale = req.gender === "male";
            const initials = req.name
              .split(" ")
              .map((w) => w[0])
              .slice(-2)
              .join("");

            return (
              <div
                key={req.id}
                className={`bg-card border rounded-xl sm:rounded-2xl p-4 sm:p-5 space-y-3 transition-all hover:shadow-2xs ${
                  req.status === "matched"
                    ? "opacity-60 border-border/50"
                    : "border-border/80 hover:border-primary/50"
                }`}
              >
                {/* Top Row: Athlete Info + Target Division & Level */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-border/50 pb-3">
                  {/* Left: Avatar + Name + Age + Location */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-10 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-primary/20">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">
                          {req.name}
                        </h3>
                        <span className="text-xs text-muted-foreground font-normal">
                          ({isMale ? "Nam" : "Nữ"}{req.age ? `, ${req.age}t` : ""})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-normal">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="truncate">{req.district}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Division, Skill Level & Time */}
                  <div className="flex items-center gap-2 flex-wrap sm:justify-end text-xs">
                    <span className="px-2.5 py-0.5 rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium text-[11px]">
                      {req.divisionName}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-muted text-muted-foreground border border-border/60 font-normal text-[11px]">
                      {req.skillLevel}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1 pl-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span>{req.postedAt}</span>
                    </span>
                  </div>
                </div>

                {/* Middle Row: Note Message & Play Style */}
                <div className="space-y-1.5 text-xs sm:text-sm text-foreground/90 font-normal leading-relaxed">
                  <p>{req.note}</p>
                  {req.playStyle && (
                    <p className="text-muted-foreground text-xs font-normal">
                      Sở trường: <strong className="text-foreground font-medium">{req.playStyle}</strong>
                    </p>
                  )}
                </div>

                {/* Bottom Row: Actions & Contact */}
                {req.status === "open" ? (
                  <div className="pt-2.5 border-t border-border/50 flex items-center justify-between gap-3 text-xs">
                    <div className="text-muted-foreground text-xs font-normal">
                      Liên hệ: <strong className="text-foreground font-medium">{req.phone || "Liên hệ qua app"}</strong>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {req.zalo && (
                        <a
                          href={`https://zalo.me/${req.zalo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Zalo</span>
                        </a>
                      )}
                      {req.phone && (
                        <a
                          href={`tel:${req.phone.replace(/\s/g, "")}`}
                          className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Gọi ghép đôi</span>
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="pt-2.5 border-t border-border/50 text-xs text-muted-foreground flex items-center gap-1 font-normal">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Đã ghép đôi thành công</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Modal: Create Partner Request */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 w-full max-w-lg space-y-4 shadow-xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-primary" />
                <span>Đăng Tin Tìm Bạn Đánh Đôi</span>
              </h3>
              <p className="text-xs text-muted-foreground font-normal leading-normal">
                Điền thông tin và trình độ để kết nối cùng các VĐV phù hợp nhất cho giải đấu.
              </p>
            </div>

            {formSuccess ? (
              <div className="p-6 rounded-2xl bg-muted/40 border border-border/60 text-center space-y-2 text-foreground">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600 dark:text-emerald-400" />
                <p className="font-bold text-sm">Đăng tin thành công!</p>
                <p className="text-xs text-muted-foreground font-normal">Bài đăng của bạn đã được hiển thị trên danh sách.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateRequest} className="space-y-3.5 text-xs">
                {/* Name & Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-medium text-foreground">Họ và tên *</label>
                    <Input
                      required
                      placeholder="VD: Nguyễn Văn A"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="rounded-xl text-xs bg-muted/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-foreground">Giới tính & Tuổi</label>
                    <div className="flex gap-2">
                      <select
                        value={formGender}
                        onChange={(e) => setFormGender(e.target.value as "male" | "female")}
                        className="flex-1 rounded-xl border border-border/70 px-2.5 py-1.5 bg-muted/20 text-foreground text-xs"
                      >
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                      </select>
                      <Input
                        type="number"
                        placeholder="Tuổi"
                        value={formAge}
                        onChange={(e) => setFormAge(e.target.value)}
                        className="w-16 rounded-xl text-xs bg-muted/20"
                      />
                    </div>
                  </div>
                </div>

                {/* Division & Skill */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-medium text-foreground">Hạng mục muốn ghép *</label>
                    <select
                      value={formDivisionId}
                      onChange={(e) => setFormDivisionId(e.target.value)}
                      className="w-full rounded-xl border border-border/70 px-2.5 py-2 bg-muted/20 text-foreground text-xs font-medium"
                    >
                      {doublesDivisions.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.formatLabel} ({d.levelRating})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-foreground">Trình độ tự đánh giá</label>
                    <select
                      value={formSkill}
                      onChange={(e) => setFormSkill(e.target.value)}
                      className="w-full rounded-xl border border-border/70 px-2.5 py-2 bg-muted/20 text-foreground text-xs font-medium"
                    >
                      <option value="Trình 4.0 (Nâng cao)">Trình 4.0 (Nâng cao)</option>
                      <option value="Trình 3.5 (Khá)">Trình 3.5 (Khá)</option>
                      <option value="Trình 3.0 (Phong trào)">Trình 3.0 (Phong trào)</option>
                      <option value="Trình 2.5 (Mới chơi)">Trình 2.5 (Mới chơi)</option>
                    </select>
                  </div>
                </div>

                {/* District & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-medium text-foreground">Khu vực sinh sống / Tập luyện</label>
                    <Input
                      placeholder="VD: Cầu Giấy, Hà Nội"
                      value={formDistrict}
                      onChange={(e) => setFormDistrict(e.target.value)}
                      className="rounded-xl text-xs bg-muted/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-foreground">Số điện thoại / Zalo *</label>
                    <Input
                      required
                      placeholder="VD: 0912 345 678"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="rounded-xl text-xs bg-muted/20"
                    />
                  </div>
                </div>

                {/* Play Style */}
                <div className="space-y-1">
                  <label className="font-medium text-foreground">Lối chơi / Sở trường</label>
                  <Input
                    placeholder="VD: Chuyên lưới & Phản tạt nhanh, Đập cầu uy lực..."
                    value={formPlayStyle}
                    onChange={(e) => setFormPlayStyle(e.target.value)}
                    className="rounded-xl text-xs bg-muted/20"
                  />
                </div>

                {/* Note */}
                <div className="space-y-1">
                  <label className="font-medium text-foreground">Lời nhắn / Yêu cầu bạn đánh cùng</label>
                  <textarea
                    rows={3}
                    placeholder="VD: Cần tìm bạn nữ trình 3.5+ đánh lưới nhanh để cùng tranh giải Đôi Nam Nữ..."
                    value={formNote}
                    onChange={(e) => setFormNote(e.target.value)}
                    className="w-full rounded-xl border border-border/70 p-2.5 bg-muted/20 text-foreground text-xs resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="pt-2 flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl text-xs"
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-xl text-xs bg-foreground text-background hover:bg-foreground/90 font-semibold shadow-xs"
                  >
                    Đăng tin ngay
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
