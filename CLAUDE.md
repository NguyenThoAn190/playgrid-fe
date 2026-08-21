@AGENTS.md

# CLAUDE CODE GUIDE — PLAYGRID FRONTEND

Tài liệu hướng dẫn nhanh dành cho Claude Code CLI và các mô hình Claude khi làm việc trên monorepo **PlayGrid Frontend**.  
Chi tiết kiến trúc đầy đủ xem tại [AGENTS.md](file:///home/annt/Workspace/PlayGrid/fe/playgrid-fe/AGENTS.md) và [docs/DESIGN_SYSTEM_STANDARD.md](file:///home/annt/Workspace/PlayGrid/fe/playgrid-fe/docs/DESIGN_SYSTEM_STANDARD.md).

---

## ⚡ QUICK COMMAND REFERENCE

Tất cả lệnh chạy qua **`pnpm` (`10.33.4`)**:

```bash
# === TOÀN BỘ MONOREPO ===
pnpm dev                       # Chạy dev server toàn bộ apps
pnpm run typecheck             # Kiểm tra TypeScript type correctness
pnpm run lint                  # Kiểm tra ESLint
pnpm run format                # Định dạng code với Prettier
pnpm run build                 # Build production cho toàn bộ apps

# === CHẠY TỪNG APP ĐỘC LẬP ===
pnpm --filter web dev          # Web Portal chính (Port 3000)
pnpm --filter account dev      # SSO Auth & User Profile (Port 3003)
pnpm --filter payment dev      # Đặt sân & Thanh toán (Port 3004)
pnpm --filter dashboard dev    # Quản lý sân bãi (Port 3001)
pnpm --filter admin dev        # Quản trị hệ thống (Port 3002)

# === THÊM GÓI PHỤ THUỘC (DEPENDENCY) ===
pnpm --filter <app-or-pkg> add <package_name>
pnpm --filter <app-or-pkg> add -D <package_name>
```

---

## 🗺️ MULTI-ZONE REWRITES & PORT MAP

| Ứng Dụng | Port | Đường Dẫn Gốc | Asset Prefix | Vai Trò |
| :--- | :---: | :--- | :--- | :--- |
| **`apps/web`** | `3000` | `/` | `/` | Main public portal, sports, venues, tournaments, PWA, SEO |
| **`apps/account`** | `3003` | `/account` | `/account-static` | SSO Login, Register, Logout, Profile |
| **`apps/payment`** | `3004` | `/payment` | `/payment-static` | Booking, Tickets, VietQR, Checkout |
| **`apps/dashboard`** | `3001` | `/` | `/` | Merchant / Venue Manager Panel |
| **`apps/admin`** | `3002` | `/` | `/` | Super Admin Panel |

---

## 🛡️ CORE RULES & INVARIANTS (BẮT BUỘC TUÂN THỦ)

1. **Next.js 16 Async Dynamic APIs:**
   * `params`, `searchParams`, `cookies()`, `headers()` luôn là **Promise**. Phải dùng `await params`, `await searchParams`, `await cookies()`.
2. **100% Semantic OKLCH Tokens:**
   * Dùng `bg-background`, `text-foreground`, `bg-card`, `bg-muted`, `border-border/80`, `bg-primary`, `bg-gradient-primary`...
   * **CẤM** mã màu Hex (`#0363FE`), **CẤM** màu Tailwind trần (`text-black`, `bg-white`, `text-gray-900`).
3. **Typography Tiếng Việt:**
   * Font `Inter`. Trọng số: `font-normal` (400), `font-medium` (500), `font-semibold` (600), `font-bold` (700).
   * **CẤM `font-extrabold` (800) & `font-black` (900)** (làm dính nét dấu tiếng Việt).
   * **CẤM `uppercase` (ALL-CAPS)**; dùng **Title Case** hoặc **Sentence Case**.
4. **Icons Monochrome:**
   * **100% SVG Vector từ `lucide-react`** (`Flame`, `Trophy`, `Users`, `MapPin`, `Calendar`).
   * **CẤM emoji màu lòe loẹt** (`🔥`, `🏆`, `🏸`, `🚗`) trong UI.
5. **Điều Hướng Đa Ngôn Ngữ (i18n):**
   * Luôn import `Link`, `useRouter`, `usePathname` từ `@/i18n/navigation` của app hiện tại.
   * **CẤM** import `next/link` trực tiếp.
6. **Hình Ảnh:**
   * Luôn dùng `<Image />` từ `next/image`. **CẤM** thẻ `<img>` HTML trần.
7. **React 19 Hooks:**
   * **CẤM** gọi `setState` đồng bộ trong thân `useEffect` (`react-hooks/set-state-in-effect`).
8. **Container & Shadows:**
   * Card chính: `rounded-2xl sm:rounded-3xl border border-border/80 bg-card shadow-2xs`.
   * **CẤM** đổ bóng đậm (`shadow-lg`, `shadow-xl`, `shadow-2xl`).

---

## 📦 WORKSPACE PACKAGES

* **`@workspace/ui`:** `packages/ui` — Radix / Base UI Primitives, `globals.css` (OKLCH tokens).
* **`@workspace/shared`:** `packages/shared` — Axios client (`services/axiosConfig.ts`), SSO helpers (`utils/sso.ts`), Constants (`domains.ts`, `tenants.ts`), Custom Hooks (`useBreakpoint`, `useDebounce`).

