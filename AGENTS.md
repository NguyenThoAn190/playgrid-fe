<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PLAYGRID FRONTEND — AI AGENT & DEVELOPER BIBLE

Chào mừng AI Coding Agents (Antigravity, Cursor, Claude Code, Windsurf, Copilot, Codex) và các kỹ sư phần mềm đến với codebase **PlayGrid Frontend**.  
Tài liệu này là **nguồn chân lý tối cao (Source of Truth)** về kiến trúc hệ thống, quy chuẩn kỹ thuật, thiết kế giao diện và quy trình phát triển. **Bắt buộc tuân thủ 100% các quy định dưới đây.**

---

## 1. TỔNG QUAN HỆ THỐNG & KIẾN TRÚC MONOREPO

Dự án PlayGrid Frontend được tổ chức dưới dạng **Monorepo** với **Turborepo** và **pnpm workspace (`pnpm@10.33.4`)**, chạy trên môi trường **Node.js >= 20**.

### 1.1. Bản Đồ Phân Vùng Micro-Frontend (Multi-Zone Topology)

Dự án áp dụng mô hình **Multi-Zone Next.js**, trong đó mỗi ứng dụng con là một Next.js App Router độc lập, được tích hợp thông qua Next.js Rewrites và Asset Prefixing:

```
                      ┌────────────────────────────────────────┐
                      │        apps/web (Port 3000)            │
                      │   - Main Public Portal & Landing       │
                      │   - Sports (Badminton, Pickleball,...) │
                      │   - Venues, Tournaments, Clubs         │
                      │   - Leaderboard, SEO, PWA, WebMCP      │
                      └──────────────────┬─────────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 │ Multi-Zone Proxy / Rewrites & Static Routing  │
                 ▼                                               ▼
┌─────────────────────────────────┐             ┌─────────────────────────────────┐
│     apps/account (Port 3003)    │             │     apps/payment (Port 3004)    │
│  - SSO Login / Register / Auth  │             │  - Booking Checkout & Cart      │
│  - User Profile & Settings      │             │  - Ticket Purchase / VietQR     │
│  - Asset Prefix: /account-static│             │  - Asset Prefix: /payment-static│
└─────────────────────────────────┘             └─────────────────────────────────┘

┌─────────────────────────────────┐             ┌─────────────────────────────────┐
│    apps/dashboard (Port 3001)   │             │      apps/admin (Port 3002)     │
│  - Merchant / Venue Owner Panel │             │  - Super Admin Management Panel │
│  - Court & Slot Scheduling      │             │  - System Operations & Audits   │
└─────────────────────────────────┘             └─────────────────────────────────┘
```

#### Bảng Tra Cứu Phân Vùng (Apps Directory):

| Phân Vùng / Ứng Dụng | Đường Dẫn | Port Mặc Định | Asset Prefix | Vai Trò Chính |
| :--- | :--- | :---: | :--- | :--- |
| **`web`** | `apps/web` | `3000` | `/` | Cổng thông tin chính, trang môn thể thao, chi tiết sân bãi, giải đấu, sự kiện, PWA. Tiếp nhận và rewrite các route SSO và Payment. |
| **`account`** | `apps/account` | `3003` | `/account-static` | Xác thực đăng nhập SSO (`/login`, `/register`, `/logout`, `/forgot-password`), thông tin tài khoản người dùng (`/account/*`). |
| **`payment`** | `apps/payment` | `3004` | `/payment-static` | Quy trình đặt sân (`/court`), mua vé giải đấu (`/tournament`), vé sự kiện (`/event`), thanh toán QR và xác nhận đơn hàng. |
| **`dashboard`** | `apps/dashboard` | `3001` | `/` | Bảng điều khiển quản lý sân bãi, lịch đặt và doanh thu dành cho Chủ sân / Câu lạc bộ. |
| **`admin`** | `apps/admin` | `3002` | `/` | Bảng điều khiển quản trị viên hệ sinh thái PlayGrid. |

---

### 1.2. Thư Viện Dùng Chung (Shared Packages)

