import {
  Home,
  Calendar,
  Trophy,
  Users,
  MessageCircle,
  MapPin,
  BarChart3,
  Layers,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export const dashboardNav: NavItem[] = [
  { label: "Tổng quan", href: "/dashboard", icon: Home },
  { label: "Lịch thi đấu", href: "/dashboard/schedule", icon: Calendar },
  { label: "Giải đấu", href: "/dashboard/tournaments", icon: Trophy, badge: 3 },
  { label: "Câu lạc bộ", href: "/dashboard/clubs", icon: Users },
  { label: "Cộng đồng", href: "/dashboard/community", icon: MessageCircle },
  { label: "Sân thi đấu", href: "/dashboard/courts", icon: MapPin },
  { label: "Báo cáo", href: "/dashboard/reports", icon: BarChart3 },
  { label: "Quản lý", href: "/dashboard/manage", icon: Layers },
];

export const currentUser = {
  name: "Nguyễn Minh",
  role: "Organizer",
  status: "online" as const,
  initials: "NM",
};