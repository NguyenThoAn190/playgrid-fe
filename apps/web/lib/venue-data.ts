export interface SubCourt {
  id: string;
  name: string;
  surface: string; // e.g. "Thảm Yonex Tiêu Chuẩn BWF", "Thảm Enlio 5.0mm"
  type: "standard" | "vip";
  priceMultiplier: number;
}

export interface TimeSlot {
  id: string;
  time: string; // e.g. "06:00 - 07:00"
  startTime: string;
  endTime: string;
  period: "morning" | "afternoon" | "evening";
  price: number;
  isPeak: boolean;
}

export interface VenueAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  iconName: string;
}

export interface VenueReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  tags?: string[];
  likes: number;
  courtUsed?: string;
}

export interface VenueArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedDate: string;
  readTime: string;
  imageUrl: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  tags: string[];
}

export interface VenueDetailData {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  sport: string;
  sports: string[];
  rating: number;
  reviewsCount: number;
  verified: boolean;
  hot: boolean;
  address: string;
  district: string;
  city: string;
  distance: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openHours: string;
  phone: string;
  email: string;
  description: string;
  contentHtml?: string;
  images: string[];
  totalCourts: number;
  subCourts: SubCourt[];
  basePrice: number;
  priceRange: string;
  amenities: {
    id: string;
    label: string;
    icon: string;
    description?: string;
  }[];
  rules: string[];
  cancellationPolicy: {
    title: string;
    description: string;
    points: string[];
  };
  addons: VenueAddon[];
  reviews: VenueReview[];
  ratingBreakdown: {
    cleanliness: number;
    lighting: number;
    surfaceQuality: number;
    service: number;
  };
  articles?: VenueArticle[];
}

