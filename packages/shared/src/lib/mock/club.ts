export interface ClubMember {
  id: string;
  name: string;
  role: "Chu nhiem" | "HLV" | "Thanh vien";
  rank?: number;
  matches?: number;
  winRate?: number;
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  maxParticipants: number;
}

export interface ClubScheduleItem {
  id: string;
  day: string;
  time: string;
  title: string;
  court: string;
  coach: string;
}

export interface ClubPost {
  id: string;
  author: string;
  role: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
}

export interface ClubGalleryItem {
  id: string;
  title: string;
  type: "image" | "video";
}

export interface ClubDetail {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  sport: string;
  sportAccent: "blue" | "green" | "orange" | "purple" | "yellow" | "cyan" | "red" | "teal";
  heroGradient: string;
  verified: boolean;
  stats: {
    members: string;
    upcomingEvents: number;
    achievements: number;
    rating: string;
  };
  members: ClubMember[];
  events: ClubEvent[];
  schedule: ClubScheduleItem[];
  posts: ClubPost[];
  gallery: ClubGalleryItem[];
}

export const clubDetail: ClubDetail = {
  id: "bc-badmintonsmash",
  slug: "badminton-smash-hanoi",
  name: "Badminton Smash Hanoi",
  tagline: "San choi cau long chuyen nghiep tai Ha Noi",
  description:
    "CLB cau long hung vien voi hon 1.200 thanh vien, hoat dong tai 5 chi nhanh tren toan Ha Noi. Chung toi to chuc cac buoi tap luyen hang ngay, giai dau noi bo va cac khoa hoc cho nguoi moi.",
  sport: "Cau long",
  sportAccent: "blue",
  heroGradient: "from-blue-600 via-indigo-600 to-violet-600",
  verified: true,
  stats: {
    members: "1.2K+",
    upcomingEvents: 8,
    achievements: 24,
    rating: "4.8/5",
  },
  members: [
    {
      id: "m1",
      name: "Tran Van Khanh",
      role: "Chu nhiem",
      rank: 1,
      matches: 142,
      winRate: 87,
    },
    {
      id: "m2",
      name: "Le Thi Mai",
      role: "HLV",
      rank: 2,
      matches: 128,
      winRate: 82,
    },
    {
      id: "m3",
      name: "Nguyen Hoang Nam",
      role: "Thanh vien",
      rank: 3,
      matches: 96,
      winRate: 75,
    },
    {
      id: "m4",
      name: "Pham Thi Lan",
      role: "Thanh vien",
      rank: 4,
      matches: 88,
      winRate: 70,
    },
  ],
  events: [
    {
      id: "e1",
      title: "Giai dau Smash Cup 2026",
      date: "15/07/2026",
      time: "08:00",
      location: "Nha thi dau CLB - Cau Giay",
      participants: 64,
      maxParticipants: 128,
    },
    {
      id: "e2",
      title: "Khai giang khoa hoc cho nguoi moi",
      date: "20/07/2026",
      time: "18:00",
      location: "Co so 2 - Long Bien",
      participants: 12,
      maxParticipants: 20,
    },
    {
      id: "e3",
      title: "Giao luu CLB Badminton Sao Do",
      date: "28/07/2026",
      time: "14:00",
      location: "Nha thi dau CLB - Cau Giay",
      participants: 20,
      maxParticipants: 30,
    },
  ],
  schedule: [
    {
      id: "s1",
      day: "Thu 2",
      time: "18:00 - 20:00",
      title: "Tap luyen co ban",
      court: "San 1 - 4",
      coach: "Le Thi Mai",
    },
    {
      id: "s2",
      day: "Thu 4",
      time: "18:00 - 20:00",
      title: "Luyen tap chien thuat",
      court: "San 1 - 4",
      coach: "Tran Van Khanh",
    },
    {
      id: "s3",
      day: "Thu 6",
      time: "19:00 - 21:00",
      title: "Giao luu noi bo",
      court: "San 1 - 6",
      coach: "Le Thi Mai",
    },
    {
      id: "s4",
      day: "Thu 7",
      time: "08:00 - 11:00",
      title: "Tap luyen nang cao",
      court: "San 1 - 6",
      coach: "Tran Van Khanh",
    },
    {
      id: "s5",
      day: "Chu nhat",
      time: "09:00 - 11:00",
      title: "Sinh hoat toan CLB",
      court: "San 1 - 6",
      coach: "Ban chu nhiem",
    },
  ],
  posts: [
    {
      id: "p1",
      author: "Tran Van Khanh",
      role: "Chu nhiem",
      time: "2 gio truoc",
      content:
        "CLB vua nhan them 3 san moi tai co so Long Bien. Cac thanh vien co the dat lich tu 01/07.",
      likes: 48,
      comments: 12,
    },
    {
      id: "p2",
      author: "Le Thi Mai",
      role: "HLV",
      time: "5 gio truoc",
      content:
        "Buoi tap ngay mai se tap trung vao ky thuat smash va footwork. Moi nguoi chuan bi giay the thao nhe!",
      likes: 35,
      comments: 8,
    },
    {
      id: "p3",
      author: "Nguyen Hoang Nam",
      role: "Thanh vien",
      time: "1 ngay truoc",
      content:
        "Cam on CLB da to chuc giao luu cuoi tuan qua rat vui. Rat mong cho giai lan sau!",
      likes: 27,
      comments: 4,
    },
  ],
  gallery: [
    { id: "g1", title: "Giai dau mua xuan 2026", type: "image" },
    { id: "g2", title: "Khai giang khoa moi", type: "image" },
    { id: "g3", title: "Giao luu voi CLB Sao Do", type: "video" },
    { id: "g4", title: "Tap luyen cuoi tuan", type: "image" },
    { id: "g5", title: "Lenh dan cup vo dich", type: "image" },
    { id: "g6", title: "Ky niet thanh vien", type: "image" },
  ],
};