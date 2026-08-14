export interface EventDistanceTier {
  id: string;
  name: string;
  distance: string;
  price: number;
  originalPrice?: number;
  phase: "Super Early Bird" | "Early Bird" | "Regular" | "Late";
  regDeadline: string;
  imageUrl?: string;
  description?: string;
  minAge?: number;
  availableSlots?: number;
  soldCount?: number;
  status: "available" | "selling_fast" | "sold_out";
}

export interface EventAddon {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: "photo" | "transport" | "customization" | "nutrition" | "hotel" | "gear";
  imageUrl?: string;
  badge?: string; // e.g. "Phổ biến", "Tiện ích", "Khuyên dùng"
  popular?: boolean;
}

export interface EventAttachment {
  id: string;
  name: string;
  size: string;
  type: "pdf" | "doc" | "image" | "zip";
  url: string;
}

export interface EventArticle {
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
  tags?: string[];
}

export interface EventContentSection {
  id: string;
  title: string;
  type: "text" | "schedule" | "size_chart" | "map" | "rules" | "files";
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  scheduleTimeline?: {
    time: string;
    activity: string;
    location?: string;
    note?: string;
  }[];
  sizeChart?: {
    size: string;
    chest: string;
    height: string;
    weight: string;
  }[];
  attachments?: EventAttachment[];
}

export interface EventData {
  id: string;
  title: string;
  category?: string;
  distanceText?: string;
  distances?: string[];
  badge?: {
    type: "hot" | "recommended" | "custom";
    text: string;
  };
  date: string;
  location: string;
  price: string;
  priceSubtext?: string;
  imageUrl: string;
  buttonText?: string;
  description?: string;
  organizer?: string;
  isFavorite?: boolean;
  distanceTiers?: EventDistanceTier[];
  addons?: EventAddon[];
  contentSections?: EventContentSection[];
  articles?: EventArticle[];
}

export const MOCK_EVENT_ARTICLES: EventArticle[] = [
  {
    id: "art-event-1",
    slug: "kinh-nghiem-boi-bien-dinh-huong-song-aquathlon",
    title: "Kinh nghiệm bơi biển mở & Kỹ thuật định hướng phao tiêu chuẩn trong giải Aquathlon",
    summary: "Hướng dẫn kỹ thuật ngẩng đầu Sighting, canh luồng thủy triều và cách xử lý khi gặp sóng lớn giúp tiết kiệm 20% thể lực trên biển.",
    category: "Kỹ thuật thi đấu",
    publishedDate: "10/08/2026",
    readTime: "4 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&auto=format&fit=crop&q=80",
    author: {
      name: "HLV Đặng Quang Huy",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      role: "Chuyên gia Triathlon",
    },
    tags: ["Bơi biển", "Aquathlon", "Kỹ thuật"],
  },
  {
    id: "art-event-2",
    slug: "chien-thuat-carbo-loading-truoc-ngay-thi-dau",
    title: "Chiến thuật Carbo-Loading nạp năng lượng chuẩn y học thể thao trước tuần lễ Race Day",
    summary: "Bí quyết bổ sung glycogen, điện giải và nước theo từng mốc 7 ngày, 3 ngày và 24 giờ trước giờ xuất phát để tránh tình trạng đụng tường chuột rút.",
    category: "Dinh dưỡng & Phục hồi",
    publishedDate: "06/08/2026",
    readTime: "5 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
    author: {
      name: "BS. Nguyễn Thùy Linh",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      role: "Bác sĩ Y học thể thao",
    },
    tags: ["Dinh dưỡng", "Carbo-Loading", "Race Day"],
  },
  {
    id: "art-event-3",
    slug: "checklist-hanh-trang-race-kit-aquathlon-triathlon",
    title: "Checklist 12 vật dụng bắt buộc và trang thiết bị thi đấu 3 môn phối hợp không thể quên",
    summary: "Danh sách đồ thi đấu quan trọng: Phao bơi an toàn, Kính bơi tráng gương phân cực, Dây đeo Bib race belt, Đai gel dinh dưỡng và Vaseline chống phồng rộp.",
    category: "Hành trang thi đấu",
    publishedDate: "01/08/2026",
    readTime: "3 phút đọc",
    imageUrl: "/images/events/aqua-warriors.png",
    author: {
      name: "PlayGrid Race Team",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
      role: "Ban Chuyên Môn",
    },
    tags: ["Checklist", "Race Kit", "Triathlon"],
  },
];