export const VENUES_DATA: Record<string, VenueDetailData> = {
  "phu-tho-badminton": {
    id: "phu-tho-badminton",
    slug: "phu-tho-badminton",
    name: "Cụm Sân Cầu Lông Nhà Thi Đấu Phú Thọ",
    shortName: "Sân Cầu Lông Phú Thọ",
    sport: "Cầu lông",
    sports: ["Cầu lông", "Bóng bàn"],
    rating: 4.8,
    reviewsCount: 215,
    verified: true,
    hot: true,
    address: "219 Lý Thường Kiệt, Phường 15, Quận 11, TP. Hồ Chí Minh",
    district: "Quận 11",
    city: "TP. Hồ Chí Minh",
    distance: "3.2 km từ vị trí của bạn",
    coordinates: {
      lat: 10.7686,
      lng: 106.6578,
    },
    openHours: "05:00 - 23:00 (Thứ 2 - Chủ Nhật)",
    phone: "0908 123 456",
    email: "booking.phutho@playgrid.vn",
    description:
      "Cụm sân cầu lông Nhà Thi Đấu Phú Thọ là một trong những trung tâm cầu lông lớn và hiện đại nhất khu vực Quận 11 - Quận 10. Sân được trang bị 100% thảm Yonex cao cấp đạt chuẩn thi đấu quốc tế BWF, trần cao thông thoáng chống gió lùa, hệ thống đèn LED chống lóa hiện đại cùng khán đài rộng rãi và bãi đậu xe ô tô không giới hạn.",
    articles: [
      {
        id: "art-1",
        slug: "review-mat-tham-yonex-phu-tho",
        title: "Review chi tiết trải nghiệm mặt thảm Yonex chuẩn BWF tại Sân Cầu Lông Phú Thọ",
        summary: "Đánh giá chân thực về độ nảy cầu, độ bám sân chống trơn trượt và trải nghiệm thi đấu thực tế trên 8 sân thảm cao cấp.",
        category: "Đánh giá sân",
        publishedDate: "12/08/2026",
        readTime: "4 phút đọc",
        imageUrl: "/images/activities/badminton-banner.png",
        author: {
          name: "Trần Minh Quân",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
          role: "HLV Cầu Lông BWF",
        },
        tags: ["Review", "Thảm Yonex", "Phú Thọ"],
      },
      {
        id: "art-2",
        slug: "kinh-nghiem-chon-giay-cau-long-san-tham",
        title: "Bí quyết chọn giày cầu lông đế bám, chống lật cổ chân khi thi đấu sân thảm trong nhà",
        summary: "Hướng dẫn chọn size giày, công nghệ đệm Power Cushion và các lưu ý bắt buộc khi mang giày vào cụm sân thể thao tiêu chuẩn.",
        category: "Kỹ thuật & Mẹo",
        publishedDate: "08/08/2026",
        readTime: "5 phút đọc",
        imageUrl: "/images/explore_sports/gridy-badminton.avif",
        author: {
          name: "Nguyễn Hà Linh",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
          role: "Chuyên gia thể thao",
        },
        tags: ["Kỹ thuật", "Giày cầu lông", "Bảo hộ"],
      },
      {
        id: "art-3",
        slug: "giai-dau-playgrid-open-cup-2026",
        title: "Khởi tranh giải đấu Cầu Lông Phong Trào PlayGrid Open Cup Mùa Hè 2026",
        summary: "Tổng giá trị giải thưởng lên đến 50.000.000đ quy tụ hơn 64 cặp VĐV phong trào toàn thành phố tham gia tranh tài sôi nổi.",
        category: "Giải đấu & Sự kiện",
        publishedDate: "01/08/2026",
        readTime: "3 phút đọc",
        imageUrl: "/images/activities/badminton-banner.png",
        author: {
          name: "Ban Tổ Chức PlayGrid",
          avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
          role: "Admin PlayGrid",
        },
        tags: ["Giải đấu", "Sự kiện", "Open Cup"],
      },
    ],
    images: [
      "/images/activities/badminton-banner.png",
      "/images/explore_sports/gridy-badminton.avif",
      "/images/activities/badminton-banner.png",
      "/images/explore_sports/gridy-badminton.avif",
    ],
    totalCourts: 12,
    subCourts: [
      { id: "court-1", name: "Sân 1 (Thảm Yonex BWF)", surface: "Thảm Yonex 5.0mm", type: "standard", priceMultiplier: 1.0 },
      { id: "court-2", name: "Sân 2 (Thảm Yonex BWF)", surface: "Thảm Yonex 5.0mm", type: "standard", priceMultiplier: 1.0 },
      { id: "court-3", name: "Sân 3 (Thảm Yonex BWF)", surface: "Thảm Yonex 5.0mm", type: "standard", priceMultiplier: 1.0 },
      { id: "court-4", name: "Sân 4 (Thảm Yonex BWF)", surface: "Thảm Yonex 5.0mm", type: "standard", priceMultiplier: 1.0 },
      { id: "court-5", name: "Sân 5 (Sân VIP Khán Đài)", surface: "Thảm Yonex Master Pro", type: "vip", priceMultiplier: 1.15 },
      { id: "court-6", name: "Sân 6 (Sân VIP Khán Đài)", surface: "Thảm Yonex Master Pro", type: "vip", priceMultiplier: 1.15 },
      { id: "court-7", name: "Sân 7 (Thảm Enlio Pro)", surface: "Thảm Enlio 5.0mm", type: "standard", priceMultiplier: 1.0 },
      { id: "court-8", name: "Sân 8 (Thảm Enlio Pro)", surface: "Thảm Enlio 5.0mm", type: "standard", priceMultiplier: 1.0 },
    ],
    basePrice: 130000,
    priceRange: "130.000đ - 180.000đ/giờ",
    amenities: [
      { id: "parking", label: "Bãi xe ô tô & xe máy rộng rãi", icon: "Car", description: "Có bảo vệ trông xe 24/7, đậu ô tô thoải mái" },
      { id: "shower", label: "Phòng tắm nóng lạnh & thay đồ", icon: "ShowerHead", description: "Khu vệ sinh sạch sẽ, riêng biệt nam nữ" },
      { id: "canteen", label: "Căng-tin & Nước giải khát", icon: "Coffee", description: "Đầy đủ nước khoáng, nước điện giải, đồ ăn nhẹ" },
      { id: "wifi", label: "Wifi tốc độ cao miễn phí", icon: "Wifi", description: "Phủ sóng toàn bộ khuôn viên sân" },
      { id: "stringing", label: "Dịch vụ đan vợt lấy liền", icon: "Wrench", description: "Đan vợt điện tử chuẩn gram, bán phụ kiện Yonex, Victor" },
      { id: "light", label: "Hệ thống đèn LED chống lóa", icon: "Sun", description: "Bố trí 2 bên hông không chói mắt khi ngửa mặt đập cầu" },
      { id: "ac", label: "Hệ thống quạt công nghiệp thông thoáng", icon: "Wind", description: "Trần cao 11m, lưu thông khí tự nhiên cực tốt" },
      { id: "stands", label: "Khán đài & Ghế nghỉ có đệm", icon: "Armchair", description: "Khu vực nghỉ ngơi thoải mái cho người chơi và khán giả" },
    ],
    rules: [
      "Bắt buộc mang giày chuyên dụng cầu lông (đế cao su non gum sole) để bảo vệ mặt thảm sân.",
      "Vui lòng không mang thức ăn nóng, nước có màu hoặc kẹo cao su vào khu vực thảm sân.",
      "Không hút thuốc lá hoặc sử dụng chất kích thích trong khuôn viên nhà thi đấu.",
      "Tự bảo quản tư trang cá nhân hoặc gửi tủ locker tại quầy tiếp tân.",
      "Có mặt đúng giờ đã đặt để đảm bảo thời lượng buổi chơi.",
    ],
    cancellationPolicy: {
      title: "Chính sách hoàn hủy linh hoạt cùng PlayGrid",
      description: "Chúng tôi hỗ trợ bạn chủ động thay đổi lịch chơi khi có việc đột xuất:",
      points: [
        "Hủy hoặc đổi lịch trước 06 tiếng: Hoàn tiền 100% vào Ví PlayGrid hoặc chuyển lịch miễn phí.",
        "Hủy trước từ 02 - 06 tiếng: Hoàn 50% giá trị tiền sân đã thanh toán.",
        "Hủy dưới 02 tiếng: Không hỗ trợ hoàn tiền do sân đã được giữ chỗ cố định.",
        "Trường hợp bất khả kháng (sự cố kỹ thuật sân): Hoàn 100% tiền mặt hoặc tặng voucher giảm 20% cho lần đặt kế tiếp.",
      ],
    },
    addons: [
      { id: "shuttle-tube", name: "Ống cầu Thành Công 77 (12 quả)", description: "Cầu lông chuẩn thi đấu bền đẹp", price: 240000, unit: "ống", iconName: "Feather" },
      { id: "racket-rent", name: "Thuê vợt Yonex Astrox Pro", description: "Căng sẵn 10.5kg, quấn cán mới", price: 35000, unit: "cây / lượt", iconName: "Crosshair" },
      { id: "pocari", name: "Nước khoáng điện giải Pocari 500ml", description: "Bù khoáng & nước tức thì khi vận động", price: 18000, unit: "chai", iconName: "CupSoda" },
      { id: "water-revive", name: "Nước tăng lực thể thao Revive Chanh Muối", description: "Ướp lạnh sảng khoái", price: 15000, unit: "chai", iconName: "CupSoda" },
      { id: "towel", name: "Khăn lau mồ hôi thể thao PlayGrid", description: "Khăn cotton 100% mềm mại", price: 45000, unit: "cái", iconName: "Sparkles" },
    ],
    reviews: [
      {
        id: "rev-1",
        userName: "Nguyễn Minh Tuấn",
        userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "Hôm qua lúc 20:30",
        comment: "Sân rất đẹp, thảm Yonex cực êm chân chạy không bị trượt hay đau khớp gối. Đèn sáng đều không bị chói mắt. Nhân viên nhiệt tình hỗ trợ bật đèn sớm 10 phút. Chắc chắn sẽ quay lại thường xuyên!",
        tags: ["Thảm êm", "Đèn chuẩn", "Nhân viên nhiệt tình"],
        likes: 18,
        courtUsed: "Sân 5 (VIP)",
      },
      {
        id: "rev-2",
        userName: "Trần Bảo Ngọc",
        userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "3 ngày trước",
        comment: "Đặt qua PlayGrid nhanh gọn, tới nơi chỉ cần quét mã QR là vào sân luôn. Bãi đỗ xe ô tô siêu rộng đậu thoải mái. Căng tin có đầy đủ nước và chuối.",
        tags: ["Check-in nhanh", "Bãi xe rộng"],
        likes: 12,
        courtUsed: "Sân 2",
      },
      {
        id: "rev-3",
        userName: "Lê Hoàng Nam",
        userAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        rating: 4,
        date: "1 tuần trước",
        comment: "Sân chất lượng rất tốt, phòng tắm sạch sẽ có máy nước nóng. Điểm trừ duy nhất là giờ cao điểm từ 18:00 - 20:00 rất nhanh kín sân, nên đặt trước ít nhất 1-2 ngày.",
        tags: ["Phòng tắm sạch", "Nên đặt sớm"],
        likes: 8,
        courtUsed: "Sân 1",
      },
    ],
    ratingBreakdown: {
      cleanliness: 4.9,
      lighting: 4.8,
      surfaceQuality: 4.9,
      service: 4.7,
    },
  },
  "viettel-badminton": {
    id: "viettel-badminton",
    slug: "viettel-badminton",
    name: "Sân Cầu Lông Viettel Hùng Vương",
    shortName: "Sân Viettel Hùng Vương",
    sport: "Cầu lông",
    sports: ["Cầu lông"],
    rating: 4.9,
    reviewsCount: 96,
    verified: true,
    hot: true,
    address: "158 Hùng Vương, Phường 2, Quận 10, TP. Hồ Chí Minh",
    district: "Quận 10",
    city: "TP. Hồ Chí Minh",
    distance: "4.8 km từ vị trí của bạn",
    coordinates: {
      lat: 10.7584,
      lng: 106.6712,
    },
    openHours: "06:00 - 23:00",
    phone: "0912 888 999",
    email: "viettel.badminton@playgrid.vn",
    description: "Sân cầu lông Viettel Hùng Vương với 8 sân thảm cao cấp, trang thiết bị máy điều hòa cục bộ, quầy dịch vụ đan vợt và khu giải khát tiện nghi.",
    images: [
      "/images/explore_sports/gridy-badminton.avif",
      "/images/activities/badminton-banner.png",
    ],
    totalCourts: 8,
    subCourts: [
      { id: "court-1", name: "Sân 1 (Thảm Yonex)", surface: "Thảm Yonex 5.0mm", type: "standard", priceMultiplier: 1.0 },
      { id: "court-2", name: "Sân 2 (Thảm Yonex)", surface: "Thảm Yonex 5.0mm", type: "standard", priceMultiplier: 1.0 },
      { id: "court-3", name: "Sân 3 (Thảm Yonex)", surface: "Thảm Yonex 5.0mm", type: "standard", priceMultiplier: 1.0 },
      { id: "court-4", name: "Sân 4 (Thảm Yonex)", surface: "Thảm Yonex 5.0mm", type: "standard", priceMultiplier: 1.0 },
    ],
    basePrice: 150000,
    priceRange: "150.000đ - 200.000đ/giờ",
    amenities: [
      { id: "parking", label: "Bãi giữ xe", icon: "Car" },
      { id: "shower", label: "Phòng tắm", icon: "ShowerHead" },
      { id: "canteen", label: "Căng-tin", icon: "Coffee" },
      { id: "wifi", label: "Wifi", icon: "Wifi" },
    ],
    rules: ["Mang giày cầu lông", "Giữ gìn vệ sinh chung"],
    cancellationPolicy: {
      title: "Chính sách hoàn hủy",
      description: "Hoàn 100% trước 6h",
      points: ["Hủy trước 6 tiếng: Hoàn 100%"],
    },
    addons: [
      { id: "shuttle-tube", name: "Ống cầu Thành Công 77", description: "Hộp 12 quả", price: 240000, unit: "ống", iconName: "Feather" },
    ],
    reviews: [],
    ratingBreakdown: { cleanliness: 4.8, lighting: 4.9, surfaceQuality: 4.9, service: 4.8 },
  },
};

