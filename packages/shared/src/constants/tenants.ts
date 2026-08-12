import { Home, Trophy, Users, MessageCircle, MapPin, Zap, BookOpen, Info, PhoneCall, Award, Calendar } from "lucide-react";

export interface TenantConfig {
  id: string;
  name: string;
  slogan: string;
  primaryColor: string;
  features: {
    booking: boolean;
    tournaments: boolean;
    clubs: boolean;
    races: boolean;
    ranking: boolean;
    matchmaker: boolean;
  };
  menuItems: {
    labelKey: string;
    href: string;
    icon?: any;
    children?: {
      labelKey: string;
      href: string;
    }[];
  }[];
}

export const TENANT_CONFIGS: Record<string, TenantConfig> = {
  badminton: {
    id: "badminton",
    name: "Enjoy Badminton",
    slogan: "Sân chơi & Kết nối Cầu lông chuyên nghiệp",
    primaryColor: "green",
    features: {
      booking: true,
      tournaments: true,
      clubs: true,
      races: false,
      ranking: true,
      matchmaker: true
    },
    menuItems: [
      { labelKey: "events", href: "/races", icon: Calendar },
      { labelKey: "tournaments", href: "/tournaments", icon: Trophy },
      {
        labelKey: "clubs",
        href: "/clubs",
        icon: Users,
        children: [
          { labelKey: "clubs_all", href: "/clubs" },
          { labelKey: "clubs_near", href: "/clubs/near-me" }
        ]
      },
      {
        labelKey: "play",
        href: "#",
        icon: Trophy,
        children: [
          { labelKey: "courts", href: "/courts" },
          { labelKey: "matchmaker", href: "/matchmaker" },
          { labelKey: "leaderboard", href: "/leaderboard" }
        ]
      },
      { labelKey: "forum", href: "/forum", icon: MessageCircle },
      { labelKey: "blog", href: "/blog", icon: BookOpen },
      { labelKey: "about", href: "/about", icon: Info },
      { labelKey: "qa", href: "/contact", icon: PhoneCall }
    ]
  },
  pickleball: {
    id: "pickleball",
    name: "Enjoy Pickleball",
    slogan: "Cộng đồng Pickleball Việt Nam năng động",
    primaryColor: "pink",
    features: {
      booking: true,
      tournaments: true,
      clubs: true,
      races: false,
      ranking: true,
      matchmaker: false
    },
    menuItems: [
      { labelKey: "events", href: "/races", icon: Calendar },
      { labelKey: "tournaments", href: "/tournaments", icon: Trophy },
      {
        labelKey: "clubs",
        href: "/clubs",
        icon: Users,
        children: [
          { labelKey: "clubs_all", href: "/clubs" }
        ]
      },
      {
        labelKey: "play",
        href: "#",
        icon: Trophy,
        children: [
          { labelKey: "courts", href: "/courts" },
          { labelKey: "matchmaker", href: "/matchmaker" },
          { labelKey: "leaderboard", href: "/leaderboard" }
        ]
      },
      { labelKey: "forum", href: "/forum", icon: MessageCircle },
      { labelKey: "blog", href: "/blog", icon: BookOpen },
      { labelKey: "about", href: "/about", icon: Info },
      { labelKey: "qa", href: "/contact", icon: PhoneCall }
    ]
  },
  running: {
    id: "running",
    name: "Enjoy Running",
    slogan: "Hệ thống Đăng ký và Quản lý Giải chạy Marathon",
    primaryColor: "orange",
    features: {
      booking: false,
      tournaments: false,
      clubs: true,
      races: true,
      ranking: true,
      matchmaker: false
    },
    menuItems: [
      { labelKey: "events", href: "/races", icon: Calendar },
      { labelKey: "tournaments", href: "/tournaments", icon: Trophy },
      { labelKey: "clubs", href: "/clubs", icon: Users },
      {
        labelKey: "play",
        href: "#",
        icon: Trophy,
        children: [
          { labelKey: "courts", href: "/courts" },
          { labelKey: "leaderboard", href: "/leaderboard" }
        ]
      },
      { labelKey: "blog", href: "/blog", icon: BookOpen },
      { labelKey: "about", href: "/about", icon: Info },
      { labelKey: "qa", href: "/contact", icon: PhoneCall }
    ]
  },
  football: {
    id: "football",
    name: "Enjoy Football",
    slogan: "Kết nối Sân cỏ & Quản lý Giải đấu League bóng đá",
    primaryColor: "blue",
    features: {
      booking: true,
      tournaments: true,
      clubs: true,
      races: false,
      ranking: true,
      matchmaker: true
    },
    menuItems: [
      { labelKey: "events", href: "/races", icon: Calendar },
      { labelKey: "tournaments", href: "/tournaments", icon: Trophy },
      { labelKey: "clubs", href: "/clubs", icon: Users },
      {
        labelKey: "play",
        href: "#",
        icon: Trophy,
        children: [
          { labelKey: "courts", href: "/courts" },
          { labelKey: "matchmaker", href: "/matchmaker" }
        ]
      },
      { labelKey: "blog", href: "/blog", icon: BookOpen },
      { labelKey: "about", href: "/about", icon: Info },
      { labelKey: "qa", href: "/contact", icon: PhoneCall }
    ]
  },
  tennis: {
    id: "tennis",
    name: "Enjoy Tennis",
    slogan: "Sân chơi & Kết nối Tennis chuyên nghiệp",
    primaryColor: "yellow",
    features: {
      booking: true,
      tournaments: true,
      clubs: true,
      races: false,
      ranking: true,
      matchmaker: true
    },
    menuItems: [
      { labelKey: "events", href: "/races", icon: Calendar },
      { labelKey: "tournaments", href: "/tournaments", icon: Trophy },
      {
        labelKey: "clubs",
        href: "/clubs",
        icon: Users,
        children: [
          { labelKey: "clubs_all", href: "/clubs" }
        ]
      },
      {
        labelKey: "play",
        href: "#",
        icon: Trophy,
        children: [
          { labelKey: "courts", href: "/courts" },
          { labelKey: "matchmaker", href: "/matchmaker" },
          { labelKey: "leaderboard", href: "/leaderboard" }
        ]
      },
      { labelKey: "blog", href: "/blog", icon: BookOpen },
      { labelKey: "about", href: "/about", icon: Info },
      { labelKey: "qa", href: "/contact", icon: PhoneCall }
    ]
  },
  swimming: {
    id: "swimming",
    name: "Enjoy Swimming",
    slogan: "Bể bơi & Trải nghiệm bơi lội đẳng cấp",
    primaryColor: "blue",
    features: {
      booking: true,
      tournaments: true,
      clubs: true,
      races: false,
      ranking: true,
      matchmaker: false
    },
    menuItems: [
      { labelKey: "events", href: "/races", icon: Calendar },
      { labelKey: "tournaments", href: "/tournaments", icon: Trophy },
      {
        labelKey: "clubs",
        href: "/clubs",
        icon: Users,
        children: [
          { labelKey: "clubs_all", href: "/clubs" }
        ]
      },
      {
        labelKey: "play",
        href: "#",
        icon: Trophy,
        children: [
          { labelKey: "courts", href: "/courts" },
          { labelKey: "leaderboard", href: "/leaderboard" }
        ]
      },
      { labelKey: "blog", href: "/blog", icon: BookOpen },
      { labelKey: "about", href: "/about", icon: Info },
      { labelKey: "qa", href: "/contact", icon: PhoneCall }
    ]
  }
};