export const MOCK_EVENT_ADDONS: EventAddon[] = [
  {
    id: "addon-photo-hd",
    name: "Gói Ảnh VĐV Chuyên Nghiệp HD (AI Bib)",
    price: 120000,
    originalPrice: 180000,
    description: "Nhận trọn bộ tất cả hình ảnh thi đấu & về đích độ phân giải 4K tự động qua nhận diện số Bib AI.",
    category: "photo",
    badge: "PHỔ BIẾN",
    popular: true,
    imageUrl: "/images/events/aqua-warriors.png",
  },
  {
    id: "addon-medal-engraving",
    name: "Khắc Tên & Thành Tích Lên Huy Chương",
    price: 69000,
    description: "Khắc laser họ tên và thời gian hoàn thành (Finish Time) chính xác lên mặt sau của huy chương sau vạch đích.",
    category: "customization",
    badge: "LƯU NIỆM",
    imageUrl: "/images/events/mascot-pickleball.png",
  },
  {
    id: "addon-shuttle-bus",
    name: "Xe Buýt Đưa Đón VĐV Khứ Hồi",
    price: 250000,
    originalPrice: 300000,
    description: "Tuyến xe 45 chỗ đưa đón VĐV tiện lợi từ trung tâm đến địa điểm thi đấu, có khoang chứa xe đạp & đồ bơi.",
    category: "transport",
    badge: "TIỆN LỢI",
    imageUrl: "/images/events/aqua-warriors.png",
  },
  {
    id: "addon-pasta-party",
    name: "Vé Tiệc Pasta Party & Gala Nạp Năng Lượng",
    price: 180000,
    description: "Buffet Carbo-loading trước ngày đua cùng các chuyên gia dinh dưỡng và giao lưu cùng cộng đồng VĐV.",
    category: "nutrition",
    badge: "HOT",
    popular: true,
    imageUrl: "/images/events/aqua-warriors.png",
  },
  {
    id: "addon-drybag-20l",
    name: "Túi Chống Nước Drybag 20L Bản Giới Hạn",
    price: 150000,
    originalPrice: 220000,
    description: "Túi chống nước biển chuyên dụng 20L in logo độc quyền của giải, tặng kèm dây đeo trợ lực đa năng.",
    category: "gear",
    badge: "LIMITED",
    imageUrl: "/images/events/mascot-pickleball.png",
  },
  {
    id: "addon-recovery-massage",
    name: "Gói Massage Giãn Cơ Thể Thao (30 phút)",
    price: 199000,
    description: "Chăm sóc phục hồi cơ bắp cấp tốc sau vạch đích bởi đội ngũ kỹ thuật viên y học thể thao chuyên nghiệp.",
    category: "nutrition",
    badge: "PHỤC HỒI",
    imageUrl: "/images/events/aqua-warriors.png",
  },
];

