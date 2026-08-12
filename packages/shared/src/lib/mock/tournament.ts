export type TournamentStatus = "open" | "ongoing" | "finished";
export type TournamentFormat = "loai-truc-tiep" | "vong-bang" | "ket-hop";
export type MatchStatus = "scheduled" | "live" | "finished";

export interface TournamentCategory {
  id: string;
  name: string;
  format: string;
}

export interface Tournament {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  bannerImage: string;
  startDate: string;
  endDate: string;
  location: string;
  status: TournamentStatus;
  format: TournamentFormat;
  totalTeams: number;
  registeredTeams: number;
  prizePool: string;
  totalRounds: number;
  currentRound: number;
  categories: TournamentCategory[];
}

export interface TournamentMatch {
  id: string;
  round: string;
  group?: string;
  teamA: string;
  teamB: string;
  date: string;
  time: string;
  court: string;
  status: MatchStatus;
}

export const tournament: Tournament = {
  id: "t-smash-cup-2026",
  slug: "smash-cup-2026",
  name: "Badminton Smash Cup 2026",
  tagline: "Giai dau cau long thuong nien lon nhat mien Bac",
  description:
    "Badminton Smash Cup 2026 la giai dau cau long hang dau toan quoc quy tu 32 doi thu chuyen nghiep va ban nua chuyen nghiep. Giai thi dau theo the thuc loai truc tiep, ket hop vong bang 4 bang, dien ra trong 5 ngay voi tong giai thuong len den 50 trieu dong. Moi tran deu duoc livestream truc tiep tren nen tang PlayGrid.",
  bannerImage: "/assets/tournament/banner-smash-cup.png",
  startDate: "15/07/2026",
  endDate: "19/07/2026",
  location: "Nha thi dau CLB - Cau Giay, Ha Noi",
  status: "open",
  format: "ket-hop",
  totalTeams: 32,
  registeredTeams: 24,
  prizePool: "50 trieu",
  totalRounds: 5,
  currentRound: 0,
  categories: [
    { id: "c1", name: "Don nam", format: "The thuc loai truc tiep" },
    { id: "c2", name: "Doi nam", format: "The thuc vong bang + loai truc tiep" },
    { id: "c3", name: "Doi nu", format: "The thuc vong bang + loai truc tiep" },
  ],
};

export const upcomingMatches: TournamentMatch[] = [
  {
    id: "m1",
    round: "Vong bang",
    group: "Bang A",
    teamA: "Tran Van Khanh",
    teamB: "Nguyen Hoang Nam",
    date: "15/07/2026",
    time: "08:00",
    court: "San 1",
    status: "scheduled",
  },
  {
    id: "m2",
    round: "Vong bang",
    group: "Bang A",
    teamA: "Pham Quang Huy",
    teamB: "Le Minh Tuan",
    date: "15/07/2026",
    time: "09:30",
    court: "San 1",
    status: "scheduled",
  },
  {
    id: "m3",
    round: "Vong bang",
    group: "Bang B",
    teamA: "Bui Tien Dat",
    teamB: "Doan Van Long",
    date: "15/07/2026",
    time: "08:00",
    court: "San 2",
    status: "scheduled",
  },
  {
    id: "m4",
    round: "Vong bang",
    group: "Bang B",
    teamA: "Vu Ngoc Anh",
    teamB: "Hoang Gia Bao",
    date: "15/07/2026",
    time: "09:30",
    court: "San 2",
    status: "scheduled",
  },
  {
    id: "m5",
    round: "Tu ket",
    teamA: "Nhat A vong bang",
    teamB: "Nhat B vong bang",
    date: "17/07/2026",
    time: "14:00",
    court: "San chinh",
    status: "scheduled",
  },
  {
    id: "m6",
    round: "Ban ket",
    teamA: "Thang tu ket 1",
    teamB: "Thang tu ket 2",
    date: "18/07/2026",
    time: "16:00",
    court: "San chinh",
    status: "scheduled",
  },
];
