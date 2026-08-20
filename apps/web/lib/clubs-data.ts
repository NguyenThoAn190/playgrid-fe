import { ClubData } from "@/components/clubs/club-card";

export interface ClubScheduleSession {
  id: string;
  dayOfWeek: string; // e.g. "Thứ 3, 5, 7", "Chủ Nhật"
  time: string; // e.g. "19:00 - 21:30"
  court: string; // e.g. "Sân 1, 2, 3 - Tada Center"
  activityType: string; // e.g. "Đánh đôi đối kháng & Chấm điểm Rank"
  levelRequirement: string; // e.g. "Trình 2.5 - 4.0+"
  slotsTotal: number;
  slotsBooked: number;
  feePerSession: string;
}

export interface ClubCoach {
  id: string;
  name: string;
  role: string; // e.g. "HLV Trưởng / Cựu Tuyển Thủ QG"
  avatarUrl: string;
  rating: number;
  experienceYears: number;
  certifications: string[];
  bio: string;
}

export interface ClubMembershipPlan {
  id: string;
  name: string;
  price: string;
  period: string; // e.g. "/ tháng", "/ quý"
  highlighted?: boolean;
  badge?: string;
  benefits: string[];
}

export interface ClubAchievement {
  id: string;
  year: string;
  title: string;
  tournamentName: string;
  rank: "gold" | "silver" | "bronze";
  rankLabel: string;
  description: string;
}

export interface ClubRankMember {
  id: string;
  name: string;
  avatarUrl: string;
  rankIndex: number;
  eloPoints: number;
  winRate: number; // percentage e.g. 78%
  matchesPlayed: number;
  level: string;
}

export interface ClubReview {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  comment: string;
  verifiedMember: boolean;
}

export interface ClubDetailData extends ClubData {
  slogan?: string;
  foundedYear?: number;
  description?: string;
  fullBio?: string[];
  leadership?: {
    managerName: string;
    phone: string;
    email: string;
    zaloGroup?: string;
    facebookPage?: string;
  };
  venueDetails?: {
    name: string;
    address: string;
    district: string;
    city: string;
    phone: string;
    parkingInfo: string;
    amenities: string[];
  };
  schedules?: ClubScheduleSession[];
  coaches?: ClubCoach[];
  membershipPlans?: ClubMembershipPlan[];
  achievements?: ClubAchievement[];
  leaderboard?: ClubRankMember[];
  gallery?: string[];
  reviewsList?: ClubReview[];
}

