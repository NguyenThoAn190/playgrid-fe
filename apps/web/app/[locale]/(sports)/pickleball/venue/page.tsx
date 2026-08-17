"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  SlidersHorizontal,
  Map,
  ChevronDown,
  Building2,
  Star,
  Check,
  RotateCcw,
  X,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SportSubNav } from "@/components/sports/sport-sub-nav";
import { CourtCard, CourtData } from "@/components/courts/court-card";
import { JsonLdScript, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components/select";

export interface VenueItem extends CourtData {
  district: string;
  amenities: string[];
  type: string;
  priceValue: number;
}

const PICKLEBALL_VENUES: VenueItem[] = [
  {
    id: "vnb-pickleball-center",
    name: "Sân VNB Pickleball Center",
    location: "Tân Bình, TP. HCM",
    district: "Tân Bình",
    distance: "3.2 km",
    rating: 4.9,
    reviewsCount: 164,
    price: "190.000đ/giờ",
    priceValue: 190000,
    badge: "Hot",
    sports: ["Mặt sân USAPA", "Máy lạnh"],
    imageUrl: "/images/activities/pickleball-banner.png",
    amenities: ["Máy lạnh", "Mặt sân USAPA", "Bãi xe ô tô", "Căng tin"],
    type: "Sân thi đấu",
  },
  {
    id: "saigon-pickleball-arena",
    name: "Sân Sài Gòn Pickleball Arena",
    location: "Quận 7, TP. HCM",
    district: "Quận 7",
    distance: "4.5 km",
    rating: 4.8,
    reviewsCount: 210,
    price: "220.000đ/giờ",
    priceValue: 220000,
    badge: "Hot",
    sports: ["Sân VIP", "Máy lạnh"],
    imageUrl: "/images/explore_sports/gridy-pickleball.avif",
    amenities: ["Sân VIP", "Máy lạnh", "Phòng tắm", "Wifi free"],
    type: "Sân VIP",
  },
  {
    id: "khang-an-pickleball-club",
    name: "Pickleball Khang An Club",
    location: "Thủ Đức, TP. HCM",
    district: "Thủ Đức",
    distance: "1.8 km",
    rating: 4.7,
    reviewsCount: 115,
    price: "170.000đ/giờ",
    priceValue: 170000,
    badge: "Gần bạn",
    sports: ["Mặt sân USAPA", "Căng tin"],
    imageUrl: "/images/activities/pickleball-banner.png",
    amenities: ["Mặt sân USAPA", "Căng tin", "Bãi xe ô tô"],
    type: "Sân trong nhà",
  },
  {
    id: "tan-binh-pickleball-star",
    name: "Sân Pickleball Tân Bình Star",
    location: "Tân Bình, TP. HCM",
    district: "Tân Bình",
    distance: "3.9 km",
    rating: 4.6,
    reviewsCount: 88,
    price: "150.000đ/giờ",
    priceValue: 150000,
    badge: "Ưu đãi",
    sports: ["Sân tiêu chuẩn", "Phòng tắm"],
    imageUrl: "/images/explore_sports/gridy-pickleball.avif",
    amenities: ["Phòng tắm", "Wifi free", "Bãi xe ô tô"],
    type: "Sân trong nhà",
  },
  {
    id: "quan-10-pickleball-hub",
    name: "Sân Pickleball Quận 10 Hub",
    location: "Quận 10, TP. HCM",
    district: "Quận 10",
    distance: "5.2 km",
    rating: 4.9,
    reviewsCount: 195,
    price: "210.000đ/giờ",
    priceValue: 210000,
    badge: "Hot",
    sports: ["Máy lạnh", "Shop bóng & vợt"],
    imageUrl: "/images/activities/pickleball-banner.png",
    amenities: ["Máy lạnh", "Shop bóng & vợt", "Sân VIP"],
    type: "Sân VIP",
  },
];

const DISTRICT_LIST = ["Tân Bình", "Quận 7", "Thủ Đức", "Quận 10", "Quận 11"];

const PRICE_TIERS = [
  { id: "under-160", min: 0, max: 160000 },
  { id: "160-200", min: 160000, max: 200000 },
  { id: "over-200", min: 200000, max: 9999999 },
];

const AMENITY_OPTIONS = ["Máy lạnh", "Mặt sân USAPA", "Bãi xe ô tô", "Sân VIP", "Căng tin", "Phòng tắm", "Wifi free", "Shop bóng & vợt"];
const COURT_TYPES = ["Sân trong nhà", "Sân thi đấu", "Sân VIP"];

const FALLBACK_MESSAGES: Record<string, Record<string, string>> = {
  vi: {
    search_placeholder: "Tìm kiếm theo tên sân Pickleball...",
    filter_btn: "Bộ lọc",
    map_view: "Bản đồ",
    list_view: "Danh sách",
    show_on_map: "Hiển thị trên bản đồ",
    map_title: "Bản Đồ Sân Pickleball Trực Quan",
    map_desc: "Hiển thị vị trí trực quan của các sân Pickleball trên bản đồ.",
    map_sidebar_title: "Danh sách khu vực",
    filter_title: "Chọn lọc theo:",
    reset_filter: "Đặt lại",
    district_title: "Khu vực / Quận",
    price_title: "Ngân sách của bạn (mỗi giờ)",
    rating_title: "Đánh giá sao",
    amenities_title: "Tiện ích sân bãi",
    type_title: "Loại hình sân",
    all: "Tất cả",
    found_prefix: "Tìm thấy",
    found_suffix: "sân Pickleball",
    empty_title: "Không tìm thấy sân Pickleball phù hợp",
    empty_desc: "Thử bỏ bớt một số tiêu chí lọc hoặc bấm nút bên dưới để xem toàn bộ danh sách sân.",
    reset_all: "Đặt lại bộ lọc",
    "sort.recommended": "Nổi bật nhất",
    "sort.rating": "Đánh giá cao nhất",
    "sort.price_asc": "Giá: Thấp đến Cao",
    "sort.price_desc": "Giá: Cao đến Thấp",
    "price_tiers.under_160": "Dưới 160.000đ/h",
    "price_tiers.between_160_200": "160.000đ - 200.000đ/h",
    "price_tiers.over_200": "Trên 200.000đ/h",
    "ratings.4_8": "4.8+ Xuất sắc",
    "ratings.4_5": "4.5+ Rất tốt",
    "amenities.ac": "Máy lạnh",
    "amenities.bwf": "Mặt sân USAPA tiêu chuẩn",
    "amenities.parking": "Bãi xe ô tô",
    "amenities.vip": "Sân VIP",
    "amenities.canteen": "Căng tin / Nước uống",
    "amenities.shower": "Phòng tắm / Thay đồ",
    "amenities.wifi": "Wifi free",
    "amenities.proshop": "Shop bóng & vợt",
    "types.indoor": "Sân trong nhà",
    "types.tournament": "Sân thi đấu",
    "types.vip": "Sân VIP",
  },
  en: {
    search_placeholder: "Search by Pickleball court name...",
    filter_btn: "Filters",
    map_view: "Map",
    list_view: "List",
    show_on_map: "Show on map",
    map_title: "Pickleball Courts Visual Map",
    map_desc: "Display visual location of Pickleball courts on map.",
    map_sidebar_title: "Area List",
    filter_title: "Filter by:",
    reset_filter: "Reset",
    district_title: "District / Area",
    price_title: "Your budget (per hour)",
    rating_title: "Star Rating",
    amenities_title: "Court Amenities",
    type_title: "Court Type",
    all: "All",
    found_prefix: "Found",
    found_suffix: "Pickleball courts",
    empty_title: "No matching Pickleball courts found",
    empty_desc: "Try adjusting your filter criteria or click reset to view all courts.",
    reset_all: "Reset filters",
    "sort.recommended": "Recommended",
    "sort.rating": "Highest Rated",
    "sort.price_asc": "Price: Low to High",
    "sort.price_desc": "Price: High to Low",
    "price_tiers.under_160": "Under 160.000đ/hr",
    "price_tiers.between_160_200": "160.000đ - 200.000đ/hr",
    "price_tiers.over_200": "Over 200.000đ/hr",
    "ratings.4_8": "4.8+ Excellent",
    "ratings.4_5": "4.5+ Very Good",
    "amenities.ac": "Air Conditioning",
    "amenities.bwf": "USAPA Standard Court",
    "amenities.parking": "Car Parking",
    "amenities.vip": "VIP Court",
    "amenities.canteen": "Canteen & Refreshment",
    "amenities.shower": "Shower & Locker",
    "amenities.wifi": "Free Wifi",
    "amenities.proshop": "Paddle & Ball Shop",
    "types.indoor": "Indoor Court",
    "types.tournament": "Tournament Court",
    "types.vip": "VIP Court",
  },
};

export default function PickleballVenuePage() {
  const t = useTranslations("pickleball_venue");
  const locale = useLocale();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [selectedPriceTiers, setSelectedPriceTiers] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"recommended" | "rating" | "price-asc" | "price-desc">("recommended");
  const [isMapView, setIsMapView] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Safe translation helper matching active locale
  const safeT = (key: string) => {
    const dict: Record<string, string> = FALLBACK_MESSAGES[locale] ?? FALLBACK_MESSAGES["vi"] ?? {};
    try {
      const val = t(key);
      if (!val || val.includes("pickleball_venue.") || val.includes("PICKLEBALL_VENUE.")) {
        return dict[key] ?? key;
      }
      return val;
    } catch {
      return dict[key] ?? key;
    }
  };

  const AMENITY_LABEL_MAP: Record<string, string> = {
    "Máy lạnh": safeT("amenities.ac"),
    "Mặt sân USAPA": safeT("amenities.bwf"),
    "Bãi xe ô tô": safeT("amenities.parking"),
    "Sân VIP": safeT("amenities.vip"),
    "Căng tin": safeT("amenities.canteen"),
    "Phòng tắm": safeT("amenities.shower"),
    "Wifi free": safeT("amenities.wifi"),
    "Shop bóng & vợt": safeT("amenities.proshop"),
  };

  const TYPE_LABEL_MAP: Record<string, string> = {
    "Sân trong nhà": safeT("types.indoor"),
    "Sân thi đấu": safeT("types.tournament"),
    "Sân VIP": safeT("types.vip"),
  };

  const PRICE_TIER_LABELS: Record<string, string> = {
    "under-160": safeT("price_tiers.under_160"),
    "160-200": safeT("price_tiers.between_160_200"),
    "over-200": safeT("price_tiers.over_200"),
  };

  const toggleDistrict = (district: string) => {
    setSelectedDistricts((prev) =>
      prev.includes(district) ? prev.filter((d) => d !== district) : [...prev, district]
    );
  };

  const togglePriceTier = (id: string) => {
    setSelectedPriceTiers((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedDistricts([]);
    setSelectedPriceTiers([]);
    setMinRating(0);
    setSelectedAmenities([]);
    setSelectedTypes([]);
    setSortBy("recommended");
  };

  const filteredCourts = useMemo(() => {
    return PICKLEBALL_VENUES.filter((venue) => {
      if (
        searchQuery &&
        !venue.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !venue.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      if (selectedDistricts.length > 0 && !selectedDistricts.includes(venue.district)) {
        return false;
      }

      if (selectedPriceTiers.length > 0) {
        const matchesAnyTier = selectedPriceTiers.some((tierId) => {
          const tier = PRICE_TIERS.find((t) => t.id === tierId);
          if (!tier) return false;
          return venue.priceValue >= tier.min && venue.priceValue <= tier.max;
        });
        if (!matchesAnyTier) return false;
      }

      if (minRating > 0 && venue.rating < minRating) {
        return false;
      }

      if (
        selectedAmenities.length > 0 &&
        !selectedAmenities.every((amenity) => venue.amenities.includes(amenity))
      ) {
        return false;
      }

      if (selectedTypes.length > 0 && !selectedTypes.includes(venue.type)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-asc") return a.priceValue - b.priceValue;
      if (sortBy === "price-desc") return b.priceValue - a.priceValue;
      return 0;
    });
  }, [
    searchQuery,
    selectedDistricts,
    selectedPriceTiers,
    minRating,
    selectedAmenities,
    selectedTypes,
    sortBy,
  ]);

  const countForDistrict = (district: string) =>
    PICKLEBALL_VENUES.filter((v) => v.district === district).length;

  const countForPriceTier = (tier: (typeof PRICE_TIERS)[number]) =>
    PICKLEBALL_VENUES.filter((v) => v.priceValue >= tier.min && v.priceValue <= tier.max).length;

  const countForAmenity = (amenity: string) =>
    PICKLEBALL_VENUES.filter((v) => v.amenities.includes(amenity)).length;

  const countForType = (type: string) =>
    PICKLEBALL_VENUES.filter((v) => v.type === type).length;

  const activeFilterCount =
    selectedDistricts.length +
    selectedPriceTiers.length +
    (minRating > 0 ? 1 : 0) +
    selectedAmenities.length +
    selectedTypes.length;

  const FilterSidebarContent = () => (
    <div className="space-y-6">
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-4 text-center shadow-xs">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:16px_16px] opacity-30" />
        <div className="relative z-10 space-y-2 py-2">
          <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/30">
            <MapPin className="w-5 h-5" />
          </div>
          <p className="text-xs text-slate-300 font-medium">{safeT("map_desc")}</p>
          <button
            type="button"
            onClick={() => {
              setIsMapView(!isMapView);
              setIsMobileFilterOpen(false);
            }}
            className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Map className="w-3.5 h-3.5" />
            <span>{isMapView ? safeT("list_view") : safeT("show_on_map")}</span>
          </button>
        </div>
      </div>

      {/* Filter Sections Wrapper */}
      <form
        onSubmit={(e) => e.preventDefault()}
        toolname="filter_pickleball_venues"
        tooldescription="Filter pickleball courts in Vietnam by district, price range, player rating, amenities, and court surface type."
        className="rounded-2xl border border-border/80 bg-card p-4 sm:p-5 space-y-5 shadow-2xs divide-y divide-border/50"
      >
        <div className="flex items-center justify-between pb-1">
          <h3 className="font-extrabold text-sm sm:text-base text-foreground tracking-tight">
            {safeT("filter_title")}
          </h3>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{safeT("reset_filter")}</span>
            </button>
          )}
        </div>

        <div className="pt-4 space-y-2.5">
          <h4 className="text-xs font-bold text-foreground tracking-wider">{safeT("district_title")}</h4>
          <div className="space-y-1.5">
            {DISTRICT_LIST.map((district) => {
              const isChecked = selectedDistricts.includes(district);
              const count = countForDistrict(district);
              return (
                <label
                  key={district}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-blue-600 cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      name="district"
                      toolparamdescription="Filter pickleball venues by district"
                      checked={isChecked}
                      onChange={() => toggleDistrict(district)}
                      className="w-4 h-4 rounded border-border text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className={`truncate ${isChecked ? "font-bold text-blue-600 dark:text-blue-400" : "font-medium"}`}>
                      {district}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-semibold shrink-0 pl-1">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="pt-4 space-y-2.5">
          <h4 className="text-xs font-bold text-foreground tracking-wider">{safeT("price_title")}</h4>
          <div className="space-y-1.5">
            {PRICE_TIERS.map((tier) => {
              const isChecked = selectedPriceTiers.includes(tier.id);
              const count = countForPriceTier(tier);
              return (
                <label
                  key={tier.id}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-blue-600 cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      name="priceTier"
                      toolparamdescription="Filter venues by hourly budget tier"
                      checked={isChecked}
                      onChange={() => togglePriceTier(tier.id)}
                      className="w-4 h-4 rounded border-border text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className={`truncate ${isChecked ? "font-bold text-blue-600 dark:text-blue-400" : "font-medium"}`}>
                      {PRICE_TIER_LABELS[tier.id] || tier.id}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-semibold shrink-0 pl-1">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="pt-4 space-y-2.5">
          <h4 className="text-xs font-bold text-foreground tracking-wider">{safeT("rating_title")}</h4>
          <div className="space-y-1.5">
            {[
              { score: 4.8, label: safeT("ratings.4_8") },
              { score: 4.5, label: safeT("ratings.4_5") },
            ].map((ratingItem) => {
              const isChecked = minRating === ratingItem.score;
              return (
                <label
                  key={ratingItem.score}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-blue-600 cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      name="rating"
                      toolparamdescription="Filter venues by minimum star rating"
                      checked={isChecked}
                      onChange={() => setMinRating(isChecked ? 0 : ratingItem.score)}
                      className="w-4 h-4 rounded border-border text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
                      <span className={`truncate ${isChecked ? "font-bold text-blue-600 dark:text-blue-400" : "font-medium"}`}>
                        {ratingItem.label}
                      </span>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        <div className="pt-4 space-y-2.5">
          <h4 className="text-xs font-bold text-foreground tracking-wider">{safeT("amenities_title")}</h4>
          <div className="space-y-1.5">
            {AMENITY_OPTIONS.map((amenity) => {
              const isChecked = selectedAmenities.includes(amenity);
              const count = countForAmenity(amenity);
              return (
                <label
                  key={amenity}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-blue-600 cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      name="amenity"
                      toolparamdescription="Filter venues by available amenities"
                      checked={isChecked}
                      onChange={() => toggleAmenity(amenity)}
                      className="w-4 h-4 rounded border-border text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className={`truncate ${isChecked ? "font-bold text-blue-600 dark:text-blue-400" : "font-medium"}`}>
                      {AMENITY_LABEL_MAP[amenity] || amenity}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-semibold shrink-0 pl-1">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="pt-4 space-y-2.5">
          <h4 className="text-xs font-bold text-foreground tracking-wider">{safeT("type_title")}</h4>
          <div className="space-y-1.5">
            {COURT_TYPES.map((type) => {
              const isChecked = selectedTypes.includes(type);
              const count = countForType(type);
              return (
                <label
                  key={type}
                  className="flex items-center justify-between text-xs sm:text-sm text-foreground hover:text-blue-600 cursor-pointer py-0.5 select-none"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="checkbox"
                      name="courtType"
                      toolparamdescription="Filter by court surface type (indoor, outdoor, roofed)"
                      checked={isChecked}
                      onChange={() => toggleType(type)}
                      className="w-4 h-4 rounded border-border text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className={`truncate ${isChecked ? "font-bold text-blue-600 dark:text-blue-400" : "font-medium"}`}>
                      {TYPE_LABEL_MAP[type] || type}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-semibold shrink-0 pl-1">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Trang chủ", url: `/${locale}` },
    { name: "Pickleball", url: `/${locale}/pickleball` },
    { name: "Danh sách sân Pickleball", url: `/${locale}/pickleball/venue` },
  ]);

  const venueItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Danh sách sân Pickleball TP. HCM",
    "description": "Đặt sân Pickleball trực tuyến tại TP. HCM với giá tốt nhất trên PlayGrid.",
    "itemListElement": PICKLEBALL_VENUES.slice(0, 10).map((v, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "SportsActivityLocation",
        "name": v.name,
        "url": `https://playgrid.vn/${locale}/venue/${v.id}`,
        "address": v.location,
        "priceRange": v.price,
      },
    })),
  };

  return (
    <main className="w-full flex flex-col min-h-screen bg-background text-foreground">
      <JsonLdScript data={[breadcrumbSchema, venueItemListSchema]} />
      <SportSubNav currentSport="pickleball" />

      <section className="w-full pt-6 sm:pt-8 pb-12 bg-background flex-1">
        <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-card border border-border/80 rounded-2xl p-3 sm:p-4 shadow-2xs">
            <form
              onSubmit={(e) => e.preventDefault()}
              toolname="search_pickleball_venues"
              tooldescription="Search pickleball courts in Vietnam by name, address, or location keyword."
              className="relative flex-1 min-w-0"
            >
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  name="query"
                  toolparamdescription="Search keyword for pickleball court name or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={safeT("search_placeholder")}
                  className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl bg-background border border-border/70 text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </form>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-blue-50 dark:bg-blue-950/60 border border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <Filter className="w-4 h-4 shrink-0" />
                <span>{safeT("filter_btn")}</span>
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-extrabold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              <Select value={sortBy} onValueChange={(val) => setSortBy(val as any)}>
                <SelectTrigger className="w-[160px] sm:w-[185px]">
                  <div className="flex items-center gap-1.5 truncate">
                    <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span className="truncate">
                      {sortBy === "recommended"
                        ? safeT("sort.recommended")
                        : sortBy === "rating"
                        ? safeT("sort.rating")
                        : sortBy === "price-asc"
                        ? safeT("sort.price_asc")
                        : safeT("sort.price_desc")}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent align="end" className="w-[185px]">
                  <SelectItem value="recommended">{safeT("sort.recommended")}</SelectItem>
                  <SelectItem value="rating">{safeT("sort.rating")}</SelectItem>
                  <SelectItem value="price-asc">{safeT("sort.price_asc")}</SelectItem>
                  <SelectItem value="price-desc">{safeT("sort.price_desc")}</SelectItem>
                </SelectContent>
              </Select>

              <button
                type="button"
                onClick={() => setIsMapView(!isMapView)}
                className={`hidden sm:flex items-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer shadow-2xs whitespace-nowrap ${
                  isMapView
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-background border-border/80 text-foreground hover:bg-accent"
                }`}
              >
                <Map className="w-4 h-4 shrink-0" />
                <span>{isMapView ? safeT("list_view") : safeT("map_view")}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-start">
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-[110px]">
              <FilterSidebarContent />
            </aside>

            <div className="lg:col-span-8 xl:col-span-9 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  {safeT("found_prefix")} <span className="text-blue-600 dark:text-blue-400 font-extrabold">{filteredCourts.length}</span> {safeT("found_suffix")}
                </span>

                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline lg:hidden cursor-pointer"
                  >
                    {safeT("reset_filter")} ({activeFilterCount})
                  </button>
                )}
              </div>

              {isMapView ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-[650px] rounded-2xl overflow-hidden border border-border/80 bg-card shadow-sm">
                  <div className="lg:col-span-7 xl:col-span-8 relative bg-slate-900 overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-25" />
                    <div className="relative z-10 text-center p-6 space-y-3">
                      <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/30">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white">{safeT("map_title")}</h3>
                      <p className="text-xs text-slate-300 max-w-sm mx-auto">
                        {safeT("map_desc")}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-5 xl:col-span-4 p-4 overflow-y-auto space-y-3 scrollbar-none border-t lg:border-t-0 lg:border-l border-border/60">
                    <h4 className="text-xs font-bold text-muted-foreground tracking-wider">{safeT("map_sidebar_title")}</h4>
                    {filteredCourts.map((court) => (
                      <div
                        key={`map-item-${court.id}`}
                        className="p-3 rounded-xl border border-border/60 bg-background hover:border-blue-500/50 transition-colors flex items-center gap-3"
                      >
                        <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="font-bold text-xs sm:text-sm text-foreground truncate">{court.name}</h5>
                          <p className="text-[11px] text-muted-foreground truncate">{court.location} • {court.distance}</p>
                        </div>
                        <span className="font-bold text-xs text-emerald-600 shrink-0">{court.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                filteredCourts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {filteredCourts.map((court) => (
                      <CourtCard key={court.id} court={court} className="h-full" />
                    ))}
                  </div>
                ) : (
                  <div className="w-full py-16 flex flex-col items-center justify-center text-center space-y-3 rounded-2xl bg-card border border-border/60 p-6">
                    <Building2 className="w-12 h-12 text-muted-foreground/50" />
                    <h3 className="text-base sm:text-lg font-bold text-foreground">{safeT("empty_title")}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
                      {safeT("empty_desc")}
                    </p>
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="mt-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      {safeT("reset_all")}
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="relative w-full max-w-xs bg-background h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between p-4 border-b border-border/60 bg-card">
              <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span>{safeT("filter_btn")}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-4">
              <FilterSidebarContent />
            </div>

            <div className="p-4 border-t border-border/60 bg-card flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  handleResetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-1/2 py-2.5 px-3 rounded-xl border border-border/80 text-xs font-bold text-muted-foreground hover:bg-accent cursor-pointer"
              >
                {safeT("reset_filter")}
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-2.5 px-3 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-2xs cursor-pointer"
              >
                {safeT("found_prefix")} ({filteredCourts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