Toàn bộ logic dùng chung, component giao diện, kiểu dữ liệu và cấu hình được phân tách rõ ràng tại thư mục `packages/`:

```
packages/
├── ui/                   # @workspace/ui: Thư viện UI primitives, styles & theme
│   ├── src/components/   # Button, Input, Card, Select, Badge, Avatar, DropdownMenu...
│   ├── src/styles/       # globals.css (Semantic OKLCH design tokens)
│   └── src/hooks/        # UI-specific hooks
│
├── shared/               # @workspace/shared: Business logic & Services dùng chung
│   ├── src/services/     # axiosConfig, Interceptors, API Handlers (auth, venue, tournament)
│   ├── src/utils/        # sso.ts (SSO cross-app auth helpers), lang.ts, imageResize.ts
│   ├── src/constants/    # domains.ts, tenants.ts, tournaments.ts, cookies.ts, locale.ts
│   ├── src/middlewares/  # bot-detector.ts (anti-scraping honeypot), auth-middleware.ts
│   ├── src/hooks/        # useBreakpoint, useDebounce, useFetch, useToggle, useViewPort
│   └── src/types/        # Global TypeScript types, webmcp declarations
│
├── eslint-config/        # @workspace/eslint-config: Cấu hình ESLint 9 chung
└── typescript-config/    # @workspace/typescript-config: Cấu hình tsconfig chung
```

---

## 2. TECH STACK & CÁC THƯ VIỆN CỐT LÕI

* **Core Framework:** Next.js **16.3.0** (App Router), React **19.2.8**, React DOM **19.2.8**.
* **Ngôn Ngữ:** TypeScript **5.x** (Strict Mode, không dùng `any` bừa bãi).
* **Package Manager:** `pnpm` (`10.33.4`). **Tuyệt đối không dùng `npm` hoặc `yarn`**.
* **CSS & Styling:** **Tailwind CSS v4** (`@tailwindcss/postcss`, `@import "tailwindcss"`), `@import "tw-animate-css"`, `@import "shadcn/tailwind.css"`.
* **Design Tokens & Colors:** Hệ màu chuẩn không gian màu **OKLCH** định nghĩa tại `packages/ui/src/styles/globals.css`.
* **UI Primitives:** `@base-ui/react`, `shadcn`, `class-variance-authority`, `tailwind-merge`, `clsx`.
* **Icons:** **100% SVG Vector** từ `lucide-react`.
* **Đa Ngôn Ngữ (i18n):** `next-intl` (**3.26+**) với cấu trúc routing `/[locale]/...` hỗ trợ `vi` (mặc định) và `en`.
* **HTTP Client:** `axios` với request/response interceptors xử lý SSR token injection và refresh token tự động.
* **Date Manipulation:** `date-fns` v4 và `date-fns-tz`.
* **Cookie Management:** `js-cookie` (Client-side) và `next/headers` `cookies()` (Server-side).

---

## 3. QUY TẮC NEXT.JS 16 & REACT 19 (BẮT BUỘC)

> [!WARNING]
> Next.js 16 và React 19 có nhiều thay đổi cốt lõi (Breaking Changes) so với Next.js 14/15. AI Agent bắt buộc phải nắm vững các điểm sau:

### 3.1. Async Dynamic APIs trong Next.js 16
* **`params` và `searchParams` là Promise:** Trong mọi Server Component (Page, Layout), Route Handler hoặc Middleware, bạn **bắt buộc phải `await` `params` và `searchParams`**:
  ```tsx
  // ✅ ĐÚNG:
  interface PageProps {
    params: Promise<{ locale: string; slug: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }

  export default async function VenueDetailPage({ params, searchParams }: PageProps) {
    const { locale, slug } = await params;
    const search = await searchParams;
    // ...
  }

  // ❌ SAI (Gây lỗi runtime / cảnh báo type):
  export default function VenueDetailPage({ params }: { params: { slug: string } }) {
    const slug = params.slug; // LỖI!
  }
  ```