export const EVENTS_DATA: EventData[] = [
  {
    id: "aqua-warriors-2026",
    title: "Giải Aqua Warriors Vân Đồn năm 2026",
    category: "Triathlon / Bơi biển",
    distanceText: "Bơi 3km • Aquathlon",
    badge: {
      type: "hot",
      text: "Nổi bật",
    },
    date: "12 - 13 Tháng 9, 2026",
    location: "Bãi biển Vân Đồn, Quảng Ninh",
    price: "479.000đ",
    priceSubtext: "Chỉ từ",
    imageUrl: "/images/events/aqua-warriors.png",
    buttonText: "Đăng ký",
    description:
      "Giải đấu Aqua Warriors Vân Đồn 2026 hội tụ hơn 2.000 vận động viên tham gia thi đấu các nội dung bơi biển cá nhân và ba môn phối hợp (Triathlon) tại vùng biển hoang sơ tuyệt đẹp Vân Đồn. Cung đường thi đấu được thiết kế chuẩn quốc tế, đảm bảo an toàn tuyệt đối với đội ngũ cứu hộ chuyên nghiệp.",
    organizer: "Ban Tổ Chức Aqua Warriors Việt Nam",
    distanceTiers: [
      {
        id: "tier-aquathlon-3k",
        name: "Aquathlon Standard (Bơi 1km - Chạy 2km)",
        distance: "3km Aquathlon",
        price: 479000,
        originalPrice: 600000,
        phase: "Early Bird",
        regDeadline: "31/08/2026",
        imageUrl: "/images/events/aqua-warriors.png",
        description: "Bao gồm: Áo Finisher cao cấp, Huy chương kim loại đúc nổi 3D, Bib gắn chip time Bioracer, Túi Racekit và Bảo hiểm thể thao.",
        minAge: 16,
        availableSlots: 45,
        soldCount: 155,
        status: "selling_fast",
      },
      {
        id: "tier-triathlon-olympic",
        name: "Triathlon Olympic (Bơi 1.5km - Đạp 40km - Chạy 10km)",
        distance: "51.5km Olympic",
        price: 899000,
        originalPrice: 1150000,
        phase: "Early Bird",
        regDeadline: "31/08/2026",
        imageUrl: "/images/activities/badminton-banner.png",
        description: "Bao gồm: Áo Tri-suit Finisher, Huy chương mạ vàng kỷ niệm, Bib xe đạp + Bib chạy, Trạm tiếp nước & dinh dưỡng chuẩn quốc tế.",
        minAge: 18,
        availableSlots: 80,
        soldCount: 120,
        status: "available",
      },
      {
        id: "tier-swim-sprint-15k",
        name: "Bơi Biển Sprint 1.5km (Sea Swim Open)",
        distance: "1.5km Bơi biển",
        price: 390000,
        originalPrice: 490000,
        phase: "Regular",
        regDeadline: "05/09/2026",
        imageUrl: "/images/explore_sports/gridy-badminton.avif",
        description: "Bao gồm: Phao bơi an toàn dạ quang, Nón bơi silicon chống nước, Huy chương hoàn thành và Nước uống điện giải.",
        minAge: 14,
        availableSlots: 100,
        soldCount: 80,
        status: "available",
      },
      {
        id: "tier-kid-warriors-1k",
        name: "Kid Warriors (Trẻ em 6 - 14 tuổi: Bơi 200m - Chạy 800m)",
        distance: "1km Junior",
        price: 290000,
        originalPrice: 350000,
        phase: "Super Early Bird",
        regDeadline: "25/08/2026",
        imageUrl: "/images/explore_sports/gridy-pickleball.avif",
        description: "Bao gồm: Áo thun Kid Warriors siêu nhân, Huy chương đúc màu, Bộ quà tặng từ nhà tài trợ và Giấy chứng nhận hoàn thành.",
        minAge: 6,
        availableSlots: 30,
        soldCount: 70,
        status: "available",
      },
    ],
    contentSections: [
      {
        id: "section-schedule",
        title: "Lịch Trình Chi Tiết Sự Kiện (Event Schedule)",
        type: "schedule",
        content: "Vui lòng có mặt đúng giờ theo từng khung thời gian quy định của Ban Tổ Chức để làm thủ tục nhận Race Kit và thi đấu an toàn.",
        scheduleTimeline: [
          {
            time: "12/09 - 08:00 đến 18:00",
            activity: "Mở cửa Expo, Phát Race Kit, Bib & Kiểm tra trang thiết bị bơi",
            location: "Khu vực Expo, Bãi biển Vân Đồn",
            note: "Yêu cầu mang theo CCCD/Hộ chiếu và QR Code xác nhận đăng ký",
          },
          {
            time: "12/09 - 15:30 đến 16:30",
            activity: "Họp kỹ thuật (Race Briefing) & Phổ biến an toàn luồng bơi",
            location: "Sân khấu trung tâm giải",
            note: "Bắt buộc đối với VĐV cự ly Olympic và Aquathlon",
          },
          {
            time: "12/09 - 17:00 đến 19:00",
            activity: "Tiệc giao lưu Pasta Party & Gala Nạp Năng Lượng Carbo-loading",
            location: "Nhà hàng đối tác sự kiện",
          },
          {
            time: "13/09 - 05:00 đến 05:45",
            activity: "Mở khu vực Transition Area, gửi đồ VĐV & Khởi động",
            location: "Bãi biển Vân Đồn",
          },
          {
            time: "13/09 - 06:00",
            activity: "Xuất phát cự ly Triathlon Olympic (51.5km)",
            location: "Cổng xuất phát bãi biển",
          },
          {
            time: "13/09 - 06:30",
            activity: "Xuất phát cự ly Aquathlon Standard & Bơi biển Sprint",
            location: "Cổng xuất phát bãi biển",
          },
          {
            time: "13/09 - 07:30",
            activity: "Xuất phát cự ly Kid Warriors (Bơi 200m - Chạy 800m)",
            location: "Khu vực bơi cạn dành cho trẻ em",
          },
          {
            time: "13/09 - 11:30 đến 12:30",
            activity: "Lễ bế mạc & Trao giải thưởng vinh danh VĐV xuất sắc",
            location: "Sân khấu chính",
          },
        ],
      },
      {
        id: "section-size-chart",
        title: "Bảng Quy Đổi Kích Thước Áo Thi Đấu & Finisher (Shirt Size Chart)",
        type: "size_chart",
        content: "Áo thi đấu chính thức sử dụng chất liệu vải thể thao Microfiber co giãn 4 chiều siêu nhẹ, thoáng khí và kháng khuẩn chuẩn thi đấu quốc tế.",
        imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
        imageAlt: "Bảng kích cỡ áo thi đấu giải Aqua Warriors Vân Đồn 2026",
        imageCaption: "Mẫu áo thi đấu Finisher chính thức mùa giải 2026",
        sizeChart: [
          { size: "XS", chest: "84 - 88 cm", height: "1m50 - 1m58", weight: "42 - 50 kg" },
          { size: "S", chest: "88 - 92 cm", height: "1m58 - 1m66", weight: "50 - 58 kg" },
          { size: "M", chest: "92 - 96 cm", height: "1m66 - 1m72", weight: "58 - 66 kg" },
          { size: "L", chest: "96 - 102 cm", height: "1m72 - 1m78", weight: "66 - 75 kg" },
          { size: "XL", chest: "102 - 108 cm", height: "1m76 - 1m84", weight: "75 - 84 kg" },
          { size: "2XL", chest: "108 - 116 cm", height: "1m80 - 1m92", weight: "> 85 kg" },
        ],
      },
      {
        id: "section-rules",
        title: "Quy Định Thi Đấu & Trang Thiết Bị Bắt Buộc (Rules & Mandatory Gear)",
        type: "rules",
        content: "Để đảm bảo an toàn tuyệt đối cho tất cả VĐV trên biển, Ban Tổ Chức áp dụng nghiêm ngặt các quy định an toàn cứu hộ theo tiêu chuẩn ITU:",
        imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&auto=format&fit=crop&q=80",
        imageAlt: "Sơ đồ luồng bơi và phao an toàn cứu hộ giải Aqua Warriors",
        imageCaption: "Sơ đồ bố trí xuồng cứu hộ và trạm y tế trên đường bơi",
      },
      {
        id: "section-files",
        title: "Tài Liệu Hướng Dẫn & Tệp Đính Kèm (Downloads & Documents)",
        type: "files",
        content: "Tải về các biểu mẫu bắt buộc và sổ tay hướng dẫn chi tiết dành cho vận động viên:",
        attachments: [
          {
            id: "att-athlete-guide",
            name: "Athlete_Guide_Handbook_AquaWarriors_2026.pdf",
            size: "4.8 MB",
            type: "pdf",
            url: "#",
          },
          {
            id: "att-liability-waiver",
            name: "Giay_Cam_Ket_Mien_Tru_Trach_Nhiem_Waiver.pdf",
            size: "1.2 MB",
            type: "pdf",
            url: "#",
          },
          {
            id: "att-authorization-form",
            name: "Giay_Uy_Quyen_Nhan_RaceKit_Ho.pdf",
            size: "860 KB",
            type: "pdf",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    id: "nghe-an-legacy-marathon-2026",
    title: "NGHỆ AN LEGACY MARATHON - VỀ MIỀN NON XANH NƯỚC BIẾC",
    category: "Marathon",
    distanceText: "5km - 10km - 21km - 42km",
    badge: {
      type: "recommended",
      text: "Đề xuất",
    },
    date: "05 - 06 Tháng 12, 2026",
    location: "Quảng trường Bình Minh, Cửa Lò, Nghệ An",
    price: "137.000đ",
    priceSubtext: "Chỉ từ",
    imageUrl: "/images/events/legacy-marathon.png",
    buttonText: "Đăng ký",
    description:
      "Nghệ An Legacy Marathon 2026 đưa các chân chạy khám phá cung đường ven biển Cửa Lò thơ mộng và những danh thắng lịch sử của vùng đất địa linh nhân kiệt Nghệ An.",
    organizer: "Liên đoàn Điền kinh Việt Nam & Tỉnh Nghệ An",
    distanceTiers: [
      {
        id: "tier-na-42k",
        name: "Full Marathon 42.195km (Huy chương kim loại mạ vàng)",
        distance: "42km",
        price: 550000,
        originalPrice: 700000,
        phase: "Early Bird",
        regDeadline: "15/11/2026",
        imageUrl: "/images/events/legacy-marathon.png",
        description: "Bao gồm: Áo Finisher 42km, Huy chương đúc nổi, Bib gắn chip time chuẩn AIMS, Nước điện giải & Gel năng lượng.",
        minAge: 18,
        availableSlots: 100,
        status: "available",
      },
      {
        id: "tier-na-21k",
        name: "Half Marathon 21.0975km",
        distance: "21km",
        price: 390000,
        originalPrice: 500000,
        phase: "Early Bird",
        regDeadline: "15/11/2026",
        imageUrl: "/images/explore_sports/gridy-badminton.avif",
        description: "Bao gồm: Áo chạy Finisher 21km, Huy chương lưu niệm, Bib gắn chip time, Bảo hiểm vận động viên.",
        minAge: 16,
        availableSlots: 150,
        status: "available",
      },
      {
        id: "tier-na-10k",
        name: "Cự ly phong trào 10km",
        distance: "10km",
        price: 250000,
        originalPrice: 320000,
        phase: "Regular",
        regDeadline: "25/11/2026",
        imageUrl: "/images/activities/badminton-banner.png",
        description: "Bao gồm: Áo thun sự kiện, Huy chương hoàn thành, Nước khoáng và đồ ăn nhẹ tại đích.",
        minAge: 12,
        availableSlots: 200,
        status: "available",
      },
      {
        id: "tier-na-5k",
        name: "Cự ly trải nghiệm & Gia đình 5km",
        distance: "5km",
        price: 137000,
        originalPrice: 180000,
        phase: "Super Early Bird",
        regDeadline: "30/10/2026",
        imageUrl: "/images/explore_sports/gridy-pickleball.avif",
        description: "Bao gồm: Áo chạy PlayGrid, Huy chương kim loại dễ thương, Vòng tay phát sáng và Nước uống.",
        minAge: 6,
        availableSlots: 300,
        status: "available",
      },
    ],
  },
  {
    id: "dak-lak-ultra-2026",
    title: "Đắk Lắk Ultra - Vietnam Backyard 2026",
    category: "Trail Running",
    distanceText: "15km - 25km - 42km - 75km",
    date: "14 - 16 Tháng 8, 2026",
    location: "Hồ du lịch sinh thái Ea Cuôr Kăp - Tỉnh Đắk Lắk",
    price: "399.000đ",
    priceSubtext: "Chỉ từ",
    imageUrl: "/images/events/daklak-ultra.png",
    buttonText: "Đăng ký",
    description:
      "Trải nghiệm chạy đường mòn địa hình Tây Nguyên băng qua rừng thông bạt ngàn, đồi chè xanh mướt và những con dốc thách thức giới hạn bản thân.",
    organizer: "Vietnam Trail Series",
    distanceTiers: [
      {
        id: "tier-dl-75k",
        name: "Ultra Trail 75km (Thử thách đỉnh cao Tây Nguyên)",
        distance: "75km Ultra",
        price: 890000,
        originalPrice: 1100000,
        phase: "Early Bird",
        regDeadline: "01/08/2026",
        imageUrl: "/images/events/daklak-ultra.png",
        description: "Bao gồm: Áo khoác Finisher gió cao cấp, Huy chương gốm đúc nổi, Bib chip time GPS, 8 trạm CP hỗ trợ y tế & dinh dưỡng chuyên sâu.",
        minAge: 18,
        availableSlots: 60,
        status: "selling_fast",
      },
      {
        id: "tier-dl-42k",
        name: "Trail Marathon 42km",
        distance: "42km Trail",
        price: 650000,
        originalPrice: 800000,
        phase: "Early Bird",
        regDeadline: "01/08/2026",
        imageUrl: "/images/activities/badminton-banner.png",
        description: "Bao gồm: Áo Finisher tay dài, Huy chương kim loại dập nổi, Bib gắn chip time, Bảo hiểm cứu hộ đồi núi.",
        minAge: 18,
        availableSlots: 80,
        status: "available",
      },
      {
        id: "tier-dl-15k",
        name: "Discovery Trail 15km (Khám phá rừng thông)",
        distance: "15km Trail",
        price: 399000,
        originalPrice: 500000,
        phase: "Regular",
        regDeadline: "05/08/2026",
        imageUrl: "/images/explore_sports/gridy-badminton.avif",
        description: "Bao gồm: Áo thun Trail runner, Huy chương lưu niệm và Nước điện giải.",
        minAge: 14,
        availableSlots: 120,
        status: "available",
      },
    ],
  },
  {
    id: "hanoi-badminton-open-2026",
    title: "Giải Cầu Lông Hà Nội Open 2026 - Mở Rộng Toàn Quốc",
    category: "Giải cầu lông",
    distanceText: "Đôi Nam • Đôi Nữ • Đôi Nam Nữ",
    badge: {
      type: "hot",
      text: "Hot",
    },
    date: "20 - 22 Tháng 10, 2026",
    location: "Nhà thi đấu Trịnh Hoài Đức, Đống Đa, Hà Nội",
    price: "250.000đ",
    priceSubtext: "Chỉ từ",
    imageUrl: "/images/activities/badminton-banner.png",
    buttonText: "Đăng ký",
    description:
      "Sân chơi quy tụ hơn 500 vợt thủ phong trào và bán chuyên toàn quốc tranh tài ở 5 hạng mục thi đấu hấp dẫn.",
    organizer: "Liên đoàn Cầu Lông Hà Nội",
    distanceTiers: [
      {
        id: "tier-hn-doi-nam",
        name: "Hạng mục Đôi Nam (Trình độ Nâng cao / Phong trào)",
        distance: "Đôi Nam",
        price: 450000,
        originalPrice: 550000,
        phase: "Early Bird",
        regDeadline: "10/10/2026",
        imageUrl: "/images/activities/badminton-banner.png",
        description: "Bao gồm: Vé thi đấu 2 VĐV, Áo đấu Yonex chính hãng, Cầu thi đấu Victor Gold, Nước uống miễn phí.",
        availableSlots: 32,
        status: "selling_fast",
      },
      {
        id: "tier-hn-doi-nam-nu",
        name: "Hạng mục Đôi Nam Nữ",
        distance: "Đôi Nam Nữ",
        price: 400000,
        originalPrice: 500000,
        phase: "Early Bird",
        regDeadline: "10/10/2026",
        imageUrl: "/images/explore_sports/gridy-badminton.avif",
        description: "Bao gồm: Vé thi đấu 2 VĐV, 2 Áo thể thao PlayGrid, Quà tặng từ nhà tài trợ.",
        availableSlots: 32,
        status: "available",
      },
      {
        id: "tier-hn-don-nam",
        name: "Hạng mục Đơn Nam Phong Trào",
        distance: "Đơn Nam",
        price: 250000,
        originalPrice: 300000,
        phase: "Regular",
        regDeadline: "15/10/2026",
        imageUrl: "/images/events/aqua-warriors.png",
        description: "Bao gồm: Vé thi đấu đơn, Áo đấu giải, Cầu thi đấu và Kỷ niệm chương tham dự.",
        availableSlots: 64,
        status: "available",
      },
    ],
  },
  {
    id: "saigon-pickleball-championship",
    title: "Giải Pickleball Vô Địch TP. HCM 2026 - Master Cup",
    category: "Pickleball",
    distanceText: "Đơn & Đôi • Trình 3.0 - 4.5+",
    badge: {
      type: "recommended",
      text: "Đề xuất",
    },
    date: "10 - 12 Tháng 11, 2026",
    location: "Pickleball Club Quận 2, Thủ Đức, TP. HCM",
    price: "300.000đ",
    priceSubtext: "Chỉ từ",
    imageUrl: "/images/activities/pickleball-banner.png",
    buttonText: "Đăng ký",
    description:
      "Giải đấu Pickleball chuyên nghiệp và phong trào lớn nhất miền Nam với hệ thống tính điểm quốc tế DUPR.",
    organizer: "Hiệp hội Pickleball TP. HCM",
    distanceTiers: [
      {
        id: "tier-pb-open-doi",
        name: "Đôi Open (Hạng Trình DUPR 3.5 - 4.5+)",
        distance: "Đôi Open",
        price: 500000,
        originalPrice: 650000,
        phase: "Early Bird",
        regDeadline: "01/11/2026",
        imageUrl: "/images/activities/pickleball-banner.png",
        description: "Bao gồm: Vé tham dự 2 VĐV, 2 Áo thi đấu Dri-fit cao cấp, Bóng thi đấu Franklin X-40, Điểm xếp hạng DUPR quốc tế.",
        availableSlots: 32,
        status: "selling_fast",
      },
      {
        id: "tier-pb-beginner-doi",
        name: "Đôi Phong Trào / Newbie (Trình 2.0 - 3.0)",
        distance: "Đôi Newbie",
        price: 400000,
        originalPrice: 500000,
        phase: "Regular",
        regDeadline: "05/11/2026",
        imageUrl: "/images/explore_sports/gridy-pickleball.avif",
        description: "Bao gồm: Vé tham dự 2 VĐV, 2 Áo thi đấu lưu niệm, Bộ quấn cán vợt và Kỷ niệm chương.",
        availableSlots: 40,
        status: "available",
      },
    ],
  },
  {
    id: "music-fest-summer-2026",
    title: "Đại Nhạc Hội Thể Thao & Âm Nhạc Summer Fest 2026",
    category: "Concert / Âm nhạc",
    distanceText: "Vé GA • VIP • SVIP",
    badge: {
      type: "hot",
      text: "Nổi bật",
    },
    date: "30 Tháng 8, 2026",
    location: "Sân vận động Mỹ Đình, Nam Từ Liêm, Hà Nội",
    price: "550.000đ",
    priceSubtext: "Chỉ từ",
    imageUrl: "/images/activities/football-banner.png",
    buttonText: "Mua vé",
    description:
      "Sự kết hợp bùng nổ giữa thể thao biểu diễn và đại nhạc hội EDM với sự tham gia của dàn nghệ sĩ hàng đầu.",
    organizer: "PlayGrid Entertainment",
    distanceTiers: [
      {
        id: "tier-fest-svip",
        name: "Vé SVIP Fanzone (Sát sân khấu + Bộ Kit độc quyền)",
        distance: "Hạng SVIP",
        price: 1500000,
        originalPrice: 1800000,
        phase: "Early Bird",
        regDeadline: "20/08/2026",
        imageUrl: "/images/activities/football-banner.png",
        description: "Bao gồm: Vị trí Fanzone hàng đầu, Vòng tay phát sáng LED, Áo thun Summer Fest Limited, Lối đi riêng và Đồ uống không giới hạn.",
        availableSlots: 100,
        status: "selling_fast",
      },
      {
        id: "tier-fest-vip",
        name: "Vé VIP Khán đài trung tâm",
        distance: "Hạng VIP",
        price: 950000,
        originalPrice: 1200000,
        phase: "Regular",
        regDeadline: "25/08/2026",
        imageUrl: "/images/explore_sports/gridy-badminton.avif",
        description: "Bao gồm: Ghế ngồi khán đài VIP có mái che, Vòng tay phát sáng, Nước khoáng và quà tặng lưu niệm.",
        availableSlots: 200,
        status: "available",
      },
      {
        id: "tier-fest-ga",
        name: "Vé GA Sân Cỏ (General Admission)",
        distance: "Hạng GA",
        price: 550000,
        originalPrice: 650000,
        phase: "Regular",
        regDeadline: "28/08/2026",
        imageUrl: "/images/explore_sports/gridy-pickleball.avif",
        description: "Bao gồm: Vé vào cổng khu vực sân cỏ, Vòng tay sự kiện và Nước uống đóng chai.",
        availableSlots: 500,
        status: "available",
      },
    ],
  },
];

export function getEventById(id: string): EventData {
  const found = EVENTS_DATA.find((e) => e.id === id);
  if (found) return found;
  return EVENTS_DATA[0]!;
}

