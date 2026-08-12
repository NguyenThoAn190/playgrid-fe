export interface Tournament {
  id: string;
  name: string;
  image: string;
  organizer: string;
  registeredCount: number;
  maxParticipants: number;
  district: string;
  location: string;
  dateRange: string;
  formats: string[];
  level: string;
  prizePool: string;
  feePerPlayer: number;
  badge?: string;
  status: "open" | "playing" | "completed";
  statusLabel: string;
}

export const tenantTournaments: Record<string, Tournament[]> = {
  badminton: [
    {
      id: "1",
      name: "Giải vô địch Đống Đa Open 2024",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop",
      organizer: "Liên đoàn Cầu lông Đống Đa",
      registeredCount: 48,
      maxParticipants: 64,
      district: "Đống Đa",
      location: "Nhà thi đấu Đống Đa, Hà Nội",
      dateRange: "15/06 - 18/06/2024",
      formats: ["Đôi nam", "Đôi nam nữ"],
      level: "Hạng B (Khá)",
      prizePool: "30.000.000đ",
      feePerPlayer: 250000,
      badge: "Giải lớn",
      status: "open",
      statusLabel: "Đang mở đăng ký"
    },
    {
      id: "2",
      name: "Cúp Cầu Giấy Smashers lần II",
      image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?q=80&w=600&auto=format&fit=crop",
      organizer: "CLB Cầu Giấy Smashers",
      registeredCount: 32,
      maxParticipants: 32,
      district: "Cầu Giấy",
      location: "Sân cầu lông Yên Hòa, Cầu Giấy, Hà Nội",
      dateRange: "22/06 - 23/06/2024",
      formats: ["Đơn nam", "Đôi nam"],
      level: "Hạng A (Chuyên nghiệp)",
      prizePool: "50.000.000đ",
      feePerPlayer: 350000,
      badge: "Hot Match",
      status: "playing",
      statusLabel: "Đang diễn ra"
    },
    {
      id: "3",
      name: "Giải cầu lông Thanh Xuân Friendly Cup",
      image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=600&auto=format&fit=crop",
      organizer: "UBND Quận Thanh Xuân",
      registeredCount: 80,
      maxParticipants: 80,
      district: "Thanh Xuân",
      location: "Trung tâm TDTT Thanh Xuân, Hà Nội",
      dateRange: "10/05 - 12/05/2024",
      formats: ["Đôi nam nữ", "Đôi nữ"],
      level: "Hạng C (Phong trào)",
      prizePool: "15.000.000đ",
      feePerPlayer: 150000,
      status: "completed",
      statusLabel: "Đã kết thúc"
    },
    {
      id: "4",
      name: "Hanoi Badminton Pro Championship 2024",
      image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop",
      organizer: "Sở VH-TT Hà Nội",
      registeredCount: 24,
      maxParticipants: 64,
      district: "Ba Đình",
      location: "Nhà thi đấu Quần Ngựa, Ba Đình, Hà Nội",
      dateRange: "05/07 - 10/07/2024",
      formats: ["Đơn nam", "Đơn nữ", "Đôi nam"],
      level: "Hạng A (Chuyên nghiệp)",
      prizePool: "100.000.000đ",
      feePerPlayer: 500000,
      badge: "Chuyên nghiệp",
      status: "open",
      statusLabel: "Đang mở đăng ký"
    },
    {
      id: "5",
      name: "Tây Hồ Summer Open 2024",
      image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop",
      organizer: "CLB Tây Hồ Wind",
      registeredCount: 16,
      maxParticipants: 32,
      district: "Tây Hồ",
      location: "Sân cầu lông Xuân La, Tây Hồ, Hà Nội",
      dateRange: "28/06 - 29/06/2024",
      formats: ["Đôi nam nữ"],
      level: "Hạng B (Khá)",
      prizePool: "20.000.000đ",
      feePerPlayer: 200000,
      badge: "Hè rực lửa",
      status: "open",
      statusLabel: "Đang mở đăng ký"
    },
    {
      id: "6",
      name: "Cúp vô địch Ba Đình Super League",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop",
      organizer: "Trung tâm TDTT Quận Ba Đình",
      registeredCount: 48,
      maxParticipants: 48,
      district: "Ba Đình",
      location: "Sân Quần Ngựa, Ba Đình, Hà Nội",
      dateRange: "01/04 - 04/04/2024",
      formats: ["Đôi nam", "Đôi nữ"],
      level: "Hạng B (Khá)",
      prizePool: "40.000.000đ",
      feePerPlayer: 300000,
      status: "completed",
      statusLabel: "Đã kết thúc"
    }
  ],
  pickleball: [
    {
      id: "pb-1",
      name: "Enjoy Pickleball Open Championship 2026",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
      organizer: "Liên đoàn Pickleball Việt Nam",
      registeredCount: 64,
      maxParticipants: 128,
      district: "Cầu Giấy",
      location: "Sunrise Pickleball Arena, Cầu Giấy, Hà Nội",
      dateRange: "15/09 - 18/09/2026",
      formats: ["Đơn nam", "Đôi nam nữ"],
      level: "Hạng B (Khá)",
      prizePool: "50.000.000đ",
      feePerPlayer: 300000,
      badge: "Giải lớn",
      status: "open",
      statusLabel: "Đang mở đăng ký"
    },
    {
      id: "pb-2",
      name: "Pickleball Thảo Điền Club Cup 2026",
      image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=600&auto=format&fit=crop",
      organizer: "CLB Thảo Điền Pickleball",
      registeredCount: 32,
      maxParticipants: 32,
      district: "Quận 2",
      location: "Sân Pickleball Thảo Điền, Quận 2, TP. HCM",
      dateRange: "22/10 - 23/10/2026",
      formats: ["Đôi nam", "Đôi nữ"],
      level: "Hạng C (Phong trào)",
      prizePool: "20.000.000đ",
      feePerPlayer: 250000,
      badge: "Giao lưu",
      status: "playing",
      statusLabel: "Đang diễn ra"
    }
  ],
  football: [
    {
      id: "fb-1",
      name: "Enjoy Football League 2026 (EFL)",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=600&auto=format&fit=crop",
      organizer: "Hội Bóng Đá Phủi Việt Nam",
      registeredCount: 12,
      maxParticipants: 16,
      district: "Đống Đa",
      location: "Sân bóng đá Đại học Y Hà Nội, Đống Đa, Hà Nội",
      dateRange: "01/09 - 15/10/2026",
      formats: ["Bóng đá 7 người"],
      level: "Hạng B (Khá)",
      prizePool: "30.000.000đ",
      feePerPlayer: 1000000,
      badge: "League phủi",
      status: "open",
      statusLabel: "Đang mở đăng ký"
    }
  ],
  running: [
    {
      id: "rn-1",
      name: "Hanoi Heritage Marathon 2026",
      image: "https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=600&auto=format&fit=crop",
      organizer: "Enjoy Running & UBND TP. Hà Nội",
      registeredCount: 8400,
      maxParticipants: 10000,
      district: "Hoàn Kiếm",
      location: "Hồ Hoàn Kiếm, Hà Nội",
      dateRange: "25/10/2026",
      formats: ["5K", "10K", "21K", "42K"],
      level: "Mọi cấp độ",
      prizePool: "150.000.000đ",
      feePerPlayer: 550000,
      badge: "Hot nhất",
      status: "open",
      statusLabel: "Đang mở đăng ký"
    },
    {
      id: "rn-2",
      name: "Dalat Ultra Trail 2026",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600&auto=format&fit=crop",
      organizer: "Sở VHTT & DL Lâm Đồng",
      registeredCount: 3200,
      maxParticipants: 4000,
      district: "Đà Lạt",
      location: "Hồ Tuyền Lâm, Đà Lạt, Lâm Đồng",
      dateRange: "12/12/2026",
      formats: ["15K", "30K", "55K", "85K"],
      level: "Địa hình",
      prizePool: "80.000.000đ",
      feePerPlayer: 850000,
      badge: "Chạy trail",
      status: "open",
      statusLabel: "Đang mở đăng ký"
    }
  ],
  tennis: [
    {
      id: "tn-1",
      name: "Kỳ Hòa Tennis Open 2026",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=600&auto=format&fit=crop",
      organizer: "CLB Tennis Kỳ Hòa",
      registeredCount: 24,
      maxParticipants: 32,
      district: "Quận 10",
      location: "Sân Tennis Kỳ Hòa, Quận 10, TP. HCM",
      dateRange: "05/09 - 07/09/2026",
      formats: ["Đôi nam", "Đôi nam nữ"],
      level: "Hạng B (Khá)",
      prizePool: "25.000.000đ",
      feePerPlayer: 400000,
      badge: "Đất cứng",
      status: "open",
      statusLabel: "Đang mở đăng ký"
    }
  ],
  swimming: [
    {
      id: "sw-1",
      name: "Landmark 81 Pool Swim Meet 2026",
      image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop",
      organizer: "Enjoy Swimming",
      registeredCount: 40,
      maxParticipants: 80,
      district: "Bình Thạnh",
      location: "Bể bơi vô cực Landmark 81, Bình Thạnh, TP. HCM",
      dateRange: "18/09/2026",
      formats: ["50m bơi sải", "50m bơi ếch"],
      level: "Mọi cấp độ",
      prizePool: "15.000.000đ",
      feePerPlayer: 150000,
      badge: "Bể vô cực",
      status: "open",
      statusLabel: "Đang mở đăng ký"
    }
  ]
};
