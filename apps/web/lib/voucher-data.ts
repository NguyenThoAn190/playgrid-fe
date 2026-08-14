export interface VoucherItem {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: "fixed" | "percentage";
  discountValue: number; // e.g. 50000 (VND) or 10 (%)
  maxDiscount?: number; // max cap for percentage discount
  minOrderValue: number; // minimum subtotal required
  applicableCategory: "event" | "venue" | "all";
  expiryDate: string;
  badge?: string;
  isPopular?: boolean;
}

export const MOCK_USER_VOUCHERS: VoucherItem[] = [
  {
    id: "vch-1",
    code: "PLAYGRID50",
    title: "Voucher Chào Bạn Mới",
    description: "Giảm 50.000đ cho đơn đăng ký sự kiện hoặc đặt sân bất kỳ",
    discountType: "fixed",
    discountValue: 50000,
    minOrderValue: 200000,
    applicableCategory: "all",
    expiryDate: "30/09/2026",
    badge: "MỚI NHẬN",
    isPopular: true,
  },
  {
    id: "vch-2",
    code: "RACEDAY100",
    title: "Ưu Đãi Giải Đấu Mùa Hè",
    description: "Giảm 100.000đ cho vé giải đấu (Aquathlon / Triathlon / Marathon)",
    discountType: "fixed",
    discountValue: 100000,
    minOrderValue: 450000,
    applicableCategory: "event",
    expiryDate: "15/09/2026",
    badge: "HOT DEAL",
    isPopular: true,
  },
  {
    id: "vch-3",
    code: "EARLYBIRD",
    title: "Vận Động Viên Tiên Phong",
    description: "Giảm 100.000đ khi đăng ký các giải đấu thể thao giai đoạn Early Bird",
    discountType: "fixed",
    discountValue: 100000,
    minOrderValue: 400000,
    applicableCategory: "event",
    expiryDate: "31/08/2026",
    badge: "SẮP HẾT HẠN",
  },
  {
    id: "vch-4",
    code: "VIPATHLETE15",
    title: "Đặc Quyền Thành Viên PlayGrid VIP",
    description: "Giảm 15% (tối đa 150.000đ) cho toàn bộ vé tham gia giải đấu",
    discountType: "percentage",
    discountValue: 15,
    maxDiscount: 150000,
    minOrderValue: 600000,
    applicableCategory: "event",
    expiryDate: "31/12/2026",
    badge: "VIP ONLY",
  },
  {
    id: "vch-5",
    code: "PLAYGRIDTEAM200",
    title: "Ưu Đãi Nhóm Thi Đấu",
    description: "Giảm 200.000đ cho đơn đăng ký nhiều vé hoặc đội nhóm",
    discountType: "fixed",
    discountValue: 200000,
    minOrderValue: 1500000,
    applicableCategory: "event",
    expiryDate: "31/10/2026",
    badge: "ĐỘI NHÓM",
  },
];

/**
 * Calculate actual discount amount from a voucher
 */
export function calculateVoucherDiscount(voucher: VoucherItem, subtotal: number): number {
  if (subtotal < voucher.minOrderValue) return 0;

  if (voucher.discountType === "fixed") {
    return Math.min(voucher.discountValue, subtotal);
  }

  if (voucher.discountType === "percentage") {
    const rawDiscount = (subtotal * voucher.discountValue) / 100;
    if (voucher.maxDiscount) {
      return Math.min(rawDiscount, voucher.maxDiscount);
    }
    return rawDiscount;
  }

  return 0;
}