* **Async Headers & Cookies:** `cookies()` và `headers()` từ `next/headers` phải được `await`:
  ```tsx
  // ✅ ĐÚNG:
  import { cookies } from "next/headers";
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  ```

### 3.2. Cấu Trúc `proxy.ts` Thay Cho `middleware.ts`
* Các ứng dụng sử dụng tệp `proxy.ts` tại thư mục gốc của app để tích hợp bot detection, honeypot trap và `next-intl/middleware`.
* Khi tạo middleware mới hoặc tùy biến route interceptor, tuân thủ xuất khẩu `export default function proxy(request: NextRequest)` và `export const config = { matcher: [...] }`.

### 3.3. Quy Tắc React 19 & Hooks
* **Cấm gọi `setState` đồng bộ trong thân `useEffect` (`react-hooks/set-state-in-effect`):**
  ```tsx
  // ❌ SAI:
  useEffect(() => {
    if (!token) {
      setIsChecking(false); // LỖI GÂY CASCADING RE-RENDERS
    }
  }, [token]);

  // ✅ ĐÚNG:
  // Tính toán trực tiếp từ state/props hoặc đưa vào hàm xử lý bất đồng bộ/callback
  const isChecking = !token ? false : checkingState;
  ```
* **Ưu tiên Server Components (RSC):** Mọi component mặc định là Server Component. Chỉ thêm directive `'use client'` khi thực sự cần: state (`useState`), effect (`useEffect`), event handlers (`onClick`, `onChange`) hoặc custom client hooks.

---

## 4. QUY CHUẨN DESIGN SYSTEM & GIAO DIỆN (DESIGN SYSTEM STANDARD)

> [!IMPORTANT]
> Toàn bộ giao diện phải tuân thủ nghiêm ngặt cẩm nang `docs/DESIGN_SYSTEM_STANDARD.md`.

### 4.1. Hệ Màu Ngữ Nghĩa 100% OKLCH (Semantic Tokens Only)

Tuyệt đối **KHÔNG** dùng mã màu Hex cố định (`#0363FE`, `#1e293b`) hoặc màu Tailwind trần (`text-black`, `bg-white`, `text-gray-900`) vì sẽ làm hỏng khả năng hiển thị Dark Mode / Light Mode.

| Semantic Token | Tailwind Class | Mục Đích Sử Dụng |
| :--- | :--- | :--- |
| `--background` | `bg-background` | Nền chính của toàn trang web |
| `--foreground` | `text-foreground` | Màu chữ chính, tiêu đề H1/H2, tên mục quan trọng |
| `--card` / `--card-foreground` | `bg-card`, `text-card-foreground` | Nền và chữ bên trong các khối thẻ Card |
| `--muted` / `--muted-foreground` | `bg-muted`, `text-muted-foreground` | Nền phụ, sub-box, mô tả ngắn, meta data ngày giờ |
| `--border` | `border-border/80`, `border-border/60` | Đường viền mỏng ngăn cách giữa các khối |
| `--primary` / `--primary-foreground` | `bg-primary`, `text-primary` | Màu thương hiệu chủ đạo (Xanh năng động) |
| `--gradient-primary` | `bg-gradient-primary text-white` | Gradient nhận diện độc quyền cho nút CTA chính |
| `--text-gradient-primary` | `text-gradient-primary` | Hiệu ứng chữ đổi màu nhận diện PlayGrid |
| `--accent` | `bg-accent`, `text-accent-foreground` | Trạng thái hover tương tác, chip nổi bật |
| `--destructive` | `bg-destructive`, `text-destructive` | Nút cảnh báo, lỗi, trạng thái hết chỗ |

