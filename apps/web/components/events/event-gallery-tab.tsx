"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import {
  Camera,
  Search,
  Download,
  Eye,
  Sparkles,
  Filter,
  CheckCircle2,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PhotoItem {
  id: string;
  url: string;
  title: string;
  category: "all" | "swim" | "run" | "finish" | "awards" | "expo";
  categoryName: string;
  photographer: string;
  bibTagged?: string[];
}

const MOCK_GALLERY: PhotoItem[] = [
  {
    id: "photo-1",
    url: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1200&auto=format&fit=crop",
    title: "Khoảnh khắc xuất phát bơi biển cự ly Olympic 51.5km",
    category: "swim",
    categoryName: "Bơi biển (Swim)",
    photographer: "PlayGrid Media Team",
    bibTagged: ["20188", "20102", "20245"],
  },
  {
    id: "photo-2",
    url: "https://images.unsplash.com/photo-1519315901367-f34ff9154487?q=80&w=1200&auto=format&fit=crop",
    title: "Vận động viên vượt sóng tại bãi biển Vân Đồn tuyệt đẹp",
    category: "swim",
    categoryName: "Bơi biển (Swim)",
    photographer: "Vân Đồn Sports Photography",
    bibTagged: ["20188", "10045"],
  },
  {
    id: "photo-3",
    url: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=1200&auto=format&fit=crop",
    title: "Cung đường chạy ven biển hùng vĩ tràn đầy năng lượng",
    category: "run",
    categoryName: "Đường chạy (Run)",
    photographer: "PlayGrid Media Team",
    bibTagged: ["20188", "20311", "20389"],
  },
  {
    id: "photo-4",
    url: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1200&auto=format&fit=crop",
    title: "Khoảnh khắc bứt tốc về đích cán cổng Finish Line",
    category: "finish",
    categoryName: "Về đích (Finish Line)",
    photographer: "VnSports Pro",
    bibTagged: ["20188"],
  },
  {
    id: "photo-5",
    url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
    title: "Niềm vui vỡ òa nhận huy chương Finisher danh giá",
    category: "finish",
    categoryName: "Về đích (Finish Line)",
    photographer: "PlayGrid Media Team",
    bibTagged: ["20102", "20311"],
  },
  {
    id: "photo-6",
    url: "https://images.unsplash.com/photo-1519766304817-4f37bda74a29?q=80&w=1200&auto=format&fit=crop",
    title: "Lễ vinh danh và trao cúp vô địch Aqua Warriors 2026",
    category: "awards",
    categoryName: "Trao giải (Awards)",
    photographer: "Ban Tổ Chức Giải",
    bibTagged: ["20188", "20102", "20245", "20311"],
  },
  {
    id: "photo-7",
    url: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1200&auto=format&fit=crop",
    title: "Không khí sôi động ngày Expo phát Race Kit và thử trang bị",
    category: "expo",
    categoryName: "Expo & Check-in",
    photographer: "PlayGrid Media Team",
  },
  {
    id: "photo-8",
    url: "https://images.unsplash.com/photo-1486218119243-13883505764c?q=80&w=1200&auto=format&fit=crop",
    title: "Các chiến binh nhí Kid Warriors tranh tài siêu ấn tượng",
    category: "run",
    categoryName: "Đường chạy (Run)",
    photographer: "PlayGrid Media Team",
    bibTagged: ["50012", "50034"],
  },
];

