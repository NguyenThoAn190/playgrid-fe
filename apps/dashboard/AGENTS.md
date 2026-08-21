<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PLAYGRID MERCHANT DASHBOARD — AGENT & DEVELOPER BIBLE (`apps/dashboard`)

> **Phân vùng:** `apps/dashboard`  
> **Port:** `3001` | **Asset Prefix:** `/`  
> **Vai trò:** Bảng điều khiển quản lý sân bãi, lịch đặt ca sân, quản lý hội viên, giá theo khung giờ và phân tích doanh thu dành cho Chủ sân / Câu lạc bộ.

---

## 1. TỔNG QUAN PHÂN VÙNG `apps/dashboard`

`apps/dashboard` là cổng quản trị dành riêng cho các đối tác Chủ sân (Venue Owners), Quản lý câu lạc bộ (Club Managers) và Ban tổ chức sự kiện thể thao. Ứng dụng cung cấp các công cụ quản lý lịch thi đấu, ma trận ca sân (Court Scheduler), điều chỉnh bảng giá theo giờ cao điểm/thấp điểm và theo dõi báo cáo doanh thu theo thời gian thực.

### 1.1. Cấu Trúc Thư Mục
```
apps/dashboard/
├── app/
│   ├── [locale]/             # Next-intl localized dashboard routes
│   │   ├── auth/             # Merchant login & partner onboarding
│   │   ├── layout.tsx        # Dashboard sidebar layout & topbar
│   │   └── page.tsx          # Merchant KPI dashboard & recent bookings
│   ├── manifest.ts           # PWA Web Manifest
│   └── proxy.ts              # next-intl middleware for dashboard
├── components/               # Court scheduler grids, metric cards, charts, booking tables
├── messages/                 # vi.json, en.json translation dictionaries
└── next.config.ts            # Next.js 16 config & transpilePackages
```

---

## 2. QUY CHUẨN NGHIỆP VỤ CHỦ SÂN (MERCHANT DOMAIN)

1. **Ma trận ca sân (Court Grid / Slot Scheduler):**
   * Hiển thị trực quan trạng thái từng sân: *Đã đặt*, *Trống*, *Đang giữ chỗ*, *Khóa bảo trì*.
   * Hỗ trợ kéo thả (drag-and-drop) hoặc click đặt chỗ nhanh cho khách vãng lai (walk-in).
2. **Quản lý bảng giá linh hoạt (Dynamic Pricing):**
   * Cấu hình giá khác nhau theo: Khung giờ vàng (17h - 21h), ngày thường vs cuối tuần, ngày lễ.
3. **Báo cáo & Phân tích (Analytics & Metrics):**
   * Chỉ số lấp đầy sân (Occupancy Rate), Doanh thu theo ngày/tháng, Khách hàng thân thiết.

---

## 3. QUY TẮC NEXT.JS 16 & REACT 19 TRONG `apps/dashboard`

1. **Async Dynamic APIs:**
   * Trong Server Components, `params` và `searchParams` là Promise (`await params`, `await searchParams`).
2. **Xác thực phiên Merchant:**
   * Kiểm tra `access_token` và quyền sở hữu sân (tenant/venue owner role) từ cookie SSO.
3. **i18n Navigation:**
   * Luôn dùng `Link`, `useRouter`, `usePathname` từ `@/i18n/navigation`.

---

## 4. DESIGN SYSTEM & GIAO DIỆN

* **100% Semantic OKLCH Tokens:** `bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `border-border/80`, `bg-primary`, `bg-gradient-primary`.
* **Thẻ chỉ số KPI chuẩn (Stat Cards):**
  * Nền `bg-card`, viền mỏng `border-border/80`, bo góc `rounded-2xl`, bóng vi mô `shadow-2xs`.
  * Tiêu đề chỉ số: `text-xs font-medium text-muted-foreground`.
  * Con số KPI: `text-2xl sm:text-3xl font-bold text-foreground`.
* **Typography:** Font `Inter`, weights 400–700. Cấm `font-extrabold` (800) / `font-black` (900), cấm `uppercase` (ALL-CAPS).
* **Icons:** 100% SVG Vector từ `lucide-react` (`LayoutDashboard`, `CalendarDays`, `Users`, `DollarSign`, `Clock`).

---

## 5. LỆNH PHÁT TRIỂN (COMMANDS)

```bash
# Chạy dev server cho Merchant Dashboard (Port 3001)
pnpm --filter dashboard dev

# Typecheck & Lint riêng cho apps/dashboard
pnpm --filter dashboard typecheck
pnpm --filter dashboard lint

# Build production bundle
pnpm --filter dashboard build
```