export const DEFAULT_TIME_SLOTS: TimeSlot[] = [
  // Sáng (05:00 - 12:00)
  { id: "slot-0500", time: "05:00 - 06:00", startTime: "05:00", endTime: "06:00", period: "morning", price: 120000, isPeak: false },
  { id: "slot-0600", time: "06:00 - 07:00", startTime: "06:00", endTime: "07:00", period: "morning", price: 120000, isPeak: false },
  { id: "slot-0700", time: "07:00 - 08:00", startTime: "07:00", endTime: "08:00", period: "morning", price: 130000, isPeak: false },
  { id: "slot-0800", time: "08:00 - 09:00", startTime: "08:00", endTime: "09:00", period: "morning", price: 130000, isPeak: false },
  { id: "slot-0900", time: "09:00 - 10:00", startTime: "09:00", endTime: "10:00", period: "morning", price: 130000, isPeak: false },
  { id: "slot-1000", time: "10:00 - 11:00", startTime: "10:00", endTime: "11:00", period: "morning", price: 130000, isPeak: false },
  { id: "slot-1100", time: "11:00 - 12:00", startTime: "11:00", endTime: "12:00", period: "morning", price: 120000, isPeak: false },

  // Chiều (12:00 - 17:00)
  { id: "slot-1200", time: "12:00 - 13:00", startTime: "12:00", endTime: "13:00", period: "afternoon", price: 130000, isPeak: false },
  { id: "slot-1300", time: "13:00 - 14:00", startTime: "13:00", endTime: "14:00", period: "afternoon", price: 130000, isPeak: false },
  { id: "slot-1400", time: "14:00 - 15:00", startTime: "14:00", endTime: "15:00", period: "afternoon", price: 140000, isPeak: false },
  { id: "slot-1500", time: "15:00 - 16:00", startTime: "15:00", endTime: "16:00", period: "afternoon", price: 140000, isPeak: false },
  { id: "slot-1600", time: "16:00 - 17:00", startTime: "16:00", endTime: "17:00", period: "afternoon", price: 150000, isPeak: true },

  // Tối Giờ Vàng (17:00 - 23:00)
  { id: "slot-1700", time: "17:00 - 18:00", startTime: "17:00", endTime: "18:00", period: "evening", price: 170000, isPeak: true },
  { id: "slot-1800", time: "18:00 - 19:00", startTime: "18:00", endTime: "19:00", period: "evening", price: 180000, isPeak: true },
  { id: "slot-1900", time: "19:00 - 20:00", startTime: "19:00", endTime: "20:00", period: "evening", price: 180000, isPeak: true },
  { id: "slot-2000", time: "20:00 - 21:00", startTime: "20:00", endTime: "21:00", period: "evening", price: 170000, isPeak: true },
  { id: "slot-2100", time: "21:00 - 22:00", startTime: "21:00", endTime: "22:00", period: "evening", price: 150000, isPeak: false },
  { id: "slot-2200", time: "22:00 - 23:00", startTime: "22:00", endTime: "23:00", period: "evening", price: 130000, isPeak: false },
];

export function getVenueBySlug(slug: string): VenueDetailData {
  if (VENUES_DATA[slug]) {
    return VENUES_DATA[slug]!;
  }
  const base = VENUES_DATA["phu-tho-badminton"]!;
  const generatedName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    ...base,
    id: slug,
    slug: slug,
    name: generatedName,
    shortName: generatedName,
  };
}
