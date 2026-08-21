<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PLAYGRID WEB PORTAL — AGENT & DEVELOPER BIBLE (`apps/web`)

> **Phân vùng:** `apps/web`  
> **Port:** `3000` | **Asset Prefix:** `/`  
> **Vai trò:** Cổng thông tin chính, trang môn thể thao, chi tiết sân bãi, giải đấu, sự kiện, câu lạc bộ, bảng xếp hạng, PWA, SEO & WebMCP.

---

## 1. TỔNG QUAN PHÂN VÙNG `apps/web`

`apps/web` là cổng giao diện công khai chính của toàn bộ hệ sinh thái PlayGrid. Ứng dụng này tiếp nhận người dùng, thực hiện multi-language routing (`next-intl`), lọc bot độc hại (`proxy.ts`), và đảm nhận vai trò **Reverse Proxy / Rewriter** chuyển hướng lưu lượng người dùng sang các phân vùng `apps/account` (Port 3003) và `apps/payment` (Port 3004).

### 1.1. Cấu Trúc Thư Mục Chính
```
apps/web/
├── app/
│   ├── [locale]/             # Next-intl localized pages (/vi, /en)
│   │   ├── (sports)/         # Dynamic sports portals (/badminton, /pickleball...)
│   │   ├── venue/[slug]/     # Venue detail & booking entry
│   │   ├── tournaments/      # Tournament listing & tournament details
│   │   ├── events/           # Event listing & overview
│   │   ├── clubs/            # Sport clubs directory
│   │   ├── leaderboard/      # Ranking & Elo leaderboards
│   │   ├── activities/       # Community matches & open games
│   │   ├── contact/          # Support & FAQ center
│   │   ├── blog/             # Sports news & guides
│   │   ├── layout.tsx        # Root locale layout with Header, Footer, Providers
│   │   └── page.tsx          # Main Landing Page
│   ├── api/                  # Internal BFF routes & webmcp endpoints
│   ├── manifest.ts           # PWA Web Manifest
│   └── proxy.ts              # Anti-bot honeypot + next-intl middleware
├── components/               # Domain-specific web components
│   ├── home/                 # Hero, SportSelector, FeaturedVenues, CTA
│   ├── sports/               # Sport-specific hero banners & filter pods
│   ├── venue/                # Court grid, amenities, pricing, reviews
│   ├── tournaments/          # Brackets, prize pool, player lists
│   ├── events/               # Schedule, speakers, ticket tier badges
│   ├── navbar/               # Global navigation & mobile menu
│   └── footer/               # Global footer & legal links
├── lib/                      # Mock data providers, SEO helpers & utils
├── messages/                 # vi.json, en.json translation dictionaries
└── next.config.ts            # Multi-zone rewrites & Turbopack aliases
```

---

## 2. MULTI-ZONE REWRITES & ROUTING RULES

`apps/web` proxy các route sau sang các ứng dụng vệ tinh:

| Đường Dẫn Người Dùng | Ứng Dụng Đích | Port | Chức Năng |
| :--- | :--- | :---: | :--- |
| `/:locale/login`, `/:locale/register` | `apps/account` | `3003` | Trang đăng nhập / đăng ký SSO |
| `/:locale/logout`, `/:locale/forgot-password` | `apps/account` | `3003` | Đăng xuất và khôi phục mật khẩu |
| `/:locale/account`, `/:locale/account/:path*` | `apps/account` | `3003` | Hồ sơ người dùng & Cài đặt |
| `/account-static/*` | `apps/account` | `3003` | JS/CSS Chunks & Assets của account |
| `/:locale/payment`, `/:locale/payment/:path*` | `apps/payment` | `3004` | Cổng thanh toán & QR code |
| `/:locale/checkout`, `/:locale/checkout/:path*` | `apps/payment` | `3004` | Giỏ hàng & xác nhận đặt chỗ |
| `/payment-static/*` | `apps/payment` | `3004` | JS/CSS Chunks & Assets của payment |

---

## 3. QUY TẮC NEXT.JS 16 & REACT 19 TRONG `apps/web`

1. **Async Dynamic Parameters:**
   * Mọi Page/Layout nhận `params` và `searchParams` đều phải khai báo kiểu `Promise` và dùng `await`:
   ```tsx
   interface PageProps {
     params: Promise<{ locale: string; slug: string }>;
     searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
   }

   export default async function VenuePage({ params, searchParams }: PageProps) {
     const { locale, slug } = await params;
     const query = await searchParams;
     // ...
   }
   ```
2. **Proxy Filter (`proxy.ts`):**
   * Tất cả request đi qua `detectBot()` và kiểm tra cookie `pg_bot_flag`.
   * Các asset rewrite `/account-static` và `/payment-static` được loại trừ trong `config.matcher`.
3. **i18n Navigation:**
   * Bắt buộc dùng `Link`, `useRouter`, `usePathname` từ `@/i18n/navigation`. Không dùng `next/link`.

---

## 4. DESIGN SYSTEM & GIAO DIỆN (100% OKLCH SEMANTIC)

* **Màu sắc:** Sử dụng Semantic Tokens từ `@workspace/ui` (`bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `border-border/80`, `bg-primary`, `bg-gradient-primary`).
* **Typography:** Font `Inter`, trọng số 400, 500, 600, 700. **CẤM `font-extrabold` (800) và `font-black` (900)**. Cấm `uppercase` (ALL-CAPS).
* **Icons:** 100% monochrome SVG từ `lucide-react`. Cấm dùng emoji màu lòe loẹt trong UI.
* **Đổ bóng & Bo góc:** `rounded-2xl` / `rounded-3xl`, vi đổ bóng `shadow-2xs` (không dùng `shadow-lg`/`shadow-2xl`).
* **Hình ảnh:** Bắt buộc dùng `<Image />` từ `next/image` với `remotePatterns` hợp lệ (images.unsplash.com).

---

## 5. LỆNH PHÁT TRIỂN (COMMANDS)

```bash
# Chạy dev server cho web portal (Port 3000)
pnpm --filter web dev

# Typecheck & Lint riêng cho apps/web
pnpm --filter web typecheck
pnpm --filter web lint

# Build production bundle
pnpm --filter web build
```

