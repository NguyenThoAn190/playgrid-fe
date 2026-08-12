export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "ghost" | "link" | "success" | "warning" | "danger" | "info" | "muted" | string;

export interface Transaction {
  id: string;
  customer: string;
  type: "Booking" | "Tournament" | "Club";
  amount: number;
  status: "success" | "pending" | "failed";
  date: string;
}

export const transactions: Transaction[] = [
  {
    id: "TXN-2401",
    customer: "Nguyen Van A",
    type: "Booking",
    amount: 480000,
    status: "success",
    date: "02/07/2026",
  },
  {
    id: "TXN-2402",
    customer: "Tran Thi B",
    type: "Tournament",
    amount: 1200000,
    status: "success",
    date: "02/07/2026",
  },
  {
    id: "TXN-2403",
    customer: "Le Van C",
    type: "Booking",
    amount: 320000,
    status: "pending",
    date: "02/07/2026",
  },
  {
    id: "TXN-2404",
    customer: "Pham Thi D",
    type: "Club",
    amount: 2500000,
    status: "success",
    date: "01/07/2026",
  },
  {
    id: "TXN-2405",
    customer: "Hoang Van E",
    type: "Booking",
    amount: 540000,
    status: "failed",
    date: "01/07/2026",
  },
  {
    id: "TXN-2406",
    customer: "Vu Thi F",
    type: "Tournament",
    amount: 880000,
    status: "success",
    date: "01/07/2026",
  },
  {
    id: "TXN-2407",
    customer: "Dao Van G",
    type: "Booking",
    amount: 420000,
    status: "success",
    date: "30/06/2026",
  },
  {
    id: "TXN-2408",
    customer: "Bui Thi H",
    type: "Club",
    amount: 1800000,
    status: "pending",
    date: "30/06/2026",
  },
  {
    id: "TXN-2409",
    customer: "Do Van I",
    type: "Booking",
    amount: 360000,
    status: "success",
    date: "30/06/2026",
  },
  {
    id: "TXN-2410",
    customer: "Ly Thi K",
    type: "Tournament",
    amount: 2100000,
    status: "success",
    date: "29/06/2026",
  },
];

export const statusBadgeMap: Record<
  Transaction["status"],
  { label: string; variant: BadgeVariant }
> = {
  success: { label: "Thanh cong", variant: "success" },
  pending: { label: "Cho xu ly", variant: "warning" },
  failed: { label: "That bai", variant: "danger" },
};

export const typeBadgeMap: Record<
  Transaction["type"],
  { label: string; variant: BadgeVariant }
> = {
  Booking: { label: "Dat san", variant: "info" },
  Tournament: { label: "Giai dau", variant: "secondary" },
  Club: { label: "CLB", variant: "muted" },
};

export function formatVND(value: number): string {
  return value.toLocaleString("vi-VN") + "d";
}