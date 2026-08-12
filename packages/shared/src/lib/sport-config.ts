import type { LucideIcon } from "lucide-react";
import { Volleyball } from "lucide-react";

export type SportAccent = "blue" | "green" | "orange" | "purple" | "yellow" | "cyan" | "red" | "teal";

export interface SportConfig {
  name: string;
  slug: string;
  accent: SportAccent;
  icon: LucideIcon;
  tagline: string;
}

export const badmintonConfig: SportConfig = {
  name: "Badminton",
  slug: "badminton",
  accent: "blue",
  icon: Volleyball,
  tagline: "Sẵn sàng giao cầu.",
};

export const SPORT_CONFIG: SportConfig = badmintonConfig;