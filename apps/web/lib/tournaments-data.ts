export interface TournamentDivision {
  id: string;
  name: string;
  sport: "badminton" | "pickleball" | "tennis" | "football";
  formatType: "singles" | "doubles" | "team";
  formatLabel: string; // e.g. "Đôi Nam", "Đơn Nam", "Đôi Nam Nữ"
  levelRating: string; // e.g. "Trình 3.5 - 4.5+ (Open)", "DUPR 3.0 - 3.5", "Phong trào"
  price: number;
  originalPrice?: number;
  phase?: string;
  regDeadline: string;
  maxTeams: number;
  registeredTeams: number;
  prizeStructure: {
    first: string;
    second: string;
    third: string;
  };
  benefits: string[];
  description?: string;
  status: "available" | "selling_fast" | "sold_out";
}

export interface TournamentAddon {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: "jersey" | "photo" | "gear" | "nutrition" | "customization";
  imageUrl?: string;
  badge?: string;
  popular?: boolean;
}

export interface BracketMatch {
  id: string;
  round: "round_of_16" | "quarter_finals" | "semi_finals" | "finals";
  roundLabel: string;
  matchIndex: number;
  matchDate?: string;
  player1: {
    name: string;
    club?: string;
    seed?: number;
    score?: number[];
    setsWon?: number;
    gameScores?: number[];
    isWinner?: boolean;
  };
  player2: {
    name: string;
    club?: string;
    seed?: number;
    score?: number[];
    setsWon?: number;
    gameScores?: number[];
    isWinner?: boolean;
  };
  courtName?: string;
  scheduledTime?: string;
  status: "scheduled" | "live" | "finished";
}

export interface TournamentRuleItem {
  id: string;
  title: string;
  content: string;
  bulletPoints?: string[];
}

export interface TournamentScheduleItem {
  time: string;
  activity: string;
  location: string;
  note?: string;
}

export interface TournamentSponsor {
  name: string;
  tier: "diamond" | "gold" | "silver" | "media";
  logoUrl: string;
}

export interface TournamentVenueGeo {
  name: string;
  address: string;
  district: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  email: string;
  parkingInfo: string;
  amenities: string[];
}

export interface TournamentAthlete {
  id: string;
  bibNumber: string;
  name: string;
  partnerName?: string;
  avatarUrl?: string;
  gender: "male" | "female" | "mixed";
  club: string;
  divisionId: string;
  divisionName: string;
  seed?: number;
  verified: boolean;
  rankingPoints?: number;
  status: "confirmed" | "checked_in" | "pending";
}

export interface TournamentPartnerRequest {
  id: string;
  name: string;
  gender: "male" | "female";
  age?: number;
  avatarUrl?: string;
  divisionId: string;
  divisionName: string;
  skillLevel: string;
  dominantHand?: "left" | "right";
  playStyle?: string;
  district: string;
  phone?: string;
  zalo?: string;
  note: string;
  postedAt: string;
  status: "open" | "matched";
}

export interface TournamentSponsorshipPackage {
  id: string;
  name: string;
  tier: "diamond" | "gold" | "silver" | "inkind";
  price: string;
  priceValue?: number;
  highlighted?: boolean;
  slotsRemaining: number;
  description: string;
  benefits: string[];
}

export interface TournamentData {
  id: string;
  title: string;
  shortTitle: string;
  sport: "badminton" | "pickleball" | "tennis" | "football";
  sportLabel: string;
  badge?: {
    type: "hot" | "recommended" | "closing_soon";
    text: string;
  };
  date: string;
  startDate: string;
  endDate: string;
  regDeadline: string;
  location: string;
  totalPrizePool: string;
  priceFrom: string;
  bannerImage: string;
  description: string;
  organizer: {
    name: string;
    logoUrl?: string;
    verified: boolean;
    phone: string;
    email: string;
    description: string;
  };
  sponsors: TournamentSponsor[];
  venueDetails: TournamentVenueGeo;
  divisions: TournamentDivision[];
  addons: TournamentAddon[];
  brackets: BracketMatch[];
  rules: TournamentRuleItem[];
  schedule: TournamentScheduleItem[];
  athletes?: TournamentAthlete[];
  partnerRequests?: TournamentPartnerRequest[];
  sponsorshipPackages?: TournamentSponsorshipPackage[];
  faqs: { question: string; answer: string }[];
  tags: string[];
}

