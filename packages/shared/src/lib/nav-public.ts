import {
  Home,
  Trophy,
  Users,
  MessageCircle,
  MapPin,
  Zap,
  BookOpen,
  Info,
  PhoneCall,
  Award,
  type LucideIcon,
} from "lucide-react";

export type NavLabelKey =
  | "home"
  | "courts"
  | "clubs"
  | "tournaments"
  | "leaderboard"
  | "community"
  | "matchmaker"
  | "pricing"
  | "blog"
  | "about"
  | "contact"
  | "rating"
  | "play"
  | "more";

export type SubNavLabelKey =
  | "clubs_all"
  | "clubs_near"
  | "clubs_joined"
  | "clubs_create"
  | "community_feed"
  | "community_forum"
  | "community_opponents"
  | "tournaments"
  | "matchmaker"
  | "leaderboard"
  | "rating"
  | "blog"
  | "pricing"
  | "about"
  | "contact";

export interface SubNavItemConfig {
  labelKey: SubNavLabelKey;
  href: string;
  descriptionKey?: SubNavLabelKey;
  icon?: LucideIcon;
}

export interface NavItemConfig {
  labelKey: NavLabelKey;
  href: string;
  icon?: LucideIcon;
  children?: SubNavItemConfig[];
}

export const PUBLIC_NAV_ITEMS: NavItemConfig[] = [
  { labelKey: "home", href: "/", icon: Home },
  { labelKey: "courts", href: "/courts", icon: MapPin },
  {
    labelKey: "clubs",
    href: "/clubs",
    icon: Users,
    children: [
      {
        labelKey: "clubs_all",
        href: "/clubs",
        descriptionKey: "clubs_all",
      },
      {
        labelKey: "clubs_near",
        href: "/clubs/near-me",
        descriptionKey: "clubs_near",
      },
      {
        labelKey: "clubs_joined",
        href: "/clubs/joined",
        descriptionKey: "clubs_joined",
      },
      {
        labelKey: "clubs_create",
        href: "/clubs/create",
        descriptionKey: "clubs_create",
      },
    ],
  },
  {
    labelKey: "play",
    href: "#",
    icon: Trophy,
    children: [
      { labelKey: "tournaments", href: "/tournaments", icon: Trophy },
      { labelKey: "matchmaker", href: "/matchmaker", icon: Zap },
      { labelKey: "leaderboard", href: "/leaderboard", icon: Award },
      { labelKey: "rating", href: "/rating", icon: Trophy },
    ],
  },
  {
    labelKey: "community",
    href: "/community",
    icon: MessageCircle,
    children: [
      { labelKey: "community_feed", href: "/community/feed" },
      { labelKey: "community_forum", href: "/community/forum" },
      { labelKey: "community_opponents", href: "/community/opponents" },
      { labelKey: "blog", href: "/blog", icon: BookOpen },
    ],
  },
  {
    labelKey: "more",
    href: "#",
    icon: Info,
    children: [
      { labelKey: "pricing", href: "/pricing" },
      { labelKey: "about", href: "/about", icon: Info },
      { labelKey: "contact", href: "/contact", icon: PhoneCall },
    ],
  },
];

export interface SubNavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: SubNavItem[];
}