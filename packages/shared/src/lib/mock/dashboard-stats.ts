import { Trophy, Users, MapPin, Activity } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface StatMetric {
  label: string;
  value: string;
  delta: number; // percentage change vs last period
  icon: LucideIcon;
  sparkline: number[];
  realtime?: boolean;
}

export const dashboardStats: StatMetric[] = [
  {
    label: "Nguoi choi",
    value: "12,847",
    delta: 12.5,
    icon: Users,
    sparkline: [8, 12, 10, 14, 18, 16, 22, 20, 25, 28, 26, 32],
    realtime: true,
  },
  {
    label: "San hoat dong",
    value: "486",
    delta: 8.2,
    icon: MapPin,
    sparkline: [20, 22, 24, 23, 25, 28, 26, 29, 30, 32, 31, 34],
  },
  {
    label: "Tran dau",
    value: "2,341",
    delta: 18.4,
    icon: Activity,
    sparkline: [40, 45, 50, 48, 55, 60, 58, 65, 70, 68, 75, 80],
    realtime: true,
  },
  {
    label: "Giai dau",
    value: "47",
    delta: -2.1,
    icon: Trophy,
    sparkline: [12, 14, 13, 15, 14, 16, 18, 17, 16, 18, 19, 20],
  },
];