### 4.2. Chuẩn Mực Typography Tiếng Việt (Vietnamese Typography)
1. **Phông chữ:** `Inter` (Google Fonts) hỗ trợ subset `latin` và `vietnamese`.
2. **Trọng số cho phép:**
   * `font-normal` (400): 100% đoạn văn bản mô tả, thể lệ, nội dung chi tiết, meta data.
   * `font-medium` (500): Nhãn form, nhãn thông số, tiêu đề cột bảng.
   * `font-semibold` (600): Tiêu đề thẻ Card (H3), huy hiệu (Badges), tên người dùng.
   * `font-bold` (700): Tiêu đề trang (H1), tiêu đề phân mục lớn (H2), nút CTA chính, chỉ số KPI/Giá tiền.
3. 🚫 **CẤM DÙNG `font-extrabold` (800) & `font-black` (900):** Font quá đậm làm dính nét dấu tiếng Việt (sắc, huyền, hỏi, ngã, nặng) và khiến giao diện thô ráp.
4. 🚫 **CẤM DÙNG `uppercase` (ALL-CAPS):** Luôn dùng **Title Case** hoặc **Sentence Case** cho tiêu đề, nhãn thẻ và nút bấm.

### 4.3. Biểu Tượng & Đồ Họa (Icons Standard)
* 🚫 **CẤM DÙNG emoji màu lòe loẹt trực tiếp trong UI:** Không chèn `🔥`, `🏆`, `🏸`, `🚗`, `👥`, `⭐`, `⚡` vào tiêu đề hay nút bấm.
* ✅ **100% sử dụng Vector SVG Monochrome từ `lucide-react`:**
  * Kích thước chuẩn: Nhỏ (`w-3.5 h-3.5`), Tiêu chuẩn (`w-4 h-4`), Section Header (`w-5 h-5`).
  * Sử dụng màu ngữ nghĩa: `text-primary`, `text-muted-foreground`, `text-amber-500`, `text-emerald-500`.

### 4.4. Container, Viền & Đổ Bóng (Cards & Shadows)
* Thẻ Card chính: `rounded-2xl sm:rounded-3xl border border-border/80 bg-card shadow-2xs p-4 sm:p-6`.
* Khối con / Sub-box: `rounded-xl sm:rounded-2xl border border-border/70 bg-muted/30 p-3.5 sm:p-5`.
* 🚫 **CẤM đổ bóng đậm:** Không dùng `shadow-lg`, `shadow-xl`, `shadow-2xl`. Ưu tiên bóng vi mô `shadow-2xs` và `shadow-xs`.
* 🚫 **CẤM viền quá dày:** Không dùng `border-2`, `border-4` trên thẻ Card.

---

## 5. QUY ƯỚC CODE, IMPORT & TỔ CHỨC THƯ MỤC

### 5.1. Quy Ước Import Từ Workspace Packages
Luôn ưu tiên import từ các package nội bộ thay vì viết lại:
```tsx
// UI Components & Base Styles:
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card";

// Shared Services, Utilities & Constants:
import apiClient, { serverApiClient } from "@workspace/shared/services/axiosConfig";
import { getLoginUrl, getRegisterUrl, clearAuthCookies } from "@workspace/shared/utils/sso";
import { APP_DOMAINS, getAppUrls } from "@workspace/shared/constants/domains";
import { useBreakpoint } from "@workspace/shared/hooks/useBreakpoint";
```

### 5.2. Điều Hướng & Link (i18n Navigation)
* **Bắt buộc:** Luôn import `Link`, `useRouter`, `usePathname`, `redirect` từ `@/i18n/navigation` của ứng dụng hiện tại để tự động đính kèm locale prefix (`/vi/...`, `/en/...`).
* **Cấm:** Không dùng `import Link from "next/link"` trực tiếp cho các route nội bộ.

### 5.3. Tối Ưu Hình Ảnh (Next.js Image)
* Luôn sử dụng `<Image />` từ `next/image` có thuộc tính `alt`, `width`, `height` hoặc `fill` kèm `sizes`.
* **Cấm:** Không dùng thẻ `<img>` trần trong các component giao diện người dùng.

---

## 6. XÁC THỰC SSO & QUẢN LÝ PHIÊN (CROSS-APP AUTHENTICATION)

