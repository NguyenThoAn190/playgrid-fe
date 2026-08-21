@AGENTS.md

# CLAUDE CODE GUIDE — PLAYGRID PAYMENT & BOOKING (`apps/payment`)

> **Port:** `3004` | **Asset Prefix:** `/payment-static` | **Vai trò:** Booking & Checkout Engine

---

## ⚡ QUICK COMMANDS
```bash
pnpm --filter payment dev          # Chạy dev server (Port 3004)
pnpm --filter payment typecheck    # Kiểm tra TypeScript type safety
pnpm --filter payment lint         # Chạy ESLint
pnpm --filter payment build        # Build production bundle
```

---

## 🛡️ ESSENTIAL RULES FOR `apps/payment`
1. **Asset Prefix:** Phân vùng này sử dụng `assetPrefix: "/payment-static"`. Mọi resource static phải qua prefix `/payment-static`.
2. **Booking & Orders:** Đọc `bookingId`, `orderId` qua `await searchParams` trong Next.js 16.
3. **VietQR Flow:** Đảm bảo mã QR và thông tin chuyển khoản chuẩn xác, hỗ trợ nút bấm copy STK, Số tiền và Nội dung.
4. **Design System:** 100% OKLCH Semantic tokens (`bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `border-border/80`, `bg-gradient-primary`). Cấm hardcode màu hex.
5. **Typography & Icons:** Font `Inter` (weights 400-700 only, cấm 800/900 và ALL-CAPS). 100% monochrome SVG từ `lucide-react`.