export const TOURNAMENTS_DATA: TournamentData[] = [
  {
    id: "hanoi-badminton-open-2026",
    title: "Giải Cầu Lông Hà Nội Open 2026 - Mở Rộng Toàn Quốc",
    shortTitle: "Hà Nội Open 2026",
    sport: "badminton",
    sportLabel: "Cầu Lông",
    badge: {
      type: "hot",
      text: "Đang Mở Đơn",
    },
    date: "20 - 22 Tháng 10, 2026",
    startDate: "2026-10-20T08:00:00+07:00",
    endDate: "2026-10-22T18:00:00+07:00",
    regDeadline: "15/10/2026",
    location: "Nhà Thi Đấu Trịnh Hoài Đức, Đống Đa, Hà Nội",
    totalPrizePool: "120.000.000đ",
    priceFrom: "250.000đ",
    bannerImage: "/images/activities/badminton-banner.png",
    description:
      "Giải Cầu Lông Hà Nội Open 2026 là sân chơi quy mô lớn quy tụ hơn 500 vận động viên phong trào, bán chuyên và các câu lạc bộ hàng đầu cả nước. Thi đấu trên 8 thảm chuẩn BWF quốc tế với hệ thống tính điểm điện tử và truyền hình trực tiếp các trận bán kết, chung kết.",
    organizer: {
      name: "Liên đoàn Cầu Lông Hà Nội & PlayGrid Vietnam",
      logoUrl: "/images/explore_sports/gridy-badminton.avif",
      verified: true,
      phone: "0901 234 567",
      email: "tournaments@playgrid.vn",
      description: "Đơn vị tổ chức các giải đấu thể thao phong trào chuyên nghiệp hàng đầu tại Việt Nam.",
    },
    venueDetails: {
      name: "Nhà Thi Đấu Trịnh Hoài Đức",
      address: "Số 12 Trịnh Hoài Đức, Phường Cát Linh, Quận Đống Đa",
      district: "Đống Đa",
      city: "Hà Nội",
      coordinates: {
        lat: 21.0298,
        lng: 105.8327,
      },
      phone: "024 3845 2816",
      email: "trinhhoaiduc.arena@hanoi.gov.vn",
      parkingInfo: "Bãi đỗ xe ô tô 100 chỗ và bãi xe máy rộng rãi ngay trong khuôn viên nhà thi đấu.",
      amenities: ["Thảm BWF tiêu chuẩn", "Máy lạnh công suất lớn", "Khán đài 3.000 chỗ", "Phòng thay đồ & Tắm nóng lạnh", "Căng tin & Quầy phục vụ", "Bãi xe ô tô", "Trạm cứu thương"],
    },
    sponsors: [
      { name: "Yonex Vietnam", tier: "diamond", logoUrl: "/images/explore_sports/gridy-badminton.avif" },
      { name: "Victor Sports", tier: "gold", logoUrl: "/images/activities/badminton-banner.png" },
      { name: "Pocari Sweat", tier: "gold", logoUrl: "/images/activities/badminton-hero.png" },
      { name: "VNB Sports", tier: "silver", logoUrl: "/images/clubs/tada-club.png" },
    ],
    divisions: [
      {
        id: "div-doi-nam-open",
        name: "Đôi Nam Open (Trình 3.5 - 4.5+)",
        sport: "badminton",
        formatType: "doubles",
        formatLabel: "Đôi Nam",
        levelRating: "Nâng cao / Bán chuyên (3.5 - 4.5+)",
        price: 450000,
        originalPrice: 550000,
        phase: "Early Bird",
        regDeadline: "10/10/2026",
        maxTeams: 32,
        registeredTeams: 26,
        prizeStructure: {
          first: "25.000.000đ + Cúp Vàng + Bộ quà tặng Yonex",
          second: "12.000.000đ + Huy chương Bạc",
          third: "6.000.000đ + Huy chương Đồng",
        },
        benefits: ["2 Áo thi đấu chính thức Yonex", "Huy chương lưu niệm", "Cầu thi đấu Victor Gold", "Bảo hiểm chấn thương VĐV", "Nước uống điện giải miễn phí"],
        status: "selling_fast",
      },
      {
        id: "div-doi-nam-nu-open",
        name: "Đôi Nam Nữ Phong Trào (Trình 2.5 - 3.5)",
        sport: "badminton",
        formatType: "doubles",
        formatLabel: "Đôi Nam Nữ",
        levelRating: "Phong trào (2.5 - 3.5)",
        price: 400000,
        originalPrice: 500000,
        phase: "Early Bird",
        regDeadline: "10/10/2026",
        maxTeams: 32,
        registeredTeams: 22,
        prizeStructure: {
          first: "18.000.000đ + Cúp Vàng",
          second: "9.000.000đ + Huy chương Bạc",
          third: "4.500.000đ + Huy chương Đồng",
        },
        benefits: ["2 Áo thể thao PlayGrid", "Huy chương lưu niệm", "Cầu thi đấu chính thức", "Nước uống & Bữa trưa nhẹ"],
        status: "available",
      },
      {
        id: "div-don-nam-open",
        name: "Đơn Nam Phong Trào (Trình 3.0+)",
        sport: "badminton",
        formatType: "singles",
        formatLabel: "Đơn Nam",
        levelRating: "Phong trào tự do (Trình 3.0+)",
        price: 250000,
        originalPrice: 320000,
        phase: "Regular",
        regDeadline: "12/10/2026",
        maxTeams: 64,
        registeredTeams: 48,
        prizeStructure: {
          first: "15.000.000đ + Cúp Vàng",
          second: "8.000.000đ + Huy chương Bạc",
          third: "4.000.000đ + Huy chương Đồng",
        },
        benefits: ["Áo thi đấu chính thức", "Kỷ niệm chương tham gia", "Nước uống & Bữa phụ"],
        status: "available",
      },
      {
        id: "div-doi-nu-open",
        name: "Đôi Nữ Giao Lưu Phong Trào",
        sport: "badminton",
        formatType: "doubles",
        formatLabel: "Đôi Nữ",
        levelRating: "Phong trào (Trình 2.5 - 3.5)",
        price: 380000,
        originalPrice: 480000,
        phase: "Early Bird",
        regDeadline: "10/10/2026",
        maxTeams: 24,
        registeredTeams: 18,
        prizeStructure: {
          first: "12.000.000đ + Cúp Vàng",
          second: "6.000.000đ + Huy chương Bạc",
          third: "3.000.000đ + Huy chương Đồng",
        },
        benefits: ["2 Áo thi đấu PlayGrid", "Kỷ niệm chương", "Bảo hiểm VĐV", "Bộ quà tặng từ Pocari"],
        status: "available",
      },
    ],
    addons: [
      {
        id: "addon-jersey-print",
        name: "In Họ Tên & Cờ Tổ Quốc / CLB Lên Lưng Áo",
        price: 89000,
        originalPrice: 120000,
        description: "In decal nhiệt công nghệ cao sắc nét chuẩn BWF tên VĐV và tên CLB sau lưng áo thi đấu.",
        category: "jersey",
        badge: "KHUYÊN DÙNG",
        popular: true,
        imageUrl: "/images/activities/badminton-banner.png",
      },
      {
        id: "addon-ai-photo",
        name: "Gói Ảnh Thi Đấu 4K Tự Động Qua Số Bib AI",
        price: 120000,
        originalPrice: 180000,
        description: "Toàn bộ ảnh thi đấu góc đẹp, khoảnh khắc smash & nhận giải chất lượng cao được AI nhận diện tự động.",
        category: "photo",
        badge: "PHỔ BIẾN",
        popular: true,
        imageUrl: "/images/explore_sports/gridy-badminton.avif",
      },
      {
        id: "addon-racket-restring",
        name: "Dịch Vụ Căng Cước Vợt Cấp Tốc Tại Sân (Yonex BG65Ti / 66UM)",
        price: 130000,
        description: "Căng cước máy điện tử chính xác từng lbs trực tiếp tại quầy kỹ thuật của ban tổ chức trong suốt giải đấu.",
        category: "gear",
        imageUrl: "/images/activities/badminton-hero.png",
      },
      {
        id: "addon-recovery-pack",
        name: "Combo Dinh Dưỡng Gel Năng Lượng & Điện Giải 3 Ngày",
        price: 150000,
        originalPrice: 200000,
        description: "Bao gồm 4 gói Gel năng lượng Maurten + 3 gói điện giải cao cấp chống chuột rút.",
        category: "nutrition",
        imageUrl: "/images/events/aqua-warriors.png",
      },
    ],
    brackets: [
      {
        id: "match-qf-1",
        round: "quarter_finals",
        roundLabel: "Tứ Kết 1",
        matchIndex: 1,
        matchDate: "21.10.2026",
        player1: { name: "Nguyễn Tiến Minh / Lê Đức Phát", club: "CLB Hà Nội Pro", seed: 1, setsWon: 2, gameScores: [21, 21], score: [2], isWinner: true },
        player2: { name: "Trần Anh Tuấn / Lê Minh Khoa", club: "CLB Tân Bình", setsWon: 0, gameScores: [14, 18], score: [0], isWinner: false },
        courtName: "Sân số 1",
        scheduledTime: "21/10 - 09:00",
        status: "finished",
      },
      {
        id: "match-qf-2",
        round: "quarter_finals",
        roundLabel: "Tứ Kết 2",
        matchIndex: 2,
        matchDate: "21.10.2026",
        player1: { name: "Hoàng Anh Dũng / Đặng Việt Anh", club: "CLB Hải Phòng", setsWon: 1, gameScores: [21, 17, 16], score: [1], isWinner: false },
        player2: { name: "Phạm Cao Cường / Vũ Thị Trang", club: "CLB Phú Thọ", seed: 4, setsWon: 2, gameScores: [17, 21, 21], score: [2], isWinner: true },
        courtName: "Sân số 2",
        scheduledTime: "21/10 - 09:45",
        status: "finished",
      },
      {
        id: "match-qf-3",
        round: "quarter_finals",
        roundLabel: "Tứ Kết 3",
        matchIndex: 3,
        matchDate: "21.10.2026",
        player1: { name: "Nguyễn Thùy Linh / Đỗ Tuấn Đức", club: "CLB Ciputra", seed: 3, setsWon: 2, gameScores: [21, 21], score: [2], isWinner: true },
        player2: { name: "Lương Hoài Nam / Vũ Quang Minh", club: "CLB Đà Nẵng", setsWon: 0, gameScores: [16, 14], score: [0], isWinner: false },
        courtName: "Sân số 1",
        scheduledTime: "21/10 - 10:30",
        status: "finished",
      },
      {
        id: "match-qf-4",
        round: "quarter_finals",
        roundLabel: "Tứ Kết 4",
        matchIndex: 4,
        matchDate: "21.10.2026",
        player1: { name: "Nguyễn Văn Hùng / Đặng Quang Huy", club: "CLB Thủ Đức", setsWon: 0, gameScores: [15, 12], score: [0], isWinner: false },
        player2: { name: "Huỳnh Chí Khương / Trịnh Linh Giang", club: "CLB Sài Gòn", seed: 2, setsWon: 2, gameScores: [21, 21], score: [2], isWinner: true },
        courtName: "Sân số 2",
        scheduledTime: "21/10 - 11:15",
        status: "finished",
      },
      {
        id: "match-sf-1",
        round: "semi_finals",
        roundLabel: "Bán Kết 1",
        matchIndex: 1,
        matchDate: "22.10.2026",
        player1: { name: "Nguyễn Tiến Minh / Lê Đức Phát", club: "CLB Hà Nội Pro", seed: 1, setsWon: 2, gameScores: [21, 21], score: [2], isWinner: true },
        player2: { name: "Phạm Cao Cường / Vũ Thị Trang", club: "CLB Phú Thọ", seed: 4, setsWon: 0, gameScores: [18, 19], score: [0], isWinner: false },
        courtName: "Sân Trung Tâm",
        scheduledTime: "22/10 - 14:00",
        status: "finished",
      },
      {
        id: "match-sf-2",
        round: "semi_finals",
        roundLabel: "Bán Kết 2",
        matchIndex: 2,
        matchDate: "22.10.2026",
        player1: { name: "Nguyễn Thùy Linh / Đỗ Tuấn Đức", club: "CLB Ciputra", seed: 3, setsWon: 1, gameScores: [19, 21, 18], score: [1], isWinner: false },
        player2: { name: "Huỳnh Chí Khương / Trịnh Linh Giang", club: "CLB Sài Gòn", seed: 2, setsWon: 2, gameScores: [21, 17, 21], score: [2], isWinner: true },
        courtName: "Sân số 1",
        scheduledTime: "22/10 - 15:00",
        status: "finished",
      },
      {
        id: "match-final",
        round: "finals",
        roundLabel: "Chung Kết & Tranh Cúp Vàng",
        matchIndex: 1,
        matchDate: "22.10.2026",
        player1: { name: "Nguyễn Tiến Minh / Lê Đức Phát", club: "CLB Hà Nội Pro", seed: 1, setsWon: 2, gameScores: [21, 19, 21], score: [2], isWinner: true },
        player2: { name: "Huỳnh Chí Khương / Trịnh Linh Giang", club: "CLB Sài Gòn", seed: 2, setsWon: 1, gameScores: [19, 21, 17], score: [1], isWinner: false },
        courtName: "Sân Khán Đài Trung Tâm",
        scheduledTime: "22/10 - 16:30",
        status: "finished",
      },
    ],
    rules: [
      {
        id: "rule-format",
        title: "Thể Thức & Luật Thi Đấu",
        content: "Áp dụng theo Luật Cầu Lông hiện hành của Liên Đoàn Cầu Lông Thế Giới (BWF) và Tổng cục Thể dục Thể thao Việt Nam.",
        bulletPoints: [
          "Vòng bảng đánh vòng tròn 1 lượt: 3 set 21 điểm (chạm 30 điểm cách biệt 2).",
          "Vòng loại trực tiếp từ Tứ kết: 3 set thắng 2 theo chuẩn BWF.",
          "Mỗi VĐV chỉ được đăng ký tối đa 2 nội dung thi đấu.",
          "Trọng tài quốc gia điều hành toàn bộ các trận đấu từ vòng Tứ kết.",
        ],
      },
      {
        id: "rule-gear",
        title: "Quy Định Vợt, Cầu & Trang Phục",
        content: "Tất cả VĐV bắt buộc mặc áo thi đấu có tay, đi giày đế cao su không để lại vết đen (Non-marking).",
        bulletPoints: [
          "Quả cầu thi đấu chính thức: Victor Gold No.1 chuẩn BWF.",
          "Nghiêm cấm mang giày chạy bộ hoặc giày đế cứng lên mặt thảm BWF.",
          "Đồng đội đánh đôi bắt buộc mặc áo cùng màu khi thi đấu từ vòng Bán kết.",
        ],
      },
      {
        id: "rule-checkin",
        title: "Quy Định Giờ Giấc & Điểm Danh",
        content: "Vận động viên phải có mặt trước giờ thi đấu ít nhất 30 phút để làm thủ tục kiểm tra CCCD và nhận diện.",
        bulletPoints: [
          "Quá giờ thi đấu 15 phút mà VĐV/Đội chưa có mặt tại sân sẽ bị xử thua 0-2 (Walkover).",
          "Mọi khiếu nại về nhân sự hoặc trình độ phải nộp trước khi trận đấu bắt đầu 15 phút kèm lệ phí khiếu nại theo điều lệ.",
        ],
      },
    ],
    schedule: [
      { time: "20/10 - 07:30 đến 08:30", activity: "Lễ Khai mạc chính thức & Họp chuyên môn các đoàn VĐV", location: "Sân khấu Trung tâm Nhà thi đấu" },
      { time: "20/10 - 08:45 đến 12:00", activity: "Khởi tranh các trận đấu Vòng Bảng Đơn Nam & Đơn Nữ (Sân 1 - 8)", location: "Khu vực sân 1 đến sân 8" },
      { time: "20/10 - 13:30 đến 18:30", activity: "Vòng Bảng Đôi Nam & Đôi Nam Nữ", location: "Khu vực sân 1 đến sân 8" },
      { time: "21/10 - 08:00 đến 12:00", activity: "Vòng 16 & Tứ kết các nội dung", location: "Sân 1, 2, 3, 4" },
      { time: "21/10 - 14:00 đến 18:00", activity: "Tứ kết Đôi Nam Open & Đôi Nam Nữ", location: "Sân 1, 2" },
      { time: "22/10 - 08:30 đến 11:30", activity: "Bán kết tất cả các hạng mục thi đấu", location: "Sân Trung tâm" },
      { time: "22/10 - 14:00 đến 17:30", activity: "Chung kết tranh Cúp Vàng & Trực tiếp truyền hình", location: "Sân Trung tâm" },
      { time: "22/10 - 17:45 đến 18:30", activity: "Lễ Bế mạc, Vinh danh & Trao giải thưởng", location: "Sân khấu chính" },
    ],
    athletes: [
      {
        id: "ath-1",
        bibNumber: "PG-101",
        name: "Nguyễn Văn An",
        gender: "male",
        club: "CLB Yonex Hà Nội",
        divisionId: "div-doi-nam-nu-open",
        divisionName: "Đôi Nam Nữ Open",
        seed: 1,
        verified: true,
        rankingPoints: 1850,
        status: "confirmed",
      },
      {
        id: "ath-2",
        bibNumber: "PG-102",
        name: "Trần Quốc Bảo",
        gender: "male",
        club: "CLB Cầu Lông Ba Đình",
        divisionId: "div-doi-nam-nu-open",
        divisionName: "Đôi Nam Nữ Open",
        seed: 2,
        verified: true,
        rankingPoints: 1720,
        status: "confirmed",
      },
      {
        id: "ath-3",
        bibNumber: "PG-103",
        name: "Vũ Minh Đức",
        gender: "male",
        club: "CLB Victor Vietnam",
        divisionId: "div-doi-nam-nu-open",
        divisionName: "Đôi Nam Nữ Open",
        seed: 3,
        verified: true,
        rankingPoints: 1650,
        status: "confirmed",
      },
      {
        id: "ath-4",
        bibNumber: "PG-104",
        name: "Đặng Quang Hưng",
        gender: "male",
        club: "CLB Red Bull Stars",
        divisionId: "div-doi-nam-nu-open",
        divisionName: "Đôi Nam Nữ Open",
        seed: 4,
        verified: true,
        rankingPoints: 1590,
        status: "confirmed",
      },
      {
        id: "ath-5",
        bibNumber: "PG-105",
        name: "Bùi Hoàng Long",
        gender: "male",
        club: "CLB Cầu Giấy Smash",
        divisionId: "div-doi-nam-nu-open",
        divisionName: "Đôi Nam Nữ Open",
        verified: true,
        rankingPoints: 1420,
        status: "confirmed",
      },
      {
        id: "ath-6",
        bibNumber: "PG-106",
        name: "Đỗ Gia Huy",
        gender: "male",
        club: "CLB Đống Đa Shuttle",
        divisionId: "div-doi-nam-nu-open",
        divisionName: "Đôi Nam Nữ Open",
        verified: true,
        rankingPoints: 1380,
        status: "confirmed",
      },
      {
        id: "ath-7",
        bibNumber: "PG-201",
        name: "Lê Minh Hoàng",
        gender: "male",
        club: "CLB Hà Nội Master",
        divisionId: "div-don-nam-a",
        divisionName: "Đơn Nam Nâng Cao",
        seed: 1,
        verified: true,
        rankingPoints: 2100,
        status: "confirmed",
      },
      {
        id: "ath-8",
        bibNumber: "PG-202",
        name: "Phạm Tuấn Anh",
        gender: "male",
        club: "CLB Smash King",
        divisionId: "div-don-nam-a",
        divisionName: "Đơn Nam Nâng Cao",
        seed: 2,
        verified: true,
        rankingPoints: 1980,
        status: "confirmed",
      },
      {
        id: "ath-9",
        bibNumber: "PG-203",
        name: "Trần Đức Trọng",
        gender: "male",
        club: "CLB PlayGrid Stars",
        divisionId: "div-don-nam-a",
        divisionName: "Đơn Nam Nâng Cao",
        seed: 3,
        verified: true,
        rankingPoints: 1890,
        status: "confirmed",
      },
      {
        id: "ath-10",
        bibNumber: "PG-204",
        name: "Nguyễn Hữu Nghĩa",
        gender: "male",
        club: "CLB Li-Ning Hanoi",
        divisionId: "div-don-nam-a",
        divisionName: "Đơn Nam Nâng Cao",
        verified: true,
        rankingPoints: 1750,
        status: "confirmed",
      },
      {
        id: "ath-11",
        bibNumber: "PG-301",
        name: "Hoàng Văn Khang",
        gender: "male",
        club: "CLB Cầu Lông Cầu Giấy",
        divisionId: "div-doi-nam-phong-trao",
        divisionName: "Đôi Nam Phong Trào",
        seed: 1,
        verified: true,
        rankingPoints: 1520,
        status: "confirmed",
      },
      {
        id: "ath-12",
        bibNumber: "PG-302",
        name: "Nguyễn Trọng Đại",
        gender: "male",
        club: "CLB Ba Đình Club",
        divisionId: "div-doi-nam-phong-trao",
        divisionName: "Đôi Nam Phong Trào",
        seed: 2,
        verified: true,
        rankingPoints: 1480,
        status: "confirmed",
      },
      {
        id: "ath-13",
        bibNumber: "PG-303",
        name: "Vũ Hải Đăng",
        gender: "male",
        club: "CLB Tây Hồ Shuttle",
        divisionId: "div-doi-nam-phong-trao",
        divisionName: "Đôi Nam Phong Trào",
        verified: true,
        rankingPoints: 1350,
        status: "confirmed",
      },
      {
        id: "ath-14",
        bibNumber: "PG-401",
        name: "Phan Ngọc Anh",
        gender: "female",
        club: "CLB Cầu Lông Nữ Hà Nội",
        divisionId: "div-don-nu-b",
        divisionName: "Đơn Nữ Phong Trào",
        seed: 1,
        verified: true,
        rankingPoints: 1460,
        status: "confirmed",
      },
      {
        id: "ath-15",
        bibNumber: "PG-402",
        name: "Đỗ Mai Phương",
        gender: "female",
        club: "CLB Thăng Long Ladies",
        divisionId: "div-don-nu-b",
        divisionName: "Đơn Nữ Phong Trào",
        seed: 2,
        verified: true,
        rankingPoints: 1390,
        status: "confirmed",
      },
      {
        id: "ath-16",
        bibNumber: "PG-403",
        name: "Nguyễn Thu Thảo",
        gender: "female",
        club: "CLB Yonex Girls",
        divisionId: "div-don-nu-b",
        divisionName: "Đơn Nữ Phong Trào",
        verified: true,
        rankingPoints: 1280,
        status: "confirmed",
      },
    ],
    partnerRequests: [
      {
        id: "req-1",
        name: "Hoàng Minh Tuấn",
        gender: "male",
        age: 26,
        divisionId: "div-doi-nam-nu-open",
        divisionName: "Đôi Nam Nữ Open",
        skillLevel: "Trình 4.0 (Nâng cao)",
        dominantHand: "right",
        playStyle: "Chuyên lưới & Phản tạt nhanh",
        district: "Cầu Giấy, Hà Nội",
        phone: "0912 345 678",
        zalo: "0912345678",
        note: "Cần tìm bạn nữ trình 3.5+ đánh lưới nhanh, di chuyển tốt để tranh cúp Đôi Nam Nữ Open. Đã đăng ký vé, có thể tập luyện chung trước giải 2 tuần.",
        postedAt: "2 giờ trước",
        status: "open",
      },
      {
        id: "req-2",
        name: "Trần Ngọc Mai",
        gender: "female",
        age: 24,
        divisionId: "div-doi-nam-nu-open",
        divisionName: "Đôi Nam Nữ Open",
        skillLevel: "Trình 3.5 (Khá)",
        dominantHand: "right",
        playStyle: "Bền bỉ, bắt lưới nhạy & Thủ chắc",
        district: "Ba Đình, Hà Nội",
        phone: "0988 765 432",
        zalo: "0988765432",
        note: "Tìm bạn nam công tốt, smash uy lực từ cuối sân để ghép đánh Đôi Nam Nữ Open. Mục tiêu quyết tâm vào top 4.",
        postedAt: "5 giờ trước",
        status: "open",
      },
      {
        id: "req-3",
        name: "Nguyễn Quốc Cường",
        gender: "male",
        age: 29,
        divisionId: "div-doi-nam-phong-trao",
        divisionName: "Đôi Nam Phong Trào",
        skillLevel: "Trình 3.0 (Phong trào)",
        dominantHand: "left",
        playStyle: "Tay trái, chém cầu hiểm & Smash mạnh",
        district: "Đống Đa, Hà Nội",
        phone: "0934 112 233",
        zalo: "0934112233",
        note: "Tìm bạn đánh Đôi Nam Phong Trào giao lưu vui vẻ, thi đấu hết mình vì màu cờ sắc áo. Đã mua vé thi đấu.",
        postedAt: "1 ngày trước",
        status: "open",
      },
      {
        id: "req-4",
        name: "Lê Bảo Trâm",
        gender: "female",
        age: 22,
        divisionId: "div-doi-nam-nu-open",
        divisionName: "Đôi Nam Nữ Open",
        skillLevel: "Trình 3.5 (Khá)",
        dominantHand: "right",
        playStyle: "Phản tạt nhanh, điều cầu góc chết",
        district: "Tây Hồ, Hà Nội",
        phone: "0977 445 566",
        zalo: "0977445566",
        note: "Cần bạn nam trình độ 3.5 - 4.5+ ghép đôi, có kinh nghiệm thi đấu các giải phong trào và tinh thần đồng đội cao.",
        postedAt: "1 ngày trước",
        status: "open",
      },
      {
        id: "req-5",
        name: "Phạm Đức Huy",
        gender: "male",
        age: 27,
        divisionId: "div-doi-nam-phong-trao",
        divisionName: "Đôi Nam Phong Trào",
        skillLevel: "Trình 3.0 (Phong trào)",
        dominantHand: "right",
        playStyle: "Đều tay, bao sân tốt & Thể lực dồi dào",
        district: "Thanh Xuân, Hà Nội",
        phone: "0908 990 011",
        zalo: "0908990011",
        note: "Tìm 1 bạn nam cùng trình độ 2.5 - 3.5 ghép đôi tham gia hạng mục Phong trào. Rất mong được giao lưu!",
        postedAt: "2 ngày trước",
        status: "open",
      },
      {
        id: "req-6",
        name: "Đỗ Nhật Nam",
        gender: "male",
        age: 25,
        divisionId: "div-doi-nam-nu-open",
        divisionName: "Đôi Nam Nữ Open",
        skillLevel: "Trình 4.0 (Nâng cao)",
        dominantHand: "right",
        playStyle: "Tấn công dồn dập & Đập cầu chéo sân",
        district: "Hoàn Kiếm, Hà Nội",
        note: "Đã ghép đôi thành công cùng bạn đánh Lê Thúy Hằng!",
        postedAt: "3 ngày trước",
        status: "matched",
      },
    ],
    sponsorshipPackages: [
      {
        id: "pkg-diamond",
        name: "Nhà Tài Trợ Kim Cương (Diamond Partner)",
        tier: "diamond",
        price: "50.000.000 ₫",
        priceValue: 50000000,
        highlighted: true,
        slotsRemaining: 1,
        description: "Gói tài trợ độc quyền danh vị cao nhất, gắn liền tên thương hiệu với danh hiệu giải đấu trên toàn quốc.",
        benefits: [
          "Đồng hành danh xưng chính thức: 'Giải Cầu Lông Hà Nội Open 2026 - [Tên Thương Hiệu] Cup'",
          "Logo vị trí trung tâm trên toàn bộ Banner, Backdrop sân khấu chính và Áo thi đấu chính thức",
          "Gian hàng Pro-Shop 24m² tại sảnh đón tiếp trung tâm Nhà thi đấu Trịnh Hoài Đức",
          "Phát biểu khai mạc và trực tiếp trao Cúp Vàng Chung kết trên sóng truyền hình / livestream",
          "10 bài PR độc quyền trên hệ thống Fanpage, Website PlayGrid và các báo thể thao",
          "Tặng 02 đội đặc cách tham gia thi đấu tại vòng đấu chính",
        ],
      },
      {
        id: "pkg-gold",
        name: "Nhà Tài Trợ Vàng (Gold Partner)",
        tier: "gold",
        price: "25.000.000 ₫",
        priceValue: 25000000,
        slotsRemaining: 2,
        description: "Gói quảng bá thương hiệu toàn diện trên mặt sân thi đấu, thảm đấu BWF và ấn phẩm giải.",
        benefits: [
          "Logo lớn trên backdrop phỏng vấn VĐV, thảm đấu chính số 1 & 2 và bảng điện tử LED",
          "Gian hàng giới thiệu & trải nghiệm sản phẩm 12m² tại hành lang nhà thi đấu",
          "Đại diện thương hiệu trao giải Nhì (Á quân) và giải Ba tại Lễ bế mạc",
          "05 bài đăng truyền thông giới thiệu sản phẩm & voucher độc quyền",
          "Tặng 01 cặp VĐV tham gia thi đấu miễn phí",
        ],
      },
      {
        id: "pkg-silver",
        name: "Nhà Tài Trợ Bạc (Silver Partner)",
        tier: "silver",
        price: "10.000.000 ₫",
        priceValue: 10000000,
        slotsRemaining: 4,
        description: "Gói tài trợ tối ưu chi phí giúp thương hiệu tiếp cận trực tiếp 500+ VĐV và 2.000+ khán giả.",
        benefits: [
          "Logo trên backdrop chụp ảnh lưu niệm (Photo Booth) và website PlayGrid",
          "Phát tờ rơi / voucher ưu đãi vào toàn bộ túi Race Kit gửi tới 500 VĐV",
          "02 bài đăng cảm ơn và vinh danh nhà tài trợ trên Fanpage chính thức",
          "Vinh danh thương hiệu trong Lễ bế mạc trao giải",
        ],
      },
      {
        id: "pkg-inkind",
        name: "Tài Trợ Hiện Vật & Dịch Vụ (Product / Service)",
        tier: "inkind",
        price: "Hiện vật / Dịch vụ",
        slotsRemaining: 3,
        description: "Dành cho các đối tác tài trợ Nước điện giải, Cầu thi đấu, Quần áo thể thao, Y tế, hoặc Truyền thông.",
        benefits: [
          "Trưng bày và phục vụ sản phẩm trực tiếp cho toàn bộ VĐV thi đấu trên sân",
          "Logo nhà cung ứng chính thức trên backdrop và website",
          "Quyền lợi truyền thông tương đương giá trị hiện vật tài trợ",
        ],
      },
    ],
    faqs: [
      {
        question: "Tôi chưa có bạn đánh đôi thì có đăng ký được không?",
        answer: "Có! Bạn có thể chọn tùy chọn 'Tìm bạn ghép tự động' trong form đăng ký hoặc liên hệ ban tổ chức để được hỗ trợ ghép đôi cùng các VĐV có trình độ tương đương.",
      },
      {
        question: "Làm thế nào để xác minh trình độ VĐV không vượt quá quy định hạng mục?",
        answer: "Ban tổ chức sẽ đối chiếu thành tích thi đấu các giải phong trào và dữ liệu điểm số hệ thống PlayGrid. Trường hợp phát hiện VĐV gian lận trình độ sẽ bị truất quyền thi đấu và không hoàn lại lệ phí.",
      },
      {
        question: "Chính sách hủy vé hoặc chuyển nhượng slot thi đấu như thế nào?",
        answer: "VĐV được phép chuyển nhượng slot hoặc đổi tên bạn đánh đôi miễn phí trước ngày 15/10/2026 bằng cách cập nhật thông tin trong phần 'Vé của tôi' trên PlayGrid.",
      },
      {
        question: "Khán giả vào xem giải đấu có cần mua vé không?",
        answer: "Khán giả được vào cổng tự do và miễn phí tại tất cả các vòng đấu ở khán đài Nhà thi đấu Trịnh Hoài Đức.",
      },
    ],
    tags: ["Cầu lông", "Giải cầu lông Hà Nội", "Hà Nội Open 2026", "Đôi Nam Open", "Trịnh Hoài Đức", "Đặt vé giải đấu", "PlayGrid Tournament"],
  },
  {
    id: "saigon-badminton-championship-2026",
    title: "Giải Cầu Lông Vô Địch TP. HCM Mở Rộng 2026 - Cup Victor",
    shortTitle: "TP. HCM Open Cup Victor",
    sport: "badminton",
    sportLabel: "Cầu Lông",
    badge: {
      type: "hot",
      text: "Đang Mở Đơn",
    },
    date: "15 - 17 Tháng 11, 2026",
    startDate: "2026-11-15T08:00:00+07:00",
    endDate: "2026-11-17T18:00:00+07:00",
    regDeadline: "05/11/2026",
    location: "Sân Thể Thao Phú Thọ, Quận 11, TP. HCM",
    totalPrizePool: "100.000.000đ",
    priceFrom: "300.000đ",
    bannerImage: "/images/activities/badminton-banner.png",
    description:
      "Giải Cầu Lông Vô Địch TP. HCM quy tụ hơn 400 tay vợt từ các câu lạc bộ hàng đầu miền Nam tranh tài ở các nội dung Đôi Nam, Đôi Nữ và Đôi Nam Nữ.",
    organizer: {
      name: "Liên đoàn Cầu Lông TP. HCM & PlayGrid",
      logoUrl: "/images/explore_sports/gridy-badminton.avif",
      verified: true,
      phone: "0908 999 888",
      email: "hcm.badminton@playgrid.vn",
      description: "Đơn vị phát triển phong trào cầu lông chuyên nghiệp tại TP. HCM.",
    },
    venueDetails: {
      name: "Sân Thể Thao Phú Thọ",
      address: "Số 219 Lý Thường Kiệt, Phường 15, Quận 11",
      district: "Quận 11",
      city: "TP. Hồ Chí Minh",
      coordinates: { lat: 10.7678, lng: 106.6578 },
      phone: "028 3865 2445",
      email: "phutho@hcm.gov.vn",
      parkingInfo: "Bãi đỗ xe ô tô 120 chỗ và bãi đỗ xe máy lớn.",
      amenities: ["Thảm BWF tiêu chuẩn", "Khán đài 2.000 chỗ", "Máy lạnh", "Phòng thay đồ", "Căng tin", "Bãi xe ô tô"],
    },
    sponsors: [
      { name: "Victor Sports", tier: "diamond", logoUrl: "/images/activities/badminton-banner.png" },
      { name: "Pocari Sweat", tier: "gold", logoUrl: "/images/activities/badminton-hero.png" },
    ],
    divisions: [
      {
        id: "div-hcm-doi-nam-open",
        name: "Đôi Nam Open Hạng A (Trình 3.5 - 4.5+)",
        sport: "badminton",
        formatType: "doubles",
        formatLabel: "Đôi Nam",
        levelRating: "Nâng cao / Bán chuyên",
        price: 500000,
        originalPrice: 600000,
        regDeadline: "05/11/2026",
        maxTeams: 32,
        registeredTeams: 22,
        prizeStructure: { first: "20.000.000đ", second: "10.000.000đ", third: "5.000.000đ" },
        benefits: ["Áo thi đấu Victor chính hãng", "Huy chương lưu niệm", "Bảo hiểm VĐV"],
        status: "available",
      },
    ],
    addons: [],
    brackets: [],
    rules: [],
    schedule: [],
    faqs: [],
    tags: ["Cầu lông", "TP HCM Open", "Phú Thọ", "Giải Cầu Lông", "PlayGrid"],
  },
  {
    id: "khang-an-badminton-cup-2026",
    title: "Giải Cầu Lông Đôi Nam Nữ Khang An Cup 2026 - Thủ Đức",
    shortTitle: "Khang An Cup 2026",
    sport: "badminton",
    sportLabel: "Cầu Lông",
    badge: {
      type: "recommended",
      text: "Sắp Diễn Ra",
    },
    date: "28 - 29 Tháng 11, 2026",
    startDate: "2026-11-28T08:00:00+07:00",
    endDate: "2026-11-29T18:00:00+07:00",
    regDeadline: "20/11/2026",
    location: "CLB Cầu Lông Khang An, Thủ Đức, TP. HCM",
    totalPrizePool: "60.000.000đ",
    priceFrom: "200.000đ",
    bannerImage: "/images/explore_sports/gridy-badminton.avif",
    description:
      "Sân chơi giao lưu cọ xát phong trào dành cho các cặp đôi nam nữ và đôi nam nghiệp dư với giải thưởng hiện kim hấp dẫn.",
    organizer: {
      name: "CLB Khang An & PlayGrid",
      verified: true,
      phone: "0912 345 678",
      email: "khangan@playgrid.vn",
      description: "CLB Cầu Lông hàng đầu khu vực Thủ Đức.",
    },
    venueDetails: {
      name: "CLB Cầu Lông Khang An",
      address: "Đường số 8, Phường Linh Trung, TP. Thủ Đức",
      district: "Thủ Đức",
      city: "TP. Hồ Chí Minh",
      coordinates: { lat: 10.865, lng: 106.772 },
      phone: "0908 123 456",
      email: "contact@khangan.vn",
      parkingInfo: "Bãi giữ xe rộng rãi miễn phí.",
      amenities: ["Thảm BWF tiêu chuẩn", "Máy lạnh", "Căng tin", "Bãi xe ô tô"],
    },
    sponsors: [],
    divisions: [],
    addons: [],
    brackets: [],
    rules: [],
    schedule: [],
    faqs: [],
    tags: ["Cầu lông", "Khang An", "Thủ Đức", "Đôi Nam Nữ", "PlayGrid"],
  },
  {
    id: "vnb-junior-badminton-2026",
    title: "Giải Cầu Lông Trẻ & Bán Chuyên VNB Cup 2026 - Tân Bình",
    shortTitle: "VNB Cup 2026",
    sport: "badminton",
    sportLabel: "Cầu Lông",
    badge: {
      type: "hot",
      text: "Đang Mở Đơn",
    },
    date: "12 - 14 Tháng 12, 2026",
    startDate: "2026-12-12T08:00:00+07:00",
    endDate: "2026-12-14T18:00:00+07:00",
    regDeadline: "01/12/2026",
    location: "VNB Sports Center, Tân Bình, TP. HCM",
    totalPrizePool: "80.000.000đ",
    priceFrom: "220.000đ",
    bannerImage: "/images/activities/badminton-banner.png",
    description:
      "Giải đấu uy tín thường niên của hệ thống VNB Sports với sự đồng hành của các nhà tài trợ lớn Yonex, Victor, Lining.",
    organizer: {
      name: "VNB Sports & PlayGrid",
      verified: true,
      phone: "0938 111 222",
      email: "vnb@playgrid.vn",
      description: "Hệ thống shop và cụm sân cầu lông toàn quốc.",
    },
    venueDetails: {
      name: "VNB Sports Center",
      address: "Số 17 Hoà Bình, Phường 3, Tân Bình",
      district: "Tân Bình",
      city: "TP. Hồ Chí Minh",
      coordinates: { lat: 10.771, lng: 106.643 },
      phone: "028 3960 1234",
      email: "tanbinh@vnb.vn",
      parkingInfo: "Bãi xe ô tô và xe máy an toàn.",
      amenities: ["Thảm BWF", "Máy lạnh", "Pro Shop", "Căng tin"],
    },
    sponsors: [],
    divisions: [],
    addons: [],
    brackets: [],
    rules: [],
    schedule: [],
    faqs: [],
    tags: ["Cầu lông", "VNB", "Tân Bình", "Giải Trẻ", "PlayGrid"],
  },
  {
    id: "saigon-pickleball-championship-2026",
    title: "Giải Pickleball Vô Địch TP. HCM 2026 - Master Cup",
    shortTitle: "Saigon Pickleball Master Cup",
    sport: "pickleball",
    sportLabel: "Pickleball",
    badge: {
      type: "recommended",
      text: "Đề Xuất",
    },
    date: "10 - 12 Tháng 11, 2026",
    startDate: "2026-11-10T08:00:00+07:00",
    endDate: "2026-11-12T18:00:00+07:00",
    regDeadline: "01/11/2026",
    location: "Sài Gòn Pickleball Arena, Quận 7, TP. HCM",
    totalPrizePool: "150.000.000đ",
    priceFrom: "300.000đ",
    bannerImage: "/images/activities/pickleball-banner.png",
    description:
      "Giải đấu Pickleball chuyên nghiệp và phong trào quy mô lớn nhất miền Nam với hệ thống tính điểm quốc tế DUPR. Quy tụ các tay vợt hàng đầu tranh tài trên 12 sân chuẩn USAPA có mái che và máy lạnh.",
    organizer: {
      name: "Hiệp hội Pickleball TP. HCM & PlayGrid",
      logoUrl: "/images/explore_sports/gridy-pickleball.avif",
      verified: true,
      phone: "0909 888 777",
      email: "pickleball@playgrid.vn",
      description: "Tổ chức phát triển phong trào Pickleball chuyên nghiệp tại Việt Nam.",
    },
    venueDetails: {
      name: "Sài Gòn Pickleball Arena",
      address: "Số 88 Đường số 7, Phường Tân Phú, Quận 7",
      district: "Quận 7",
      city: "TP. Hồ Chí Minh",
      coordinates: {
        lat: 10.7324,
        lng: 106.7198,
      },
      phone: "028 3775 8899",
      email: "contact@saigonpickleball.vn",
      parkingInfo: "Bãi đỗ xe ô tô 80 xe và hầm xe máy có bảo vệ 24/7.",
      amenities: ["Mặt sân USAPA tiêu chuẩn", "12 sân có mái che", "Đèn LED chống chói 500 Lux", "Phòng tắm & Locker VIP", "Pro Shop bóng & vợt Franklin", "Quầy Bar & Căng tin"],
    },
    sponsors: [
      { name: "Franklin Sports", tier: "diamond", logoUrl: "/images/explore_sports/gridy-pickleball.avif" },
      { name: "Selkirk Sport", tier: "gold", logoUrl: "/images/activities/pickleball-banner.png" },
      { name: "Red Bull Vietnam", tier: "gold", logoUrl: "/images/activities/badminton-hero.png" },
    ],
    divisions: [
      {
        id: "div-pb-doi-open-45",
        name: "Đôi Open Master (DUPR 3.5 - 4.5+)",
        sport: "pickleball",
        formatType: "doubles",
        formatLabel: "Đôi Open",
        levelRating: "DUPR 3.5 - 4.5+",
        price: 500000,
        originalPrice: 650000,
        phase: "Early Bird",
        regDeadline: "01/11/2026",
        maxTeams: 32,
        registeredTeams: 28,
        prizeStructure: {
          first: "30.000.000đ + Cúp Vàng Master",
          second: "15.000.000đ + HCB",
          third: "8.000.000đ + HCĐ",
        },
        benefits: ["2 Áo thi đấu Pickleball Dri-fit", "Điểm xếp hạng DUPR quốc tế", "Bóng thi đấu Franklin X-40", "Huy chương hoàn thành"],
        status: "selling_fast",
      },
      {
        id: "div-pb-doi-intermediate-30",
        name: "Đôi Phong Trào Intermediate (DUPR 2.5 - 3.5)",
        sport: "pickleball",
        formatType: "doubles",
        formatLabel: "Đôi Nam Nữ",
        levelRating: "DUPR 2.5 - 3.5",
        price: 420000,
        originalPrice: 520000,
        phase: "Early Bird",
        regDeadline: "01/11/2026",
        maxTeams: 32,
        registeredTeams: 24,
        prizeStructure: {
          first: "20.000.000đ + Cúp Vàng",
          second: "10.000.000đ + HCB",
          third: "5.000.000đ + HCĐ",
        },
        benefits: ["2 Áo đấu PlayGrid", "Bóng thi đấu", "Bảo hiểm thể thao"],
        status: "available",
      },
      {
        id: "div-pb-newbie-doi",
        name: "Đôi Newbie Trải Nghiệm (DUPR < 2.5)",
        sport: "pickleball",
        formatType: "doubles",
        formatLabel: "Đôi Newbie",
        levelRating: "Người mới chơi (DUPR 2.0 - 2.5)",
        price: 300000,
        originalPrice: 380000,
        phase: "Regular",
        regDeadline: "05/11/2026",
        maxTeams: 32,
        registeredTeams: 16,
        prizeStructure: {
          first: "10.000.000đ + Cúp Vàng",
          second: "5.000.000đ + HCB",
          third: "2.500.000đ + HCĐ",
        },
        benefits: ["Áo thi đấu kỷ niệm", "Kỷ niệm chương", "Quà tặng từ nhà tài trợ"],
        status: "available",
      },
    ],
    addons: [
      {
        id: "addon-pb-balls",
        name: "Hộp 3 Quả Bóng Thi Đấu Franklin X-40 Chính Hãng",
        price: 135000,
        description: "Bóng thi đấu chuẩn USAPA dùng trong giải đấu chính thức.",
        category: "gear",
        imageUrl: "/images/activities/pickleball-banner.png",
      },
      {
        id: "addon-pb-ai-photo",
        name: "Gói Ảnh Thi Đấu AI 4K Full HD",
        price: 120000,
        originalPrice: 180000,
        description: "Tự động nhận diện và gửi toàn bộ ảnh thi đấu của bạn về điện thoại.",
        category: "photo",
        badge: "HOT",
        popular: true,
        imageUrl: "/images/explore_sports/gridy-pickleball.avif",
      },
    ],
    brackets: [
      {
        id: "match-pb-sf-1",
        round: "semi_finals",
        roundLabel: "Bán Kết 1",
        matchIndex: 1,
        player1: { name: "Trịnh Linh Giang / Sophia Huỳnh", club: "CLB Quận 2", seed: 1, score: [11, 11], isWinner: true },
        player2: { name: "Phạm Minh Đạt / Lê Hoàng Quân", club: "CLB Bình Dương", score: [8, 6], isWinner: false },
        courtName: "Sân 1 Arena",
        scheduledTime: "12/11 - 14:00",
        status: "finished",
      },
      {
        id: "match-pb-final",
        round: "finals",
        roundLabel: "Chung Kết Master Cup",
        matchIndex: 1,
        player1: { name: "Trịnh Linh Giang / Sophia Huỳnh", club: "CLB Quận 2", seed: 1, score: [11, 8, 11], isWinner: true },
        player2: { name: "Huỳnh Chí Khương / Trần Thanh Trúc", club: "CLB Đà Nẵng", seed: 2, score: [7, 11, 9], isWinner: false },
        courtName: "Sân Trung Tâm Khán Đài VIP",
        scheduledTime: "12/11 - 16:00",
        status: "finished",
      },
    ],
    rules: [
      {
        id: "rule-pb-format",
        title: "Luật Thi Đấu USAPA & DUPR",
        content: "Thi đấu theo Luật Pickleball Quốc Tế 2026 ban hành bởi USA Pickleball Association (USAPA).",
        bulletPoints: [
          "Mỗi trận thi đấu 3 set 11 điểm (thắng cách biệt 2 điểm).",
          "Áp dụng luật bếp (Non-Volley Zone) và luật giao bóng rơi (Drop Serve).",
          "Kết quả mọi trận đấu được đồng bộ trực tiếp lên hệ thống xếp hạng DUPR toàn cầu.",
        ],
      },
    ],
    schedule: [
      { time: "10/11 - 08:00", activity: "Khai mạc giải & Thi đấu Vòng bảng Đôi Newbie", location: "Sân 1 - 12" },
      { time: "11/11 - 08:30", activity: "Vòng bảng Đôi Open & Đôi Nam Nữ", location: "Sân 1 - 12" },
      { time: "12/11 - 14:00", activity: "Bán kết & Chung kết Master Cup", location: "Sân Trung Tâm VIP" },
    ],
    faqs: [
      {
        question: "Tôi chưa có tài khoản DUPR thì có đăng ký được không?",
        answer: "Ban tổ chức sẽ tự động tạo hồ sơ DUPR miễn phí cho bạn sau khi hoàn tất đăng ký giải đấu trên PlayGrid.",
      },
    ],
    tags: ["Pickleball", "Saigon Pickleball", "Master Cup 2026", "DUPR", "Quận 7", "PlayGrid Tournament"],
  },
  {
    id: "vietnam-tennis-master-cup-2026",
    title: "Giải Quần Vợt Vietnam Tennis Master Cup 2026",
    shortTitle: "Vietnam Tennis Master Cup",
    sport: "tennis",
    sportLabel: "Tennis",
    badge: {
      type: "hot",
      text: "Sắp Diễn Ra",
    },
    date: "05 - 08 Tháng 12, 2026",
    startDate: "2026-12-05T08:00:00+07:00",
    endDate: "2026-12-08T18:00:00+07:00",
    regDeadline: "25/11/2026",
    location: "CLB Quần Vợt Phú Thọ, Quận 11, TP. HCM",
    totalPrizePool: "180.000.000đ",
    priceFrom: "400.000đ",
    bannerImage: "/images/activities/tennis-banner.png",
    description:
      "Giải quần vợt tranh cúp Master toàn quốc quy tụ các tay vợt xuất sắc từ các câu lạc bộ Tennis lớn khắp cả nước.",
    organizer: {
      name: "Liên đoàn Quần Vợt Việt Nam & PlayGrid",
      logoUrl: "/images/clubs/saigon-tennis.png",
      verified: true,
      phone: "0903 123 456",
      email: "tennis@playgrid.vn",
      description: "Đơn vị tổ chức các giải quần vợt uy tín toàn quốc.",
    },
    venueDetails: {
      name: "CLB Quần Vợt Phú Thọ",
      address: "Số 219 Lý Thường Kiệt, Phường 15, Quận 11",
      district: "Quận 11",
      city: "TP. Hồ Chí Minh",
      coordinates: {
        lat: 10.7678,
        lng: 106.6578,
      },
      phone: "028 3865 2445",
      email: "phutho.tennis@hcm.gov.vn",
      parkingInfo: "Bãi đỗ xe ô tô 120 chỗ và bãi đỗ xe máy lớn.",
      amenities: ["Mặt sân cứng DecoTurf", "Hệ thống chiếu sáng LED thi đấu", "Khán đài có mái che", "Phòng thay đồ & Tắm nóng lạnh", "Quầy căng tin & Nước uống"],
    },
    sponsors: [
      { name: "Wilson Tennis", tier: "diamond", logoUrl: "/images/activities/tennis-banner.png" },
      { name: "Babolat Vietnam", tier: "gold", logoUrl: "/images/activities/badminton-banner.png" },
    ],
    divisions: [
      {
        id: "div-tn-doi-nam-1400",
        name: "Đôi Nam Hạng Trình 1400 (Điểm VTR)",
        sport: "tennis",
        formatType: "doubles",
        formatLabel: "Đôi Nam",
        levelRating: "Điểm VTR 1350 - 1425",
        price: 600000,
        originalPrice: 750000,
        phase: "Early Bird",
        regDeadline: "25/11/2026",
        maxTeams: 32,
        registeredTeams: 24,
        prizeStructure: {
          first: "35.000.000đ + Cúp Master",
          second: "18.000.000đ + HCB",
          third: "8.000.000đ + HCĐ",
        },
        benefits: ["2 Áo thi đấu Tennis chính hãng", "Bóng thi đấu Wilson US Open", "Huy chương lưu niệm", "Bảo hiểm VĐV"],
        status: "available",
      },
    ],
    addons: [
      {
        id: "addon-tn-balls",
        name: "Hộp 4 Quả Bóng Tennis Wilson US Open",
        price: 160000,
        description: "Bóng thi đấu chính thức đạt chuẩn ITF.",
        category: "gear",
        imageUrl: "/images/activities/tennis-banner.png",
      },
    ],
    brackets: [],
    rules: [
      {
        id: "rule-tn-format",
        title: "Thể Thức & Luật Thi Đấu ITF",
        content: "Thi đấu 1 set chạm 6 (nếu 5-5 đánh tie-break 7 điểm), bóng vàng 40-40 (No-Ad).",
      },
    ],
    schedule: [
      { time: "05/12 - 08:00", activity: "Khai mạc & Vòng loại bảng", location: "Sân 1 - 8 Phú Thọ" },
    ],
    faqs: [
      {
        question: "Trình điểm VTR được tính như thế nào?",
        answer: "Điểm VTR dựa trên bảng xếp hạng các giải đấu thuộc diễn đàn Tennis Việt Nam trong 12 tháng gần nhất.",
      },
    ],
    tags: ["Tennis", "Quần vợt", "Vietnam Tennis", "Phú Thọ", "Master Cup", "PlayGrid"],
  },
];

export function getTournamentById(id: string): TournamentData {
  const found = TOURNAMENTS_DATA.find((t) => t.id === id);
  if (found) return found;
  return TOURNAMENTS_DATA[0]!;
}

export function getAllTournaments(): TournamentData[] {
  return TOURNAMENTS_DATA;
}
