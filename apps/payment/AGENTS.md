<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PLAYGRID PAYMENT & BOOKING — AGENT & DEVELOPER BIBLE (`apps/payment`)

> **Phân vùng:** `apps/payment`  
> **Port:** `3004` | **Asset Prefix:** `/payment-static`  
> **Vai trò:** Cổng thanh toán, luồng đặt sân thể thao, mua vé giải đấu/sự kiện/concert, tích hợp VietQR và xác nhận đơn hàng thành công.

---

## 1. TỔNG QUAN PHÂN VÙNG `apps/payment`

`apps/payment` là phân vùng micro-frontend độc lập phụ trách toàn bộ quy trình thanh toán (Checkout flow), xử lý giỏ hàng, đặt ca sân thể thao (`court`), đăng ký vé giải đấu (`tournament`), vé sự kiện (`event`), vé ca nhạc (`concert`) và thanh toán vãng lai (`walk-in`). Ứng dụng tích hợp chuẩn thanh toán VietQR động, bộ đếm ngược thời gian giữ chỗ và hiệu ứng ăn mừng `canvas-confetti`.

### 1.1. Cấu Trúc Thư Mục
```
apps/payment/
├── app/
│   ├── [locale]/             # Next-intl localized checkout pages
│   │   ├── court/            # Sports court booking checkout & slot lock
│   │   ├── tournament/       # Tournament entry registration & ticket tiers
│   │   ├── event/            # General event ticket purchasing
│   │   ├── concert/          # Concert & show ticket checkout
│   │   ├── walk-in/          # Walk-in / fast payment on-site
│   │   ├── success/          # Order confirmation, invoice & confetti celebration
│   │   ├── layout.tsx        # Payment layout with trust badges & security indicators
│   │   └── page.tsx          # General checkout dashboard & cart overview
│   ├── api/                  # VietQR generator, payment webhook, transaction polling
│   └── proxy.ts              # next-intl middleware for payment
├── components/               # VietQR card, countdown timer, slot summary, confetti trigger
├── messages/                 # vi.json, en.json translation dictionaries
└── next.config.ts            # assetPrefix: '/payment-static' & rewrites
```

---

## 2. QUY TRÌNH THANH TOÁN & BẢO MẬT (PAYMENT WORKFLOW)

1. **Khóa ca sân / Giữ chỗ (Slot Locking):**
   * Khi người dùng vào trang thanh toán, hệ thống thiết lập bộ đếm ngược giữ chỗ (thường là 10–15 phút).
   * Hiển thị cảnh báo trực quan khi thời gian sắp hết (`text-amber-500` / `text-rose-500`).
2. **VietQR Dynamic Generator:**
   * Sinh mã QR chuẩn VietQR (NapAS 247) chứa thông tin chuyển khoản chính xác: Số tài khoản, Ngân hàng, Số tiền, Mã giao dịch định danh duy nhất.
   * Cung cấp nút sao chép nhanh (Copy STK, Copy Số tiền, Copy Cú pháp chuyển khoản) kèm toast thông báo.
3. **Màn hình thành công (`/success`):**
   * Kích hoạt hiệu ứng pháo hoa `canvas-confetti` chúc mừng.
   * Hiển thị mã vé điện tử QR Code để quét tại quầy lễ tân sân bãi.

---

## 3. QUY TẮC NEXT.JS 16 & REACT 19 TRONG `apps/payment`

1. **Async SearchParams & Params:**
   * Đọc `bookingId`, `orderId`, `type` từ `await searchParams` trong Server Components:
   ```tsx
   interface PageProps {
     params: Promise<{ locale: string }>;
     searchParams: Promise<{ bookingId?: string; orderId?: string }>;
   }

   export default async function CourtCheckoutPage({ params, searchParams }: PageProps) {
     const { locale } = await params;
     const { bookingId } = await searchParams;
     // ...
   }
   ```
2. **Asset Prefix:**
   * Sử dụng `assetPrefix: '/payment-static'` để tải đúng các JS/CSS chunks khi được proxy qua `apps/web`.

---

## 4. DESIGN SYSTEM & GIAO DIỆN

* **100% Semantic OKLCH Tokens:** `bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `border-border/80`, `bg-primary`, `bg-gradient-primary`, `bg-destructive`.
* **Trạng thái giao dịch:**
  * Còn hạn / Chờ thanh toán: `text-amber-700 dark:text-amber-300 bg-amber-500/15 border-amber-500/20`
  * Thanh toán thành công: `text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border-emerald-500/20`
  * Hết hạn / Hủy: `text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20`
* **Typography:** Font `Inter`, weights 400–700. Cấm `font-extrabold` (800) / `font-black` (900), cấm `uppercase` (ALL-CAPS).
* **Icons:** 100% SVG Vector từ `lucide-react` (`CreditCard`, `QrCode`, `Timer`, `CheckCircle2`, `ShieldCheck`). Cấm emoji màu.

---

## 5. LỆNH PHÁT TRIỂN (COMMANDS)

```bash
# Chạy dev server cho Payment & Checkout (Port 3004)
pnpm --filter payment dev

# Typecheck & Lint riêng cho apps/payment
pnpm --filter payment typecheck
pnpm --filter payment lint

# Build production bundle
pnpm --filter payment build
```