export function EventGalleryTab() {
  const locale = useLocale();
  const isEn = locale === "en";

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [bibSearch, setBibSearch] = useState<string>("");
  const [previewPhoto, setPreviewPhoto] = useState<PhotoItem | null>(null);

  const albums = [
    { id: "all", label: isEn ? "All Photos" : "Tất cả ảnh" },
    { id: "swim", label: isEn ? "Swim Course" : "Bơi biển" },
    { id: "run", label: isEn ? "Run Course" : "Đường chạy" },
    { id: "finish", label: isEn ? "Finish Line" : "Về đích & Cán đích" },
    { id: "awards", label: isEn ? "Ceremony & Awards" : "Trao giải" },
    { id: "expo", label: isEn ? "Expo & Race Kit" : "Expo & Check-in" },
  ];

  const filteredPhotos = MOCK_GALLERY.filter((item) => {
    const matchCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    const matchBib =
      bibSearch.trim() === "" ||
      (item.bibTagged &&
        item.bibTagged.some((bib) =>
          bib.toLowerCase().includes(bibSearch.toLowerCase().trim())
        ));

    return matchCategory && matchBib;
  });

  return (
    <div className="space-y-4">
      {/* 1. Header Filter & BIB Recognition Bar */}
      <section className="bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 shadow-2xs">
        <header className="flex items-center justify-between border-b border-border/50 pb-3 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground">
                {isEn ? "Event Official Photo Gallery" : "Thư viện hình ảnh giải đấu"}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-normal leading-normal">
                {isEn
                  ? "High-resolution photos captured by official photographers & AI BIB search"
                  : "Kho ảnh sắc nét chuẩn HD từ nhiếp ảnh gia chính thức & Hỗ trợ tìm ảnh theo số BIB"}
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-lg border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isEn ? "AI BIB Search" : "Tìm ảnh AI"}</span>
          </span>
        </header>

        {/* Search by BIB & Compact Album Selector */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder={isEn ? "Find photos by BIB number (e.g. 20188)..." : "Tìm ảnh của tôi theo số BIB (vd: 20188)..."}
              value={bibSearch}
              onChange={(e) => setBibSearch(e.target.value)}
              className="h-10 pl-10 pr-8 rounded-xl text-xs sm:text-sm bg-background border-border/80 font-normal focus-visible:ring-2 focus-visible:ring-primary/30"
            />
            {bibSearch && (
              <button
                type="button"
                onClick={() => setBibSearch("")}
                className="absolute right-2.5 top-3 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Compact Album Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 px-3.5 rounded-xl border border-border/80 bg-background text-xs sm:text-sm text-foreground font-normal cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {albums.map((album) => (
              <option key={album.id} value={album.id}>
                {album.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* 2. Photo Grid Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {filteredPhotos.length === 0 ? (
          <div className="col-span-full bg-card border border-border/80 rounded-2xl sm:rounded-3xl p-8 text-center text-xs sm:text-sm text-muted-foreground font-normal">
            {isEn
              ? "No photos found matching your BIB number or album."
              : "Không tìm thấy hình ảnh nào phù hợp với số BIB hoặc album đã chọn."}
          </div>
        ) : (
          filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group bg-card border border-border/80 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xs hover:border-primary/60 transition-all space-y-2 relative"
            >
              {/* Image Thumbnail with Overlay */}
              <div
                className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 cursor-pointer"
                onClick={() => setPreviewPhoto(photo)}
              >
                <Image
                  src={photo.url}
                  alt={photo.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="text-[11px] font-semibold text-white flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isEn ? "View Photo" : "Xem ảnh lớn"}</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(photo.url, "_blank");
                    }}
                    className="size-7.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-foreground flex items-center justify-center backdrop-blur-sm transition-all"
                    title="Tải ảnh gốc"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-black/60 text-white backdrop-blur-xs border border-white/10">
                  {photo.categoryName}
                </div>
              </div>

              {/* Photo Meta */}
              <div className="p-3.5 pt-1 space-y-1">
                <h3 className="font-semibold text-xs sm:text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                  {photo.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground font-normal">
                  <span>📷 {photo.photographer}</span>
                  {photo.bibTagged && (
                    <span className="font-mono text-primary font-semibold">
                      BIB: {photo.bibTagged.join(", ")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 3. Fullscreen Photo Preview Modal */}
      {previewPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewPhoto(null)}
              className="absolute -top-10 right-0 size-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center cursor-pointer transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/20 bg-black shadow-2xl">
              <Image
                src={previewPhoto.url}
                alt={previewPhoto.title}
                fill
                unoptimized
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-between w-full text-white px-2">
              <div>
                <h3 className="font-bold text-sm sm:text-base">{previewPhoto.title}</h3>
                <p className="text-xs text-white/70 font-normal">Nhiếp ảnh gia: {previewPhoto.photographer}</p>
              </div>

              <a
                href={previewPhoto.url}
                target="_blank"
                rel="noreferrer"
                className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isEn ? "Download HD" : "Tải ảnh gốc HD"}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