export const CLUBS_DATA: ClubDetailData[] = [
  {
    id: "tada-badminton-club",
    name: "Tada Badminton Club",
    slogan: "Kết nối đam mê cầu lông - Rèn luyện thể lực & Tinh thần đồng đội",
    logoText: "TADA BADMINTON",
    coverUrl: "/images/clubs/tada-club.png",
    rating: 4.9,
    reviewCount: 342,
    memberCount: 1248,
    location: "Quận 7, TP. HCM",
    sport: "Cầu lông",
    statusText: "Hoạt động hôm nay",
    isVerified: true,
    isVip: true,
    foundedYear: 2021,
    description:
      "Tada Badminton Club là một trong những câu lạc bộ cầu lông phong trào và bán chuyên quy mô hàng đầu tại khu vực Nam Sài Gòn. Với hơn 1.200 hội viên hoạt động sôi nổi hàng tuần, CLB tạo dựng môi trường rèn luyện thể thao văn minh, công bằng và gắn kết.",
    fullBio: [
      "Được thành lập từ năm 2021, Tada Badminton Club luôn duy trì tôn chỉ kết nối những người đam mê bộ môn cầu lông ở mọi cấp độ, từ người mới bắt đầu (Beginner) đến vận động viên bán chuyên cọ xát giải đấu.",
      "Hệ thống sinh hoạt diễn ra 6 buổi/tuần trên cụm sân thảm chuẩn BWF quốc tế có máy lạnh, cùng đội ngũ Huấn luyện viên chuyên nghiệp hỗ trợ sửa dáng và nâng cao kỹ chiến thuật cho hội viên.",
      "CLB thường xuyên tổ chức giải đấu nội bộ tranh cúp hàng quý và đại diện tham dự các giải đấu cấp thành phố do Liên đoàn Cầu Lông và PlayGrid đăng cai.",
    ],
    leadership: {
      managerName: "Trần Minh Quang (Chủ nhiệm CLB)",
      phone: "0908 777 999",
      email: "contact@tadaclub.vn",
      zaloGroup: "https://zalo.me/g/tadabadminton2026",
      facebookPage: "https://facebook.com/tadabadmintonclub",
    },
    venueDetails: {
      name: "Tada Badminton Center",
      address: "Số 130 Đường D1, Phường Tân Hưng, Quận 7",
      district: "Quận 7",
      city: "TP. Hồ Chí Minh",
      phone: "028 3775 6688",
      parkingInfo: "Bãi đỗ xe ô tô 40 chỗ và hầm giữ xe máy an ninh 24/7.",
      amenities: [
        "10 Thảm BWF tiêu chuẩn",
        "Máy lạnh công suất lớn",
        "Tủ đồ Locker cá nhân",
        "Phòng tắm nóng lạnh",
        "Quầy Pro-Shop căng cước & phụ kiện",
        "Căng tin nước uống & đồ ăn nhẹ",
        "Khán đài theo dõi trận đấu",
        "Camera AI ghi lại pha cầu đẹp",
      ],
    },
    schedules: [
      {
        id: "sch-1",
        dayOfWeek: "Tối Thứ 3 & Thứ 5",
        time: "19:00 - 21:30",
        court: "Sân 1, 2, 3, 4 - Tada Arena",
        activityType: "Giao lưu đôi nam nữ & Rèn kỹ chiến thuật",
        levelRequirement: "Trình 2.5 - 3.5 (Phong trào)",
        slotsTotal: 24,
        slotsBooked: 20,
        feePerSession: "60.000đ / buổi",
      },
      {
        id: "sch-2",
        dayOfWeek: "Tối Thứ 7",
        time: "18:00 - 21:00",
        court: "Sân 5, 6, 7, 8 - Tada Arena",
        activityType: "Đấu đối kháng tính điểm Elo & Đua Rank tuần",
        levelRequirement: "Trình 3.5 - 4.5+ (Nâng cao)",
        slotsTotal: 20,
        slotsBooked: 18,
        feePerSession: "70.000đ / buổi",
      },
      {
        id: "sch-3",
        dayOfWeek: "Sáng Chủ Nhật",
        time: "08:30 - 11:30",
        court: "Toàn bộ cụm sân Tada Arena",
        activityType: "Sinh hoạt giao lưu toàn CLB & Giao hữu CLB bạn",
        levelRequirement: "Mọi trình độ (Tự do)",
        slotsTotal: 40,
        slotsBooked: 32,
        feePerSession: "50.000đ / buổi",
      },
    ],
    coaches: [
      {
        id: "c-1",
        name: "Nguyễn Văn Hùng",
        role: "HLV Trưởng CLB / Cựu VĐV Đội Tuyển TP. HCM",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        rating: 4.9,
        experienceYears: 12,
        certifications: ["Bằng HLV BWF Level 2", "Huy chương Vàng Đôi Nam Giải Vô Địch Quốc Gia 2018"],
        bio: "Chuyên sâu huấn luyện kỹ thuật đập cầu smash, di chuyển bao sân và chiến thuật đánh đôi tốc độ cao.",
      },
      {
        id: "c-2",
        name: "Lê Thị Mai Anh",
        role: "HLV Đội Trẻ & Phong Trào / Kiện Tướng Quốc Gia",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        rating: 4.8,
        experienceYears: 8,
        certifications: ["Bằng HLV BWF Level 1", "Huy chương Bạc Đơn Nữ Đại Hội TDTT Toàn Quốc"],
        bio: "Tận tâm, phương pháp sư phạm hiện đại giúp người mới chơi nắm vững căn bản và hạn chế chấn thương cổ tay, khớp gối.",
      },
    ],
    membershipPlans: [
      {
        id: "plan-monthly",
        name: "Hội Viên Tháng (Standard)",
        price: "450.000đ",
        period: "/ tháng",
        benefits: [
          "Tham gia không giới hạn các buổi sinh hoạt cố định trong tháng",
          "Cầu thi đấu chính thức Victor Gold miễn phí",
          "Giảm 15% khi mua phụ kiện và căng vợt tại Pro-Shop",
          "Tính điểm xếp hạng Rank Elo chính thức của CLB",
        ],
      },
      {
        id: "plan-quarterly",
        name: "Hội Viên VIP Quý (Pro Player)",
        price: "1.200.000đ",
        period: "/ quý (3 tháng)",
        highlighted: true,
        badge: "PHỔ BIẾN NHẤT",
        benefits: [
          "Tất cả quyền lợi của gói Hội Viên Tháng",
          "Tặng 01 Áo thi đấu chính thức Tada Club cao cấp",
          "Ưu tiên giữ sân và đăng ký các giải đấu tranh cúp",
          "Miễn phí 02 buổi tập riêng 1:1 cùng HLV trưởng",
          "Bảo hiểm chấn thương thể thao cơ bản",
        ],
      },
      {
        id: "plan-flex",
        name: "Giao Lưu Tự Do (Flex Pass)",
        price: "60.000đ",
        period: "/ buổi",
        benefits: [
          "Tham gia buổi sinh hoạt bất kỳ khi còn slot trống",
          "Cầu thi đấu có sẵn trên sân",
          "Giao lưu cọ xát tự do cùng các thành viên CLB",
        ],
      },
    ],
    achievements: [
      {
        id: "ach-1",
        year: "2026",
        title: "Vô Địch Đồng Đội Nam Nữ",
        tournamentName: "Giải Cầu Lông Các CLB Toàn Thành TP. HCM 2026",
        rank: "gold",
        rankLabel: "Cúp Vàng Vô Địch",
        description: "Vượt qua hơn 32 câu lạc bộ mạnh trên toàn thành phố để giành ngôi vị quán quân.",
      },
      {
        id: "ach-2",
        year: "2025",
        title: "Giải Nhì Đôi Nam Open",
        tournamentName: "PlayGrid Open Badminton Cup 2025",
        rank: "silver",
        rankLabel: "Huy Chương Bạc",
        description: "Cặp VĐV Tiến Minh - Minh Quang xuất sắc vào đến trận chung kết tranh cúp.",
      },
      {
        id: "ach-3",
        year: "2024",
        title: "Câu Lạc Bộ Xuất Sắc Nhất Năm",
        tournamentName: "Bình Chọn Cộng Đồng Cầu Lông Miền Nam",
        rank: "gold",
        rankLabel: "Giải Thưởng Danh Dự",
        description: "Được cộng đồng bầu chọn là CLB có môi trường sinh hoạt văn minh và phong trào mạnh nhất.",
      },
    ],
    leaderboard: [
      {
        id: "mb-1",
        name: "Nguyễn Tiến Đạt",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        rankIndex: 1,
        eloPoints: 2150,
        winRate: 84,
        matchesPlayed: 142,
        level: "Trình 4.5+ (Bán chuyên)",
      },
      {
        id: "mb-2",
        name: "Hoàng Minh Quân",
        avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
        rankIndex: 2,
        eloPoints: 2080,
        winRate: 81,
        matchesPlayed: 128,
        level: "Trình 4.0 (Khá cứng)",
      },
      {
        id: "mb-3",
        name: "Phan Hải Yến",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        rankIndex: 3,
        eloPoints: 1990,
        winRate: 77,
        matchesPlayed: 115,
        level: "Trình 3.8 (Nữ xuất sắc)",
      },
      {
        id: "mb-4",
        name: "Vũ Quang Dũng",
        avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
        rankIndex: 4,
        eloPoints: 1920,
        winRate: 74,
        matchesPlayed: 98,
        level: "Trình 3.5 (Phong trào)",
      },
      {
        id: "mb-5",
        name: "Đặng Thị Thảo",
        avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
        rankIndex: 5,
        eloPoints: 1870,
        winRate: 71,
        matchesPlayed: 86,
        level: "Trình 3.5 (Phong trào)",
      },
    ],
    gallery: [
      "/images/activities/badminton-banner.png",
      "/images/activities/badminton-hero.png",
      "/images/explore_sports/gridy-badminton.avif",
      "/images/clubs/tada-club.png",
    ],
    reviewsList: [
      {
        id: "rev-1",
        authorName: "Đỗ Quốc Bảo",
        authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "14/08/2026",
        comment: "Sân rất đẹp, máy lạnh mát rượi và các bạn trong CLB cực kỳ hòa đồng. Ban chủ nhiệm chia kèo rất đều tay, người mới vào được chỉ bảo tận tình.",
        verifiedMember: true,
      },
      {
        id: "rev-2",
        authorName: "Phạm Thúy Hằng",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "02/08/2026",
        comment: "HLV Hùng dạy rất có tâm, sau 2 tháng tham gia CLB mình đã cải thiện rõ rệt khả năng phông cầu và bỏ nhỏ sát lưới.",
        verifiedMember: true,
      },
      {
        id: "rev-3",
        authorName: "Trương Minh Tuấn",
        authorAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80",
        rating: 4.8,
        date: "26/07/2026",
        comment: "Không khí thi đấu tính điểm tối Thứ 7 rất kịch tính. Bảng xếp hạng Elo tạo động lực tập luyện rất tốt.",
        verifiedMember: true,
      },
    ],
  },
  {
    id: "khang-an-badminton-club",
    name: "CLB Cầu Lông Khang An",
    slogan: "Sân chơi giao lưu cọ xát phong trào khu vực TP. Thủ Đức",
    logoText: "KHANG AN",
    coverUrl: "/images/explore_sports/gridy-badminton.avif",
    rating: 4.9,
    reviewCount: 286,
    memberCount: 950,
    location: "Thủ Đức, TP. HCM",
    sport: "Cầu lông",
    statusText: "Đang tuyển thành viên",
    isVerified: true,
    isVip: true,
    foundedYear: 2022,
    description: "Câu lạc bộ quy tụ các lông thủ khu vực Thủ Đức, sinh hoạt đều đặn và thi đấu cọ xát giao hữu thường xuyên.",
  },
  {
    id: "vnb-badminton-club",
    name: "CLB Cầu Lông VNB Sports Tân Bình",
    slogan: "Cộng đồng thể thao chuyên nghiệp đồng hành cùng VNB Sports",
    logoText: "VNB SPORTS",
    coverUrl: "/images/activities/badminton-banner.png",
    rating: 4.9,
    reviewCount: 412,
    memberCount: 1420,
    location: "Tân Bình, TP. HCM",
    sport: "Cầu lông",
    statusText: "Sinh hoạt hàng ngày",
    isVerified: true,
    isVip: true,
    foundedYear: 2020,
    description: "Một trong những CLB đông thành viên nhất TP. HCM với hệ sinh thái sân bãi và Pro-Shop hoàn chỉnh.",
  },
  {
    id: "phu-tho-badminton-club",
    name: "CLB Thể Thao Cầu Lông Phú Thọ",
    slogan: "Nơi hội tụ các tay vợt kỳ cựu và tài năng trẻ Sài Gòn",
    logoText: "PHU THO",
    coverUrl: "/images/clubs/tada-club.png",
    rating: 4.8,
    reviewCount: 198,
    memberCount: 890,
    location: "Quận 11, TP. HCM",
    sport: "Cầu lông",
    statusText: "Hoạt động cuối tuần",
    isVerified: true,
    isVip: true,
    foundedYear: 2019,
  },
  {
    id: "viettel-hung-vuong-club",
    name: "CLB Cầu Lông Viettel Hùng Vương",
    logoText: "VIETTEL HV",
    coverUrl: "/images/activities/badminton-hero.png",
    rating: 4.8,
    reviewCount: 165,
    memberCount: 670,
    location: "Quận 10, TP. HCM",
    sport: "Cầu lông",
    statusText: "Đang tuyển thành viên",
    isVerified: true,
    isVip: false,
    foundedYear: 2023,
  },
  {
    id: "hanoi-shuttlecock-club",
    name: "Hà Nội Shuttlecock Club",
    logoText: "HANOI SHUTTLE",
    coverUrl: "/images/clubs/tada-club.png",
    rating: 4.8,
    reviewCount: 175,
    memberCount: 512,
    location: "Cầu Giấy, Hà Nội",
    sport: "Cầu lông",
    statusText: "Tuyển hội viên mới",
    isVerified: true,
    isVip: false,
    foundedYear: 2022,
  },
  {
    id: "yonex-hanoi-club",
    name: "CLB Cầu Lông Yonex Hà Nội Pro",
    logoText: "YONEX HN",
    coverUrl: "/images/activities/badminton-banner.png",
    rating: 4.9,
    reviewCount: 310,
    memberCount: 1150,
    location: "Đống Đa, Hà Nội",
    sport: "Cầu lông",
    statusText: "Hoạt động hôm nay",
    isVerified: true,
    isVip: true,
    foundedYear: 2021,
  },
  {
    id: "saigon-smash",
    name: "Saigon Smash Pickleball",
    logoText: "SAIGON SMASH",
    coverUrl: "/images/clubs/saigon-smash.png",
    rating: 4.8,
    reviewCount: 215,
    memberCount: 856,
    location: "Quận 1, TP. HCM",
    sport: "Pickleball",
    statusText: "Đang tuyển thành viên",
    isVerified: true,
    isVip: true,
    foundedYear: 2023,
  },
  {
    id: "danang-pickleball-warriors",
    name: "Đà Nẵng Pickleball Warriors",
    logoText: "DN WARRIORS",
    coverUrl: "/images/clubs/saigon-smash.png",
    rating: 4.9,
    reviewCount: 140,
    memberCount: 390,
    location: "Sơn Trà, Đà Nẵng",
    sport: "Pickleball",
    statusText: "Giao lưu hàng ngày",
    isVerified: true,
    isVip: true,
    foundedYear: 2024,
  },
  {
    id: "district-7-players",
    name: "District 7 Football Club",
    logoText: "D7 PLAYERS",
    coverUrl: "/images/clubs/d7-players.png",
    rating: 4.7,
    reviewCount: 168,
    memberCount: 432,
    location: "Quận 7, TP. HCM",
    sport: "Bóng đá",
    statusText: "Hoạt động tích cực",
    isVerified: true,
    isVip: true,
    foundedYear: 2022,
  },
  {
    id: "saigon-tennis-club",
    name: "Saigon Tennis Master Club",
    logoText: "SAIGON TENNIS",
    coverUrl: "/images/clubs/saigon-tennis.png",
    rating: 4.9,
    reviewCount: 198,
    memberCount: 620,
    location: "Quận 2, TP. HCM",
    sport: "Tennis",
    statusText: "Hoạt động hàng tuần",
    isVerified: true,
    isVip: true,
    foundedYear: 2020,
  },
];

export function getClubById(id: string): ClubDetailData {
  const found = CLUBS_DATA.find((c) => c.id === id);
  if (found) return found;
  return CLUBS_DATA[0]!;
}

export function getAllClubs(): ClubDetailData[] {
  return CLUBS_DATA;
}