1. **Shared Cookie Session:**
   * Các cookie phiên làm việc: `access_token`, `refresh_token`, `user_info`, `playgrid_theme`.
   * Cấu hình chung domain để chia sẻ phiên liền mạch giữa `web` (3000), `account` (3003), `payment` (3004), `dashboard` (3001) và `admin` (3002).
2. **SSO Helper Functions (`@workspace/shared/utils/sso`):**
   * `getLoginUrl(returnUrl, locale)`: Tạo URL chuyển hướng đăng nhập kèm callback URL.
   * `getRegisterUrl(returnUrl, locale)`: Tạo URL chuyển hướng đăng ký.
   * `clearAuthCookies()`: Xóa sạch phiên xác thực khi đăng xuất.

---

## 7. QUY TRÌNH PHÁT TRIỂN & CÁC LỆNH LÀM VIỆC (COMMANDS)

Tất cả các lệnh bắt buộc phải chạy qua **`pnpm`** từ thư mục gốc của repository:

### 7.1. Chạy Dự Án Cục Bộ (Local Development)
```bash
# Chạy đồng thời tất cả các ứng dụng trong monorepo
pnpm dev

# Chạy riêng từng ứng dụng:
pnpm --filter web dev        # Cổng thông tin chính (Port 3000)
pnpm --filter account dev    # Phân vùng SSO & Tài khoản (Port 3003)
pnpm --filter payment dev    # Phân vùng Thanh toán (Port 3004)
pnpm --filter dashboard dev  # Phân vùng Chủ sân (Port 3001)
pnpm --filter admin dev      # Phân vùng Quản trị (Port 3002)
```

### 7.2. Kiểm Tra Lỗi & Build (Quality Assurance)
```bash
# Kiểm tra toàn bộ Type Safety bằng TypeScript compiler
pnpm run typecheck

# Kiểm tra quy chuẩn mã nguồn bằng ESLint
pnpm run lint

# Định dạng mã nguồn chuẩn với Prettier
pnpm run format

# Build bundle phục vụ production
pnpm run build
```

---

## 8. BẢNG CHECKLIST 10 ĐIỀU CẤM KỴ (ANTI-PATTERNS BAN LIST)

| STT | ❌ TUYỆT ĐỐI CẤM (Anti-Patterns) | ✅ GIẢI PHÁP BẮT BUỘC (Best Practice) |
| :---: | :--- | :--- |
| **1** | Hardcode mã màu Hex (`#0363FE`) hoặc màu Tailwind trần (`text-black`, `bg-white`) | Dùng 100% **Semantic OKLCH Tokens** (`bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `border-border/80`) |
| **2** | Chèn Emoji màu (`🔥`, `🏆`, `🏸`, `🚗`) vào UI | Dùng vector SVG từ **`lucide-react`** (`Flame`, `Trophy`, `Users`) |
| **3** | Dùng `font-extrabold` (800) hoặc `font-black` (900) | Giới hạn trọng số: `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700) |
| **4** | Viết hoa toàn bộ (`uppercase`, ALL-CAPS) trên tiêu đề/nút | Dùng **Title Case** hoặc **Sentence Case** |
| **5** | Đọc `params` / `searchParams` / `cookies()` đồng bộ trong Next 16 | Luôn dùng **`await params`**, **`await searchParams`**, **`await cookies()`** |
| **6** | Import `next/link` trực tiếp | Luôn import `Link` từ **`@/i18n/navigation`** |
| **7** | Dùng thẻ `<img>` HTML trần | Luôn dùng **`<Image />`** từ `next/image` |
| **8** | Đổ bóng quá đậm (`shadow-lg`, `shadow-xl`, `shadow-2xl`) | Dùng vi đổ bóng tinh tế **`shadow-2xs`** hoặc **`shadow-xs`** |
| **9** | Viền card quá dày (`border-2`, `border-4`) | Dùng viền thanh mảnh **`border border-border/80`** |
| **10**| Dùng `npm` hoặc `yarn` để cài đặt gói | **100% sử dụng `pnpm`** (`pnpm add`, `pnpm install`) |

